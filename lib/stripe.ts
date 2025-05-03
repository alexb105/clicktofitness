import { loadStripe } from "@stripe/stripe-js"

// Load the Stripe public key from environment variables
// In a real application, you would set this in your .env.local file
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"

// Create a promise that resolves with the Stripe object
export const stripePromise = loadStripe(stripePublicKey)
