
"use client";

import { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { getUser } from "@/actions/user/getUser";

export interface UserProps {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    emailVerified: string | null;
    hashedPassword: string | null;
    image: string | null;
  };
}

const Profile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    console.log(user?.user.image)
    fetchUser()
      ;
  }, [])

  if (!user?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex text-white h-full  w-full">
      <div className="flex  items-center   w-full h-52  ">
         <UserImage user={user?.user} />
      </div>
    </div>
  )
}

export default Profile