import { useStore } from '@nanostores/react'
import { messages } from '../chatStore'

import Message from './Message'

export default function Chat({ children }: { children: React.ReactNode }) {
  const messagesList = useStore(messages)

  return (
    <div className="flex flex-col flex-auto h-[42rem] max-h-[42rem]">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-y-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {messagesList.map(({ text, author }, index) => (
                <Message key={index} message={text} author={author} side={author === 'Eliza' ? 'left' : 'right'} />
              ))}
            </div>
          </div>
        </div>

        {/* form with input + button */}
        {children}
      </div>
    </div>
  )
}
