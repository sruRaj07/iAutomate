import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"


type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'One Click connect to Instagram',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'Connect Salesforce',
    description:
      'One Click connect to Salesforce',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]
