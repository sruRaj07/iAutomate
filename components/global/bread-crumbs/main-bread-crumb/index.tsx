import { PAGE_ICON } from '@/constants/pages'
import React from 'react'

type Props = {
  page: string
  slug?: string
}

const MainBreadCrumb = ({ page, slug }: Props) => {
  return (
    <div className="flex flex-col items-start gap-y-3">
      {page === 'Home' && (
        <div className="flex justify-center w-full">
          <div className="dashboard-panel w-full max-w-2xl rounded-[2rem] py-6 lg:py-8 flex flex-col items-center px-6 text-center">
            <p className="text-zinc-400 text-lg">Welcome back</p>
            <h2 className="capitalize text-4xl font-medium text-white">{slug}!</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Your imate dashboard is live and ready to monitor engagement.
            </p>
          </div>
        </div>
      )}
      <span className="dashboard-panel inline-flex rounded-[1.5rem] px-6 py-5 lg:py-6 pr-10 gap-x-3 items-center">
        {PAGE_ICON[page.toUpperCase()]}
        <h2 className="font-semibold text-3xl capitalize text-white">{page}</h2>
      </span>
    </div>
  )
}

export default MainBreadCrumb
