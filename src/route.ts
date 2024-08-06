import {OpenAIStream, StreamingTextResponse} from 'ai' // helpers to deal with ai chat streaming
import {NextResponse} from 'next/server' // NextJS response helper
import {ChatCompletionMessageParam} from 'openai/resources/index.mjs' // type definition
import {z} from 'zod' // used for API scheme validation
import openai from 'openai/resources/index.mjs'

const generateSystemPrompt = (): ChatCompletionMessageParam => {
  const content = `You are a chat bot and will interact with a user. Be cordial and reply their messages using markdown syntax if needed. If markdown is a code block, specify the programming language accordingly.`
  return {role: 'system', content}
}

export async function POST(request: Request) {
  const body = await request.json()
  const bodySchema = z.object({
    prompt: z.string(),
  })
  const {prompt} = bodySchema.parse(body)
  const systemPrompt = generateSystemPrompt()
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature: 0.5,
      messages: [systemPrompt, {role: 'user', content: prompt}],
      stream: true,
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.log('error', error)
    return new NextResponse(JSON.stringify({error}), {
      status: 500,
      headers: {'content-type': 'application/json'},
    })
  }
}
