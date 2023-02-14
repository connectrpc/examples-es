export interface Props {
  author: string
  message: string
  side?: 'left' | 'right'
}

export default function Message({ author = '?', message = '...', side = 'left' }: Props) {
  const firstChar = author.charAt(0)

  const isLeft = side === 'left'
  const containerClasses = isLeft ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13'
  const boxClasses = isLeft ? 'flex-row' : 'justify-start flex-row-reverse'
  const messageClasses = isLeft ? 'ml-3 bg-white' : 'mr-3 bg-indigo-100'

  return (
    <div className={`p-3 rounded-lg ${containerClasses}`}>
      <div className={`flex items-center ${boxClasses}`}>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
          {firstChar}
        </div>
        <div className={`relative text-sm py-2 px-4 shadow rounded-xl ${messageClasses}`}>
          <div>{message}</div>
        </div>
      </div>
    </div>
  )
}
