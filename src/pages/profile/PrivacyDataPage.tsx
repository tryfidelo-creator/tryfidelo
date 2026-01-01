import { Link, useNavigate } from "react-router-dom"
import { Eye, Bell, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ROUTES } from "@/lib/constants/routes"
import { motion } from "framer-motion"

export function PrivacyDataPage() {
  const navigate = useNavigate()

  const notificationItems = [
    { title: "Email notifications", description: "Receive important updates via email", checked: true },
    { title: "SMS notifications", description: "Get urgent messages via SMS", checked: false },
    { title: "Push notifications", description: "Receive notifications on your device", checked: true },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900">Privacy & Data</h1>
            <p className="text-gray-600 text-lg">Control your privacy settings and data preferences</p>
          </div>

          {/* Privacy Alert Card */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex gap-4">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Your privacy is protected</h3>
                <p className="text-gray-700 text-sm">
                  We use industry-leading encryption to protect your personal data. You have full control over your
                  information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl flex items-center gap-3 text-gray-900">
                <Eye className="h-6 w-6 text-gray-700" />
                Privacy Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent rounded-xl transition-all border border-transparent hover:border-orange-200 cursor-pointer group"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Privacy Center</h4>
                    <p className="text-sm text-gray-600">Take control of your privacy and learn how we protect it</p>
                  </div>
                  <Link to={ROUTES.PRIVACY_CENTER} className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer font-semibold"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent rounded-xl transition-all border border-transparent hover:border-orange-200 cursor-pointer group"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Communication Preferences</h4>
                    <p className="text-sm text-gray-600">Manage how we communicate with you</p>
                  </div>
                  <Link to={ROUTES.COMMUNICATION_PREFERENCES} className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer font-semibold"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl flex items-center gap-3 text-gray-900">
                <Bell className="h-6 w-6 text-gray-700" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notificationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 3) * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl flex items-center gap-3 text-gray-900">
                <Mail className="h-6 w-6 text-gray-700" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Download your data</h4>
                    <p className="text-sm text-gray-600">Get a copy of your personal data in a portable format</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-green-300 bg-white hover:bg-green-50 cursor-pointer font-semibold"
                  >
                    Download
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 hover:shadow-md transition-all"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Delete your account</h4>
                    <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Delete
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl flex items-center gap-3 text-gray-900">
                <Lock className="h-6 w-6 text-gray-700" />
                Legal
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Link
                  to={ROUTES.TERMS}
                  className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-xl transition-colors group cursor-pointer"
                >
                  <span className="text-gray-900 group-hover:text-orange-600 font-semibold">Terms of Service</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600" />
                </Link>
                <Link
                  to={ROUTES.PRIVACY}
                  className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-xl transition-colors group cursor-pointer"
                >
                  <span className="text-gray-900 group-hover:text-orange-600 font-semibold">Privacy Policy</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600" />
                </Link>
                <Link
                  to={ROUTES.HELP_CENTER}
                  className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-xl transition-colors group cursor-pointer"
                >
                  <span className="text-gray-900 group-hover:text-orange-600 font-semibold">Help Center</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
