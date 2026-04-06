'use client'

import { PAGE_BREAD_CRUMBS } from '@/constants/pages'
import { usePaths } from '@/hooks/user-nav'
import { Menu } from 'lucide-react'
import React from 'react'
import Sheet from '../sheet'
import Items from '../sidebar/items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { HelpDuoToneWhite } from '@/icons'
import { SubscriptionPlan } from '../subscription-plan'
import UpgradeCard from '../sidebar/upgrade'
import { LogoSmall } from '@/svgs/logo-small'
import CreateAutomation from '../create-automation'
import Search from './search'
import { Notifications } from './notifications'
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb'

type Props = {
  slug: string
}

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths()
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug

  return (
    currentPage && (
      <div className="flex flex-col gap-y-5">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet
              trigger={<Menu />}
              className="lg:hidden"
              side="left"
            >
              <div className="dashboard-shell flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0c0a]/90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
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
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb
          page={page === slug ? 'Home' : page}
          slug={slug}
        />
      </div>
    )
  )
}

export default InfoBar
