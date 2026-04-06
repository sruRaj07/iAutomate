import { getStripeClient } from '@/lib/stripe'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ status: 404 })

  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  if (!priceId || !hostUrl || !process.env.STRIPE_CLIENT_SECRET) {
    return NextResponse.json(
      {
        status: 500,
        data: 'Stripe is not configured for this environment',
      },
      { status: 500 }
    )
  }

  const stripe = getStripeClient()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${hostUrl}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${hostUrl}/payment?cancel=true`,
  })
  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
    })
  }

  return NextResponse.json({ status: 400 })
}
