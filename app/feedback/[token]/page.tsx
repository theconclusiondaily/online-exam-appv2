"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import PremiumButton from "@/components/ui/PremiumButton";
import GlassCard from "@/components/ui/GlassCard";

type FeedbackData = {
  request_id: string;
  exam_id: string;
  exam_title: string | null;
  already_completed: boolean;
};

const ratingQuestions = [
  {
    key: "interface_rating",
    title: "How would you rate the exam interface?",
    icon: "🖥️",
  },
  {
    key: "navigation_rating",
    title: "How easy was it to navigate between questions?",
    icon: "🧭",
  },
  {
    key: "question_palette_rating",
    title: "How useful was the question palette?",
    icon: "🔢",
  },
  {
    key: "timer_rating",
    title: "How was the timer experience?",
    icon: "⏱️",
  },
  {
    key: "answer_selection_rating",
    title: "How easy was it to select/change answers?",
    icon: "✏️",
  },
  {
    key: "performance_rating",
    title: "How was the overall performance and speed?",
    icon: "⚡",
  },
  {
    key: "mobile_rating",
    title: "How was your experience on your device?",
    icon: "📱",
  },
] as const;

type RatingKey = (typeof ratingQuestions)[number]["key"];

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();

  const token =
    Array.isArray(params.token) ? params.token[0] : params.token;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [feedbackData, setFeedbackData] =
    useState<FeedbackData | null>(null);

  const [error, setError] = useState("");

  const [overallRating, setOverallRating] = useState<number | null>(null);

  const [ratings, setRatings] = useState<
    Partial<Record<RatingKey, number>>
  >({});

  const [liked, setLiked] = useState("");
  const [improvement, setImprovement] = useState("");
  const [recommendationScore, setRecommendationScore] =
    useState<number | null>(null);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid feedback link.");
      setLoading(false);
      return;
    }

    async function loadFeedbackRequest() {
      try {
        const { data, error } = await supabase.rpc(
          "get_exam_feedback_request",
          {
            p_token: token,
          }
        );

        if (error) {
          console.error(error);
          setError("Unable to load this feedback form.");
          return;
        }

        if (!data || data.length === 0) {
          setError(
            "This feedback link is invalid or has expired."
          );
          return;
        }

        const request = data[0] as FeedbackData;

        setFeedbackData(request);

        if (request.already_completed) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadFeedbackRequest();
  }, [token]);

  function setRating(key: RatingKey, value: number) {
    setRatings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function submitFeedback() {
    if (!token) return;

    if (!overallRating) {
      setError("Please select your overall experience rating.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { data, error } = await supabase.rpc(
        "submit_exam_feedback",
        {
          p_token: token,
          p_overall_rating: overallRating,

          p_interface_rating:
            ratings.interface_rating ?? null,

          p_navigation_rating:
            ratings.navigation_rating ?? null,

          p_question_palette_rating:
            ratings.question_palette_rating ?? null,

          p_timer_rating:
            ratings.timer_rating ?? null,

          p_answer_selection_rating:
            ratings.answer_selection_rating ?? null,

          p_performance_rating:
            ratings.performance_rating ?? null,

          p_mobile_rating:
            ratings.mobile_rating ?? null,

          p_liked: liked.trim() || null,

          p_improvement:
            improvement.trim() || null,

          p_recommendation_score:
            recommendationScore ?? null,

          p_device_type:
            typeof window !== "undefined"
              ? /Mobi|Android/i.test(
                  navigator.userAgent
                )
                ? "mobile"
                : "desktop"
              : null,

          p_browser:
            typeof navigator !== "undefined"
              ? navigator.userAgent
              : null,
        }
      );

      if (error) {
        console.error(error);

        if (
          error.message
            ?.toLowerCase()
            .includes("already been submitted")
        ) {
          setSubmitted(true);
          return;
        }

        setError(
          error.message ||
            "Unable to submit feedback. Please try again."
        );

        return;
      }

      if (data) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while submitting your feedback."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-tcd-blue border-t-transparent animate-spin" />

          <p className="font-semibold text-tcd-blue">
            Loading feedback form...
          </p>
        </div>
      </main>
    );
  }

  if (error && !feedbackData) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <GlassCard
          hover={false}
          className="max-w-lg w-full p-8 text-center"
        >
          <img
            src="/logo.png"
            alt="The Conclusion Daily"
            className="w-20 h-20 mx-auto object-contain mb-4"
          />

          <h1 className="text-2xl font-black text-tcd-blue mb-3">
            Feedback Link Unavailable
          </h1>

          <p className="text-gray-600 mb-6">
            {error}
          </p>

          <PremiumButton
            variant="primary"
            onClick={() => router.push("/")}
          >
            Go to The Conclusion Daily
          </PremiumButton>
        </GlassCard>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <GlassCard
          hover={false}
          glow
          className="max-w-xl w-full p-8 md:p-10 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-4xl">
            ✓
          </div>

          <img
            src="/logo.png"
            alt="The Conclusion Daily"
            className="w-16 h-16 mx-auto object-contain mb-4"
          />

          <h1 className="text-3xl font-black text-tcd-blue mb-3">
            Thank You!
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Your feedback has been recorded.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Your feedback helps us make The Conclusion Daily
            better for every student.
          </p>

          <PremiumButton
            variant="secondary"
            onClick={() => router.push("/")}
            fullWidth
          >
            Back to The Conclusion Daily
          </PremiumButton>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 md:py-12">
      <div className="max-w-3xl mx-auto">

        {/* Brand */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="The Conclusion Daily"
            className="w-20 h-20 mx-auto object-contain mb-3"
          />

          <h2 className="text-lg font-black tracking-wide text-tcd-blue">
            THE CONCLUSION DAILY
          </h2>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-tcd-gold">
            Hope & Faith
          </p>
        </div>

        {/* Header */}
        <GlassCard
          hover={false}
          gradient
          className="p-6 md:p-8 mb-5 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-tcd-gold/10 text-tcd-blue px-4 py-2 rounded-full text-sm font-bold mb-4">
            📝 Quick Feedback
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-tcd-blue mb-3">
            How was your exam experience?
          </h1>

          <p className="text-gray-600 mb-3">
            Your feedback helps us improve the TCD exam
            experience.
          </p>

          {feedbackData?.exam_title && (
            <div className="inline-block bg-tcd-blue/5 rounded-xl px-4 py-2 text-sm font-semibold text-tcd-blue">
              {feedbackData.exam_title}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">
            Takes less than a minute
          </p>
        </GlassCard>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Overall Rating */}
        <GlassCard
          hover={false}
          className="p-6 md:p-8 mb-5"
        >
          <h2 className="text-xl font-black text-tcd-blue mb-2">
            Overall Experience
          </h2>

          <p className="text-gray-600 text-sm mb-5">
            How would you rate your overall exam experience?
          </p>

          <div className="flex justify-center gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((value) => {
              const selected =
                overallRating === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setOverallRating(value)
                  }
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14
                    rounded-2xl
                    border-2
                    text-2xl
                    transition-all
                    duration-200
                    ${
                      selected
                        ? "border-tcd-gold bg-tcd-gold/20 scale-110 shadow-lg"
                        : "border-gray-200 bg-white hover:border-tcd-gold/60 hover:scale-105"
                    }
                  `}
                  aria-label={`${value} out of 5`}
                >
                  {selected ? "★" : "☆"}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between max-w-sm mx-auto mt-3 text-xs text-gray-500">
            <span>Very poor</span>
            <span>Excellent</span>
          </div>
        </GlassCard>

        {/* Interface Ratings */}
        <GlassCard
          hover={false}
          className="p-6 md:p-8 mb-5"
        >
          <h2 className="text-xl font-black text-tcd-blue mb-6">
            Exam Interface
          </h2>

          <div className="space-y-7">
            {ratingQuestions.map((question) => (
              <div key={question.key}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xl">
                    {question.icon}
                  </span>

                  <p className="font-semibold text-gray-800">
                    {question.title}
                  </p>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const selected =
                      ratings[question.key] ===
                      value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setRating(
                            question.key,
                            value
                          )
                        }
                        className={`
                          flex-1
                          h-10
                          rounded-xl
                          border
                          font-bold
                          text-sm
                          transition-all
                          ${
                            selected
                              ? "bg-tcd-blue text-white border-tcd-blue shadow-md"
                              : "bg-white text-gray-500 border-gray-200 hover:border-tcd-blue hover:text-tcd-blue"
                          }
                        `}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>Needs improvement</span>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* What did you like */}
        <GlassCard
          hover={false}
          className="p-6 md:p-8 mb-5"
        >
          <label className="block text-xl font-black text-tcd-blue mb-2">
            What did you like most?
          </label>

          <p className="text-sm text-gray-500 mb-4">
            Tell us what worked well for you.
          </p>

          <textarea
            value={liked}
            onChange={(event) =>
              setLiked(event.target.value)
            }
            rows={4}
            maxLength={1000}
            placeholder="The question navigation, interface, timer..."
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              outline-none
              resize-none
              focus:border-tcd-blue
              focus:ring-4
              focus:ring-tcd-blue/10
            "
          />

          <div className="text-right text-xs text-gray-400 mt-1">
            {liked.length}/1000
          </div>
        </GlassCard>

        {/* Improvement */}
        <GlassCard
          hover={false}
          className="p-6 md:p-8 mb-5"
        >
          <label className="block text-xl font-black text-tcd-blue mb-2">
            What should we improve?
          </label>

          <p className="text-sm text-gray-500 mb-4">
            Be honest. Your feedback directly helps us.
          </p>

          <textarea
            value={improvement}
            onChange={(event) =>
              setImprovement(event.target.value)
            }
            rows={4}
            maxLength={1000}
            placeholder="Tell us what could be better..."
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-4
              outline-none
              resize-none
              focus:border-tcd-blue
              focus:ring-4
              focus:ring-tcd-blue/10
            "
          />

          <div className="text-right text-xs text-gray-400 mt-1">
            {improvement.length}/1000
          </div>
        </GlassCard>

        {/* Recommendation */}
        <GlassCard
          hover={false}
          className="p-6 md:p-8 mb-5"
        >
          <h2 className="text-xl font-black text-tcd-blue mb-2">
            Would you recommend TCD?
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            0 = Not at all likely · 10 = Extremely likely
          </p>

          <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
            {Array.from(
              { length: 11 },
              (_, index) => index
            ).map((value) => {
              const selected =
                recommendationScore === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRecommendationScore(value)
                  }
                  className={`
                    h-10
                    rounded-xl
                    border
                    font-bold
                    transition-all
                    ${
                      selected
                        ? "bg-tcd-gold text-tcd-blue border-tcd-gold scale-105 shadow-md"
                        : "bg-white text-gray-500 border-gray-200 hover:border-tcd-gold"
                    }
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Submit */}
        <div className="mb-8">
          <PremiumButton
            variant="secondary"
            size="lg"
            fullWidth
            loading={submitting}
            onClick={submitFeedback}
          >
            Submit Feedback
          </PremiumButton>
        </div>

        <p className="text-center text-xs text-gray-400">
          Thank you for helping The Conclusion Daily improve.
        </p>
      </div>
    </main>
  );
}