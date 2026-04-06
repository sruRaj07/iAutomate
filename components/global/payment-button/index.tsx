import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription()
  return (
    <Button
      disabled={isProcessing}
      onClick={onSubscribe}
      className="orange-gradient
     text-white 
     rounded-full 
    font-bold 
    shadow-[0_18px_40px_rgba(239,125,50,0.24)]"
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
      Upgrade
    </Button>
  )
}

export default PaymentButton
