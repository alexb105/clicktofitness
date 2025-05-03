"use client"

import { useFormContext } from "@/context/form-context"
import styles from "./cta.module.css"

export default function CTA() {
  const { openForm } = useFormContext()

  return (
    <section id="contact" className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>
            READY TO <span className="gradient-text">GROW</span> YOUR FITNESS BUSINESS?
          </h2>
          <p>
            Let's create a website that converts your followers into paying clients. Book a free consultation call
            today.
          </p>

          <div className={styles.ctaButtons}>
            <button className={`btn ${styles.btnGradient}`} onClick={openForm}>
              GET STARTED NOW
            </button>
            <a href="#portfolio" className={`btn ${styles.btnSecondary}`}>
              VIEW OUR PORTFOLIO
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
