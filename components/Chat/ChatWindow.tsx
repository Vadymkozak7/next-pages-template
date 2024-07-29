import {Center} from '@mantine/core'
import React, {useState} from 'react'

interface ChatMessageType {
  id: number
  message: string
  sender: 'AI' | 'user'
}

const initialMessages: ChatMessageType[] = [
  {
    id: 1,
    message: 'Hello',
    sender: 'user',
  },
  {
    id: 2,
    message: 'How you doing?',
    sender: 'AI',
  },
]

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages)
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessageType = {id: messages.length + 1, message: input, sender: 'user'}
      setMessages([...messages, userMessage])
      setInput('')

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.sender === 'AI' ? 'assistant' : 'user',
              content: m.message,
            })),
          }),
        })

        const data = await response.json()

        if (data.message) {
          const aiMessage: ChatMessageType = {
            id: Date.now(),
            message: data.message.content,
            sender: 'AI',
          }
          setMessages((prevMessages) => [...prevMessages, aiMessage])
        }
      } catch (error) {
        console.error('Error sending message to OpenAI:', error)
      }
    }
  }

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '0',
          marginTop: '10px',
          marginLeft: '250px',
          marginRight: '10px',
          border: '2px solid',
          borderRadius: '1rem 1rem 0rem 0rem',
          // position: 'fixed',
          backgroundColor: '#7f7f7f',
          color: '#4b0152',
        }}>
        Chat
      </h1>
      <div
        // className="flex h-full flex-col"
        style={{
          border: '2px solid #474747 ',
          borderRadius: '0rem 0rem 1rem 1rem ',
          padding: '20px',
          marginTop: '0px',
          overflow: 'scroll',
          overflowX: 'hidden',
          marginLeft: '250px',
          marginRight: '10px',
          height: '500px',
          maxHeight: '500px',
        }}>
        <div style={{margin: '0px'}}>
          {messages.map((m, index) =>
            m.sender === 'AI' ? (
              <div
                key={index}
                style={{
                  textAlign: 'left',
                  color: 'green',
                  maxWidth: '25rem',

                  wordBreak: 'break-all',
                  marginLeft: '550px',
                  maxHeight: '300px',
                  padding: '5px',
                  // margin: '1rem',
                  backgroundColor: '#474747',
                  borderRadius: '7px',
                }}>
                <div style={{fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'right'}}>
                  {m.sender}
                </div>
                <div>{m.message}</div>
              </div>
            ) : (
              <div
                key={index}
                style={{
                  textAlign: 'left',
                  color: 'red',

                  maxWidth: '25rem',
                  wordBreak: 'break-all',
                  maxHeight: '300px',
                  padding: '5px',
                  margin: '1rem',
                  backgroundColor: '#474747',
                  borderRadius: '7px',
                }}>
                <div style={{fontWeight: 'bold', fontSize: '1.5rem'}}>{m.sender}</div>
                <div>{m.message}</div>
              </div>
            )
          )}
        </div>
        <div
          style={{
            marginTop: '120px',
            marginBottom: '0',
            marginLeft: '-22px',
            marginRight: '10px',
            border: '2px solid #474747 ',
            borderRadius: '0rem 0rem 1rem 1rem ',
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            width: '1020px',
            top: '70%',
            backgroundColor: '#7f7f7f',
            color: '#4b0152',
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            style={{marginTop: '8px', marginRight: '10px', cursor: 'pointer'}}
            fill="currentColor"
            className="bi bi-mic"
            viewBox="0 0 16 16">
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            style={{marginTop: '8px', marginRight: '10px', cursor: 'pointer'}}
            fill="currentColor"
            className="bi bi-file-earmark-image"
            viewBox="0 0 16 16">
            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            style={{marginTop: '8px', marginRight: '30px', cursor: 'pointer'}}
            fill="currentColor"
            className="bi bi-emoji-smile"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
          </svg>

          <input
            type="text"
            placeholder="Aa"
            style={{
              width: '50%',
              border: '1px solid',
              borderRadius: '1rem',
              borderColor: 'grey',
              padding: '5px',
            }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            onClick={sendMessage}
            style={{
              marginTop: '8px',
              marginLeft: '6px',
              marginBottom: '7px',
              cursor: 'pointer',
              transform: 'rotate(45deg)',
            }}
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
export default ChatWindow
