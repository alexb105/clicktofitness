"use client"

import { useEffect } from "react"
import styles from "./portfolio.module.css"

export default function Portfolio() {
  useEffect(() => {
    // 3D tilt effect for portfolio items
    const portfolioItems = document.querySelectorAll(`.${styles.portfolioItem}`)

    portfolioItems.forEach((item) => {
      item.addEventListener("mousemove", function (e: MouseEvent) {
        const rect = (this as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const angleX = (y - centerY) / 20
        const angleY = (centerX - x) / 20
        ;(this as HTMLElement).style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`
      })

      item.addEventListener("mouseleave", function () {
        ;(this as HTMLElement).style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
      })
    })
  }, [])

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <div className={styles.portfolioHeader}>
          <h2>
            OUR <span className="gradient-text">PORTFOLIO</span>
          </h2>
          <p>Websites that drive results for fitness professionals</p>
        </div>

        <div className={styles.portfolioGrid}>
          <div className={`${styles.portfolioItem} fade-in`}>
            <img
              src="https://placehold.co/600x800/111111/CCCCCC"
              alt="Fitness Coach Website"
              className={styles.portfolioImage}
            />
            <div className={styles.portfolioOverlay}>
              <span className={styles.portfolioCategory}>Personal Trainer</span>
              <h3 className={styles.portfolioTitle}>FitWithJamie</h3>
              <p>
                Custom website for a fitness influencer with 85K+ Instagram followers. Increased program sales by 210%.
              </p>
              <a href="#" className={styles.portfolioLink}>
                View Project
              </a>
            </div>
          </div>

          <div className={`${styles.portfolioItem} fade-in`}>
            <img
              src="https://placehold.co/600x800/111111/CCCCCC"
              alt="Nutrition Coach Website"
              className={styles.portfolioImage}
            />
            <div className={styles.portfolioOverlay}>
              <span className={styles.portfolioCategory}>Nutrition Coach</span>
              <h3 className={styles.portfolioTitle}>NutritionByAlex</h3>
              <p>E-commerce website for a TikTok nutrition influencer. Generated $25K in the first month.</p>
              <a href="#" className={styles.portfolioLink}>
                View Project
              </a>
            </div>
          </div>

          <div className={`${styles.portfolioItem} fade-in`}>
            <img
              src="https://placehold.co/600x800/111111/CCCCCC"
              alt="Fitness Challenge Website"
              className={styles.portfolioImage}
            />
            <div className={styles.portfolioOverlay}>
              <span className={styles.portfolioCategory}>Fitness Challenge</span>
              <h3 className={styles.portfolioTitle}>30DayShred</h3>
              <p>Landing page for a 30-day fitness challenge. Converted 18% of visitors into paying customers.</p>
              <a href="#" className={styles.portfolioLink}>
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
