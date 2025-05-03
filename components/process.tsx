"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import styles from "./process.module.css"
import { Search, Paintbrush, Code, Rocket, ChevronRight } from "lucide-react"

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: 1,
      title: "DISCOVERY",
      description: "We analyze your brand, audience, and goals to create a strategic plan for your website.",
      icon: <Search className={styles.stepIcon} />,
      details:
        "Our discovery phase includes a comprehensive brand audit, competitor analysis, and target audience research. We'll identify your unique selling points and create a strategic roadmap for your website.",
    },
    {
      number: 2,
      title: "DESIGN",
      description: "Our designers create a custom look that matches your brand and appeals to your target audience.",
      icon: <Paintbrush className={styles.stepIcon} />,
      details:
        "We create wireframes and high-fidelity mockups that align with your brand identity. Our design process focuses on user experience, conversion optimization, and mobile responsiveness.",
    },
    {
      number: 3,
      title: "DEVELOPMENT",
      description: "We build your website with clean code, optimized for speed, conversions, and mobile devices.",
      icon: <Code className={styles.stepIcon} />,
      details:
        "Our development team uses modern frameworks and best practices to build a fast, secure, and scalable website. We implement SEO best practices, analytics tracking, and conversion optimization tools.",
    },
    {
      number: 4,
      title: "LAUNCH",
      description: "Your website goes live with comprehensive testing and optimization for maximum impact.",
      icon: <Rocket className={styles.stepIcon} />,
      details:
        "Before launch, we conduct thorough testing across devices and browsers. After launch, we provide training and support to ensure you can manage your website effectively.",
    },
  ]

  return (
    <section id="process" className={styles.process}>
      <div className="container">
        <div className={styles.processHeader}>
          <h2>
            OUR <span className="gradient-text">PROCESS</span>
          </h2>
          <p>How we create websites that convert followers into clients</p>
        </div>

        <div className={styles.processTimeline}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`${styles.processStep} ${activeStep === step.number ? styles.active : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveStep(step.number)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={styles.stepNumberContainer}>
                <motion.div
                  className={styles.stepNumber}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {step.icon}
                  <span className={styles.numberText}>{step.number}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={styles.connector}>
                    <motion.div
                      className={styles.progressLine}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                )}
              </div>

              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>

                <motion.div
                  className={styles.stepDetails}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeStep === step.number ? "auto" : 0,
                    opacity: activeStep === step.number ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{step.details}</p>
                  <a href="#contact" className={styles.learnMore}>
                    Learn more <ChevronRight size={16} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.processFooter}>
          <motion.div
            className={styles.processStats}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>14</span>
              <span className={styles.statLabel}>Days Average Delivery</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
