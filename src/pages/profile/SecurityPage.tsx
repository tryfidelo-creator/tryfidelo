import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Smartphone, Key, Phone, ShieldAlert, ArrowLeft, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"

export function SecurityPage() {
  const navigate = useNavigate()
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const securityItems = [
    {
      id: "password",
      title: "Password",
      description: "Manage your password",
      status: "set",
      icon: Lock,
      action: "Change",
      color: "bg-blue-100",
    },
    {
      id: "passkeys",
      title: "Passkeys",
      description: "Passkeys are easier and more secure than passwords",
      status: "not-set",
      icon: Key,
      action: "Add",
      color: "bg-green-100",
    },
    {
      id: "authenticator",
      title: "Authenticator app",
      description: "Set up your authenticator app to add an extra layer of security",
      status: "not-set",
      icon: Smartphone,
      action: "Add",
      color: "bg-purple-100",
    },
    {
      id: "2fa",
      title: "2-step verification",
      description: "Add additional security to your account with 2-step verification",
      status: "not-set",
      icon: ShieldAlert,
      action: "Add",
      color: "bg-orange-100",
    },
    {
      id: "recovery",
      title: "Recovery phone",
      description: "Add a backup phone number to access your account",
      status: "not-set",
      icon: Phone,
      action: "Add",
      color: "bg-red-100",
    },
  ]

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      setShowPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
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
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900">Security</h1>
            <p className="text-gray-600 text-lg">Manage your account security settings and keep your account safe</p>
          </div>

          {/* Security Alert Card */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500">
            <CardContent className="p-6 flex gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Your account is secure</h3>
                <p className="text-gray-700 text-sm">
                  You have a password set. Consider adding two-factor authentication for extra security.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Logging in Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl flex items-center gap-3 text-gray-900">
                <Lock className="h-6 w-6 text-gray-700" />
                Logging In
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {securityItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent rounded-xl transition-all border border-transparent hover:border-orange-200 cursor-pointer group"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`${item.color} p-3 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-all`}
                        >
                          <Icon className="h-5 w-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          {item.status === "set" && (
                            <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100 border-0">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Set
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={
                          item.id === "password" ? () => setShowPasswordDialog(true) : () => setShowAuthDialog(true)
                        }
                        className={`flex-shrink-0 ${
                          item.status === "set" ? "btn-secondary cursor-pointer" : "btn-primary cursor-pointer"
                        }`}
                        size="sm"
                      >
                        {item.action}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl text-gray-900">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Chrome on Windows</h4>
                    <p className="text-sm text-gray-600">Last active: Just now</p>
                    <p className="text-xs text-gray-500 mt-2">IP: 192.168.1.1</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-0 font-semibold">Current</Badge>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Safari on iPhone</h4>
                    <p className="text-sm text-gray-600">Last active: 2 hours ago</p>
                    <p className="text-xs text-gray-500 mt-2">IP: 192.168.1.2</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Sign out
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Change Password Dialog */}
      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent className="max-w-md border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-gray-900">Change Password</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Enter your current password and your new password
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current-password" className="text-sm font-bold text-gray-900 mb-2 block">
                Current password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="mt-2 h-11 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-sm font-bold text-gray-900 mb-2 block">
                New password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-2 h-11 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-sm font-bold text-gray-900 mb-2 block">
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="mt-2 h-11 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-all"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleChangePassword}
              className="btn-primary cursor-pointer border-0 text-white"
            >
              Change Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Setup Feature Dialog */}
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent className="max-w-md border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-gray-900">Coming Soon</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This feature will be available soon. We're working on implementing it for you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
