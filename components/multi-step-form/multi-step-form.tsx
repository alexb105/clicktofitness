"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useFormContext } from "@/context/form-context"
import BrandInfoStep from "./brand-info-step"
import ServiceDetailsStep from "./service-details-step"
import CheckoutStep from "./checkout-step"
import ConfirmationStep from "./confirmation-step"
import styles from "./multi-step-form.module.css"

export default function MultiStepForm() {
  const { isFormOpen, closeForm, currentStep, setCurrentStep } = useFormContext()

  // Prevent scrolling when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isFormOpen])

  // Handle escape key to close form
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [closeForm])

  if (!isFormOpen) return null

  const steps = [
    { title: "Brand Information", component: <BrandInfoStep /> },
    { title: "Service Details", component: <ServiceDetailsStep /> },
    { title: "Checkout", component: <CheckoutStep /> },
    { title: "Confirmation", component: <ConfirmationStep /> },
  ]

  return (
    <AnimatePresence>
      <motion.div
        className={styles.formOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeForm}
      >
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={closeForm}>
            <X size={24} />
          </button>

          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              <span className="gradient-text">{steps[currentStep].title}</span>
            </h2>
            {currentStep < steps.length - 1 && (
              <div className={styles.progressContainer}>
                {steps.slice(0, -1).map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.progressStep} ${index <= currentStep ? styles.active : ""}`}
                    onClick={() => index < currentStep && setCurrentStep(index)}
                  >
                    {index + 1}
                  </div>
                ))}
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressIndicator}
                    style={{ width: `${(currentStep / (steps.length - 2)) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.formContent}>{steps[currentStep].component}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
