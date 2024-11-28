import { NextResponse } from "next/server";
import { db } from "@/db"; // Veritabanı bağlantınızı import edin

// Grubun üyelerini getiren API
export async function GET(req: Request, context: { params: { groupId: string } }) {

  

  try {
   
    const { groupId } = await context.params;// URL'den grup ID'sini alıyoruz

    console.log("group id alamıyoruz aşko", groupId)
    if (!groupId) {
      return NextResponse.json(
        { message: "Group ID is required" },
        { status: 400 }
      );
    }

    // Gruba ait üyeleri getir
    const groupMembers = await db.userGroup.findMany({
      where: {
        groupId,
      },
      include: {
        user: true, // Kullanıcı bilgilerini almak için
      },
    });

    // Kullanıcı bilgilerini düzenle
    const members = groupMembers.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.role, // Kullanıcının gruptaki rolü
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
