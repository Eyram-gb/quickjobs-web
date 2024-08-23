import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { API_BASE_URL } from "@/lib/constants";

export async function POST(req: NextRequest, res:NextResponse) {
  try {
    // Parse the incoming request body
    const { email, password, id } = await req.json();

    // Send a request to the external API
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, id }),
    });

    // Handle the response from the external API
    if (!loginRes.ok) {
      const err: { error: Error } = await loginRes.json();
      throw err;
    }

    const data = await loginRes.json();
    
    const response = NextResponse.json(data, { status: 201 });

    // Forward the Set-Cookie header
    const setCookie = loginRes.headers.get('set-cookie');
    
    if (setCookie) {
        // const cookieValue = setCookie.split('=')[1].split(';')[0];
        // cookies().set('QJSessionID', cookieValue, options);
      response.headers.set('Set-Cookie', setCookie);
    }

    // Return the user data as a response
    return response;
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
