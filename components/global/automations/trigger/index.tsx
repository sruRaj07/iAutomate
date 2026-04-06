'use client'
import { useQueryAutomation } from '@/hooks/user-queries'
import ActiveTrigger from './active'
import { Separator } from '@/components/ui/separator'
import ThenAction from '../then/then-action'
import TriggerButton from '../trigger-button'
import { AUTOMATION_TRIGGERS } from '@/constants/automation'
import { useTriggers } from '@/hooks/use-automations'
import { cn } from '@/lib/utils'
import Keywords from './keywords'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { Trash2 } from 'lucide-react'

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending, clearTrigger, isDeleting } =
    useTriggers(id)
  const { data } = useQueryAutomation(id)

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col ga-y-6 items-center">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-6/12 my-4">
              <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                or
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[1].type}
              keywords={data.data.keywords}
            />
          </>
        )}

        <div className="w-full flex flex-col gap-4 mt-4">
          <Keywords id={id} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <TriggerButton label="Edit Trigger">
              <div className="flex flex-col gap-y-2">
                {AUTOMATION_TRIGGERS.map((trigger) => (
                  <div
                    key={trigger.id}
                    onClick={() => onSetTrigger(trigger.type)}
                    className={cn(
                      'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
                      !types?.find((t) => t === trigger.type)
                        ? 'dashboard-panel-muted'
                        : 'orange-gradient font-medium'
                    )}
                  >
                    <div className="flex gap-x-2 items-center">
                      {trigger.icon}
                      <p className="font-bold">{trigger.label}</p>
                    </div>
                    <p className="text-sm font-light">{trigger.description}</p>
                  </div>
                ))}
                <Button
                  onClick={onSaveTrigger}
                  disabled={types?.length === 0}
                  className="orange-gradient font-medium text-white"
                >
                  <Loader state={isPending}>Save Trigger</Loader>
                </Button>
              </div>
            </TriggerButton>

            <Button
              type="button"
              variant="outline"
              onClick={() => clearTrigger({})}
              disabled={isDeleting}
              className="rounded-2xl border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/15 hover:text-red-100"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? 'Removing...' : 'Remove Trigger'}
            </Button>
          </div>
        </div>

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    )
  }
  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
              !types?.find((t) => t === trigger.type)
                ? 'dashboard-panel-muted'
                : 'orange-gradient font-medium'
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className="orange-gradient font-medium text-white"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
}

export default Trigger
