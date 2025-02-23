import { NextResponse } from "next/server";

const BACKEND_URL =  "https://manthrika-8942780515.asia-south1.run.app/scrape"; // // Replace with actual backend URL


console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const buffer = await resume.arrayBuffer();
    const blob = new Blob([buffer], { type: resume.type });

    const backendFormData = new FormData();
    backendFormData.append("file", blob, resume.name); // Use 'file' as Flask expects

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to process resume");
    }

    const data = await response.json();
    return NextResponse.json({ analysis: data.analysis });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}
