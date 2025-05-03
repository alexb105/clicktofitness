"use client"

import { useFormContext } from "@/context/form-context"
import { CheckCircle, Mail } from "lucide-react"
import styles from "./multi-step-form.module.css"

export default function ConfirmationStep() {
  const { formData, closeForm } = useFormContext()

  const getPackagePrice = () => {
    switch (formData.selectedPackage) {
      case "STARTER":
        return "$1,997"
      case "GROWTH":
        return "$3,997"
      case "ELITE":
        return "$7,997"
      default:
        return "$0"
    }
  }

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationIcon}>
        <CheckCircle size={60} className={styles.checkIcon} />
      </div>

      <h2 className={styles.confirmationTitle}>Payment Successful!</h2>

      <p className={styles.confirmationMessage}>
        Thank you for your order, {formData.contactName}. We've received your payment and will be in touch shortly to
        begin your website project.
      </p>

      <div className={styles.orderDetails}>
        <h3>Order Details</h3>

        <div className={styles.orderItem}>
          <span>Brand:</span>
          <span>{formData.brandName}</span>
        </div>

        <div className={styles.orderItem}>
          <span>Package:</span>
          <span>{formData.selectedPackage}</span>
        </div>

        <div className={styles.orderItem}>
          <span>Amount Paid:</span>
          <span>{getPackagePrice()}</span>
        </div>

        <div className={styles.orderItem}>
          <span>Email:</span>
          <span>{formData.contactEmail}</span>
        </div>
      </div>

      <div className={styles.emailNotification}>
        <Mail size={20} />
        <p>
          A confirmation email has been sent to <strong>{formData.contactEmail}</strong>
        </p>
      </div>

      <p className={styles.nextStepsMessage}>
        Our team will review your order and contact you within 24 hours to schedule an initial consultation.
      </p>

      <button className={`${styles.formButton} ${styles.nextButton}`} onClick={closeForm}>
        Close
      </button>
    </div>
  )
}
