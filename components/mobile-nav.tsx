"use client"

import Link from "next/link"
import styles from "./mobile-nav.module.css"

interface MobileNavProps {
  isActive: boolean
  closeMobileNav: () => void
}

export default function MobileNav({ isActive, closeMobileNav }: MobileNavProps) {
  return (
    <>
      <div className={`${styles.mobileNav} ${isActive ? styles.active : ""}`}>
        <button className={styles.mobileNavClose} onClick={closeMobileNav}>
          <i className="fas fa-times"></i>
        </button>
        <ul>
          <li>
            <Link href="#portfolio" onClick={closeMobileNav}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="#services" onClick={closeMobileNav}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#process" onClick={closeMobileNav}>
              Process
            </Link>
          </li>
          <li>
            <Link href="#pricing" onClick={closeMobileNav}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={closeMobileNav}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.overlay} ${isActive ? styles.active : ""}`} onClick={closeMobileNav}></div>
    </>
  )
}
