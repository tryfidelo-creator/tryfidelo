import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, MapPin, Edit2, Check, X, ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

export function PersonalInfoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+234 123 456 7890",
    address: "123 Main Street, Lagos, Nigeria",
    country: "Nigeria",
  })

  const [tempFormData, setTempFormData] = useState(formData)

  const handleEdit = () => {
    setIsEditing(true)
    setTempFormData(formData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempFormData(formData)
  }

  const handleSave = () => {
    setFormData(tempFormData)
    setIsEditing(false)
    // TODO: API call to update profile
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fields = [
    {
      label: "Full Name",
      name: "name",
      icon: User,
      type: "text",
      color: "bg-blue-100",
    },
    {
      label: "Email Address",
      name: "email",
      icon: Mail,
      type: "email",
      color: "bg-green-100",
      verified: true,
    },
    {
      label: "Phone Number",
      name: "phone",
      icon: Phone,
      type: "tel",
      color: "bg-orange-100",
    },
    {
      label: "Address",
      name: "address",
      icon: MapPin,
      type: "text",
      color: "bg-purple-100",
    },
  ]

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900">Personal Info</h1>
            <p className="text-gray-600 text-lg">Manage your personal information</p>
          </div>

          {/* Profile Header Card */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-start justify-between mb-8 gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="relative">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-orange-200">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${formData.email}`} alt={formData.name} />
                      <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xl">
                        {formData.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      aria-label="Edit profile picture"
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-2 rounded-full hover:shadow-lg transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1 text-gray-900">{formData.name}</h2>
                    <p className="text-gray-600">{formData.email}</p>
                  </div>
                </div>
                <Button
                  onClick={isEditing ? handleCancel : handleEdit}
                  className={`${
                    isEditing ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer" : "btn-primary cursor-pointer"
                  } whitespace-nowrap`}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {fields.map((field, index) => {
                  const Icon = field.icon
                  return (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"
                      >
                        <span className={`${field.color} p-2 rounded-lg`}>
                          <Icon className="h-4 w-4 text-gray-700" />
                        </span>
                        {field.label}
                        {field.verified && <span className="text-xs text-green-600 font-bold">✓ Verified</span>}
                      </Label>
                      {isEditing ? (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={tempFormData[field.name as keyof typeof tempFormData]}
                          onChange={handleChange}
                          className="mt-2 h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          {formData[field.name as keyof typeof formData]}
                        </p>
                      )}
                    </motion.div>
                  )
                })}

                {/* Country Section */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Label htmlFor="country" className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-red-100 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-700" />
                    </span>
                    Country
                  </Label>
                  {isEditing ? (
                    <Input
                      id="country"
                      name="country"
                      value={tempFormData.country}
                      onChange={handleChange}
                      className="mt-2 h-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900 mt-2">{formData.country}</p>
                  )}
                </motion.div>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 pt-6 border-t border-gray-200"
                  >
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 cursor-pointer bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="btn-primary flex-1 h-12 justify-center">
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Keep Your Information Safe</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Update your information regularly to keep your account secure</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Verify your email and phone to unlock additional features</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Go to Security Settings to manage your password and 2FA</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
