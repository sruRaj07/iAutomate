'use client'
import React from 'react'

type Props = {
  replies: number
  dmReplies: number
  commentReplies: number
  totalEngagement: number
  averageEngagementPerPost: number
}

const MetricsCard = ({
  replies,
  dmReplies,
  commentReplies,
  totalEngagement,
  averageEngagementPerPost,
}: Props) => {
  const cards = [
    {
      title: 'Auto Replies',
      subtitle: 'Across DMs and comments',
      value: replies,
      detail: `${dmReplies} DMs and ${commentReplies} comments handled`,
    },
    {
      title: 'Engagement',
      subtitle: 'Across recent Instagram posts',
      value: totalEngagement,
      detail: `${averageEngagementPerPost} average interactions per post`,
    },
  ]

  return (
    <div className="h-full flex lg:flex-row flex-col gap-5 items-end">
      {cards.map((card) => (
        <div
          key={card.title}
          className="p-5 border-[1px] border-in-active/50 bg-background-90/40 flex flex-col gap-y-20 rounded-xl w-full lg:w-6/12"
        >
          <div className="flex flex-col">
            <h2 className="text-3xl text-white font-bold">{card.title}</h2>
            <p className="text-sm text-text-secondary">{card.subtitle}</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white">{card.value}</h3>
            <p className="text-sm text-text-secondary">{card.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricsCard
