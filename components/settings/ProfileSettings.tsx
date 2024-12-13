import React, { useEffect, useState } from 'react'
import UserImage from '../account/UserImage'
import { getUser } from '@/actions/user/getUser';
import { UserProps } from './Settings';
import { updateName } from '@/actions/user/updateName';
import { toast } from '@/hooks/use-toast';
import { MdDriveFileRenameOutline } from "react-icons/md";

const ProfileSettings = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined'){
 const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    console.log(user?.user.image)
    fetchUser();

    }
   
      
  }, [])

  if (!user?.user) {
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
    <div className="h-full  flex flex-col items-center justify-center text-white">
      <div className="h-[18rem] ">
        <UserImage user={user?.user} />
      </div>

       <div className=" h-[3rem] w-[20rem] rounded-xl flex justify-center items-center bg-slate-200/5 mb-3">
        
        {user.user.name}
      </div> 

      <div className="flex flex-col items-center w-[20rem] space-y-3 ">
        <div className="flex items-center bg-slate-200/5 w-full p-3 rounded-xl">
          <MdDriveFileRenameOutline size={30} className="mr-3" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-none text-white focus:outline-none w-full"
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