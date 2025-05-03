"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./email-metrics.module.css"

// Mock data for demonstration purposes
const MOCK_EMAIL_DATA = [
  { name: "Mon", sent: 12, opened: 8, clicked: 5 },
  { name: "Tue", sent: 19, opened: 15, clicked: 10 },
  { name: "Wed", sent: 15, opened: 12, clicked: 8 },
  { name: "Thu", sent: 21, opened: 18, clicked: 12 },
  { name: "Fri", sent: 25, opened: 20, clicked: 15 },
  { name: "Sat", sent: 18, opened: 14, clicked: 9 },
  { name: "Sun", sent: 15, opened: 10, clicked: 6 },
]

export default function EmailMetrics() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week")

  const handleTimeframeChange = (newTimeframe: "week" | "month" | "year") => {
    setTimeframe(newTimeframe)
    // In a real app, you would fetch data for the selected timeframe
  }

  return (
    <div className={styles.metricsContainer}>
      <div className={styles.metricsHeader}>
        <h3>Email Performance</h3>
        <div className={styles.timeframeSelector}>
          <button
            className={`${styles.timeframeButton} ${timeframe === "week" ? styles.active : ""}`}
            onClick={() => handleTimeframeChange("week")}
          >
            Week
          </button>
          <button
            className={`${styles.timeframeButton} ${timeframe === "month" ? styles.active : ""}`}
            onClick={() => handleTimeframeChange("month")}
          >
            Month
          </button>
          <button
            className={`${styles.timeframeButton} ${timeframe === "year" ? styles.active : ""}`}
            onClick={() => handleTimeframeChange("year")}
          >
            Year
          </button>
        </div>
      </div>

      <div className={styles.metricsStats}>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>105</div>
          <div className={styles.metricLabel}>Emails Sent</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>87</div>
          <div className={styles.metricLabel}>Emails Opened</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>65</div>
          <div className={styles.metricLabel}>Links Clicked</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricValue}>82.9%</div>
          <div className={styles.metricLabel}>Open Rate</div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={MOCK_EMAIL_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                color: "#fff",
              }}
            />
            <Bar dataKey="sent" stackId="a" fill="#ff0000" name="Sent" />
            <Bar dataKey="opened" stackId="a" fill="#00e1ff" name="Opened" />
            <Bar dataKey="clicked" stackId="a" fill="#ff9500" name="Clicked" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
