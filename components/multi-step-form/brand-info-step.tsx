"use client"

import { useState } from "react"
import { useFormContext } from "@/context/form-context"
import styles from "./multi-step-form.module.css"

export default function BrandInfoStep() {
  const { formData, updateFormData, setCurrentStep } = useFormContext()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.brandName.trim()) {
      newErrors.brandName = "Brand name is required"
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required"
    }

    if (!formData.targetAudience.trim()) {
      newErrors.targetAudience = "Target audience is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(1)
    }
  }

  return (
    <div>
      <p className={styles.stepDescription}>
        Tell us about your brand so we can create a website that perfectly represents your business.
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="brandName" className={styles.formLabel}>
          Brand Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="brandName"
          className={styles.formInput}
          value={formData.brandName}
          onChange={(e) => updateFormData({ brandName: e.target.value })}
          placeholder="e.g. FitWithJamie"
        />
        {errors.brandName && <div className={styles.errorMessage}>{errors.brandName}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="industry" className={styles.formLabel}>
          Industry <span className="text-primary">*</span>
        </label>
        <select
          id="industry"
          className={styles.formSelect}
          value={formData.industry}
          onChange={(e) => updateFormData({ industry: e.target.value })}
        >
          <option value="">Select your industry</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Nutrition Coaching">Nutrition Coaching</option>
          <option value="Yoga Instruction">Yoga Instruction</option>
          <option value="CrossFit">CrossFit</option>
          <option value="Pilates">Pilates</option>
          <option value="Fitness Apparel">Fitness Apparel</option>
          <option value="Supplements">Supplements</option>
          <option value="Other">Other</option>
        </select>
        {errors.industry && <div className={styles.errorMessage}>{errors.industry}</div>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="targetAudience" className={styles.formLabel}>
          Target Audience <span className="text-primary">*</span>
        </label>
        <textarea
          id="targetAudience"
          className={styles.formTextarea}
          value={formData.targetAudience}
          onChange={(e) => updateFormData({ targetAudience: e.target.value })}
          placeholder="Describe your ideal clients (age, interests, goals, etc.)"
          rows={3}
        ></textarea>
        {errors.targetAudience && <div className={styles.errorMessage}>{errors.targetAudience}</div>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Social Media Profiles</label>
        <div className={styles.socialInputs}>
          <div className={styles.socialInput}>
            <i className="fab fa-instagram"></i>
            <input
              type="text"
              placeholder="Instagram handle"
              value={formData.socialMediaLinks.instagram || ""}
              onChange={(e) =>
                updateFormData({
                  socialMediaLinks: { ...formData.socialMediaLinks, instagram: e.target.value },
                })
              }
            />
          </div>
          <div className={styles.socialInput}>
            <i className="fab fa-tiktok"></i>
            <input
              type="text"
              placeholder="TikTok handle"
              value={formData.socialMediaLinks.tiktok || ""}
              onChange={(e) =>
                updateFormData({
                  socialMediaLinks: { ...formData.socialMediaLinks, tiktok: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <div></div> {/* Empty div for spacing */}
        <button className={`${styles.formButton} ${styles.nextButton}`} onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  )
}
