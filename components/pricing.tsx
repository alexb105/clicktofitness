"use client"

import { useFormContext } from "@/context/form-context"
import styles from "./pricing.module.css"

export default function Pricing() {
  const { openForm, updateFormData } = useFormContext()

  const handlePackageSelect = (packageName: "STARTER" | "GROWTH" | "ELITE") => {
    updateFormData({ selectedPackage: packageName })
    openForm()
  }

  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className={styles.pricingHeader}>
          <h2>
            INVESTMENT <span className="gradient-text">PLANS</span>
          </h2>
          <p>Transparent pricing for fitness professionals</p>
        </div>

        <div className={styles.pricingGrid}>
          <div className={`${styles.pricingPlan} fade-in`}>
            <h3 className={styles.planName}>STARTER</h3>
            <div className={styles.planPrice}>$1,997</div>
            <p className={styles.planDescription}>
              Perfect for fitness coaches just starting to monetize their following
            </p>

            <ul className={styles.planFeatures}>
              <li>5-Page Custom Website</li>
              <li>Mobile Responsive Design</li>
              <li>Basic Payment Integration</li>
              <li>Contact Form</li>
              <li>Social Media Integration</li>
              <li>Basic SEO Setup</li>
              <li>2 Weeks Delivery</li>
            </ul>

            <button className={`btn ${styles.btnSecondary}`} onClick={() => handlePackageSelect("STARTER")}>
              GET STARTED
            </button>
          </div>

          <div className={`${styles.pricingPlan} ${styles.featured} fade-in`}>
            <h3 className={styles.planName}>GROWTH</h3>
            <div className={styles.planPrice}>$3,997</div>
            <p className={styles.planDescription}>For established coaches with 10K+ followers ready to scale</p>

            <ul className={styles.planFeatures}>
              <li>10-Page Custom Website</li>
              <li>Premium Design & Animations</li>
              <li>Sales Funnel Integration</li>
              <li>Payment Processing</li>
              <li>Email Marketing Setup</li>
              <li>Lead Generation System</li>
              <li>Content Management System</li>
              <li>3 Weeks Delivery</li>
            </ul>

            <button className={`btn ${styles.btnGradient}`} onClick={() => handlePackageSelect("GROWTH")}>
              GET STARTED
            </button>
          </div>

          <div className={`${styles.pricingPlan} fade-in`}>
            <h3 className={styles.planName}>ELITE</h3>
            <div className={styles.planPrice}>$7,997</div>
            <p className={styles.planDescription}>For influencers with 50K+ followers who need a complete solution</p>

            <ul className={styles.planFeatures}>
              <li>Unlimited Pages</li>
              <li>Custom Membership Portal</li>
              <li>Advanced Sales Funnels</li>
              <li>Course/Program Delivery System</li>
              <li>Custom Mobile App Design</li>
              <li>Advanced Analytics Dashboard</li>
              <li>Conversion Rate Optimization</li>
              <li>6 Weeks Delivery</li>
            </ul>

            <button className={`btn ${styles.btnSecondary}`} onClick={() => handlePackageSelect("ELITE")}>
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
