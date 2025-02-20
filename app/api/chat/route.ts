import { NextResponse } from "next/server";

const BACKEND_URL = "http://127.0.0.1:8080/api/chat"; // Replace with your actual Python backend URL

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    // Send request to Python backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from backend");
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
