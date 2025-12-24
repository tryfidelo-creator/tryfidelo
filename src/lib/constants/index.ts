export const APP_CONFIG = {
  name: "TryFidelo",
  tagline: "Your Complete Marketplace Solution",
  contact: {
    email: "hello@tryfidelo.com",
    phone: "(212) 842-5500",
    address: {
      street: "456 Anywhere St.",
      city: "Any City",
      state: "ST",
      zip: "12345",
    },
  },
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const

export const FEATURES = [
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Buy and sell products with ease",
    items: ["Post unlimited ads", "Negotiate prices", "Secure transactions", "Wide product range"],
  },
  {
    id: "services",
    title: "Services",
    description: "Book professional services",
    items: ["Verified providers", "Flexible pricing", "Easy booking", "Quality assurance"],
  },
  {
    id: "delivery",
    title: "Delivery",
    description: "Fast and reliable parcel delivery",
    items: ["Real-time tracking", "Flexible pricing", "Instant booking", "Safe delivery"],
  },
  {
    id: "support",
    title: "Chat & Support",
    description: "Connect with buyers and sellers",
    items: ["24/7 live chat", "Dispute resolution", "Price negotiation", "Instant messaging"],
  },
] as const

export const STATS = [
  {
    id: "users",
    label: "Active Users",
    value: "50K+",
  },
  {
    id: "listings",
    label: "Live Listings",
    value: "100K+",
  },
  {
    id: "deliveries",
    label: "Deliveries Daily",
    value: "5K+",
  },
  {
    id: "satisfaction",
    label: "Satisfaction Rate",
    value: "98%",
  },
] as const

export const BUTTON_STYLES = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
} as const

import { ShoppingBag, Briefcase, Truck, type LucideIcon } from "lucide-react"
import { ROUTES } from "./routes"

export type NavLink = {
  label: string
  href: string
  icon?: LucideIcon
}

export const NAV_LINKS = [
  { label: "Marketplace", href: ROUTES.MARKETPLACE, icon: ShoppingBag },
  { label: "Start Your Online Business", href: ROUTES.SERVICES, icon: Briefcase },
  { label: "Fidelo Delivery", href: ROUTES.DELIVERIES, icon: Truck },
] as const satisfies readonly NavLink[]


