import {ChatCompletionMessageParam} from 'openai/resources/index.mjs'
import {z} from 'zod'
import openai from 'openai/resources/index.mjs'
import type {NextApiRequest, NextApiResponse} from 'next'

const generateSystemPrompt = (): ChatCompletionMessageParam => {
  const content =
    'You are a chat bot and will interact with a user. Be cordial and reply their messages using markdown syntax if needed. If markdown is a code block, specify the programming language accordingly.'
  return {role: 'system', content}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'})
  }

  const body = await req.body
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

    // const stream = OpenAIStream(response)
    // const dataStreamResponse = streamText.toDataStreamResponse(stream) // Use the recommended method
    // return res.send(dataStreamResponse) // Send the response

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (reader) {
          while (true) {
            const {done, value} = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
          controller.close()
        } else {
          controller.error('ReadableStream not supported')
        }
      },
    })
    return new Response(stream, {
      headers: {'Content-Type': 'application/json'},
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({error})
  }
}
