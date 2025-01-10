

// import { NextResponse } from "next/server";
// import { UploadApiResponse } from "cloudinary";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
// import { db } from "@/db";
// import { auth } from "@/auth";


// if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//   throw new Error("Cloudinary configuration is missing. Please check environment variables.");
// }

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
  
// });

// // Multer Configuration




  
  
//   export const POST = async (req: Request ) => {
//     const session = await auth();


//     if (!session || !session.user?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
   
//     const form = await req.formData();
//     const file = form.get("file") as File | null;
//     const taskId = form.get("taskId") as string;
//     const userId = session.user?.id 
   
  
//     if (!file || !taskId || !userId) {
//       return NextResponse.json({ error: "Invalid file, task ID, or user ID" }, { status: 400 });
//     }
  
//     try {
//       const arrayBuffer = await file.arrayBuffer();
  
//       const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "uploads" },
//           (error, result) => {
//             if (error) reject(error);
//             resolve(result as UploadApiResponse);
//           }
//         );
  
//         streamifier.createReadStream(Buffer.from(arrayBuffer)).pipe(uploadStream);
//       });
  
//       const result = await db.$transaction(async (prisma) => {
//         const task = await prisma.task.findUnique({ where: { id: taskId } });
//         if (!task) throw new Error("Task not found");
  
//         const fileRecord = await prisma.file.create({
//           data: {
//             taskId: task.id,
//             fileUrl: uploadResult.secure_url,
//             fileId: uploadResult.public_id,
//             uploadedBy: userId, 
//           },
//         });

//         const userTaskStatusUpdate = await prisma.userTaskStatus.updateMany({
//           where: {taskId: taskId,
//             userId: userId,
//           },
//           data: {
//             isCompleted: true
//           }
//         });

        
  
//         return { task, file: fileRecord , userTaskStatusUpdate};
//       });
  
//       return NextResponse.json(result);
//     } catch (error) {
//       console.error("File upload error:", error);
      
//       return NextResponse.json(
//         { error: "An error occurred during the transaction" },
//         { status: 500 }
//       );
//     }
//   };
  



import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { auth } from "@/auth";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary configuration is missing. Please check environment variables.");
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const taskId = form.get("taskId") as string;
    const userId = session.user.id;

    if (!file || !taskId || !userId) {
      return NextResponse.json({ error: "Invalid file, task ID, or user ID" }, { status: 400 });
    }

    // Convert file to base64 format
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "uploads",
      invalidate: true,
    });

    // Save to the database
    const result = await db.$transaction(async (prisma) => {
      const task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) throw new Error("Task not found");

      const fileRecord = await prisma.file.create({
        data: {
          taskId: task.id,
          fileUrl: uploadResult.secure_url,
          fileId: uploadResult.public_id,
          uploadedBy: userId,
        },
      });

      const userTaskStatusUpdate = await prisma.userTaskStatus.updateMany({
        where: {
          taskId: taskId,
          userId: userId,
        },
        data: {
          isCompleted: true,
        },
      });

      return { task, file: fileRecord, userTaskStatusUpdate };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "An error occurred during the transaction" },
      { status: 500 }
    );
  }
};
