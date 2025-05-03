"use client"

import { useEffect } from "react"
import styles from "./decorative-elements.module.css"

export default function DecorativeElements() {
  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const container = document.getElementById("particles-container")
      if (!container) return

      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.classList.add(styles.particle)

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`

        // Random size
        const size = Math.random() * 5 + 2
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random color
        const colors = [
          "rgba(255, 0, 0, 0.3)",
          "rgba(0, 225, 255, 0.3)",
          "rgba(255, 149, 0, 0.3)",
          "rgba(255, 255, 255, 0.3)",
        ]
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

        // Random animation duration
        const duration = Math.random() * 20 + 10
        particle.style.animation = `particleFloat ${duration}s infinite linear`

        // Random delay
        const delay = Math.random() * 10
        particle.style.animationDelay = `${delay}s`

        container.appendChild(particle)
      }
    }

    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      document.querySelectorAll(`.${styles.bgCircle}`).forEach((circle: Element) => {
        const speed = 0.05
        const x = (mouseX - 0.5) * speed * 100
        const y = (mouseY - 0.5) * speed * 100
        const circleElement = circle as HTMLElement
        circleElement.style.transform = `translate(${x}px, ${y}px)`
      })

      document.querySelectorAll(`.${styles.shape}`).forEach((shape: Element) => {
        const speed = 0.02
        const x = (mouseX - 0.5) * speed * 100
        const y = (mouseY - 0.5) * speed * 100
        const shapeElement = shape as HTMLElement
        shapeElement.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`
      })
    }

    createParticles()
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className={`${styles.bgCircle} ${styles.bgCircle1}`}></div>
      <div className={`${styles.bgCircle} ${styles.bgCircle2}`}></div>
      <div className={`${styles.bgCircle} ${styles.bgCircle3}`}></div>

      <div className={`${styles.shape} ${styles.shape1}`}></div>
      <div className={`${styles.shape} ${styles.shape2}`}></div>
      <div className={`${styles.shape} ${styles.shape3}`}></div>

      <div className={styles.particlesContainer} id="particles-container"></div>
    </>
  )
}
