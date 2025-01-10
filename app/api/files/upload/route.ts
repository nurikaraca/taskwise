

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { db } from "@/db";
import { auth } from "@/auth";

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary configuration is missing. Please check environment variables.");
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  // Diğer alanlar...
};

function toReadable(stream: ReadableStream) {
  return new Readable({
    async read() {
      const reader = stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        this.push(Buffer.from(value));
      }
      this.push(null); // Stream'in sonunu belirtir.
    },
  });
}

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

    // Convert file.stream() (ReadableStream) to Node.js Readable
    const fileStream = toReadable(file.stream());

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads", invalidate: true },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );

      fileStream.pipe(stream);
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













