import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { auth } from "@/auth";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const taskId = form.get("taskId") as string;
  const userId = session.user?.id;

  if (!file || !taskId || !userId) {
    return NextResponse.json({ error: "Invalid file, task ID, or user ID" }, { status: 400 });
  }

  try {
    // Convert file to Data URI
    const arrayBuffer = await file.arrayBuffer();
    const mime = file.type;
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    const fileUri = `data:${mime};base64,${base64Data}`;

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: "uploads",
      invalidate: true,
    });

    // Save the result in the database
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




