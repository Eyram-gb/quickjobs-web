import { API_BASE_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Logic to get user data based on user ID
    // Example:
    console.log('------id------',params.id);
    
    const userRes = await fetch(`${API_BASE_URL}/users/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log('------userRES----', userRes);
    

    if (!userRes.ok) {
      const err: { error: Error } = await userRes.json();
      throw err;
    }
    const user = await userRes.json();
    return NextResponse.json(user);
    // const user = await getUserById(userId);
    // return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
