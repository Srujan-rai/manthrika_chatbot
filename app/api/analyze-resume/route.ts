import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080/scrape";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    console.log("Forwarding file to backend...");

    const backendFormData = new FormData();
    backendFormData.append("file", resume);

    // ✅ Manually extend timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutes

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: backendFormData,
      signal: controller.signal, // 🔥 Ensures long-running requests don't time out
    });

    clearTimeout(timeoutId); // ✅ Prevent abort if request succeeds

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      return NextResponse.json({ error: `Backend Error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("Backend Response:", data);

    return NextResponse.json({ analysis: data.data || "Resume processed successfully!" });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
