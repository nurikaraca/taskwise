import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";



export const GET = async (req: NextRequest) => {
    


  try {
    const url = new URL(req.url);
    const  userId= url.searchParams.get("userId");
   
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
   
   }
    const user = await db.user.findUnique({
      where: { id: userId },
      
    });

    if (!user) {
        return NextResponse.json(
          { message: "User not found: Unable to fetch user details." },
          { status: 404 }
        );
      }
    return NextResponse.json({user });
  } catch (error) {
   
    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching user details.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};