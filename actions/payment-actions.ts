"use server"

import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

type Package = "STARTER" | "GROWTH" | "ELITE"

interface PaymentData {
  selectedPackage: Package
  brandName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  paymentMethodId: string
}

interface OrderDetails {
  orderId: string
  package: Package
  amount: number
  brandName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  status: "new" | "in-progress" | "completed" | "cancelled"
  createdAt: any // Using 'any' for serverTimestamp()
  paymentIntentId: string
  stripeStatus: string
}

const PACKAGE_PRICES = {
  STARTER: 199700, // $1,997.00
  GROWTH: 399700, // $3,997.00
  ELITE: 799700,  // $7,997.00
} as const

export async function processPayment(data: PaymentData) {
  try {
    // Validate input data
    if (!data.selectedPackage || !data.paymentMethodId) {
      console.error('Missing required payment data:', { selectedPackage: !!data.selectedPackage, paymentMethodId: !!data.paymentMethodId })
      throw new Error('Required payment information is missing')
    }

    // Get the amount based on the package
    const amount = PACKAGE_PRICES[data.selectedPackage] || PACKAGE_PRICES.STARTER

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: data.paymentMethodId,
      confirm: true,
      description: `${data.selectedPackage} Package for ${data.brandName}`,
      receipt_email: data.contactEmail,
      payment_method_types: ['card'],
      metadata: {
        package: data.selectedPackage,
        brandName: data.brandName,
        contactName: data.contactName,
        contactPhone: data.contactPhone,
      },
    })

    // If payment is successful, send confirmation emails
    if (paymentIntent.status === "succeeded") {
      const orderDetails: OrderDetails = {
        orderId: paymentIntent.id,
        package: data.selectedPackage,
        amount: amount / 100, // Convert back to dollars
        brandName: data.brandName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        status: "new",
        createdAt: serverTimestamp(),
        paymentIntentId: paymentIntent.id,
        stripeStatus: paymentIntent.status,
      }

      try {
        // Send confirmation emails and save to Firestore
        await Promise.all([
          sendOrderConfirmationEmail(orderDetails),
          sendAdminNotificationEmail(orderDetails),
          addDoc(collection(db, "orders"), orderDetails)
        ])
      } catch (emailError) {
        console.error('Error sending confirmation emails or saving order:', emailError)
        // Continue with success response since payment was successful
      }

      return { success: true, orderId: paymentIntent.id }
    }

    console.error('Payment intent unsuccessful:', paymentIntent.status)
    return { success: false, error: "Payment could not be completed. Please try again." }
  } catch (error) {
    console.error('Payment processing error:', error)
    
    // Handle Stripe errors with user-friendly messages
    if (error instanceof Stripe.errors.StripeError) {
      switch (error.type) {
        case 'StripeCardError':
        case 'StripeInvalidRequestError':
          return { success: false, error: "Your card was declined. Please check your card details and try again." }
        case 'StripeAuthenticationError':
          return { success: false, error: "Payment authentication failed. Please try again." }
        case 'StripeRateLimitError':
          return { success: false, error: "Too many payment attempts. Please wait a moment and try again." }
        default:
          return { success: false, error: "There was a problem processing your payment. Please try again." }
      }
    }
    
    return { success: false, error: "An unexpected error occurred. Please try again later." }
  }
}
