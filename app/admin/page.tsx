"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Filter, MoreVertical, CheckCircle, Clock, AlertCircle } from "lucide-react"
import styles from "./admin.module.css"

// Mock data for demonstration purposes
// In a real application, this would come from your database
const MOCK_ORDERS = [
  {
    id: "ord_123456789",
    customerName: "Alex Johnson",
    brandName: "FitWithAlex",
    package: "GROWTH",
    amount: 3997,
    status: "new",
    date: "2023-05-01T10:30:00Z",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "ord_987654321",
    customerName: "Sarah Williams",
    brandName: "NutritionByWilliams",
    package: "ELITE",
    amount: 7997,
    status: "in-progress",
    date: "2023-04-28T14:15:00Z",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "ord_456789123",
    customerName: "Mike Thompson",
    brandName: "MikeStrength",
    package: "STARTER",
    amount: 1997,
    status: "completed",
    date: "2023-04-15T09:45:00Z",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
  },
]

type OrderStatus = "new" | "in-progress" | "completed" | "cancelled"

interface Order {
  id: string
  customerName: string
  brandName: string
  package: string
  amount: number
  status: OrderStatus
  date: string
  email: string
  phone: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication check and data loading
    const checkAuth = async () => {
      // In a real app, you would check if the user is authenticated
      // For demo purposes, we'll just set it to true after a delay
      setTimeout(() => {
        setIsAuthenticated(true)
        setOrders(MOCK_ORDERS)
        setIsLoading(false)
      }, 1000)
    }

