"use client"

import Link from "next/link"
import styles from "./header.module.css"

interface HeaderProps {
  scrolled: boolean
  toggleMobileNav: () => void
}

export default function Header({ scrolled, toggleMobileNav }: HeaderProps) {
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>
            CLICK2<span>FITNESS</span>
          </Link>

          <nav className={styles.navDesktop}>
            <ul>
              <li>
                <Link href="#portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="#services">Services</Link>
              </li>
              <li>
                <Link href="#process">Process</Link>
              </li>
              <li>
                <Link href="#pricing">Pricing</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <button className={styles.mobileMenuBtn} onClick={toggleMobileNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  )
}
