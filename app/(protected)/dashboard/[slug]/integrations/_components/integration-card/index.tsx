'use client'
import {
  onDisconnectIntegration,
  onOAuthInstagram,
} from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useMutationData } from '@/hooks/use-mutation-data'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  strategy: 'INSTAGRAM' | 'CRM'
}

const getInitials = (value?: string | null) =>
  value
    ?.split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'IG'

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  const onInstaOAuth = () => onOAuthInstagram(strategy)
  const { mutate: disconnectMutation, isPending: isDisconnecting } =
    useMutationData(
      ['disconnect-integration'],
      () => onDisconnectIntegration('INSTAGRAM'),
      'user-profile'
    )

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo,
  })

  const integrated = data?.data?.integrations.find(
    (integration) => integration.name === strategy
  )
  const profileLabel =
    integrated?.instagramDisplayName || integrated?.instagramUsername || title

  return (
    <div className="dashboard-panel rounded-[1.75rem] gap-x-5 p-5 flex items-center justify-between">
      {icon}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl text-white"> {title}</h3>
        <p className="text-zinc-400 text-base ">{description}</p>
      </div>
      {integrated && strategy === 'INSTAGRAM' ? (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-[#ffb36a]">Connected</p>
            <p className="text-xs text-zinc-400">
              @{integrated.instagramUsername || 'instagram'}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="rounded-full ring-2 ring-[#ef7d32] transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#ef7d32]/30"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={integrated.instagramAvatarUrl || undefined}
                    alt={profileLabel}
                  />
                  <AvatarFallback className="orange-gradient text-white">
                    {getInitials(profileLabel)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="dashboard-panel border-white/10 bg-[#110d0a]/95 text-white">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={integrated.instagramAvatarUrl || undefined}
                      alt={profileLabel}
                    />
                    <AvatarFallback className="orange-gradient text-white">
                      {getInitials(profileLabel)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{profileLabel}</p>
                    <p className="text-xs text-zinc-400">
                      @{integrated.instagramUsername || 'instagram'}
                    </p>
                    <p className="text-xs text-zinc-400">
                      ID: {integrated.instagramId || 'Unavailable'}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isDisconnecting}
                  onClick={() => disconnectMutation({})}
                  className="w-full border-red-500/40 bg-transparent text-red-300 hover:bg-red-500/10 hover:text-red-200"
                >
                  {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button
          onClick={onInstaOAuth}
          disabled={integrated?.name === strategy}
          className="orange-gradient text-white rounded-full text-lg font-medium hover:opacity-90 transition duration-100 shadow-[0_18px_40px_rgba(239,125,50,0.22)]"
        >
          {integrated ? 'Connected' : 'Connect'}
        </Button>
      )}
    </div>
  )
}

export default IntegrationCard
