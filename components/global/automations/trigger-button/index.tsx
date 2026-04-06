import React from 'react'
import PopOver from '../../popover'
import { Divide } from 'lucide-react'
import { BlueAddIcon } from '@/icons'

type Props = {
  children: React.ReactNode
  label: string
}

const TriggerButton = ({ children, label }: Props) => {
  return (
    <PopOver
      className="w-[400px]"
      trigger={
        <div className="border-2 border-dashed w-full border-[#ef7d32]/60 hover:opacity-85 cursor-pointer transition duration-100 rounded-2xl flex gap-x-2 justify-center items-center p-5 mt-4 bg-[#20140e]/35">
          <BlueAddIcon />
          <p className="text-[#ffb36a] font-bold">{label}</p>
        </div>
      }
    >
      {children}
    </PopOver>
  )
}

export default TriggerButton
