import { AutomationDuoToneBlue, ContactsDuoToneBlue, HomeDuoToneBlue, RocketDuoToneBlue, SettingsDuoToneWhite } from "@/icons"



export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
]

type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoToneBlue />,
    CONTACTS: <ContactsDuoToneBlue />,
    INTEGRATIONS: <RocketDuoToneBlue />,
    SETTINGS: <SettingsDuoToneWhite />,
    HOME: <HomeDuoToneBlue />,
}

export const PLANS = [
    {
      name: "Free Plan",
      price: "0",
      description: "Perfect for getting started with Instagram automation",
      features: ["Basic AI responses", "Limited auto tracking (100/month)", "Standard support", "Basic analytics"],
    },
    {
      name: "Smart AI",
      price: "49",
      description: "Advanced features for serious Instagram growth",
      features: [
        "Advanced AI-powered responses",
        "Unlimited auto tracking",
        "Priority 24/7 support",
        "Advanced analytics dashboard",
        "Custom automation rules",
        "Multi-account management",
      ],
      highlighted: true,
    },
  ]