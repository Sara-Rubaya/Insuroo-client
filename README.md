# Life Insurance Management Platform (Insuroo)

---

## 🎯 Project Overview

This project is a modern **Life Insurance Management Platform** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) designed to streamline the process of purchasing and managing life insurance policies. The platform supports multiple user roles with distinct privileges, offers personalized quote estimations, integrates secure payments, and provides a user-friendly interface for all stakeholders.

---

## 🏢 About the Company

We are a tech-forward life insurance startup dedicated to making insurance accessible, transparent, and hassle-free for everyone. Our platform enables users to explore policies, generate quotes, connect with expert agents, and manage their insurance digitally—all from one place.

---

## 🔑 User Roles & Permissions

| Role     | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| Admin    | Full control over policies, users, agents, transactions, and blogs. |
| Agent    | Consults customers, manages assigned applications, and writes blogs. |
| Customer | Browses policies, requests quotes, applies for insurance, manages claims, and payments. |

---

## 🚀 Key Features

### General

- Responsive, fully accessible UI built with React and Tailwind CSS.
- Role-based authentication & authorization with Firebase Auth + JWT.
- Dynamic page titles using `react-helmet-async`.
- Secure environment variable management for API keys, secrets.
- Meaningful commit history for both client and server (20+ client commits, 12+ server commits).

### Authentication

- Email/password & Google sign-in.
- User registration with profile photo upload.
- Password validation: minimum 6 characters, uppercase and lowercase letters.
- Roles assigned automatically on registration (default "customer").

### Home Page

- Animated hero slider with taglines.
- Display 6 most popular policies dynamically.
- Customer reviews carousel (3-5 reviews).
- Latest 4 blog posts with summaries & “Read more” modal.
- Newsletter subscription saving data to the backend.
- Featured agents showcase.

### Policies

- Browse all policies with filtering by category and pagination (9 per page).
- Detailed policy pages with eligibility, benefits, premium calculation, and "Get Quote" CTA.
- Case-insensitive search functionality.

### Quotes & Applications

- Quote estimator form (Age, Gender, Coverage, Duration, Smoker status).
- Estimated monthly/annual premiums displayed dynamically.
- Policy application form collecting personal, nominee, and health disclosure data.
- Applications stored with status "Pending".

### Dashboards

#### Admin

- Manage Applications:
  - View all applications with applicant info, policy, date, and status.
  - Assign agents and reject applications with feedback modal.
  - View application details.
- Manage Users:
  - View all users, filter by role.
  - Promote/demote users between roles.
  - Optional delete user feature.
- Manage Policies:
  - Add, edit, and delete policies.
  - Policy form includes image upload, coverage ranges, premiums, and terms.
- Manage Transactions:
  - View Stripe payments, filter by date/user/policy.
  - Track total income.
  - Optional earnings graph/chart.

#### Agent

- Assigned Customers:
  - View assigned customers, application statuses, and contact info.
  - Update application status (Pending, Approved, Rejected).
  - Approving increments policy purchase count.
- Manage Blogs:
  - CRUD operations on insurance-related blogs.
  - Admin sees all blogs; agent sees only their own.
- Policy Clearance:
  - View and approve policy claims submitted by customers.

#### Customer

- My Policies:
  - List all applied policies with status and details.
  - Submit reviews with star rating and feedback.
- Payment Status:
  - View policy premium payments, pay outstanding premiums.
- Payment Page:
  - Stripe payment integration with pre-filled info.
- Claim Requests:
  - Submit claims for approved policies.
  - View claim statuses (Pending, Approved).
- Profile Page:
  - Edit name and photo, view last login info.
  - Role badges visible.

---

## 🛠 Technology Stack

| Layer          | Technology / Library           |
| -------------- | ----------------------------- |
| Frontend       | React.js, React Router, Tailwind CSS, Flowbite UI, React Helmet Async, React Hook Form, React Select, Tanstack Query, SweetAlert2 |
| Backend        | Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Stripe API |
| Authentication | Firebase Authentication (Email/Password + Google OAuth) |
| Deployment     | Vercel / Netlify (Frontend), Heroku / Render / Vercel (Backend) |

---

## 🔐 Security & Environment

- Sensitive keys are stored in environment variables:
  - Firebase config
  - MongoDB connection string
  - JWT secret key
  - Stripe secret key
- JWT token-based API authentication implemented.
- Proper handling of 401 Unauthorized and 403 Forbidden errors with user feedback and redirects.

---

## 🔗 Live Demo

[https://insuroo-client.web.app/](https://insuroo-client.web.app/)

---

## 🧑‍💻 Admin Login Credentials

