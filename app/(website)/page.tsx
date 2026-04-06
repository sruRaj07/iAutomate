import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Check,
  MessageSquareText,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const profileImages = [
  { src: '/images/a1.jpg', alt: 'Inbox automation preview' },
  { src: '/images/a2.jpg', alt: 'Audience engagement preview' },
  { src: '/images/a3.jpg', alt: 'Creator workflow preview' },
  { src: '/images/a4.jpg', alt: 'Analytics dashboard preview' },
]

const featureCards = [
  {
    title: 'Smart Replies',
    description:
      'Trigger message flows from keywords, comments, and account activity without losing your brand tone.',
    icon: <Bot className="h-5 w-5 text-[#ef7d32]" />,
  },
  {
    title: 'DM Conversion Paths',
    description:
      'Turn engagement into guided conversations that move people from curiosity to action.',
    icon: <MessageSquareText className="h-5 w-5 text-[#ef7d32]" />,
  },
  {
    title: 'Actionable Insights',
    description:
      'See which posts pull attention, which workflows fire, and where your best engagement is coming from.',
    icon: <ChartNoAxesCombined className="h-5 w-5 text-[#ef7d32]" />,
  },
]

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'A clean launchpad for creators testing Instagram automation.',
    features: [
      'Keyword-based auto replies',
      'Basic engagement tracking',
      'Single connected account',
      'Starter analytics dashboard',
    ],
  },
  {
    name: 'imate Smart AI',
    price: '49',
    description: 'Advanced automation for brands that want fast engagement and richer insight.',
    features: [
      'AI-driven responses',
      'Unlimited automation activity',
      'Priority support',
      'Post-level analytics',
      'Comment + DM workflow orchestration',
      'Performance monitoring',
    ],
    highlighted: true,
  },
]

