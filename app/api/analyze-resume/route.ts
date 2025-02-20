import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const formData = await req.formData()
  const resume = formData.get("resume") as File

  if (!resume) {
    return NextResponse.json({ error: "No resume file provided" }, { status: 400 })
  }

  // Read the file content
  const fileContent = await resume.text()

  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `Analyze the following resume and provide a brief summary of the candidate's qualifications, skills, and experience. Also, suggest areas for improvement:\n\n${fileContent}`,
      system:
        "You are Manthrika, an AI career assistant specializing in resume analysis. Provide concise, helpful feedback on resumes.",
    })

    return NextResponse.json({ analysis: text })
  } catch (error) {
    console.error("Error analyzing resume:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}

