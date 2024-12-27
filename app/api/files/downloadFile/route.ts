

import { NextResponse } from "next/server";
import { db } from "@/db"; 
import { auth } from "@/auth"; 
import cloudinary from "cloudinary";


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function GET(req: Request) {
  try {
    
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    const uploadedId = searchParams.get("uploadedId");

    if (!taskId || !uploadedId) {
      return NextResponse.json(
        { message: "Missing required query parameters: taskId or uploadedId" },
        { status: 400 }
      );
    }

    
    const file = await db.file.findFirst({
      where: {
        taskId,
        uploadedBy: uploadedId,
      },
    });
console.log("buryageldi ")

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
      
    }

    console.log("buryageldi ")
    
    const { fileUrl } = file;
   
    const publicIdMatch = fileUrl.match(
      /upload\/(?:v\d+\/)?(.+?)(?:\.[^/.]+)?$/
    );
    if (!publicIdMatch || !publicIdMatch[1]) {
      return NextResponse.json({ message: "Invalid file URL" }, { status: 400 });
    }

    const publicId = publicIdMatch[1];
    const version = fileUrl.match(/\/v(\d+)\//)?.[1]; 
   
    const downloadUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/fl_attachment/v${version}/${publicId}.pdf`;

    if(!downloadUrl) {return;}
    return NextResponse.json({ fileUrl: downloadUrl }, { status: 200 });
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
