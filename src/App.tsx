import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ROUTES } from '@/lib/constants/routes';

// Public Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { OTPVerificationPage } from '@/pages/auth/OTPVerificationPage';
import { SecuritySetupPage } from '@/pages/auth/SecuritySetupPage';
import { CreatePasswordPage } from '@/pages/auth/CreatePasswordPage';
import { MarketplacePage } from '@/pages/marketplace/MarketplacePage';
import { ServicesPage } from '@/pages/services/ServicesPage';
import { DeliveryPage } from '@/pages/delivery/DeliveryPage';
import { DeliveryRequestsPage } from '@/pages/delivery/DeliveryRequestsPage';

// Dashboard Pages
import { CustomerDashboard } from '@/pages/dashboard/CustomerDashboard';
import { SellerDashboard } from '@/pages/dashboard/SellerDashboard';
import { ProviderDashboard } from '@/pages/dashboard/ProviderDashboard';
import { RiderDashboard } from '@/pages/dashboard/RiderDashboard';

// Authenticated Pages
import { MessagesPage } from '@/pages/messages/MessagesPage';
import { UserProfilePage } from '@/pages/messages/UserProfilePage';
import { WalletPage } from '@/pages/wallet/WalletPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { MyAdsPage } from '@/pages/profile/MyAdsPage';
import { CreateListingPage } from '@/pages/profile/CreateListingPage';
import { PersonalInfoPage } from '@/pages/profile/PersonalInfoPage';
import { SecurityPage } from '@/pages/profile/SecurityPage';
import { PrivacyDataPage } from '@/pages/profile/PrivacyDataPage';
import { PrivacyCenterPage } from '@/pages/profile/PrivacyCenterPage';
import { CommunicationPreferencesPage } from '@/pages/profile/CommunicationPreferencesPage';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ApprovalsPage } from '@/pages/admin/ApprovalsPage';
import { WalletManagementPage } from '@/pages/admin/WalletManagementPage';
import { DisputesPage } from '@/pages/admin/DisputesPage';
import { ReportsPage } from '@/pages/admin/ReportsPage';

// Booking & Tracking Pages
import { BookingsPage } from '@/pages/bookings/BookingsPage';
import { TrackingPage } from '@/pages/delivery/TrackingPage';

// Legal Pages
import { HelpCenterPage } from '@/pages/legal/HelpCenterPage';
import { TermsPage } from '@/pages/legal/TermsPage';
import { PrivacyPage } from '@/pages/legal/PrivacyPage';

function DashboardRouter() {
  const { user } = useAuth();
  
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  
  switch (user.role) {
    case 'seller':
      return <SellerDashboard />;
    case 'service_provider':
      return <ProviderDashboard />;
    case 'delivery_rider':
      return <RiderDashboard />;
    case 'admin':
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    default:
      return <CustomerDashboard />;
  }
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.OTP_VERIFICATION} element={<OTPVerificationPage />} />
      <Route path={ROUTES.SECURITY_SETUP} element={<SecuritySetupPage />} />
      <Route path={ROUTES.CREATE_PASSWORD} element={<CreatePasswordPage />} />
      <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />
      <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
      <Route path={ROUTES.DELIVERIES} element={<DeliveryPage />} />

      {/* Protected Delivery Requests Route */}
      <Route 
        path={ROUTES.DELIVERY_REQUESTS} 
        element={
          <ProtectedRoute>
            <DeliveryRequestsPage />
          </ProtectedRoute>
        } 
      />

      {/* Protected Dashboard Route */}
      <Route 
        path={ROUTES.DASHBOARD} 
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } 
      />

      {/* Protected Authenticated Routes */}
      <Route 
        path={ROUTES.MESSAGES} 
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.USER_PROFILE} 
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.WALLET} 
        element={
          <ProtectedRoute allowedRoles={['seller', 'service_provider', 'delivery_rider']}>
            <WalletPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.PROFILE} 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.MY_ADS} 
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <MyAdsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.CREATE_LISTING} 
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <CreateListingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.PERSONAL_INFO} 
        element={
          <ProtectedRoute>
            <PersonalInfoPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.SECURITY} 
        element={
          <ProtectedRoute>
            <SecurityPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.PRIVACY_DATA} 
        element={
          <ProtectedRoute>
            <PrivacyDataPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.MY_ADS} 
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <MyAdsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.PRIVACY_CENTER} 
        element={
          <ProtectedRoute>
            <PrivacyCenterPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.COMMUNICATION_PREFERENCES} 
        element={
          <ProtectedRoute>
            <CommunicationPreferencesPage />
          </ProtectedRoute>
        } 
      />

      {/* Protected Admin Routes */}
      <Route 
        path={ROUTES.ADMIN_DASHBOARD} 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.ADMIN_APPROVALS} 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ApprovalsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.ADMIN_WALLET} 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <WalletManagementPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.ADMIN_REPORTS} 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ReportsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={ROUTES.ADMIN_DISPUTES} 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DisputesPage />
          </ProtectedRoute>
        } 
      />

      {/* Booking & Tracking Routes */}
      <Route 
        path={ROUTES.BOOKINGS} 
        element={
          <ProtectedRoute>
            <BookingsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tracking/:id" 
        element={
          <ProtectedRoute>
            <TrackingPage />
          </ProtectedRoute>
        } 
      />

      {/* Legal Pages */}
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;