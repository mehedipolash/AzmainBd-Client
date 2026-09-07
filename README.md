# Azmain BD — House of Global Brands

A production e-commerce storefront for **Azmain BD**, a Bangladesh-based retailer of
authentic beauty and personal-care products — skincare, haircare, body care, herbal
soap, oral care, juice and glass bangles, from brands such as OGX, NIVEA, L'Oréal,
Sensodyne, Pantene and VICA.

🔗 **Live site:** https://azmain.com.bd

This repository holds the **frontend** (React + Vite single-page app). The REST API
that powers it lives in a separate repository.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture Notes](#architecture-notes)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Azmain BD is a full-stack MERN application. The storefront is a fast, SEO-friendly
React SPA; the backend is a Node/Express API backed by MongoDB Atlas, with product
images stored in GridFS. Both are served under a single domain
(`azmain.com.bd`), with the API mounted at `/api`.

Orders are placed over **WhatsApp** — the catalogue, cart and product pages funnel
the customer to a pre-filled WhatsApp enquiry, which suits how the shop actually
sells. An **admin panel** lets the owner manage the catalogue, categories, users and
sales without touching code.

---

## Features

### Storefront
- **Home** with a rotating hero of featured products, category tiles, promo banners,
  deal-of-the-day countdown and a welcome offer.
- **Shop** with category and brand filtering, sorting (newest / price / rating),
  pagination and **live search suggestions**.
- **Product details** with SEO-friendly slug URLs (`/product/<name-slug>-<id>`),
  stock status (in stock / low stock / sold out), delivery estimate and related
  products.
- **Cart** with quantity control and one-tap WhatsApp checkout.
- **Static pages** — About, Contact (with a Leaflet map), Deals, Return Policy and
  Disclaimer.
- **Transparent product imagery** on soft, category-tinted studio backdrops for a
  consistent, premium look across every card and banner.

### Accounts & Admin
- **Firebase Authentication** — email/password with registration, login, password
  reset and change-password flows.
- **Admin dashboard** — manage **products**, **categories**, **users** and
  **record sales**, all behind an admin-only guard.
- **Featured-product queue** — the homepage hero holds up to five products; featuring
  a sixth automatically retires the one featured longest ago (first-in-first-out),
  so the owner never has to un-tick one first.
- **Owner protection** — the site owner's account cannot be demoted or deleted from
  the user-management screen.

### Quality
- Responsive, mobile-first layout with Tailwind CSS v4 and daisyUI.
- Scroll animations (AOS), Lottie illustrations and Framer Motion transitions.
- Strong SEO signals — descriptive titles, meta description, JSON-LD organisation
  markup, `sitemap.xml` and Google Search Console verification.
- Code-split vendor bundles (Firebase, Lottie, UI libs, React) so the homepage paints
  before heavy libraries finish loading.

---

## Tech Stack

| Area | Technology |
|------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite](https://vite.dev/) |
| Routing | [React Router](https://reactrouter.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) |
| Auth | [Firebase Authentication](https://firebase.google.com/) |
| HTTP client | [Axios](https://axios-http.com/) |
| Forms | [React Hook Form](https://react-hook-form.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [AOS](https://michalsnik.github.io/aos/), [Lottie](https://lottiereact.com/) |
| Maps | [Leaflet](https://leafletjs.com/) + React Leaflet |
| Alerts/Toasts | [SweetAlert2](https://sweetalert2.github.io/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Linting | [ESLint](https://eslint.org/) |

**Backend (separate repo):** Node.js, Express, MongoDB Atlas (GridFS for images),
Firebase token verification via `jose` + Google public keys.

---

## Project Structure

```
AzmainBd-Client/
├── public/                 # Static assets (favicon, logo, sitemap, banners)
├── src/
│   ├── api/                # Axios instance with auth + error interceptors
│   ├── assets/             # Images, Lottie files
│   ├── components/         # Shared UI (ProductCard, PromoBanner, WelcomeOffer, …)
│   ├── Contexts/           # React context providers
│   ├── data/               # Static data (banner definitions)
│   ├── Firebase/           # Firebase config + auth initialisation
│   ├── Hooks/              # Custom hooks (UseAuth, UseCart, UseCatalogue, …)
│   ├── Layouts/            # Page shells (header/footer wrappers)
│   ├── pages/              # Route pages
│   │   ├── Home/           # Home sections (Banner, DealOfTheDay, categories, …)
│   │   ├── Shop/           # Product grid + filtering
│   │   ├── ProductDetails/ # Single product page
│   │   ├── Cart/           # Cart + WhatsApp checkout
│   │   ├── Auth/           # Login, Register, password flows
│   │   ├── Admin/          # Dashboard, Products, Categories, Users, RecordSale
│   │   └── About / Contact / Deals / ReturnPolicy / Disclaimer / ErrorPage
│   ├── routers/            # Route definitions + guards
│   ├── shared/             # Cross-cutting shared modules
│   ├── utils/              # catalogue, imageUrl, formatCurrency, categoryStyle, …
│   ├── App.jsx             # App root
│   └── main.jsx            # Entry point
├── index.html              # HTML shell (meta tags, JSON-LD, favicon)
├── vite.config.js          # Vite + Tailwind + manual chunk splitting
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- **Node.js 20+** and npm
- A **Firebase** project (for authentication)
- The **backend API** running locally or reachable over the network

### Installation

```bash
# 1. Clone
git clone https://github.com/mehedipolash/AzmainBd-Client.git
cd AzmainBd-Client

# 2. Install dependencies
npm install

# 3. Configure environment (see below)
cp .env.example .env.local
# then edit .env.local with your real values

# 4. Start the dev server
npm run dev
```

The app runs at **http://localhost:5173** by default.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values. **Only `VITE_*`
variables reach the browser bundle** — everything here is public once built, so no
server secrets belong in this file.

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:abcdef123456

# Base URL of the backend API
VITE_API_BASE_URL=http://localhost:5000
```

In production the API is same-origin, so `VITE_API_BASE_URL` points at the deployed
domain (with the API mounted under `/api`).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

---

## Architecture Notes

- **Auth-aware Axios** — a request interceptor attaches a fresh Firebase ID token
  only to calls marked `withAuth`, so public reads never wait on Firebase; a response
  interceptor unwraps `data` and normalises every error into a readable `ApiError`.
- **SEO slug URLs** — product links are `/product/<name-slug>-<24-char-id>`. The id is
  parsed off the end, and legacy `/product/<id>` links keep working.
- **Featured queue** — enforced on the server as a rolling FIFO queue keyed by a
  `featuredAt` timestamp, so the homepage hero is capped and self-managing.
- **Image handling** — product images are served from the API (GridFS) and rendered
  `object-contain` over a category-tinted backdrop for a uniform, transparent look.
- **Bundle splitting** — Firebase, Lottie, the UI libraries and React are split into
  their own cached chunks so a first visit paints fast and a redeploy doesn't
  invalidate vendor code.

---

## Deployment

The site is deployed on **Namecheap cPanel** with LiteSpeed. The React app is built
with `npm run build` and the contents of `dist/` are served as static files, while
the Node API runs as a cPanel **Node.js App** (CloudLinux Passenger) under `/api`
on the same domain — giving the storefront and API a single same-origin host at
**https://azmain.com.bd**.

```bash
npm run build      # outputs to dist/
# upload dist/ contents to the web root
```

---

## License

Licensed under the [MIT License](LICENSE).

---

Built and maintained by [**mehedipolash**](https://github.com/mehedipolash).
