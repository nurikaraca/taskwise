import axios from 'axios'

interface CheckTaskFile{
    taskId:string;
}

export async function checkTaskFile({taskId}:CheckTaskFile) {
    try {
        const response = await axios.get(`/api/files/checkTaskFile` , {
            params: {taskId },
        })
        return response.data;
    } catch (error: any) {
        if(error.response){

            throw new Error(error.response.data.message || "An unknown error occurred");
        }

        throw new Error("Failed to fetch task file");
    }
}