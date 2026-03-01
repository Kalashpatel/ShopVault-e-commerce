## Live Project Link:- https://shop-vault-e-commerce.vercel.app/products

# ShopVault — React E-Commerce Dashboard

A fully-featured authentication-based e-commerce dashboard built with React + Vite.

## Tech Stack
- **React 18** + **Vite**
- **React Router v6** — client-side routing
- **Context API** — global state (Auth, Cart, Theme)
- **Tailwind CSS** — styling
- **react-hot-toast** — notifications
- **FakeStore API** — product data

## Setup

```bash
# 1. Copy these files into your existing Vite project root
# OR create a new Vite project:
npm create vite@latest shopvault -- --template react
cd shopvault

# 2. Install dependencies
npm install react-router-dom react-hot-toast

# 3. Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Replace the config files with the ones provided
# (tailwind.config.js, postcss.config.js, src/index.css)

# 5. Run the dev server
npm run dev
```

## Folder Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.jsx   # Sidebar + Topbar wrapper
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── ui/
│   │   └── index.jsx             # Button, Input, Alert, StatCard, SkeletonCard
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx           # Login, logout, session timer
│   ├── CartContext.jsx           # Cart CRUD
│   └── ThemeContext.jsx          # Dark/light mode
├── hooks/
│   └── useProducts.js            # Fetch from FakeStore API
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx              # Search, filter, infinite scroll
│   ├── Cart.jsx
│   └── Profile.jsx
├── utils/
│   └── auth.js                   # localStorage helpers, validation
├── App.jsx                       # Routes + Providers
├── main.jsx
└── index.css
```

## Features

| Feature | Status |
|---|---|
| Register / Login | ✅ |
| localStorage persistence | ✅ |
| 5-minute session timer | ✅ |
| Protected routes | ✅ |
| Product listing (FakeStore API) | ✅ |
| Product search + category filter | ✅ |
| Infinite scroll | ✅ |
| Add to cart / prevent duplicates | ✅ |
| Qty increment / decrement / remove | ✅ |
| Cart total + tax + shipping | ✅ |
| Edit profile + change password | ✅ |
| Toast notifications | ✅ |
| Dark / Light mode | ✅ |
| Skeleton loading states | ✅ |
| Fully responsive | ✅ |
