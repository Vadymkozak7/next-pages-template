declare module 'openai/resources/index.mjs' {
  export interface ChatCompletionMessageParam {
    role: 'system' | 'user' | 'assistant'
    content: string
  }

  export namespace chat {
    namespace completions {
      function create(params: {
        model: string
        temperature: number
        messages: ChatCompletionMessageParam[]
        stream: boolean
      }): Promise<any>
    }
  }
}
