
import axios from "axios";

export const downloadFile = async (uploadedId: string, taskId: string) => {
  try {
    const response = await axios.get("/api/files/downloadFile", {
      params: { uploadedId, taskId },
    });

    if (response.status === 200 && response.data.fileUrl) {
      const { fileUrl } = response.data;

  
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "downloaded_file"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return { fileUrl };
    } else {
      throw new Error("File not found or URL is invalid");
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    // throw error;
  }
};
