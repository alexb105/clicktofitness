"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./loading-screen.module.css"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Start the loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    // Return cleanup function
    return () => clearTimeout(loadingTimer)
  }, [])

  // Handle animation complete - remove from DOM
  const handleAnimationComplete = () => {
    if (!isLoading) {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {(isLoading || !isVisible) && (
        <motion.div
          className={styles.loadingScreen}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className={styles.loadingContent}>
            <div className={styles.backgroundCircles}>
              <motion.div
                className={`${styles.backgroundCircle} ${styles.circle1}`}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className={`${styles.backgroundCircle} ${styles.circle2}`}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.3,
                }}
              />
              <motion.div
                className={`${styles.backgroundCircle} ${styles.circle3}`}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 0.6,
                }}
              />
            </div>

            <motion.div
              className={styles.logoContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.loadingLogo}>
                CLICK2<span>FITNESS</span>
              </div>
              <div className={styles.loadingTagline}>Premium Website Design</div>
            </motion.div>

            <motion.div className={styles.loadingBarContainer}>
              <motion.div
                className={styles.loadingBar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className={styles.loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span>Creating</span>
              <motion.span
                className={styles.loadingDots}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                ...
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
