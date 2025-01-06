import { Task } from '@/type/types';
import axios from 'axios'
const baseURL =process.env.NODE_ENV === "production"
? `${process.env.NEXT_PUBLIC_BASE_URL}`
: "http://localhost:3000";
export async function checkTaskFile({taskId}:{taskId:Task}) {
    try {
        const response = await axios.get(`${baseURL}/api/files/checkTaskFile` , {
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