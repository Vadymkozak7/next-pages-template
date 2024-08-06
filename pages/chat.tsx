import {before} from 'node:test'
import React, {useState, useRef, useEffect} from 'react'

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
  {
    id: 3,
    message: 'Im good,thank you! What about you? Help me build a chat please',
    sender: 'user',
  },
]

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage: ChatMessageType = {
        id: messages.length + 1,
        message: input,
        sender: 'user',
      }
      setMessages((prevMessages) => [...prevMessages, userMessage])
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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'instant'})
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          padding: '2px',
          marginTop: '50px',
          background: 'linear-gradient(1350000deg, blue, pink)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'sticky',
          border: '1px solid grey',
          borderRadius: '10px 10px 0px 0px',
          borderColor: 'hsl(240 5.9% 90%)',
          width: '1120px',
          marginLeft: '60px',
          marginBottom: '0px',
        }}>
        Chat Gpt
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          style={{
            fontSize: '22px',
            // padding: '2px',
            cursor: 'pointer',
            marginLeft: '800px',
            marginBottom: '0px',
          }}
          fill="currentColor"
          className="bi bi-telephone"
          viewBox="0 0 16 16">
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          style={{
            fontSize: '22px',
            textAlign: 'center',
            marginTop: '5px',
            marginLeft: '15px',
            cursor: 'pointer',
          }}
          fill="currentColor"
          className="bi bi-camera-video"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          style={{
            marginLeft: '15px',
            cursor: 'pointer',
          }}
          fill="currentColor"
          className="bi bi-exclamation-circle"
          viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
      </h1>
      <div
        style={{
          display: 'flex',
        }}>
        <div
          style={{
            marginLeft: '60px',
            border: '1px solid',
            borderColor: 'hsl(240 5.9% 90%)',
            height: '400px',
            width: '250px',
            textAlign: 'center',
            borderRadius: ' 0px 0px 0px 10px',
            fontSize: '25px ',
            color: 'black',
            paddingTop: '5pxpx',
          }}>
          Contacts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            style={{
              marginLeft: '20px',
            }}
            fill="currentColor"
            className="bi bi-journal-bookmark-fill"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
            />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
          </svg>
          <hr
            style={{
              borderColor: 'hsl(240 5.9% 90%)',
            }}></hr>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              fontSize: '22px',
              alignItems: 'flex-start',
            }}>
            <li
              style={{
                marginLeft: '7px',
              }}>
              John Wesley
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              Harry Potter
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              Jason Born
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              Michael Jordan
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              LeBron James
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              Cristiano Ronaldo
            </li>
            <li
              style={{
                marginLeft: '7px',
              }}>
              Romario
            </li>
          </div>
        </div>
        <div
          style={{
            borderRight: '1px solid hsl(240 5.9% 90%) ',
            borderColor: 'hsl(240 5.9% 90%)',
            padding: '15px 15px 0px 15px',
            marginTop: '0px',

            overflowY: 'scroll',
            overflowX: 'hidden',
            marginLeft: '0px',
            marginRight: '100px',
            height: '350px',
            maxHeight: '400px',
            width: '900px',
          }}>
          <div style={{margin: '0px'}}>
            {messages.map((m, index) =>
              m.sender === 'AI' ? (
                <div
                  key={index}
                  style={{
                    textAlign: 'left',
                    color: 'black',

                    wordBreak: 'break-all',

                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    // maxHeight: '300px',
                    padding: '5px',

                    borderRadius: '7px',
                    borderColor: 'hsl(240 5.9% 90%)',
                  }}>
                  <div
                    style={{
                      fontSize: '1rem',
                      textAlign: 'left',

                      padding: '5px',

                      maxWidth: '25rem',
                      border: '0px solid',
                      borderRadius: '10px',
                      backgroundColor: 'hsl(240 4.8% 95.9%)',
                    }}>
                    {/* {m.sender} */}
                    {m.message}
                  </div>
                  <img
                    src="https://media.istockphoto.com/id/1213168652/photo/futuristic-robot-artificial-intelligence-concept.jpg?s=1024x1024&w=is&k=20&c=ez780VFDNDyCxx3GX96NJpYRwUlQVvqvlUn48d4AnBI="
                    alt=""
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '0px solid',
                      borderRadius: '50%',
                      marginLeft: '5px',
                    }}
                  />
                </div>
              ) : (
                <div
                  key={index}
                  style={{
                    color: 'black',
                    maxWidth: '25rem',
                    minWidth: '10px',
                    minHeight: '50px',
                    wordBreak: 'break-all',
                    display: 'flex',

                    padding: '10px',

                    borderRadius: '7px',
                    borderColor: 'hsl(240 5.9% 90%)',
                  }}>
                  <img
                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                    alt=""
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '0px solid',
                      borderRadius: '50%',
                      marginRight: '5px',
                    }}
                  />
                  <div
                    style={{
                      fontSize: '1rem',
                      textAlign: 'left',
                      display: 'flex',
                      padding: '5px',
                      // minWidth: '20px',
                      // minHeight: '30px',
                      // maxWidth: '100px',
                      backgroundColor: 'hsl(240 4.8% 95.9%)',
                      border: '0px solid',
                      borderRadius: '10px',
                    }}>
                    {m.message}
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              // marginTop: '50px',
              width: '877px',
              display: 'flex',
              marginBottom: '1px',
              borderBottom: '1px solid',
              borderRight: '1px solid',
              borderRadius: '0px 0px 10px 0px',
              top: '439px',
              right: '100px',
              marginTop: '0',
              borderColor: 'hsl(240 5.9% 90%)',
              padding: '10px',
              position: 'fixed',
              // top: '120px',
              // left: '7px',
              color: 'black',
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              style={{marginTop: '8px', marginLeft: '17px', marginRight: '10px', cursor: 'pointer'}}
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
                width: '72%',

                fontSize: '20px',
                border: '1px solid',
                borderRadius: '1rem',
                borderColor: 'hsl(240 5.9% 90%)',
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
      <div
        style={{
          display: 'flex',
        }}>
        <p
          style={{
            color: 'grey',
            fontSize: '20px',
            marginLeft: '60px',
          }}>
          Built by Vadym Kozak.
        </p>
        <p
          style={{
            color: 'grey',
            fontSize: '20px',
            marginLeft: '630px',
          }}>
          Source code available on{' '}
          <b>
            <a
              style={{
                cursor: 'pointer',
                color: 'grey',
              }}
              href="https://github.com/Vadymkozak7/next-pages-template">
              GitHub
            </a>
          </b>
          .
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
