import {  NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";


export const GET = async () => {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }


  try {
   
   const userId = session.user.id;
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
    console.error("Error fetching user details:", error);

    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching user details. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};