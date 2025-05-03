"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"
import Services from "@/components/services"
import Process from "@/components/process"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import DecorativeElements from "@/components/decorative-elements"
import { FormProvider } from "@/context/form-context"
import MultiStepForm from "@/components/multi-step-form/multi-step-form"
import OrderNotification from "@/components/admin/order-notification"

export default function Home() {
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin (this is a simplified example)
    // In a real app, you would use authentication and proper role management
    const checkIfAdmin = () => {
      // For demo purposes, we'll just set this to true to show the notification
      setIsAdmin(true)
    }

    checkIfAdmin()

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderScrolled(true)
      } else {
        setHeaderScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive)
    if (!mobileNavActive) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  return (
    <FormProvider>
      <main>
        <LoadingScreen />
        <DecorativeElements />
        <Header scrolled={headerScrolled} toggleMobileNav={toggleMobileNav} />
        <MobileNav
          isActive={mobileNavActive}
          closeMobileNav={() => {
            setMobileNavActive(false)
            document.body.style.overflow = ""
          }}
        />
        {isAdmin && <OrderNotification />}
        <Hero />
        <Portfolio />
        <Services />
        <Process />
        <Pricing />
        <Testimonials />
        <CTA />
        <Footer />
        <MultiStepForm />
      </main>
    </FormProvider>
  )
}
