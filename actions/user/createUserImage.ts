import axios from "axios";

export async function createUserImage({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) {
  try {
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

   
    const response = await axios.post("/api/user/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error uploading user image:",
      error.response?.data || error.message
    );
    throw error;
  }
}
