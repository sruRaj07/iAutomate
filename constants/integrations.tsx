import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props ={
    title: string
    icon: React.ReactNode
    description: string
    strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
   {
    title: 'Connect Instagram',
    description: 'grfwhfi fhyg uwehfiuwieu',
    icon: <InstagramDuoToneBlue />,
    strategy : 'INSTAGRAM',
   },
   {
    title: 'Connect Salesforce',
    description: 'grfwhfi fhyg uwehfiuwieu',
    icon: <SalesForceDuoToneBlue />,
    strategy : 'CRM',
   }
]