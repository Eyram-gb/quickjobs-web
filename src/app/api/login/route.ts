import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

// Replace this with your actual API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_QUICKJOBS_ENDPOINT || "";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { email, password, id } = await req.json();
    const qjCookies = cookies();
    const qjHeaders = headers();

    // console.log("---------Headers:", qjHeaders);
    // console.log("---------Cookies:", qjCookies);

    // Send a request to the external API
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, id }),
    });

    console.log(loginRes);

    // Handle the response from the external API
    if (!loginRes.ok) {
      const err: { error: Error } = await loginRes.json();
      throw err;
    }

    const { user, message } = (await loginRes.json()) as {
      user: {
        id: string;
        email: string;
        user_type: string;
      };
      message: string;
    };

    // Return the user data as a response
    return Response.json({ user, message }, { status: 201 });
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
