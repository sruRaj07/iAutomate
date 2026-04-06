import Stripe from 'stripe'

export const getStripeClient = () => {
  const secretKey = process.env.STRIPE_CLIENT_SECRET

  if (!secretKey) {
    throw new Error('STRIPE_CLIENT_SECRET is not configured')
  }

  return new Stripe(secretKey)
}
