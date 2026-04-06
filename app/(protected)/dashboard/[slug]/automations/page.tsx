import AutomationList from '@/components/global/automation-list'
import CreateAutomation from '@/components/global/create-automation'
import { Check } from 'lucide-react'

type Props = {}

const Page = (props: Props) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      <div className="lg:col-span-4">
        <AutomationList />
      </div>
      <div className="lg:col-span-2">
        <div className="dashboard-panel flex flex-col rounded-[1.75rem] gap-y-6 p-6 overflow-hidden">
          <div>
            <h2 className="text-xl text-white">Automations</h2>
            <p className="text-zinc-400">
              Your live automations will show here.
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="dashboard-panel-muted rounded-2xl px-4 py-3 flex items-start justify-between"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium text-white">
                    Direct traffic towards website
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    October 5th 2024
                  </p>
                </div>
                <Check className="text-[#ffb36a]" />
              </div>
            ))}
          </div>
          <CreateAutomation />
        </div>
      </div>
    </div>
  )
}

export default Page
