'use client'
import { usePaths } from '@/hooks/user-nav'
import { LogoSmall } from '@/svgs/logo-small'
import React from 'react'
import Items from './items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from './upgrade'

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths()

  return (
    <div
      className="w-[250px] 
    border-[1px]
    fixed 
    left-0 
    lg:inline-block
    border-white/10 
    bg-[linear-gradient(180deg,rgba(239,125,50,0.22)_0%,rgba(22,17,13,0.96)_10%,rgba(9,9,9,0.98)_100%)] 
     hidden 
     bottom-0 
     top-0 
     m-3 
     rounded-3xl 
     overflow-hidden"
    >
      <div
        className="flex flex-col 
      gap-y-5
       w-full 
       h-full 
       p-3 
       bg-[#0e0c0a]/85 
       bg-clip-padding 
       backdrop-filter 
       backdrop--blur__safari 
       backdrop-blur-3xl"
      >
        <div className="flex gap-x-3 items-center p-5 justify-center">
          <LogoSmall />
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ffb36a]">
              imate
            </p>
            <p className="text-xs text-zinc-400">Control center</p>
          </div>
        </div>
        <div className="flex flex-col py-3">
          <Items
            page={page}
            slug={slug}
          />
        </div>
        <div className="px-16">
          <Separator
            orientation="horizontal"
            className="bg-white/10"
          />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-zinc-400">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-zinc-400">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  )
}

export default Sidebar
