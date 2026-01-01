import { motion } from 'framer-motion';
import { FileText, Shield, Users, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Section {
  icon: any;
  title: string;
  content?: string;
  items?: string[];
  subsections?: any[];
}

const sections: Section[] = [
  {
    icon: Shield,
    title: 'Acceptance of Terms',
    content: 'By accessing and using the Fidelo platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.'
  },
  {
    icon: Users,
    title: 'User Roles and Responsibilities',
    subsections: [
      { title: 'Customers/Buyers', items: ['Browse and purchase products and services', 'Communicate respectfully with sellers and providers', 'Make payments as agreed', 'Accept responsibility for their accounts'] },
      { title: 'Sellers', items: ['Maintain accurate product listings', 'Maintain sufficient wallet balance for fees', 'Honor negotiated prices', 'Deliver products as described'] },
      { title: 'Service Providers', items: ['Provide services as advertised', 'Maintain professional conduct', 'Complete bookings timely and professionally', 'Handle customer inquiries promptly'] },
      { title: 'Delivery Partners', items: ['Handle parcels with care and responsibility', 'Maintain sufficient wallet balance', 'Complete deliveries in timely manner', 'Update delivery status regularly'] }
    ]
  },
  {
    icon: CreditCard,
    title: 'Payment and Wallet',
    content: 'All payments between buyers and sellers are handled offline. Fidelo provides a wallet system for managing platform fees and commissions. Users are responsible for maintaining sufficient balance for service fees.'
  },
  {
    icon: AlertCircle,
    title: 'Prohibited Activities',
    items: [
      'Harassment, abuse, or intimidation of other users',
      'Posting false or misleading information',
      'Engaging in fraudulent transactions',
      'Attempting to access another user\'s account',
      'Violating intellectual property rights',
      'Violating local laws or regulations'
    ]
  },
  {
    icon: FileText,
    title: 'Content Ownership',
    content: 'You retain all rights to your content. By uploading content, you grant Fidelo a worldwide, non-exclusive license to use, display, and distribute your content on our platform.'
  },
  {
    icon: CheckCircle,
    title: 'Limitation of Liability',
    content: 'Fidelo is provided on an "as is" basis. We do not guarantee uninterrupted service or that all defects will be corrected. To the fullest extent permitted by law, Fidelo shall not be liable for any indirect, incidental, special, or consequential damages.'
  }
];

function SectionCard({ icon: Icon, title, content, items, subsections }: Section) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-start gap-4">
            <Icon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
            <CardTitle className="text-2xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {content && <p className="text-gray-700 leading-relaxed mb-4">{content}</p>}
          {items && (
            <ul className="space-y-3">
              {items.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {subsections && (
            <div className="space-y-6">
              {subsections.map((sub: any, idx: number) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">{sub.title}</h4>
                  <ul className="space-y-2 ml-4">
                    {sub.items.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white flex flex-col">
      <Header />

      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-12 md:py-16 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
              <FileText className="w-10 h-10" />
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Please read these terms carefully before using Fidelo
            </p>
            <p className="text-white/80">Last updated: January 1, 2026</p>
          </motion.div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-12"
          >
            <p className="text-blue-900 font-medium">
              <strong>Important:</strong> These Terms of Service govern your use of the Fidelo platform. By continuing to access our services, you agree to all terms outlined below.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <SectionCard key={idx} {...section} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-lg border-2 border-orange-200 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
            <p className="text-gray-700 mb-6">
              Contact our Legal and Compliance team if you have questions or concerns about these Terms of Service:
            </p>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold text-orange-600">Email</p>
                <p>legal@fidelo.com</p>
              </div>
              <div>
                <p className="font-semibold text-orange-600">Support Portal</p>
                <p>Visit help.fidelo.com for live chat with our legal support team</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded border-l-4 border-orange-500">
              <p className="text-gray-600 text-sm">
                <strong>Important:</strong> We reserve the right to update these terms at any time. Significant changes will be communicated via email or platform notification. Continued use of fidelo signifies acceptance of updated terms.
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Effective Date: January 1, 2026 | Last Updated: January 1, 2026
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
