import React, { useEffect, useState } from 'react'
import UserImage from '../account/UserImage'
import { getUser } from '@/actions/user/getUser';
import { updateName } from '@/actions/user/updateName';
import { toast } from '@/hooks/use-toast';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { User } from '@/type/types';

const ProfileSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined'){
 const fetchUser = async () => {
      try {
        const response = await getUser();
        const filteredResponse = response.user;
        setUser(filteredResponse);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
   
    fetchUser();

    }
   
      
  }, [])

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateName = async () => {
    setIsLoading(true);
    try {
      await updateName({ name })
      toast({
        variant: "success",
        title: "Name  updated:",

      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.:",

      });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full  flex flex-col items-center justify-center w-full ">
      <div className="h-[18rem] ">
        <UserImage user={user} />
      </div>

       <span className=" h-[3rem] w-[20rem] rounded-xl flex justify-center items-center  mb-3 border border-slate-600/20">
        {user.name}
      </span> 

      <div className="flex flex-col items-center w-[20rem] space-y-3  ">
        <div className="flex items-center  w-full p-3 rounded-xl  border border-slate-600/20">
          <MdDriveFileRenameOutline size={30} className="mr-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-none  focus:outline-none w-full"
            placeholder="Enter your new name"
          />
        </div>
        <button
          onClick={handleUpdateName}
          className={`w-full py-2 rounded-xl text-white transition ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Name"}
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings