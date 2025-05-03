"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements, AddressElement } from "@stripe/react-stripe-js"
import type { StripePaymentElementChangeEvent, StripeAddressElementChangeEvent } from "@stripe/stripe-js"
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
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false)
  const [isAddressElementReady, setIsAddressElementReady] = useState(false)

  useEffect(() => {
    if (!stripe || !elements) {
      return
    }

    // Check if elements are ready
    const paymentElement = elements.getElement('payment')
    const addressElement = elements.getElement('address')

    if (paymentElement) {
      paymentElement.on('ready', () => {
        setIsPaymentElementReady(true)
      })
    }

    if (addressElement) {
      addressElement.on('ready', () => {
        setIsAddressElementReady(true)
      })
    }
  }, [stripe, elements])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error("Stripe hasn't loaded yet")
      setErrorMessage("Payment system is temporarily unavailable. Please try again in a moment.")
      return
    }

    if (!isPaymentElementReady || !isAddressElementReady) {
      console.error("Payment form elements not ready")
      setErrorMessage("Payment form is still loading. Please wait a moment.")
      return
    }

    try {
      // First, submit the elements to validate the form
      const { error: submitError } = await elements.submit()
      if (submitError) {
        console.error('Elements submission error:', submitError)
        setErrorMessage("Please check your payment details and try again.")
        onPaymentError("Invalid payment details")
        return
      }

      // Get the payment element
      const paymentElement = elements.getElement('payment')
      if (!paymentElement) {
        console.error("Payment element not found in DOM")
        setErrorMessage("Payment system is temporarily unavailable. Please try again in a moment.")
        onPaymentError("Payment element not found")
        return
      }

      // Get the address element
      const addressElement = elements.getElement('address')
      if (!addressElement) {
        console.error("Address element not found in DOM")
        setErrorMessage("Payment system is temporarily unavailable. Please try again in a moment.")
        onPaymentError("Address element not found")
        return
      }

      // Get the address data
      const addressData = await addressElement.getValue()
      if (!addressData.complete) {
        setErrorMessage("Please complete all required billing address fields.")
        onPaymentError("Billing address incomplete")
        return
      }

      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        element: paymentElement,
        params: {
          billing_details: {
            name: addressData.value.name,
            phone: addressData.value.phone,
            address: {
              line1: addressData.value.address.line1,
              line2: addressData.value.address.line2,
              city: addressData.value.address.city,
              state: addressData.value.address.state,
              postal_code: addressData.value.address.postal_code,
              country: addressData.value.address.country,
            },
          },
        },
      })

      if (error) {
        console.error('Payment method creation error:', error)
        setErrorMessage("There was a problem processing your payment. Please check your card details and try again.")
        onPaymentError(error.message || "Payment method creation failed")
        return
      }

      if (paymentMethod) {
        onPaymentSuccess(paymentMethod.id)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setErrorMessage("An unexpected error occurred. Please try again or contact support if the problem persists.")
      onPaymentError("An unexpected error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.stripePaymentContainer}>
        <PaymentElement 
          onReady={() => setIsPaymentElementReady(true)}
          onChange={(event: StripePaymentElementChangeEvent) => {
            if (event.complete === false) {
              console.error('PaymentElement validation error')
              setErrorMessage("Please check your payment details and try again.")
            }
          }}
        />

        <div className={styles.addressContainer}>
          <h4 className={styles.addressTitle}>Billing Address</h4>
          <AddressElement 
            options={{ mode: "billing" }}
            onReady={() => setIsAddressElementReady(true)}
            onChange={(event: StripeAddressElementChangeEvent) => {
              if (event.complete === false) {
                console.error('AddressElement validation error')
                setErrorMessage("Please complete all required billing address fields.")
              }
            }}
          />
        </div>
      </div>

      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

      <div className={styles.secureNote}>
        <Lock size={14} />
        <span>Your payment information is secure and encrypted with Stripe</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing || !isPaymentElementReady || !isAddressElementReady}
        className={`${styles.formButton} ${styles.nextButton} ${styles.stripeButton} ${
          (!stripe || !elements || !isPaymentElementReady || !isAddressElementReady) ? styles.disabledButton : ''
        }`}
      >
        {!stripe || !elements ? "Loading..." : 
         !isPaymentElementReady || !isAddressElementReady ? "Preparing payment form..." :
         isProcessing ? "Processing..." : "Complete Payment"}
      </button>
    </form>
  )
}
