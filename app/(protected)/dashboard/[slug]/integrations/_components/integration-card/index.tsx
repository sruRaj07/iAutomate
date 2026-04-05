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
    <div className="border-2 border-[#3352CC] rounded-2xl gap-x-5 p-5 flex items-center justify-between">
      {icon}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl"> {title}</h3>
        <p className="text-[#9D9D9D] text-base ">{description}</p>
      </div>
      {integrated && strategy === 'INSTAGRAM' ? (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Connected</p>
            <p className="text-xs text-[#9D9D9D]">
              @{integrated.instagramUsername || 'instagram'}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="rounded-full ring-2 ring-[#3352CC] transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#3352CC]/30"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={integrated.instagramAvatarUrl || undefined}
                    alt={profileLabel}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white">
                    {getInitials(profileLabel)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="border-[#3352CC]/30 bg-[#111111] text-white">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={integrated.instagramAvatarUrl || undefined}
                      alt={profileLabel}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white">
                      {getInitials(profileLabel)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{profileLabel}</p>
                    <p className="text-xs text-[#9D9D9D]">
                      @{integrated.instagramUsername || 'instagram'}
                    </p>
                    <p className="text-xs text-[#9D9D9D]">
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
          className="bg-gradient-to-br text-white rounded-full text-lg from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
        >
          {integrated ? 'Connected' : 'Connect'}
        </Button>
      )}
    </div>
  )
}

export default IntegrationCard
