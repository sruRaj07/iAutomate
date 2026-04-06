import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,145,77,0.18),transparent_28%),linear-gradient(180deg,#120e0b_0%,#090909_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 marketing-grid opacity-30" />
      <div className="hero-orb absolute left-[-6rem] top-20 h-56 w-56 rounded-full bg-[#ef7d32]/30" />
      <div className="hero-orb hero-orb-delay hero-orb-slow absolute bottom-10 right-[-4rem] h-64 w-64 rounded-full bg-[#ffb36a]/20" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <div className="hidden lg:flex lg:w-1/2 flex-col gap-6 pr-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#ffb36a]">
            imate
          </p>
          <h1 className="text-5xl font-semibold leading-tight text-white">
            Build an Instagram engine that replies, qualifies, and converts while you sleep.
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-300">
            Automate DMs, react to comments, and keep engagement moving with a faster, smarter orange-led control center.
          </p>
        </div>
        <div className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
