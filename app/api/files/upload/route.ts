

import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { db } from "@/db";
import { auth } from "@/auth";



// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration




  
  
  export const POST = async (req: Request ) => {
    const session = await auth();


    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const taskId = form.get("taskId") as string;
    const userId = session.user?.id 
  
    if (!file || !taskId || !userId) {
      return NextResponse.json({ error: "Invalid file, task ID, or user ID" }, { status: 400 });
    }
  
    try {
      const arrayBuffer = await file.arrayBuffer();
  
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) reject(error);
            resolve(result as UploadApiResponse);
          }
        );
  
        streamifier.createReadStream(Buffer.from(arrayBuffer)).pipe(uploadStream);
      });
  
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
          where: {taskId: taskId,
            userId: userId,
          },
          data: {
            isCompleted: true
          }
        });

        
  
        return { task, file: fileRecord , userTaskStatusUpdate};
      });
  
      return NextResponse.json(result);
    } catch (error) {
      console.error("Error occurred:", error);
      return NextResponse.json(
        { error: "An error occurred during the transaction" },
        { status: 500 }
      );
    }
  };
  