const stats = [
  { label: 'Auto-replies orchestrated', value: '24/7' },
  { label: 'Workflow setup time', value: '<10 min' },
  { label: 'Insights surface', value: 'Posts + DMs' },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,145,77,0.18),transparent_24%),linear-gradient(180deg,#120d0a_0%,#090909_45%,#0b0b0b_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 marketing-grid opacity-30" />
      <div className="hero-orb absolute left-[-6rem] top-24 h-72 w-72 rounded-full bg-[#ef7d32]/30" />
      <div className="hero-orb hero-orb-delay absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-[#ff9d4d]/20" />
      <div className="hero-orb hero-orb-slow absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#ffb36a]/12" />

      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="pulse-border flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ff9d4d]/40 bg-[#1a120d]">
              <span className="text-lg font-semibold text-[#ff9d4d]">i</span>
            </div>
            <span className="text-xl font-semibold tracking-[0.12em] text-white lowercase">
              imate
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-zinc-300 transition hover:text-white">
              Features
            </Link>
            <Link href="#analytics" className="text-sm text-zinc-300 transition hover:text-white">
              Analytics
            </Link>
            <Link href="#pricing" className="text-sm text-zinc-300 transition hover:text-white">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="hidden text-zinc-300 hover:bg-white/5 hover:text-white md:inline-flex"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[#ef7d32] px-5 text-white hover:bg-[#db6b22]"
            >
              <Link href="/sign-up">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Badge className="reveal-up border border-[#ff9d4d]/25 bg-[#ff9d4d]/10 px-4 py-1 text-[#ffb36a] hover:bg-[#ff9d4d]/10">
              Instagram automation, reimagined for modern growth
            </Badge>

            <div className="space-y-5">
              <h1 className="reveal-up reveal-delay-1 max-w-4xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                imate turns comments and DMs into a smooth, always-on conversion loop.
              </h1>
              <p className="reveal-up reveal-delay-2 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
                Build automations that feel human, monitor what content creates momentum, and run your Instagram presence from one clean orange-powered command center.
              </p>
            </div>

            <div className="reveal-up reveal-delay-3 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#ef7d32] px-7 text-white hover:bg-[#db6b22]"
              >
                <Link href="/sign-up">
                  Launch with imate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 px-7 text-white hover:bg-white/10"
              >
                <Link href="/dashboard">Explore Dashboard</Link>
              </Button>
            </div>

            <div className="reveal-up reveal-delay-4 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up reveal-delay-3 relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#120f0d]/80 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm text-zinc-400">Live automation signal</p>
                  <p className="text-lg font-semibold text-white">Reply velocity is up 38%</p>
                </div>
                <div className="rounded-full bg-[#ef7d32]/15 p-3 text-[#ffb36a]">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {profileImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 ${
                      index === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {index === 0 ? 'Automation cockpit' : index === 1 ? 'DM intelligence' : index === 2 ? 'Comment routing' : 'Insight monitor'}
                        </p>
                        <p className="text-xs text-zinc-300">
                          {index === 0
                            ? 'Monitor workflows and account activity in one place'
                            : 'Fast, smooth, and built for creators'}
                        </p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white">
                        Live
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 py-3">
          <div className="marquee-track flex min-w-max items-center gap-10 px-6 text-sm uppercase tracking-[0.35em] text-zinc-400">
            {Array.from({ length: 2 }).flatMap((_, pass) =>
              ['Instant Replies', 'Smart Analytics', 'Orange Motion UI', 'Instagram Automation', 'Performance Tracking'].map((item) => (
                <span key={`${pass}-${item}`} className="whitespace-nowrap">
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#ffb36a]">
            Feature Layer
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            A sharper visual system for a faster Instagram growth workflow.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <Card
              key={feature.title}
              className={`reveal-up border-white/10 bg-white/5 backdrop-blur-xl reveal-delay-${Math.min(index + 1, 4)}`}
            >
              <CardContent className="space-y-5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ef7d32]/12">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="leading-7 text-zinc-300">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="analytics"
        className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#ffb36a]">
            Analytics First
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white">
            Make account posts and engagement understandable in seconds.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">
            imate surfaces account activity, automated replies, and post engagement in one dashboard so users can instantly spot what is performing and what needs attention.
          </p>
          <div className="mt-8 space-y-4">
            {[
              'Track engagement across recent posts without digging through Instagram manually',
              'Compare automated replies against real audience activity month by month',
              'Highlight top-performing content and the automation coverage behind it',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#ef7d32]/15 p-1.5">
                  <Check className="h-3.5 w-3.5 text-[#ffb36a]" />
                </div>
                <p className="text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#16110d] p-6">
            <p className="text-sm text-zinc-400">Audience Pulse</p>
            <p className="mt-4 text-5xl font-semibold text-white">+38%</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Better engagement visibility with clearer dashboards, richer post summaries, and smoother workflow feedback.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#16110d] p-6">
            <p className="text-sm text-zinc-400">Workflow Coverage</p>
            <p className="mt-4 text-5xl font-semibold text-white">24/7</p>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Automations stay in sync with DMs and comments while keeping the visual experience premium and modern.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#16110d] p-6 sm:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Design Direction</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Warm orange signals, layered glass panels, and motion that feels intentional.
                </h3>
              </div>
              <div className="hidden h-20 w-20 rounded-full bg-[radial-gradient(circle,#ef7d32_0%,rgba(239,125,50,0.12)_65%,transparent_100%)] md:block" />
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#ffb36a]">
            Pricing
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Choose the imate plan that matches your Instagram momentum.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl ${
                plan.highlighted
                  ? 'shadow-[0_20px_60px_rgba(239,125,50,0.18)] ring-1 ring-[#ef7d32]/30'
                  : ''
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-white">{plan.name}</p>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-300">
                      {plan.description}
                    </p>
                  </div>
                  {plan.highlighted && (
                    <Badge className="bg-[#ef7d32] text-white hover:bg-[#ef7d32]">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-semibold text-white">${plan.price}</span>
                  <span className="pb-1 text-zinc-400">/month</span>
                </div>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="rounded-full bg-[#ef7d32]/12 p-1.5">
                        <Check className="h-3.5 w-3.5 text-[#ffb36a]" />
                      </div>
                      <p className="text-sm text-zinc-200">{feature}</p>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className={`mt-10 w-full rounded-full ${
                    plan.highlighted
                      ? 'bg-[#ef7d32] text-white hover:bg-[#db6b22]'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
