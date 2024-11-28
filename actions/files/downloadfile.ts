import axios from "axios";

export const downloadFile = async (fileId: string) => {
  try {
    
    const response = await axios.get(`/api/files/download/${fileId}`, {
      responseType: "blob", 
    });

    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileId); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 

    return response.data;
  } catch (error) {
    console.error("An error occurred while downloading the file:", error);
    throw new Error("An error occurred while downloading the file");
  }
};
