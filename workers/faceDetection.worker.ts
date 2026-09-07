import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

let detector: FaceDetector | null = null;

async function getDetector() {
  if (detector) {
    return detector;
  }

const vision =
  await FilesetResolver.forVisionTasks(
    "/mediapipe/wasm"
  );

  detector =
    await FaceDetector.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
  "/mediapipe/models/blaze_face_short_range.tflite",
        },

        runningMode: "IMAGE",
      }
    );

  return detector;
}

self.onmessage = async (
  event: MessageEvent
) => {
  const { 
    imageBitmap,
requestId,
} = event.data;

  if (!imageBitmap) {
    return;
  }

  try {
    const detector =
      await getDetector();

    const result =
      detector.detect(imageBitmap);

    const faceCount =
      result?.detections?.length ?? 0;

    imageBitmap.close();

   self.postMessage({
  type: "result",
  faceCount,
  requestId,
});

  } catch (error) {

    imageBitmap.close();

   self.postMessage({
  type: "error",
  error:
    error instanceof Error
      ? error.message
      : String(error),
  requestId,
});
  }
};