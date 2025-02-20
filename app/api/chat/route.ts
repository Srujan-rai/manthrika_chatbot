import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!message) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 })
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `You are Manthrika, an AI career assistant. Respond to the following message from a user seeking career advice:\n\nUser: ${message}`,
      system:
        "You are Manthrika, an AI career assistant. Provide helpful, encouraging, and specific career advice. Be friendly and professional.",
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

