import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Package, TrendingUp } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DeliveryPage() {
  const [pickupAddress, setPickupAddress] = useState("")
  const [dropoffAddress, setDropoffAddress] = useState("")
  const [parcelDescription, setParcelDescription] = useState("")

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Create delivery request")
  }

  const steps = [
    {
      number: 1,
      title: "Create Request",
      description: "Enter pickup and drop-off details",
      color: "from-cyan-500 to-blue-600",
    },
    {
      number: 2,
      title: "Get Matched",
      description: "Available riders will see your request",
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: 3,
      title: "Negotiate Price",
      description: "Chat with rider to agree on price",
      color: "from-indigo-500 to-purple-600",
    },
    {
      number: 4,
      title: "Track Delivery",
      description: "Monitor your parcel in real-time",
      color: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/20 to-blue-50/20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200')] bg-cover bg-center opacity-10" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-balance">
              Fast & Reliable Delivery
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 text-pretty">
              Send packages across the nation with real-time tracking and flexible pricing
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Delivery Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-2 border-cyan-100 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  Create Delivery Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-bold mb-3 text-gray-700">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mr-2">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      Pickup Address
                    </label>
                    <Input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="Enter pickup location"
                      className="h-12 border-2 border-gray-200 focus:border-cyan-400 rounded-xl transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-bold mb-3 text-gray-700">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mr-2">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      Drop-off Address
                    </label>
                    <Input
                      type="text"
                      value={dropoffAddress}
                      onChange={(e) => setDropoffAddress(e.target.value)}
                      placeholder="Enter drop-off location"
                      className="h-12 border-2 border-gray-200 focus:border-cyan-400 rounded-xl transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-bold mb-3 text-gray-700">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mr-2">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      Parcel Description
                    </label>
                    <Textarea
                      value={parcelDescription}
                      onChange={(e) => setParcelDescription(e.target.value)}
                      placeholder="Describe your parcel (size, weight, fragile items, etc.)"
                      className="min-h-[120px] border-2 border-gray-200 focus:border-cyan-400 rounded-xl transition-colors"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="cursor-pointer w-full h-14 bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0"
                  >
                    Request Delivery
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="border-2 border-cyan-100 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-gray-800">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
