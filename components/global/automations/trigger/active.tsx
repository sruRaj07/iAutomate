import { InstagramBlue, PlaneBlue } from '@/icons'

type Props = {
  type: string
  keywords: {
    id: string
    word: string
    automationId: string | null
  }[]
}

const ActiveTrigger = ({ keywords, type }: Props) => {
  return (
    <div className="dashboard-panel-muted p-4 rounded-2xl w-full">
      <div className="flex gap-x-2 items-center">
        {type === 'COMMENT' ? <InstagramBlue /> : <PlaneBlue />}
        <p className="text-lg">
          {type === 'COMMENT'
            ? 'User comments on my post.'
            : 'User sends me a direct message.'}
        </p>
      </div>
      <p className="text-zinc-400">
        {type === 'COMMENT'
          ? 'If the user comments on a video that is setup to listen for keyworks, this automation will fire'
          : 'If the user send your a message that contains a keyword, this automation will fire'}
      </p>
      <div className="flex  ga-2 mt-5 flex-wrap">
        {keywords.map((word) => (
          <div
            key={word.id}
            className="orange-gradient flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
          >
            <p>{word.word}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveTrigger
