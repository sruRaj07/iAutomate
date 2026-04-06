'use client'
import { usePaths } from '@/hooks/user-nav'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useDeleteAutomation } from '@/hooks/use-automations'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2, Trash2 } from 'lucide-react'

type Props = {}

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations()

  const { latestVariable } = useMutationDataState(['create-automation'])
  console.log(latestVariable)
  const { pathname } = usePaths()
  
  const optimisticUiData = useMemo(() => {
    if (latestVariable?.variables && data) {
      const exists = data.data.some(
        (automation) => automation.id === latestVariable.variables.id
      )

      if (latestVariable.status === 'pending' && !exists) {
        return { data: [latestVariable.variables, ...data.data] }
      }

      return data
    }
    return data || { data: [] }
  }, [latestVariable, data])

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations </h3>
        <CreateAutomation />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      {optimisticUiData.data!.map((automation) => (
        <AutomationCard
          key={automation.id}
          automation={automation}
          pathname={pathname}
        />
      ))}
    </div>
  )
}

const AutomationCard = ({
  automation,
  pathname,
}: {
  automation: any
  pathname: string
}) => {
  const { deleteAutomation, isDeleting } = useDeleteAutomation(automation.id)

  return (
    <div className="dashboard-panel hover:border-[#ef7d32]/40 transition duration-100 rounded-[1.5rem] p-5 flex gap-4">
      <Link
        href={`${pathname}/${automation.id}`}
        className="flex flex-1 gap-4 min-w-0"
      >
        <div className="flex flex-col flex-1 items-start min-w-0">
          <div>
            <h2 className="text-xl font-semibold text-white truncate">
              {automation.name}
            </h2>
            <p className="text-zinc-400 text-sm font-light mb-2">
              {automation.listener?.listener === 'SMARTAI'
                ? 'AI-powered reply flow'
                : 'Standard reply flow'}
            </p>
          </div>

          {automation.keywords.length > 0 ? (
            <div className="flex gap-x-2 flex-wrap mt-3">
              {automation.keywords.map((keyword: { id: string; word: string }) => (
                <div
                  key={keyword.id}
                  className={cn(
                    'rounded-full px-4 py-1 capitalize border text-sm',
                    'border-[#ef7d32]/30 bg-[#ef7d32]/10 text-[#ffb36a]'
                  )}
                >
                  {keyword.word}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-full border-2 mt-3 border-dashed border-white/20 px-3 py-1">
              <p className="text-sm text-zinc-400">No Keywords</p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between items-end gap-4 shrink-0">
          <p className="capitalize text-sm font-light text-zinc-400 text-right">
            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
            {automation.createdAt.getUTCDate() === 1
              ? `${automation.createdAt.getUTCDate()}st`
              : `${automation.createdAt.getUTCDate()}th`}{' '}
            {automation.createdAt.getUTCFullYear()}
          </p>

          {automation.listener?.listener === 'SMARTAI' ? (
            <GradientButton
              type="BUTTON"
              className="w-full bg-background-80 text-white hover:bg-background-80"
            >
              Smart AI
            </GradientButton>
          ) : (
            <Button className="bg-white/10 hover:bg-white/15 text-white">
              Standard
            </Button>
          )}
        </div>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            disabled={isDeleting}
            className="self-start relative overflow-hidden rounded-full border border-red-400/20 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-80"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-140%] animate-[marquee_1.8s_linear_infinite]" />
            {isDeleting ? (
              <Loader2 className="relative h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="relative h-4 w-4" />
            )}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-white/10 bg-[#120d0a] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete automation?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This will remove the automation, its triggers, keywords, listener, and attached posts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAutomation()}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isDeleting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AutomationList
