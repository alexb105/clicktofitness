"use server"

import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email"

// Initialize Stripe with the secret key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(stripeSecretKey!, {
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

export async function processPayment(data: PaymentData) {
  try {
    // Explicitly define the amount based on the package
    let amount: number

    if (data.selectedPackage === "STARTER") {
      amount = 199700
    } else if (data.selectedPackage === "GROWTH") {
      amount = 399700
    } else if (data.selectedPackage === "ELITE") {
      amount = 799700
    } else {
      // Default fallback
      amount = 199700
    }

    // Create a payment intent directly with the amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method: data.paymentMethodId,
      confirm: true,
      description: `${data.selectedPackage} Package for ${data.brandName}`,
      receipt_email: data.contactEmail,
    })

    // If payment is successful, send confirmation emails
    if (paymentIntent.status === "succeeded") {
      const orderDetails = {
        orderId: paymentIntent.id,
        brandName: data.brandName,
        selectedPackage: data.selectedPackage,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        amount: amount / 100, // Convert back to dollars for display
      }

      // Send confirmation email to customer
      await sendOrderConfirmationEmail(orderDetails)

      // Send notification email to admin
      await sendAdminNotificationEmail(orderDetails)
    }

    // Return the payment intent
    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Payment processing error:", error)

    // Return detailed error information
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
