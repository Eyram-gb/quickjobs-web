import { API_BASE_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Logic to get user data based on user ID
    console.log("=========REQ", req);

    const userRes = await fetch(`${API_BASE_URL}/users/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("-----GETTTTTTT-----", cookies().getAll());
    console.log("-----USERRESSS-----", userRes);

    if (!userRes.ok) {
      const err: { error: Error } = await userRes.json();
      throw err;
    }
    const user = await userRes.json();
    // return userRes.json();
    // const user = await getUserById(userId);
    console.log("-----USER-----", user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
