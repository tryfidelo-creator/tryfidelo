import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Visit the registration page and provide your email, phone number, and create a password. You\'ll receive a verification code to confirm your identity. Complete your profile with a photo and basic information to get started.'
      },
      {
        q: 'What are the different user roles?',
        a: 'Fidelo supports multiple roles: Buyers (purchase products/services), Sellers (list products/services), Service Providers (offer services), and Delivery Partners (handle shipments). You can have multiple roles on one account.'
      },
      {
        q: 'Is there a registration fee?',
        a: 'Registration is completely free for all users. Sellers and Service Providers may need to verify their business information, but there\'s no cost to sign up.'
      },
    ]
  },
  {
    category: 'Buying & Marketplace',
    questions: [
      {
        q: 'How do I search for products or services?',
        a: 'Use the search bar on the homepage or marketplace. You can filter by category, price range, ratings, and location. Use advanced filters to narrow down your search results.'
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept credit/debit cards, mobile wallets, and bank transfers. You can also use your Fidelo wallet for quick transactions.'
      },
      {
        q: 'What if I\'m not satisfied with my purchase?',
        a: 'We offer a 7-day return policy for most items. Contact our support team or the seller directly to initiate a return. Items must be in original condition with all packaging.'
      },
    ]
  },
  {
    category: 'Selling & Services',
    questions: [
      {
        q: 'How do I list a product or service?',
        a: 'Go to your dashboard, click "Create New Listing", and fill in the details including title, description, price, photos, and category. Review and publish your listing. It will be live within minutes.'
      },
      {
        q: 'What are the seller fees?',
        a: 'We charge a commission based on category (typically 5-10%). Additional fees may apply for promoted listings or special features. View our pricing page for detailed fee structure.'
      },
      {
        q: 'How do I get paid?',
        a: 'Earnings are credited to your Fidelo wallet. You can withdraw to your bank account anytime. Withdrawals typically process within 1-2 business days.'
      },
    ]
  },
];

function FAQSection({ category, questions }: { category: string; questions: any[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
      {questions.map((item, idx) => (
        <motion.div
          key={idx}
          initial={false}
          className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors"
        >
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-yellow-50 transition-colors"
          >
            <span className="font-semibold text-left text-gray-900">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-orange-500 flex-shrink-0 ml-4 transition-transform ${
                expanded === idx ? 'rotate-180' : ''
              }`}
            />
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: expanded === idx ? 'auto' : 0,
              opacity: expanded === idx ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('Getting Started');
  const categories = faqs.map(f => f.category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white flex flex-col">
      <Header />

      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-lg md:text-xl text-white/90">Find answers to common questions and get support</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <CardHeader>
              <MessageCircle className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <CardHeader>
              <Mail className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">support@Fidelo.com</p>
              <Button variant="outline" className="w-full border-orange-200">Send Email</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
            <CardHeader>
              <Phone className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Phone Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">+1 (555) 123-4567</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Mon-Fri, 9am-6pm
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-12 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {faqs.map((section, idx) => (
            selectedCategory === section.category && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FAQSection category={section.category} questions={section.questions} />
              </motion.div>
            )
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-100 to-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Still need help?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our friendly support team is always ready to help. Contact us through any of our available channels.
          </p>
          <Link to={ROUTES.CONTACT}>
            <Button className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold h-12 px-8 rounded-lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
