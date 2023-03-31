import { useStore } from '@nanostores/react'
import { messages } from '../chatStore'

import Message from './Message'

export default function Chat({ children }: { children: React.ReactNode }) {
  const messagesList = useStore(messages)

  return (
    <div className="container">
      <div>
        <div>
          {messagesList.map(({ text, author }, index) => (
            <Message
              key={index}
              message={text}
              side={author === 'Eliza' ? 'left' : 'right'}
            />
          ))}
        </div>

        {/* form with input + button */}
        {children}
      </div>
    </div>
  )
}
