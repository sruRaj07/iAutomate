import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export const Notifications = () => {
  return (
    <Button className="dashboard-panel rounded-full py-6 px-5 bg-white/5 hover:bg-white/10">
      <Bell
        color="#ef7d32"
        fill="#ef7d32"
      />
    </Button>
  )
}
