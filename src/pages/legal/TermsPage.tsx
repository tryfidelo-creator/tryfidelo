import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="heading-display mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: December 21, 2025</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="heading-lg mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6 text-gray-700">
            By accessing and using Fidelo platform, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="heading-lg mb-4">2. User Roles and Responsibilities</h2>
          <h3 className="text-xl font-semibold mb-3">2.1 Customers/Buyers</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Browse and purchase products and services</li>
            <li>Communicate respectfully with sellers and providers</li>
            <li>Make offline payments as agreed</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Sellers</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Maintain accurate product listings</li>
            <li>Maintain sufficient wallet balance for daily ad fees</li>
            <li>Honor negotiated prices</li>
            <li>Deliver products as described</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.3 Service Providers</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide services as advertised</li>
            <li>Maintain sufficient wallet balance for commission deductions</li>
            <li>Complete bookings professionally</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.4 Delivery Riders</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Handle parcels with care</li>
            <li>Maintain sufficient wallet balance for commission deductions</li>
            <li>Complete deliveries in a timely manner</li>
          </ul>

          <h2 className="heading-lg mb-4">3. Payment Terms</h2>
          <p className="mb-4 text-gray-700">
            All customer payments are made offline. The platform does not handle customer money.
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Sellers pay a fixed daily ad fee</li>
            <li>Service providers pay 10% commission on confirmed bookings</li>
            <li>Delivery riders pay 7% commission at pickup</li>
          </ul>

          <h2 className="heading-lg mb-4">4. Price Negotiation</h2>
          <p className="mb-6 text-gray-700">
            All prices are negotiable. Once a price is agreed upon through chat, it becomes binding and cannot be changed.
          </p>

          <h2 className="heading-lg mb-4">5. Wallet System</h2>
          <p className="mb-4 text-gray-700">
            Only earners (Sellers, Service Providers, and Delivery Riders) have wallets:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Automatic deductions for fees and commissions</li>
            <li>Manual top-ups by admin</li>
            <li>Insufficient balance may pause listings or prevent transactions</li>
          </ul>

          <h2 className="heading-lg mb-4">6. Prohibited Activities</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Fraudulent listings or services</li>
            <li>Harassment or abusive behavior</li>
            <li>Circumventing platform fees</li>
            <li>Posting illegal content</li>
          </ul>

          <h2 className="heading-lg mb-4">7. Dispute Resolution</h2>
          <p className="mb-6 text-gray-700">
            Disputes will be reviewed by platform administrators. Users agree to cooperate with the resolution process.
          </p>

          <h2 className="heading-lg mb-4">8. Limitation of Liability</h2>
          <p className="mb-6 text-gray-700">
            Fidelo is a platform connecting users. We are not responsible for the quality of products, services, or deliveries. Users transact at their own risk.
          </p>

          <h2 className="heading-lg mb-4">9. Changes to Terms</h2>
          <p className="mb-6 text-gray-700">
            We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.
          </p>

          <h2 className="heading-lg mb-4">10. Contact</h2>
          <p className="text-gray-700">
            For questions about these terms, contact us at legal@fidelo.com
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}