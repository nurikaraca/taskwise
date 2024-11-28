import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "The file could not be loaded." }, { status: 400 });
  }

  try {
    
    const arrayBuffer = await file.arrayBuffer();

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(Buffer.from(arrayBuffer)).pipe(uploadStream);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      id: uploadResult.public_id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while uploading the file" }, { status: 500 });
  }
};
