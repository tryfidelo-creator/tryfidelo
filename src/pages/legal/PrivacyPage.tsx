import { motion } from 'framer-motion';
import { Lock, Info, Share2, Shield, Eye, Cookie, Users, AlertCircle } from 'lucide-react';
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
    icon: Info,
    title: 'Information We Collect',
    subsections: [
      { 
        title: 'Personal Information',
        items: ['Name, email address, and phone number', 'Profile information and photos', 'Location data for deliveries and services']
      },
      { 
        title: 'Transaction Information',
        items: ['Listing details and service information', 'Chat messages and price negotiations', 'Wallet transactions and balances', 'Order history and delivery preferences']
      },
      { 
        title: 'Usage Information',
        items: ['Device information and IP address', 'Browser type and operating system', 'Pages visited and features used', 'Search queries and interaction patterns']
      }
    ]
  },
  {
    icon: Share2,
    title: 'How We Use Your Information',
    items: [
      'Provide and improve our services and features',
      'Process transactions and manage wallets',
      'Communicate with you about your account and updates',
      'Prevent fraud and ensure platform security',
      'Comply with legal obligations and law enforcement',
      'Send marketing communications (with your consent)',
      'Personalize your experience and recommendations'
    ]
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: 'We share your information only in these circumstances:',
    items: [
      'With other users as necessary for transactions (contact info for deliveries)',
      'With service providers who help operate our platform under strict confidentiality',
      'When required by law, court order, or government request',
      'In connection with a business transfer, acquisition, or bankruptcy',
      'With your explicit consent for specific purposes'
    ]
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement industry-standard technical and organizational measures to protect your personal information, including SSL encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and enable two-factor authentication.'
  },
  {
    icon: Eye,
    title: 'Your Rights',
    content: 'Depending on your location, you may have rights regarding your personal data:',
    items: [
      'Right to access your personal information',
      'Right to correct inaccurate or incomplete data',
      'Right to request deletion of your data',
      'Right to object to processing of your data',
      'Right to data portability (export your data)',
      'Right to withdraw consent at any time'
    ]
  },
  {
    icon: Cookie,
    title: 'Cookies and Tracking',
    content: 'We use cookies, pixels, and similar technologies to improve your experience, analyze usage patterns, and personalize content. These tools help us understand how users interact with our platform. You can control cookies through your browser settings, though disabling them may affect functionality.'
  },
  {
    icon: Users,
    title: 'Children\'s Privacy',
    content: 'Our platform is not intended for users under 18 years old. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will promptly delete such information and terminate the child\'s account.'
  },
  {
    icon: AlertCircle,
    title: 'Third-Party Links',
    content: 'Our platform may contain links to third-party websites and services. This privacy policy does not apply to external websites. We are not responsible for the privacy practices of third parties. Please review their privacy policies before providing your information.'
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
        <CardHeader className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
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

export function PrivacyPage() {
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
              <Shield className="w-10 h-10" />
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Your privacy and trust are our highest priority
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
              <strong>Our Commitment:</strong> We are committed to protecting your privacy and maintaining transparency about how we collect, use, and safeguard your personal information. This comprehensive policy explains our privacy practices and your rights.
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates & Changes</h3>
            <p className="text-gray-700 mb-4">
              We update this policy to reflect changes in our practices, technology, regulations, and user feedback. We notify users of material changes via email or prominent notice on the platform. Continued use implies acceptance of updates.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Privacy Inquiries & Requests</h3>
            <p className="text-gray-700 mb-4">
              Have questions or need to exercise your privacy rights? Our dedicated privacy team is here to help:
            </p>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold text-orange-600">Email</p>
                <p>privacy@fidelo.com</p>
              </div>
              <div>
                <p className="font-semibold text-orange-600">Phone</p>
                <p>+1 coming soon (Mon-Fri, 9am-6pm EST)</p>
              </div>
              <div>
                <p className="font-semibold text-orange-600">Mailing Address</p>
                <p>123 Business Street<br />New York, coming soon</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              We typically respond to requests within 30 days. Complex requests may take up to 90 days.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
