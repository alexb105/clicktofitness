"use server"

import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

interface PaymentData {
  selectedPackage: string
  brandName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  paymentMethodId: string
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
      throw new Error('Missing required payment data')
    }

    // Get the amount based on the package
    const amount = PACKAGE_PRICES[data.selectedPackage as keyof typeof PACKAGE_PRICES] || PACKAGE_PRICES.STARTER

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
      const orderDetails = {
        orderId: paymentIntent.id,
        package: data.selectedPackage,
        amount: amount / 100, // Convert back to dollars
        brandName: data.brandName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      }

      // Send confirmation emails
      await Promise.all([
        sendOrderConfirmationEmail(orderDetails),
        sendAdminNotificationEmail(orderDetails),
      ])

      return { success: true, orderId: paymentIntent.id }
    }

    return { success: false, error: `Payment status: ${paymentIntent.status}` }
  } catch (error) {
    console.error('Payment processing error:', error, JSON.stringify(error));
    return { 
      success: false, 
      error: error instanceof Error ? error.message : JSON.stringify(error) 
    }
  }
}
