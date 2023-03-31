export interface Props {
  message: string
  side?: 'left' | 'right'
}

export default function Message({ message = '...', side = 'left' }: Props) {
  const isLeft = side === 'left'
  const containerClasses = isLeft
    ? 'eliza-resp-container'
    : 'user-resp-container'

  return (
    <div className={`p-3 rounded-lg ${containerClasses}`}>
      <p className="resp-text">{message}</p>
    </div>
  )
}
