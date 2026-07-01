"use client";

import { uploadImage } from "../services/uploadImage";

export function useImageUpload() {
  async function upload(file: File) {
    try {
      return await uploadImage(file);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
      return null;
    }
  }

  return {
    upload,
  };
}