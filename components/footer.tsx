"use client"

import { useEffect } from "react"
import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  useEffect(() => {
    // Set current year in footer
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString()
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h3>CLICK2FITNESS</h3>
            <p>
              We create stunning, high-converting websites for fitness coaches and influencers who want to turn their
              followers into paying clients.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h3>QUICK LINKS</h3>
            <ul className={styles.footerLinks}>
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
          </div>

          <div className={styles.footerColumn}>
            <h3>SERVICES</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="#">Website Design</Link>
              </li>
              <li>
                <Link href="#">Sales Funnels</Link>
              </li>
              <li>
                <Link href="#">Payment Integration</Link>
              </li>
              <li>
                <Link href="#">Lead Generation</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3>CONTACT US</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="mailto:hello@click2fitness.com">hello@click2fitness.com</a>
              </li>
              <li>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <Link href="#">Book a Consultation</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © <span id="current-year"></span> Click2Fitness. All rights reserved.
          </div>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className={styles.socialLink}>
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
