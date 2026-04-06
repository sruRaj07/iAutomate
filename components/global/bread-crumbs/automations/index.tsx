'use client'
import { ChevronRight, Loader2, PencilIcon, Trash2 } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useDeleteAutomation, useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
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

type Props = {
  id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)
  const { edit, enableEdit, inputRef, isPending } = useEditAutomation(id)
  const pathname = usePathname()
  const parentPath = pathname.split('/').slice(0, -1).join('/')
  const { deleteAutomation, isDeleting } = useDeleteAutomation(id, parentPath)

  const { latestVariable } = useMutationDataState(['update-automation'])

  return (
    <div className="dashboard-panel rounded-[1.5rem] w-full p-5 flex items-center gap-4">
      <div className="flex items-center gap-x-3 min-w-0">
        <p className="text-zinc-400 truncate">Automations</p>
        <ChevronRight
          className="shrink-0"
          color="#9B9CA0"
        />
        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <Input
              ref={inputRef}
              placeholder={
                isPending ? latestVariable.variables : 'Add a new name'
              }
              className="bg-transparent h-auto outline-none text-base border-none p-0 text-white"
            />
          ) : (
            <p className="text-white truncate">
              {latestVariable?.variables
                ? latestVariable?.variables.name
                : data?.data?.name}
            </p>
          )}
          {edit ? (
            <></>
          ) : (
            <span
              className="cursor-pointer hover:opacity-75 duration-100 transition shrink-0 mr-4"
              onClick={enableEdit}
            >
              <PencilIcon size={14} />
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-x-5 ml-auto">
        <p className="hidden md:block text-zinc-500 text-sm truncate min-w-0">
          All states are automatically saved
        </p>
        <div className="flex gap-x-3 shrink-0 items-center">
          <p className="text-zinc-400 text-sm truncate min-w-0">
            Changes Saved
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                disabled={isDeleting}
                className="relative overflow-hidden rounded-full border border-red-400/20 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-80"
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
                <AlertDialogTitle>Delete this automation?</AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This permanently removes the automation and every configured step.
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
      </div>
      <ActivateAutomationButton id={id} />
    </div>
  )
}

export default AutomationsBreadCrumb
