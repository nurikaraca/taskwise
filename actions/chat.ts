import axios from "axios";

const API_BASE_URL = 'http://localhost:5001';

//Get messages
export const getMessages = async (groupId: string) => {
 try {
    const response = await axios.get(`${API_BASE_URL}/groups/${groupId}/messages`);
    return response.data; //Message list
      
    
 } catch (error : any) {
    console.error('An error occurred while retrieving the messages:', error.message);
    throw new Error('An error occurred while retrieving the messages.');
 }
};

//Send message
export const sendMessage = async (groupId: string, content: string, senderId :string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/groups/${groupId}/messages`, {
            content,
            senderId,
        });
        return response.data; //New message added
    } catch (error : any) {
        console.error('An error occurred while sending the message: ', error.message);
    throw new Error('An error occurred while sending the message.');
    }   
}