import {ChatCompletionMessageParam} from 'openai/resources/index.mjs'
import {z} from 'zod'
import {openai} from '../openai'
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

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || ''
      res.write(`data: ${JSON.stringify({content})}\n\n`)
    }

    res.end()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    console.error('Произошла ошибка:', errorMessage)
    res.status(500).json({error: errorMessage})
  }
}
