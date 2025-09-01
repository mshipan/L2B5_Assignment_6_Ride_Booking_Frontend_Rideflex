# Rideflex - Ride Management System – Frontend

---

### Project Overview

The Ride Management System is a production-grade, fully responsive, role-based ride booking platform (similar to Uber or Pathao) built with React, Typescript, Redux Toolkit, and RTK Query.

It provides tailored dashboards and experiences for Riders, Drivers, and Admins, with secure authentication, intuitive UI, and modern data visualizations.

### Live Demo

Frontend: https://rideflex-app.vercel.app
Backend: https://rideflex-eight.vercel.app

---

## Features

### Authentication & Authorization

- JWT-based login & registration

- Role-based access control (Rider, Driver, Admin)

- Blocked/Suspended account handling with status page

- Persistent login & logout functionality

### Rider Dashboard

- Book rides with fare estimation

- View active rides with status tracking

- Ride history with pagination & filters

- Detailed ride info with driver details

- Profile management (edit info, change password)

- Rider Dashboard features

### Driver Dashboard

- Toggle availability (Online/Offline)

- Accept/Reject ride requests

- Manage active rides (status updates: Accepted → Completed/Cancelled)

- Earnings dashboard with charts (daily/weekly/monthly)

- Ride history with filters

- Profile management (vehicle, contact, password updates)

### Admin Dashboard

- User management: Block/unblock riders, approve/suspend drivers

- Ride oversight: Filter rides by date, status, driver, or rider

- Analytics dashboard: revenue, ride volume, driver activity

- Profile management

### UI/UX Enhancements

- Fully responsive with Tailwind CSS

- Role-based navigation & profile dropdown

- Charts & analytics using Recharts

- Skeleton loaders, smooth transitions, lazy loading

- Error handling with clear validation & toast notifications

- Accessibility-compliant components

---

## Tech Stack

### Core Framework

- ⚛️ React 19 – Component-based UI library

- 🛣 React Router 7 – Client-side routing

### State Management, Data Layer & Type Safety

- Redux Toolkit – Centralized state management

- React Redux – React bindings for Redux

- RTK Query – Data fetching & caching

- Axios – API requests

- TypeScript – Static typing

### Forms & Validation

- React Hook Form – Form handling

- Zod – Schema validation

- @hookform/resolvers – RHF + Zod integration

### UI & Styling

- Tailwind CSS v4 – Utility-first styling

- Shadcn – Reusable UI components

- Lucide React – Icon library

- Sonner – Beautiful toast notifications

- Swiper – Touch slider/swiper

- and more

---

## Project Structure

```
src/
│── assets/          # Static files (images, fonts, icons, logos)
│── components/      # Reusable UI components (buttons, modals, inputs)
│── config/          # App-level configurations (API baseURL, constants)
│── constants/       # Global constants (roles, enums, status codes)
│── context/         # React Context providers (theme, auth, etc.)
│── hooks/           # Custom React hooks (useAuth, useFetch, etc.)
│── layouts/         # App layouts (DashboardLayout, AuthLayout)
│── lib/             # Utility libraries (API clients, third-party integrations)
│── pages/           # Page-level components (Home, Dashboard, Login, etc.)
│── providers/       # App-wide providers (ThemeProvider, ReduxProvider)
│── redux/           # Redux Toolkit slices, store, and RTK Query APIs
│── routes/          # App route definitions & protected routes
│── schemas/         # Zod/Yup validation schemas
│── types/           # TypeScript types & interfaces (IRide, IUser, etc.)
│── utils/           # Helper functions (formatDate, calculateFare, etc.)
│
│── App.tsx          # Main app component
│── main.tsx         # React entry point
│── index.css        # Global styles
│── vite-env.d.ts    # Vite environment types

```

## Setup Instructions

Prerequisites

- Node.js (recommended)
- npm or yarn

Installation

```bash
# Clone frontend repo
git clone https://github.com/mshipan/L2B5_Assignment_6_Ride_Booking_Frontend_Rideflex.git
cd rideflex

# Install dependencies
npm install
# or
yarn install

```

Environment Variables

Create a .env.local file in the root with:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Run Development Server

```bash
npm run dev
```

---

## Demo Credentials

Rider

- Email: rider1@gmail.com

- Password: Shipan@1

Driver

- Email: driver1@gmail.com

- Password: Shipan@1

Admin

- Email: admin1@gmail.com

- Password: Shipan@1

---

## Demo Walkthrough Covers

1. Registration & login (Rider, Driver)

2. Rider booking process with tracking

3. Driver accepting and completing rides

4. Admin management (users, rides, analytics)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.
