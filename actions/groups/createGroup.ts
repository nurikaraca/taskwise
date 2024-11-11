import axios from 'axios'
const Urls = `http://localhost:3000/api/groups/create`


export const createGroup =async(data: any)=>{

    try {   
        const newGroup = await axios.post(Urls ,data)
        return newGroup.data;
    } catch (error) {

        console.log("error", error)
        throw error; 
    }
}

    