    checkAuth()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as OrderStatus | "all")
  }

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleBackToList = () => {
    setSelectedOrder(null)
  }

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    )

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return <AlertCircle size={16} className={styles.statusIconNew} />
      case "in-progress":
        return <Clock size={16} className={styles.statusIconProgress} />
      case "completed":
        return <CheckCircle size={16} className={styles.statusIconCompleted} />
      case "cancelled":
        return <AlertCircle size={16} className={styles.statusIconCancelled} />
    }
  }

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return styles.statusNew
      case "in-progress":
        return styles.statusProgress
      case "completed":
        return styles.statusCompleted
      case "cancelled":
        return styles.statusCancelled
    }
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        <h1>Access Denied</h1>
        <p>You need to be logged in to access the admin dashboard.</p>
        <button className={styles.authButton} onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={() => router.push("/")}>
            <ArrowLeft size={20} />
            <span>Back to Site</span>
          </button>
          <h1 className={styles.adminTitle}>Admin Dashboard</h1>
        </div>
        <div className={styles.adminUser}>
          <div className={styles.userAvatar}>A</div>
          <span className={styles.userName}>Admin</span>
        </div>
      </header>

      {selectedOrder ? (
        <div className={styles.orderDetail}>
          <div className={styles.orderDetailHeader}>
            <button className={styles.backButton} onClick={handleBackToList}>
              <ArrowLeft size={20} />
              <span>Back to Orders</span>
            </button>
            <h2>Order Details</h2>
          </div>

          <div className={styles.orderDetailContent}>
            <div className={styles.orderDetailSection}>
              <h3>Order Information</h3>
              <div className={styles.orderDetailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Order ID</span>
                  <span className={styles.detailValue}>{selectedOrder.id}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date</span>
                  <span className={styles.detailValue}>{formatDate(selectedOrder.date)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Package</span>
                  <span className={styles.detailValue}>{selectedOrder.package}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Amount</span>
                  <span className={styles.detailValue}>{formatCurrency(selectedOrder.amount)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Status</span>
                  <div className={styles.statusWithDropdown}>
                    <span className={`${styles.statusBadge} ${getStatusClass(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                    <select
                      className={styles.statusSelect}
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.orderDetailSection}>
              <h3>Customer Information</h3>
              <div className={styles.orderDetailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Name</span>
                  <span className={styles.detailValue}>{selectedOrder.customerName}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Brand</span>
                  <span className={styles.detailValue}>{selectedOrder.brandName}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>
                    <a href={`mailto:${selectedOrder.email}`}>{selectedOrder.email}</a>
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Phone</span>
                  <span className={styles.detailValue}>
                    <a href={`tel:${selectedOrder.phone}`}>{selectedOrder.phone}</a>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.orderDetailSection}>
              <h3>Project Timeline</h3>
              <div className={styles.timeline}>
                <div className={`${styles.timelineItem} ${styles.timelineCompleted}`}>
                  <div className={styles.timelineIcon}>
                    <CheckCircle size={16} />
                  </div>
                  <div className={styles.timelineContent}>
                    <h4>Order Received</h4>
                    <p>Order was placed and payment was confirmed</p>
                    <span className={styles.timelineDate}>{formatDate(selectedOrder.date)}</span>
                  </div>
                </div>

                <div
                  className={`${styles.timelineItem} ${
                    selectedOrder.status === "in-progress" || selectedOrder.status === "completed"
                      ? styles.timelineCompleted
                      : ""
                  }`}
                >
                  <div className={styles.timelineIcon}>
                    {selectedOrder.status === "in-progress" || selectedOrder.status === "completed" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                  </div>
                  <div className={styles.timelineContent}>
                    <h4>Initial Consultation</h4>
                    <p>Discuss project requirements and timeline</p>
                    {selectedOrder.status === "in-progress" || selectedOrder.status === "completed" ? (
                      <span className={styles.timelineDate}>
                        {formatDate(
                          new Date(new Date(selectedOrder.date).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                        )}
                      </span>
                    ) : (
                      <span className={styles.timelinePending}>Pending</span>
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.timelineItem} ${
                    selectedOrder.status === "completed" ? styles.timelineCompleted : ""
                  }`}
                >
                  <div className={styles.timelineIcon}>
                    {selectedOrder.status === "completed" ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className={styles.timelineContent}>
                    <h4>Project Delivery</h4>
                    <p>Final website delivered to client</p>
                    {selectedOrder.status === "completed" ? (
                      <span className={styles.timelineDate}>
                        {formatDate(
                          new Date(new Date(selectedOrder.date).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                        )}
                      </span>
                    ) : (
                      <span className={styles.timelinePending}>Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.orderDetailActions}>
              <button className={styles.actionButton}>Send Email</button>
              <button className={styles.actionButton}>Schedule Call</button>
              <button className={styles.actionButtonDanger}>Cancel Order</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.dashboardHeader}>
            <h2>Orders</h2>
            <div className={styles.dashboardControls}>
              <div className={styles.searchContainer}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className={styles.filterContainer}>
                <Filter size={18} className={styles.filterIcon} />
                <select className={styles.filterSelect} value={statusFilter} onChange={handleFilterChange}>
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderCell}>Order ID</div>
              <div className={styles.tableHeaderCell}>Customer</div>
              <div className={styles.tableHeaderCell}>Brand</div>
              <div className={styles.tableHeaderCell}>Package</div>
              <div className={styles.tableHeaderCell}>Amount</div>
              <div className={styles.tableHeaderCell}>Date</div>
              <div className={styles.tableHeaderCell}>Status</div>
              <div className={styles.tableHeaderCell}></div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className={styles.noOrders}>
                <p>No orders found matching your criteria.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className={styles.tableRow} onClick={() => handleOrderClick(order)}>
                  <div className={styles.tableCell}>{order.id}</div>
                  <div className={styles.tableCell}>{order.customerName}</div>
                  <div className={styles.tableCell}>{order.brandName}</div>
                  <div className={styles.tableCell}>{order.package}</div>
                  <div className={styles.tableCell}>{formatCurrency(order.amount)}</div>
                  <div className={styles.tableCell}>{formatDate(order.date)}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <button className={styles.actionIcon}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
