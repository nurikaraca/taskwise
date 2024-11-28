

import axios, { AxiosProgressEvent } from "axios";

export const uploadFile = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress, 
    });

    return response.data;
  } catch (error) {
    console.error("An error occurred while uploading the file:", error);
    throw new Error("An error occurred while uploading the file");
  }
};
