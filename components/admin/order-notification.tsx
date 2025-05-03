"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import Link from "next/link"
import styles from "./order-notification.module.css"

interface OrderNotificationProps {
  orderId: string
  customerName: string
  packageType: string
  timestamp: string
}

export default function OrderNotification() {
  const [notifications, setNotifications] = useState<OrderNotificationProps[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // This is a mock function to simulate receiving notifications
  // In a real app, you would use a real-time solution like WebSockets or Server-Sent Events
  useEffect(() => {
    // Simulate receiving a notification after payment
    const timer = setTimeout(() => {
      const mockNotification = {
        orderId: "pi_" + Math.random().toString(36).substring(2, 10),
        customerName: "John Doe",
        packageType: "GROWTH",
        timestamp: new Date().toISOString(),
      }

      setNotifications((prev) => [...prev, mockNotification])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const hasUnreadNotifications = notifications.length > 0

  return (
    <div className={styles.notificationContainer}>
      <button className={styles.notificationButton} onClick={toggleNotifications} aria-label="Notifications">
        <Bell size={20} />
        {hasUnreadNotifications && <span className={styles.notificationBadge}>{notifications.length}</span>}
      </button>

      {showNotifications && (
        <div className={styles.notificationPanel}>
          <div className={styles.notificationHeader}>
            <h3>Recent Orders</h3>
          </div>

          <div className={styles.notificationList}>
            {notifications.length === 0 ? (
              <div className={styles.emptyNotification}>No new orders</div>
            ) : (
              notifications.map((notification) => (
                <div key={notification.orderId} className={styles.notificationItem}>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationTitle}>New {notification.packageType} Package Order</div>
                    <div className={styles.notificationDetails}>
                      <span>{notification.customerName}</span>
                      <span className={styles.notificationTime}>{formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.notificationFooter}>
            <Link href="/admin" className={styles.viewAllLink}>
              View Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
