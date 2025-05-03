// Add this at the top of the file
if (!process.env.RESEND_API_KEY) {
  console.warn("Warning: RESEND_API_KEY is not set. Email notifications will not be sent.")
}

import { Resend } from "resend"

// Initialize Resend with API key
// In a real application, you would set this in your .env file
const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder"
const resend = new Resend(resendApiKey)

// Email addresses
const fromEmail = process.env.EMAIL_FROM || "notifications@onresend.com"
const adminEmail = process.env.EMAIL_TO || "admin@click2fitness.com" // Change this to your admin email

type Package = "STARTER" | "GROWTH" | "ELITE"

interface OrderDetails {
  orderId: string
  package: Package
  brandName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  amount: number
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('Email not sent: RESEND_API_KEY is not set')
      return
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: orderDetails.contactEmail,
      subject: `Order Confirmation - ${orderDetails.brandName}`,
      html: getOrderConfirmationEmailHtml(orderDetails),
    })

    if (error) {
      console.error('Failed to send order confirmation email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}

export async function sendAdminNotificationEmail(orderDetails: OrderDetails) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('Email not sent: RESEND_API_KEY is not set')
      return
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Order Received - ${orderDetails.brandName}`,
      html: getAdminNotificationEmailHtml(orderDetails),
    })

    if (error) {
      console.error('Failed to send admin notification email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error sending admin notification email:', error)
    throw error
  }
}

function getOrderConfirmationEmailHtml(orderDetails: OrderDetails): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(orderDetails.amount)

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(90deg, #ff0000, #00e1ff);
            padding: 20px;
            text-align: center;
            color: white;
          }
          .content {
            padding: 20px;
          }
          .order-details {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background: linear-gradient(90deg, #ff0000, #00e1ff);
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${orderDetails.contactName},</p>
          
          <p>Thank you for your order! We're excited to start working on your fitness website project.</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Package:</strong> ${orderDetails.package}</p>
            <p><strong>Brand Name:</strong> ${orderDetails.brandName}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
          </div>
          
          <p>What happens next?</p>
          <ol>
            <li>Our team will review your order within 24 hours.</li>
            <li>We'll schedule an initial consultation call to discuss your project in detail.</li>
            <li>We'll create a project timeline and begin the design process.</li>
          </ol>
          
          <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
          
          <a href="https://click2fitness.com/contact" class="button">Contact Us</a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Click2Fitness. All rights reserved.</p>
          <p>123 Fitness Street, Web City, WC 12345</p>
        </div>
      </body>
    </html>
  `
}

function getAdminNotificationEmailHtml(orderDetails: OrderDetails): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(orderDetails.amount)

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(90deg, #ff0000, #00e1ff);
            padding: 20px;
            text-align: center;
            color: white;
          }
          .content {
            padding: 20px;
          }
          .order-details {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
          .button {
            display: inline-block;
            background: linear-gradient(90deg, #ff0000, #00e1ff);
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Order Received</h1>
        </div>
        <div class="content">
          <p>A new order has been received:</p>
          
          <div class="order-details">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Package:</strong> ${orderDetails.package}</p>
            <p><strong>Brand Name:</strong> ${orderDetails.brandName}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Customer Name:</strong> ${orderDetails.contactName}</p>
            <p><strong>Customer Email:</strong> ${orderDetails.contactEmail}</p>
            <p><strong>Customer Phone:</strong> ${orderDetails.contactPhone}</p>
          </div>
          
          <p>Please review this order and contact the customer within 24 hours to schedule an initial consultation.</p>
          
          <a href="https://click2fitness.com/admin/orders" class="button">View Order Details</a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Click2Fitness. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
}
