# Fidelo - Multi-Platform Marketplace

A comprehensive web application combining marketplace, services booking, and parcel delivery in one platform.

## 🚀 Features

### Marketplace
- Browse and search products
- Negotiate prices with sellers
- Category filtering
- Grid/List view toggle

### Services
- Book professional services
- View provider ratings and reviews
- Flexible pricing negotiation
- Multiple service categories

### Delivery
- Request parcel delivery
- Real-time tracking (coming soon)
- Negotiate delivery prices
- Offline payments

### Authentication
- Email/Phone login
- OTP verification
- Google OAuth integration
- Password creation flow

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Ready for Zustand/Redux integration
- **Backend**: PHP (API integration ready)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Logo, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # shadcn UI components
├── pages/
│   ├── auth/            # Authentication pages
│   ├── marketplace/     # Marketplace pages
│   ├── services/        # Services pages
│   └── delivery/        # Delivery pages
├── lib/
│   ├── constants/       # App constants (routes, colors)
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
└── App.tsx              # Main app component
```

## 🎨 Design System

### Brand Colors
- **Yellow**: #FDB913
- **Orange**: #FF9500
- **Red**: #EF3340
- **Black**: #000000
- **Cream**: #FFF8F0

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Pages Implemented

### Public Pages
- ✅ Home/Landing Page
- ✅ Login Page
- ✅ OTP Verification
- ✅ Security Setup
- ✅ Password Creation
- ✅ Marketplace
- ✅ Services
- ✅ Delivery Request

### Dashboard Pages (Role-based)
- ✅ Customer Dashboard
- ✅ Seller Dashboard
- ✅ Service Provider Dashboard
- ✅ Delivery Rider Dashboard

### Authenticated Pages
- ✅ Messages/Chat (with price negotiation)
- ✅ Wallet Management (for earners)
- ✅ Profile Settings

### Admin Pages
- ✅ Admin Dashboard
- ✅ User Approvals (pending)
- ✅ Wallet Management (pending)
- ✅ Earnings Reports (pending)
- ✅ Disputes Management (pending)

### Legal Pages
- ✅ Help Center with FAQs
- ✅ Terms of Service
- ✅ Privacy Policy

### Coming Soon
- Booking Management (detailed view)
- Order Tracking (with maps)
- Complete Admin Panel features

## 🔌 Backend Integration

The frontend is ready for PHP backend integration. All API calls are marked with `// TODO: API call` comments.

### API Endpoints Needed

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/create-password

// Marketplace
GET /api/listings
POST /api/listings
GET /api/listings/:id

// Services
GET /api/services
POST /api/bookings

// Delivery
POST /api/deliveries
GET /api/deliveries/:id

// Chat
GET /api/conversations
POST /api/messages

// Wallet
GET /api/wallet/balance
GET /api/wallet/transactions
```

## 🎯 User Roles

1. **Customer/Buyer** - Browse and purchase
2. **Seller** - List products
3. **Service Provider** - Offer services
4. **Delivery Rider** - Handle deliveries
5. **Admin** - Platform management

## 💡 Key Features

- **Offline Payments**: All transactions happen offline
- **Price Negotiation**: Built-in chat for bargaining
- **Wallet System**: For sellers, providers, and riders
- **Commission Based**: Platform earns through commissions
- **Mobile Responsive**: Works on all devices

## 🔐 Security

- OTP verification
- Password protection
- Secure authentication flow
- Role-based access control (ready)

## 📄 License

All rights reserved © 2025 Fidelo Platform

## 🤝 Contributing

This is a private project. For access or contributions, please contact the development team.

---

Built with React, TypeScript, and Tailwind CSS
🧑‍💻 Prince TechTune