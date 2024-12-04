import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { db } from "@/db";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const userId = form.get("userId") as string | null;

  if (!file || !userId) {
    return NextResponse.json(
      { error: "File or User ID is missing." },
      { status: 400 }
    );
  }

  try {
    
    const arrayBuffer = await file.arrayBuffer();

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "user-images" }, 
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(Buffer.from(arrayBuffer)).pipe(uploadStream);
    });

    // update user
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { image: uploadResult.secure_url }, 
    });

    return NextResponse.json({
      message: "File uploaded and user updated successfully.",
      imageUrl: uploadResult.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error during upload or user update:", error);
    return NextResponse.json(
      { error: "An error occurred while uploading or updating the user." },
      { status: 500 }
    );
  }
};
