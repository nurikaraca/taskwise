import axios from "axios";
const Urls = `api/tasks/getPeddingTasks`;

export const getPeddingTasks = async () => {
    try {

        const response = await axios.get(Urls)
        return response.data;
   
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};

