"use client"

import type React from "react"

import { useState } from "react"
import { PaymentElement, useStripe, useElements, AddressElement } from "@stripe/react-stripe-js"
import { Lock } from "lucide-react"
import styles from "../multi-step-form/multi-step-form.module.css"

interface PaymentFormProps {
  onPaymentSuccess: (paymentMethodId: string) => void
  onPaymentError: (error: string) => void
  isProcessing: boolean
}

export default function PaymentForm({ onPaymentSuccess, onPaymentError, isProcessing }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {},
    })

    if (error) {
      setErrorMessage(error.message)
      onPaymentError(error.message || "An unknown error occurred")
      return
    }

    // If we got a payment method, we're good to go
    if (paymentMethod) {
      onPaymentSuccess(paymentMethod.id)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.stripePaymentContainer}>
        <PaymentElement />

        <div className={styles.addressContainer}>
          <h4 className={styles.addressTitle}>Billing Address</h4>
          <AddressElement options={{ mode: "billing" }} />
        </div>
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.secureNote}>
        <Lock size={14} />
        <span>Your payment information is secure and encrypted with Stripe</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`${styles.formButton} ${styles.nextButton} ${styles.stripeButton}`}
      >
        {isProcessing ? "Processing..." : "Complete Payment"}
      </button>
    </form>
  )
}
