"use client"

import { useEffect } from "react"
import "../styles/animations.css"

export default function Animations() {
  useEffect(() => {
    // Animation on scroll
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.2 },
    )

    animatedElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return null
}
