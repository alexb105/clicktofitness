"use client"

import { useState } from "react"
import { useFormContext } from "@/context/form-context"
import styles from "./multi-step-form.module.css"

export default function ServiceDetailsStep() {
  const { formData, updateFormData, setCurrentStep } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.serviceDescription.trim()) {
      newErrors.serviceDescription = "Please describe what you want to sell"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(0)
  }

  return (
    <div>
      <p className={styles.stepDescription}>
        Tell us about the services or products you want to sell through your website.
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="serviceDescription" className={styles.formLabel}>
          What do you want to sell? <span className="text-primary">*</span>
        </label>
        <textarea
          id="serviceDescription"
          className={styles.formTextarea}
          value={formData.serviceDescription}
          onChange={(e) => updateFormData({ serviceDescription: e.target.value })}
          placeholder="Describe your services, products, or programs (e.g., online coaching, meal plans, fitness programs, etc.)"
          rows={5}
        ></textarea>
        {errors.serviceDescription && <div className={styles.errorMessage}>{errors.serviceDescription}</div>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Select Your Package</label>
        <div className={styles.packageSelector}>
          <div
            className={`${styles.packageOption} ${formData.selectedPackage === "STARTER" ? styles.selected : ""}`}
            onClick={() => {
              updateFormData({ selectedPackage: "STARTER" })
              console.log("Package selected:", "STARTER")
            }}
          >
            <h3>STARTER</h3>
            <div className={styles.packagePrice}>$1,997</div>
            <ul>
              <li>5-Page Custom Website</li>
              <li>Mobile Responsive Design</li>
              <li>Basic Payment Integration</li>
              <li>2 Weeks Delivery</li>
            </ul>
          </div>

          <div
            className={`${styles.packageOption} ${formData.selectedPackage === "GROWTH" ? styles.selected : ""}`}
            onClick={() => {
              updateFormData({ selectedPackage: "GROWTH" })
              console.log("Package selected:", "GROWTH")
            }}
          >
            <div className={styles.popularBadge}>POPULAR</div>
            <h3>GROWTH</h3>
            <div className={styles.packagePrice}>$3,997</div>
            <ul>
              <li>10-Page Custom Website</li>
              <li>Premium Design & Animations</li>
              <li>Sales Funnel Integration</li>
              <li>3 Weeks Delivery</li>
            </ul>
          </div>

          <div
            className={`${styles.packageOption} ${formData.selectedPackage === "ELITE" ? styles.selected : ""}`}
            onClick={() => {
              updateFormData({ selectedPackage: "ELITE" })
              console.log("Package selected:", "ELITE")
            }}
          >
            <h3>ELITE</h3>
            <div className={styles.packagePrice}>$7,997</div>
            <ul>
              <li>Unlimited Pages</li>
              <li>Custom Membership Portal</li>
              <li>Advanced Sales Funnels</li>
              <li>6 Weeks Delivery</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button className={`${styles.formButton} ${styles.backButton}`} onClick={handleBack}>
          Back
        </button>
        <button className={`${styles.formButton} ${styles.nextButton}`} onClick={handleNext}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
