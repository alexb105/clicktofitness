"use client"

import type { ReactNode } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"

interface StripeProviderProps {
  children: ReactNode
  amount: number
}

export default function StripeProvider({ children, amount }: StripeProviderProps) {
  const options = {
    mode: "payment" as const,
    amount: amount * 100, // Convert to cents
    currency: "usd",
    paymentMethodCreation: "manual" as const,
    appearance: {
      theme: "night" as const,
      variables: {
        colorPrimary: "#ff0000",
        colorBackground: "#111111",
        colorText: "#ffffff",
        colorDanger: "#ff0000",
        fontFamily: "Montserrat, sans-serif",
        spacingUnit: "4px",
        borderRadius: "5px",
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
