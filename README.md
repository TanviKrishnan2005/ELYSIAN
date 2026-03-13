# ELYSIAN E-Commerce Web Application

## Overview

This project is a full-stack e-commerce web application that allows users to browse products, add items to a shopping cart, and complete secure online payments.

The application demonstrates modern frontend development practices using React and Redux along with secure payment processing using Stripe.

---

## Features

* Product listing interface
* Add to cart functionality
* Cart management
* Secure checkout
* Stripe payment integration
* Order creation after successful payment
* Responsive UI

---

## Tech Stack

### Frontend

* React
* Redux
* CSS / Tailwind (or your styling choice)

### Backend

* Node.js
* Express.js

### Payment Processing

* Stripe API

---

## Payment Flow

1. User adds products to the cart.
2. User proceeds to checkout.
3. Frontend sends order details to backend.
4. Backend creates a Stripe PaymentIntent.
5. Stripe returns a client secret.
6. Frontend confirms the payment using Stripe Elements.
7. On successful payment, the order is created.

---

## Project Structure

Frontend

* components/
* pages/
* redux/
* services/

Backend

* routes/
* controllers/
* payment integration

---

## Future Improvements

* User authentication
* Order history
* Admin dashboard
* Product reviews
* Inventory management
* Email receipts for orders

---

## Learning Outcomes

This project helped me understand:

* React component architecture
* State management with Redux
* API communication between frontend and backend
* Secure payment processing with Stripe
* Building scalable frontend applications

---

## Author

Tanvi Lekshmi RM
