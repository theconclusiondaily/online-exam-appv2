"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type PendingAnswer = {
  id: string;
  examId: string;
  questionId: string;
  selectedOption: string | null;
  sessionToken: string;
  updatedAt: number;
};

type Props = {
  examId: string;
  sessionToken: string;
};

function createOperationId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export default function useExamAnswerSync({
  examId,
  sessionToken,
}: Props) {
  const queueKey =
    `exam-answer-queue-${examId}`;

  const [pendingCount, setPendingCount] =
    useState(0);

  const queueRef =
    useRef<PendingAnswer[]>([]);

  const syncingRef =
    useRef(false);

  const loadQueue = useCallback(
    (): PendingAnswer[] => {
      try {
        const stored =
          localStorage.getItem(queueKey);

        if (!stored) {
          return [];
        }

        const parsed =
          JSON.parse(stored);

        if (!Array.isArray(parsed)) {
          return [];
        }

        /*
         * Validate old queue entries.
         */
        return parsed.filter(
          (item): item is PendingAnswer =>
            item &&
            typeof item.examId === "string" &&
            typeof item.questionId === "string" &&
            typeof item.sessionToken === "string"
        );
      } catch (error) {
        console.error(
          "Failed to load exam answer queue:",
          error
        );

        return [];
      }
    },
    [queueKey]
  );

  const saveQueue = useCallback(
    (queue: PendingAnswer[]) => {
      queueRef.current = queue;

      try {
        if (queue.length === 0) {
          localStorage.removeItem(queueKey);
        } else {
          localStorage.setItem(
            queueKey,
            JSON.stringify(queue)
          );
        }
      } catch (error) {
        console.error(
          "Failed to save exam answer queue:",
          error
        );
      }

      setPendingCount(queue.length);
    },
    [queueKey]
  );

  /*
   * Load any previously unsynchronized answers
   * when this exam is opened.
   */
  useEffect(() => {
    const queue = loadQueue();

    queueRef.current = queue;

    setPendingCount(queue.length);
  }, [loadQueue]);

  /*
   * Synchronize pending answers.
   *
   * Important:
   * The queue is never blindly replaced after a sync.
   * Newer answers created while syncing are preserved.
   */
  const syncQueue = useCallback(async () => {
    if (syncingRef.current) {
      return;
    }

    if (!navigator.onLine) {
      return;
    }

    if (!sessionToken) {
      return;
    }

    const queueAtStart =
      [...queueRef.current];

    if (queueAtStart.length === 0) {
      return;
    }

    syncingRef.current = true;

    try {
      let failedIndex = -1;

      for (
        let index = 0;
        index < queueAtStart.length;
        index++
      ) {
        const item =
          queueAtStart[index];

        try {
          const response =
            await fetch(
              "/api/exam/save-answer",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  examId: item.examId,
                  questionId:
                    item.questionId,
                  selectedOption:
                    item.selectedOption,
                  sessionToken:
                    item.sessionToken,
                }),
              }
            );

          if (!response.ok) {
            failedIndex = index;
            break;
          }
        } catch (error) {
          console.warn(
            "Answer synchronization interrupted:",
            error
          );

          failedIndex = index;
          break;
        }
      }

      /*
       * Answers successfully sent during this
       * synchronization.
       */
      const successfullySynced =
        failedIndex === -1
          ? queueAtStart
          : queueAtStart.slice(
              0,
              failedIndex
            );

      const syncedIds =
        new Set(
          successfullySynced.map(
            (item) => item.id
          )
        );

      /*
       * Read the latest queue from localStorage.
       *
       * This is important because the student may
       * have answered another question while the
       * network request was running.
       */
      const latestQueue =
        loadQueue();

      /*
       * Keep everything that was NOT successfully
       * synchronized.
       */
      const remaining =
        latestQueue.filter(
          (item) =>
            !syncedIds.has(item.id)
        );

      /*
       * Remove stale older versions of the same
       * question if a newer version exists.
       *
       * The latest answer always wins.
       */
      const latestByQuestion =
        new Map<
          string,
          PendingAnswer
        >();

      for (
        const item of remaining
      ) {
        const existing =
          latestByQuestion.get(
            item.questionId
          );

        if (
          !existing ||
          item.updatedAt >
            existing.updatedAt
        ) {
          latestByQuestion.set(
            item.questionId,
            item
          );
        }
      }

      saveQueue(
        Array.from(
          latestByQuestion.values()
        )
      );
    } finally {
      syncingRef.current = false;
    }
  }, [
    loadQueue,
    saveQueue,
    sessionToken,
  ]);

  /*
   * Add or replace a pending answer.
   *
   * Every answer gets a unique operation ID and
   * timestamp so a newer answer can never be
   * confused with an older one.
   */
  const queueAnswer = useCallback(
    (
      questionId: string,
      selectedOption:
        | string
        | null
    ) => {
      if (!examId) {
        return;
      }

      if (!sessionToken) {
        console.warn(
          "Cannot queue answer without session token."
        );

        return;
      }

      const queue =
        loadQueue();

      /*
       * Remove the previous pending version
       * of this question.
       */
      const filteredQueue =
        queue.filter(
          (item) =>
            item.questionId !==
            questionId
        );

      const newAnswer: PendingAnswer = {
        id: createOperationId(),
        examId,
        questionId,
        selectedOption,
        sessionToken,
        updatedAt: Date.now(),
      };

      filteredQueue.push(
        newAnswer
      );

      saveQueue(
        filteredQueue
      );

      /*
       * Try immediately when online.
       *
       * Even if this fails, the answer is already
       * safely stored locally.
       */
      if (navigator.onLine) {
        void syncQueue();
      }
    },
    [
      examId,
      sessionToken,
      loadQueue,
      saveQueue,
      syncQueue,
    ]
  );

  /*
   * When the browser reports that the connection
   * has returned, synchronize immediately.
   */
  useEffect(() => {
    const handleOnline = () => {
      void syncQueue();
    };

    window.addEventListener(
      "online",
      handleOnline
    );

    return () => {
      window.removeEventListener(
        "online",
        handleOnline
      );
    };
  }, [syncQueue]);

  /*
   * Retry every 5 seconds.
   *
   * This protects against unreliable online/offline
   * events on some mobile browsers.
   */
  useEffect(() => {
    const interval =
      window.setInterval(() => {
        void syncQueue();
      }, 5000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [syncQueue]);

  return {
    queueAnswer,
    syncQueue,
    pendingCount,
  };
}