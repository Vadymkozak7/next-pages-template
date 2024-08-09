import React from 'react'

const About: React.FC = () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3, 4]))
      controller.close()
    },
  })

  const reader = stream.getReader()
  reader.read().then(({done, value}) => {
    if (done) {
      console.log('Stream finished')
    } else {
      console.log('Stream data:', value)
    }
  })
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
    </div>
  )
}

export default About
