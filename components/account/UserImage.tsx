"use client"

import { createUserImage } from "@/actions/user/createUserImage";
import { getUser } from "@/actions/user/getUser";
import Image from "next/image";
import { useState,useEffect, use } from "react";
import { UserProps } from "./Profile";
import { MdOutlineAddAPhoto } from "react-icons/md";

const UserImage: React.FC<UserProps> = ({ user }) => {
 const [previewImage, setPreviewImage] = useState<string | null>(user.image || "");

const userId = user.id
  const handleImageUpload = async (file: File) => {
    if (!userId) return alert("User ID not found!");

    try {
      const response = await createUserImage({ userId, file });
      console.log("User image uploaded successfully:", response);

      setPreviewImage(response.imageUrl);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  return (
  <div className="flex  flex-col items-center  relative w-full h-full  ">
     {/* Banner*/}
      <div className="w-full h-52 bg-gray-200 relative">
          <Image
            src="/banner.jpg" 
            alt="banner"      
            layout="fill"  
            objectFit="cover"   
            className="w-full h-full"
          />
      </div>

        {/* Profile Picture */}

        <div className=" absolute -bottom-20 w-32 h-32 left-7 rounded-full border-4 border-white  "  >
            <Image
            width={196}
            height={196}
            src={previewImage || "/avatar.jpg"}
            alt="Profile Picture"
            className="object-cover w-full h-full  z-40  relative rounded-full "
          /> 
    <div className="absolute bottom-12 -right-5 ">
        <span
         onClick={() => document.getElementById("file-input")?.click()}
        className=" flex items-center justify-center p-2   cursor-pointer   top-3 left-0 transform relative    text-white rounded-full  z-50 "
      >
      <MdOutlineAddAPhoto size={30} className=" right-0 absolute top-4 bg-slate-900"/>
       
      </span>

  
       <input
         id="file-input"
                  type="file"

        accept="image/*"
        style={{ display: "none" }}
         onChange={handleFileSelect}
                /> 
        </div>
        </div>

      

        <div className=" text-center absolute  -bottom-10  left-48">
         <h1 className="text-xl font-semibold text-gray-100">{user.name} </h1>
        </div>

  </div>
  );
};

export default UserImage;






//! "use client"

// import { createUserImage } from "@/actions/user/createUserImage";
// import { getUser } from "@/actions/user/getUser";
// import Image from "next/image";
// import { useState,useEffect } from "react";
// import { UserProps } from "./Profile";


// const UserImage: React.FC<UserProps> = ({ user }) => {
//  const [previewImage, setPreviewImage] = useState<string | null>(user.image || "");

// const userId = user.id
//   const handleImageUpload = async (file: File) => {
//     if (!userId) return alert("User ID not found!");

//     try {
//       const response = await createUserImage({ userId, file });
//       console.log("User image uploaded successfully:", response);

//       setPreviewImage(response.imageUrl);
//       alert("Profile picture updated!");
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//       alert("Failed to upload profile picture.");
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) handleImageUpload(file);
//   };

//   return (
//     <div className="border p-2 flex flex-col items-center justify-center w-[30rem] h-[30rem]   relative">
//       {/* current image */}
    
    
//          <Image
//         width={400}
//         height={600}
//         src={previewImage || "/avatar.jpg"}
//         alt="user-image"
//         className=" my-auto mx-auto  object-contain   "
//       />
   
  
    
      

      
//       <span
//         onClick={() => document.getElementById("file-input")?.click()}
//         className=" flex items-center justify-center p-2   cursor-pointer  absolute bottom-0  "
//       >
//        Update  Photo
//       </span>

  
//       <input
//         id="file-input"
//         type="file"
//         accept="image/*"
//         style={{ display: "none" }}
//          onChange={handleFileSelect}
//       />
//     </div>
//   );
// };

// export default UserImage;




