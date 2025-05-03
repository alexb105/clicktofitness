"use client"

import { useState } from "react"
import { useFormContext } from "@/context/form-context"
import { processPayment } from "@/actions/payment-actions"
import StripeProvider from "@/components/stripe/stripe-provider"
import PaymentForm from "@/components/stripe/payment-form"
import styles from "./multi-step-form.module.css"

export default function CheckoutStep() {
  const { formData, updateFormData, setCurrentStep } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"contact" | "payment">("contact")

  const validateContactInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Name is required"
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email is invalid"
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Phone number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinueToPayment = () => {
    if (validateContactInfo()) {
      setPaymentStep("payment")
    }
  }

  const handleBack = () => {
    if (paymentStep === "payment") {
      setPaymentStep("contact")
    } else {
      setCurrentStep(1)
    }
  }

  const handlePaymentSuccess = async (paymentMethodId: string) => {
    setIsProcessing(true)

    try {
      // Ensure we have valid data before proceeding
      const packageName = formData.selectedPackage || "STARTER"
      const brandName = formData.brandName || "Unnamed Brand"
      const contactName = formData.contactName || "Unknown"
      const contactEmail = formData.contactEmail || "unknown@example.com"
      const contactPhone = formData.contactPhone || "000-000-0000"

      const result = await processPayment({
        selectedPackage: packageName,
        brandName: brandName,
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        paymentMethodId,
      })

      if (result.success) {
        // Move to confirmation step
        setCurrentStep(3)
      } else {
        // Handle payment error
        setErrors({ payment: result.error || "Payment processing failed" })
      }
    } catch (error) {
      setErrors({ payment: "An unexpected error occurred" })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentError = (error: string) => {
    setErrors({ payment: error })
    setIsProcessing(false)
  }

  const getPackagePrice = () => {
    switch (formData.selectedPackage) {
      case "STARTER":
        return 1997
      case "GROWTH":
        return 3997
      case "ELITE":
        return 7997
      default:
        return 1997 // Default to STARTER price
    }
  }

  return (
    <div>
      <p className={styles.stepDescription}>Complete your order by providing your contact and payment information.</p>

      {paymentStep === "contact" ? (
        <div className={styles.contactInfoContainer}>
          <h3>Contact Information</h3>

          <div className={styles.formGroup}>
            <label htmlFor="contactName" className={styles.formLabel}>
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="contactName"
              className={styles.formInput}
              value={formData.contactName}
              onChange={(e) => updateFormData({ contactName: e.target.value })}
              placeholder="John Doe"
            />
            {errors.contactName && <div className={styles.errorMessage}>{errors.contactName}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactEmail" className={styles.formLabel}>
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              className={styles.formInput}
              value={formData.contactEmail}
              onChange={(e) => updateFormData({ contactEmail: e.target.value })}
              placeholder="john@example.com"
            />
            {errors.contactEmail && <div className={styles.errorMessage}>{errors.contactEmail}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactPhone" className={styles.formLabel}>
              Phone <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="contactPhone"
              className={styles.formInput}
              value={formData.contactPhone}
              onChange={(e) => updateFormData({ contactPhone: e.target.value })}
              placeholder="(123) 456-7890"
            />
            {errors.contactPhone && <div className={styles.errorMessage}>{errors.contactPhone}</div>}
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryItem}>
              <span>{formData.selectedPackage} Package</span>
              <span>${getPackagePrice().toLocaleString()}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${getPackagePrice().toLocaleString()}</span>
            </div>
          </div>

          <div className={styles.formActions}>
            <button className={`${styles.formButton} ${styles.backButton}`} onClick={handleBack}>
              Back
            </button>
            <button className={`${styles.formButton} ${styles.nextButton}`} onClick={handleContinueToPayment}>
              Continue to Payment
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.paymentContainer}>
          <div className={styles.orderSummarySmall}>
            <div className={styles.summaryItem}>
              <span>{formData.selectedPackage} Package</span>
              <span>${getPackagePrice().toLocaleString()}</span>
            </div>
          </div>

          <StripeProvider>
            <PaymentForm
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              isProcessing={isProcessing}
            />
          </StripeProvider>

          {errors.payment && <div className={styles.errorMessage}>{errors.payment}</div>}

          <button
            className={`${styles.formButton} ${styles.backButton} ${styles.backToContactButton}`}
            onClick={handleBack}
          >
            Back to Contact Info
          </button>
        </div>
      )}
    </div>
  )
}
