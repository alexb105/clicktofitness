"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInAdmin } from "@/lib/firebase"
import styles from "../admin.module.css"
import Image from "next/image"
import { AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signInAdmin(email, password)
      router.push("/admin") // Redirect to admin dashboard after successful login
    } catch (err) {
      setError("Invalid email or password")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <Image
            src="/logo.png"
            alt="Click2Fitness Logo"
            width={180}
            height={40}
            priority
          />
        </div>
        <h1>Admin Login</h1>
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
} 