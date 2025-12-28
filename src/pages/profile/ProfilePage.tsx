import { Link } from "react-router-dom"
import { User, Shield, Lock, LogOut, Star, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  const settings = [
    {
      icon: User,
      label: "Personal info",
      description: "Update your personal details",
      path: "/profile/personal-info",
      color: "bg-blue-100",
    },
    {
      icon: Shield,
      label: "Security",
      description: "Manage your security settings",
      path: "/profile/security",
      color: "bg-green-100",
    },
    {
      icon: Lock,
      label: "Privacy & Data",
      description: "Control your privacy settings",
      path: "/profile/privacy-data",
      color: "bg-purple-100",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        {/* Header with User Info */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8 flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900">Account Settings</h1>
              <p className="text-gray-600 text-lg">Manage your account and preferences</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full border border-orange-200">
              <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
              <span className="text-sm font-bold text-orange-700">{(user as any)?.rating || "5.0"} Rating</span>
            </div>
          </div>

          {/* User Profile Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-center gap-6 mb-8 flex-col sm:flex-row">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-orange-200">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-2xl">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold mb-1 text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600 text-lg mb-3">{user?.email}</p>
                  <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                    <span className="px-4 py-2 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                      ✓ Verified
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                      {user?.role === "customer" && "Buyer"}
                      {user?.role === "seller" && "Seller"}
                      {user?.role === "service_provider" && "Service Provider"}
                      {user?.role === "delivery_rider" && "Delivery Rider"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {settings.map((setting) => {
            const Icon = setting.icon
            return (
              <Link key={setting.path} to={setting.path}>
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 group cursor-pointer">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div
                      className={`${setting.color} p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7 text-gray-900" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{setting.label}</h3>
                    <p className="text-sm text-gray-600 mb-6 flex-1">{setting.description}</p>
                    <span className="text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent group-hover:translate-x-1 transition-transform">
                      View Settings →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Account Status Section */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-l-orange-500">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-7 w-7 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Account Status</h3>
                <p className="text-gray-700 mb-4">
                  Your account is in good standing. Keep your information up to date to avoid any issues.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Email verified
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Phone verified
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    ID verified
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="btn-primary cursor-pointer w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
          <LogOut className="h-5 w-5 mr-2" />
          Sign out of all devices
        </Button>
      </div>
    </DashboardLayout>
  );
}
