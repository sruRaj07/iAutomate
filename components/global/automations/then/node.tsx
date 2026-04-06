'use client'
import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { PlaneBlue, SmartAi, Warning } from '@/icons'
import React from 'react'
import PostButton from '../post'
import ThenAction from './then-action'
import { Button } from '@/components/ui/button'
import { useListener } from '@/hooks/use-automations'

type Props = {
  id: string
}

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)
  const { removeListener, isRemoving } = useListener(id)
  const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')

  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <Warning />
        Then...
      </div>
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listener.listener === 'MESSAGE' ? (
            <PlaneBlue />
          ) : (
            <SmartAi />
          )}
          <p className=" text-lg">
            {data.data.listener.listener === 'MESSAGE'
              ? 'Send the user a message.'
              : 'Let Smart AI take over'}
          </p>
        </div>
        <p className="flont-light text-text-secondary">
          {data.data.listener.prompt}
        </p>
        {data.data.listener.commentReply && (
          <p className="text-sm text-zinc-400">
            Comment reply: {data.data.listener.commentReply}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ThenAction id={id} />
        <Button
          type="button"
          variant="outline"
          onClick={() => removeListener({})}
          disabled={isRemoving}
          className="rounded-2xl border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/15 hover:text-red-100"
        >
          {isRemoving ? 'Removing...' : 'Remove Effect'}
        </Button>
      </div>
      {data.data.posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ThenNode
