import imageCompression from "browser-image-compression";

export async function uploadImage(file: File): Promise<string> {
  // Compress image
  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1800,
    useWebWorker: true,
  });

  const formData = new FormData();
  formData.append("file", compressed);

  const response = await fetch("/api/questions/upload-image", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to upload image.");
  }

  return result.url;
}