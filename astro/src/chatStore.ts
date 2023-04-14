import { atom } from 'nanostores'

export type Message = {
  text: string
  author: string
}

const initialValue: Message[] = [
  {
    text: 'What is your name?',
    author: 'Eliza',
  },
]

const messages = atom(initialValue)

const addMessage = function addMessage(message: Message) {
  messages.set([...messages.get(), message])
}

export { messages, addMessage }
