import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from '@tanstack/react-query'
  import InfoBar from '@/components/global/infobar'
  import Sidebar from '@/components/global/sidebar'
  import React from 'react'
  import {
    PrefetchUserAutomations,
    PrefetchUserProfile,
  } from '@/react-query/prefetch'
  
  type Props = {
    children: React.ReactNode
    params: Promise<{ slug: string }>
  }
  
  const Layout = async ({ children, params }: Props) => {
    const { slug } = await params
  
    const query = new QueryClient()
  
    await PrefetchUserProfile(query)
  
    await PrefetchUserAutomations(query)
  
  return (
      <HydrationBoundary state={dehydrate(query)}>
        <div className="dashboard-shell p-3">
          <Sidebar slug={slug} />
          <div
            className="
        relative z-10
        lg:ml-[250px] 
        lg:pl-10 
        lg:py-5 
        flex 
        flex-col 
        gap-y-6
        overflow-auto
        "
          >
            <InfoBar slug={slug} />
            {children}
          </div>
        </div>
      </HydrationBoundary>
    )
  }
  
  export default Layout
  
