import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://manthrika-8942780515.asia-south1.run.app/scrape";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    console.log("Uploading resume to backend:", resume.name, resume.size, resume.type);

    // ✅ No need for Blob conversion, send File directly
    const backendFormData = new FormData();
    backendFormData.append("file", resume); 

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      return NextResponse.json({ error: "Backend Error: " + errorText }, { status: response.status });
    }

    const data = await response.json();
    console.log("Backend Response:", data);

    // ✅ Make sure to return the response in the expected format
    return NextResponse.json({ analysis: data.data || "Resume processed successfully!" });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}

