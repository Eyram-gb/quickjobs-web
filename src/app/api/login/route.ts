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

    console.log(loginRes);

    // Handle the response from the external API
    if (!loginRes.ok) {
      const err: { error: Error } = await loginRes.json();
      throw err;
    }

    const data = await loginRes.json();
    
    const response = NextResponse.json(data, { status: 201 });

    // Forward the Set-Cookie header
    const setCookie = loginRes.headers.get('set-cookie');
    console.log('------SET COOKIE', setCookie)

    const options = {
      maxAge: 20 * 60 * 1000, // would expire in 20minutes
      httpOnly: true, // The cookie is only accessible by the web server
    //   secure: false,
    //   path: "/",
    //   sameSite: "none" as const,
    };
    
    if (setCookie) {
        console.log('------ENTERING SET COOKIE')
        const cookieValue = setCookie.split('=')[1].split(';')[0];
        console.log('------ COOKIE value', cookieValue);
        cookies().set('QJSessionID', cookieValue, options);
    //   response.headers.set('Set-Cookie', setCookie);
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
