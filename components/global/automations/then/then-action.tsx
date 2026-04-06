import { useListener } from '@/hooks/use-automations'
import TriggerButton from '../trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../../subscription-plan'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    prompt,
    reply,
    onPromptChange,
    onReplyChange,
    isPending,
    removeListener,
    isRemoving,
  } = useListener(id)

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === 'SMARTAI' ? (
            <SubscriptionPlan
              key={listener.type}
              type="PRO"
            >
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? 'orange-gradient'
                    : 'dashboard-panel-muted',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? 'orange-gradient'
                  : 'dashboard-panel-muted',
                'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100'
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-y-2"
        >
          <Textarea
            placeholder={
              Listener === 'SMARTAI'
                ? 'Add a prompt that your smart ai can use...'
                : 'Add a message you want send to your customers'
            }
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            className="dashboard-panel-muted outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            value={reply}
            onChange={(event) => onReplyChange(event.target.value)}
            placeholder="Add a reply for comments (Optional)"
            className="dashboard-panel-muted outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="orange-gradient w-full font-medium text-white">
            <Loader state={isPending}>
              {Listener ? 'Save listener' : 'Add listener'}
            </Loader>
          </Button>
          {Listener && (
            <Button
              type="button"
              variant="outline"
              onClick={() => removeListener({})}
              disabled={isRemoving}
              className="border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/15 hover:text-red-100"
            >
              {isRemoving ? 'Removing...' : 'Remove listener'}
            </Button>
          )}
        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction
