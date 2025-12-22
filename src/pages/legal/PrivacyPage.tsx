import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="heading-display mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 21, 2025</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="heading-lg mb-4">1. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">1.1 Personal Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Name, email address, and phone number</li>
            <li>Profile information and photos</li>
            <li>Location data for deliveries</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">1.2 Transaction Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Listing details and service information</li>
            <li>Chat messages and price negotiations</li>
            <li>Wallet transactions and balances</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">1.3 Usage Information</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Device information and IP address</li>
            <li>Browser type and operating system</li>
            <li>Pages visited and features used</li>
          </ul>

          <h2 className="heading-lg mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Provide and improve our services</li>
            <li>Process transactions and manage wallets</li>
            <li>Communicate with you about your account</li>
            <li>Prevent fraud and ensure platform security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="heading-lg mb-4">3. Information Sharing</h2>
          <p className="mb-4 text-gray-700">We share your information only in these circumstances:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>With other users as necessary for transactions (e.g., contact info for deliveries)</li>
            <li>With service providers who help operate our platform</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>

          <h2 className="heading-lg mb-4">4. Data Security</h2>
          <p className="mb-6 text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="heading-lg mb-4">5. Your Rights</h2>
          <p className="mb-4 text-gray-700">You have the right to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data</li>
          </ul>

          <h2 className="heading-lg mb-4">6. Cookies and Tracking</h2>
          <p className="mb-6 text-gray-700">
            We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. You can control cookies through your browser settings.
          </p>

          <h2 className="heading-lg mb-4">7. Children's Privacy</h2>
          <p className="mb-6 text-gray-700">
            Our platform is not intended for users under 18. We do not knowingly collect information from children.
          </p>

          <h2 className="heading-lg mb-4">8. Changes to Privacy Policy</h2>
          <p className="mb-6 text-gray-700">
            We may update this policy from time to time. We will notify you of significant changes via email or platform notification.
          </p>

          <h2 className="heading-lg mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            For privacy-related questions or requests, contact us at:<br />
            Email: privacy@fidelo.com<br />
            Phone: (212) 842-5500
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}