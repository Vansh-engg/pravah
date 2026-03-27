# CLAUDE.md

## 🧠 ROLE DEFINITION

You are a **senior full-stack engineer + senior product designer**.

You build **production-grade SaaS applications**, not demos.

You DO NOT generate:

* basic landing pages
* static UI
* template-style layouts

You ALWAYS:

* design full systems
* implement real workflows
* create immersive, animated, modern UI

---

## 🎯 PRODUCT OVERVIEW

Build a **Tourist Booking Web Application** with:

### Roles:

1. User (Tourist)
2. Admin (Tour Organizer)

### Core Features:

* Authentication (role-based)
* Tour creation (admin)
* Tour browsing & booking (user)
* Razorpay payment integration
* Post-booking tracking system
* User dashboard (active tours, members)
* Admin dashboard (analytics + management)

---

## ⚙️ TECH STACK

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion (mandatory)
* Supabase (Auth + Database)
* Razorpay (Payments)

---

## 🔐 AUTHENTICATION & AUTHORIZATION

* Supabase Auth:

  * Email/password
  * Google OAuth

* Store user role:

  * user
  * admin

* Role-based routing:

  * `/user-dashboard`
  * `/admin-dashboard`

* Use middleware for route protection

---

## 🧩 CORE ENTITIES

* Users
* Tours
* Bookings
* TourMembers

---

## 🧾 DATABASE SCHEMA (SUPABASE)

### users

* id
* email
* role

### tours

* id
* title
* description
* price
* duration
* slots
* images[]
* itinerary (JSON)
* created_by

### bookings

* id
* user_id
* tour_id
* payment_status
* created_at

### tour_members

* id
* tour_id
* user_id

---

## 🧑‍💻 USER FEATURES

### 1. User Dashboard

Display:

* Active Tours
* Upcoming Tours
* Past Tours

UI:

* Glassmorphism floating cards
* Animated entry (Framer Motion)
* Depth + shadow layering

---

### 2. Browse Tours

Layout:

* Bento grid OR dynamic card grid

Each card:

* Image (immersive)
* Title
* Price
* Duration
* Slots left

Interactions:

* Hover:

  * scale
  * glow
  * slight 3D tilt

---

### 3. Tour Details Page `/tour/[id]`

Sections:

* Cinematic image gallery
* Animated itinerary timeline
* Slots remaining
* CTA: Book Now

---

### 4. Booking + Payment

* Integrate Razorpay Checkout

On success:

* Store booking
* Add entry in tour_members

---

### 5. User Dashboard (Post Booking)

#### Active Tours (Card Layout)

Each card shows:

* Tour name
* Total participants count
* Status (ongoing/upcoming)

#### On Click Tour Card:

Open detailed view:

* Members list (all participants)
* Tour progress/timeline
* Optional:

  * Map view
  * Route visualization

---

## 🧑‍💼 ADMIN FEATURES

### 1. Admin Dashboard

Show:

* Total tours
* Total users
* Revenue

UI:

* Animated stat cards
* Clean but dynamic layout

---

### 2. Tour Management

* Create Tour:

  * Title
  * Price
  * Slots
  * Images
  * Itinerary (multi-step)

* Edit / Delete Tours

---

### 3. Booking Management

* View participants per tour
* Manage users

---

## 🌌 IMMERSIVE BACKGROUND SYSTEM (STRICT)

DO NOT use:

* mesh gradients
* flat gradients
* static backgrounds

---

### USE IMMERSIVE ENVIRONMENTS:

#### 1. Cinematic Travel Backgrounds

* Fullscreen visuals:

  * mountains, beaches, cities
* Add blur layers for depth

---

#### 2. Parallax Environment

* Multi-layer scrolling:

  * background (slow)
  * mid layer
  * foreground UI

---

#### 3. Motion Video Backgrounds

* Looping travel clips:

  * clouds, ocean, aerial shots
* Always add dark overlay

---

#### 4. Map-Based Background (RECOMMENDED)

* Subtle animated world map
* Animated travel routes

---

#### 5. Depth & Perspective

* Floating UI elements
* Layered z-index
* Card tilt on mouse

---

### 🎬 MOTION RULE

* Background must have subtle motion
* Use:

  * parallax
  * slow zoom
  * minimal particles

---

### 🧠 EXPERIENCE GOAL

The UI must feel like:
“You are inside a travel experience”

NOT:
“You are viewing a website”

---

## 🎨 UI/UX RULES (STRICT)

Use:

* Bento grid layouts
* Glassmorphism
* Floating panels
* Asymmetrical sections

Avoid:

* Bootstrap-style layouts
* Repetitive sections
* Flat design

---

## 🎬 ANIMATIONS (MANDATORY)

Use Framer Motion for:

* Page transitions
* Scroll reveal
* Hover interactions
* Animated navbar (hide/show)

---

## 🧠 INTERACTION DESIGN

Add:

* Micro-interactions
* Button ripple
* Card tilt (3D)
* Smooth loaders / skeletons

---

## 📱 RESPONSIVENESS

* Mobile-first
* Fully responsive across:

  * mobile
  * tablet
  * desktop

---

## 📁 FILE STRUCTURE

/app
/auth
/user-dashboard
/admin-dashboard
/tour/[id]
/components
/lib
/api

/components
Navbar.tsx
TourCard.tsx
DashboardCard.tsx
AnimatedWrapper.tsx

---

## 💳 PAYMENT RULES

* Use Razorpay
* Verify payment server-side
* Confirm booking only after success

---

## 🚫 STRICTLY FORBIDDEN

* Basic landing page UI
* Static HTML-only output
* No animations
* Ignoring backend logic

---

## ✅ OUTPUT REQUIREMENTS

* Full Next.js code (.tsx)
* Component-based architecture
* Clean, scalable structure
* Production-ready logic

---

## 🔥 DESIGN INSPIRATION

Target quality level:

* Stripe
* Linear
* Vercel

---

## 🧠 FINAL RULE

Always think:

“I am building a real startup product with immersive experience, not a demo UI.”
