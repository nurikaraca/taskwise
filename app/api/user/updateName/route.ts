import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

// export const PUT = async (req: NextRequest) => {
//     const session = await auth();
//     if (!session || !session.user?.id) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const body = await req.json();
//         const { name } = body;

//         if (!name || typeof name !== "string") {
//             return NextResponse.json(
//                 { message: "Invalid input: 'name' must be a non-empty string." },
//                 { status: 400 }
//             );
//         }
        
//         const userId = session.user.id;

//         const updatedUser = await db.user.update({
//             where:{id: userId},
//             data: {name},
//         })
//         return NextResponse.json({
//             message: "User name updated successfully.",
//             user: updatedUser,
//           });
//         } catch (error) {
//           console.error("Error updating user name:", error);
      
//           return NextResponse.json(
//             {
//               message: "An unexpected error occurred while updating user details.",
//               error: error instanceof Error ? error.message : "Unknown error",
//             },
//             { status: 500 }
//           );
//         }
//       };