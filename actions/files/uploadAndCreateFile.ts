import axios, { AxiosProgressEvent } from "axios";
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";

console.log("base url " , baseURL)
export const uploadAndCreateFile = async (
  file: File,
  taskId: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
    console.log("file inside uploadAndCreateFile:", file);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("taskId", taskId);


 

  try {
    for (let pair of formData.entries()) {
        console.log("uploadAndcreatefile", pair[0] + ': ', pair[1]);
        if (pair[0] === 'file') {
            console.log("File inside FormData:", pair[1]);
        }
    }

    const response = await axios.post(`${baseURL}/api/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });


    return response.data;
  } catch (error) {
    console.error("An error occurred during file upload and record creation:", error);
    throw error;
  }
};
