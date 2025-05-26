import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are a knowledgeable Catholic AI assistant. You provide accurate information about Catholic doctrine, theology, scripture, saints, traditions, and practices. Always respond with respect for the Catholic faith and its teachings. When discussing complex theological topics, reference relevant Church documents, scripture, or teachings of the Church Fathers when appropriate.`,
    messages,
  })

  return result.toDataStreamResponse()
}
