import React from 'react'
import PaymentButton from '../payment-button'

type Props = {}

const UpgradeCard = (props: Props) => {
  return (
    <div className="dashboard-panel rounded-[1.5rem] p-4 flex flex-col gap-y-3">
      <span className="text-sm text-white">
        Upgrade to {''}
        <span
          className="bg-gradient-to-r 
        from-[#ef7d32] 
        to-[#ffb36a] 
        font-bold 
        bg-clip-text 
        text-transparent"
        >
          Smart AI
        </span>
      </span>
      <p className="text-zinc-400 font-light text-sm">
        Unlock all features <br /> including AI and more
      </p>
      <PaymentButton />
    </div>
  )
}

export default UpgradeCard
