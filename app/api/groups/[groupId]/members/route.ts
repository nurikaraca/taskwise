import { NextResponse } from "next/server";
import { db } from "@/db"; 
// API that gets the members of the group
export async function GET(req: Request, context: { params: { groupId: string } }) {

  

  try {
   
    const { groupId } = await context.params

    console.log("group id alamıyoruz aşko", groupId)
    if (!groupId) {
      return NextResponse.json(
        { message: "Group ID is required" },
        { status: 400 }
      );
    }

    // Get members of the group
    const groupMembers = await db.userGroup.findMany({
      where: {
        groupId,
      },
      include: {
        user: true, 
      },
    });

    
    const members = groupMembers.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.role, 
      image:member.user.image,
    }));

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching group members:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching group members." },
      { status: 500 }
    );
  }
}
