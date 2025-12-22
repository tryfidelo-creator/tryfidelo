import { Search, HelpCircle, MessageSquare, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'How do I create an account?', a: 'Click on "Get Started" and follow the registration process. You\'ll need to verify your email or phone number.' },
      { q: 'What are the different user roles?', a: 'We have Customers, Sellers, Service Providers, Delivery Riders, and Admins. Each role has specific features and capabilities.' },
    ],
  },
  {
    category: 'Marketplace',
    questions: [
      { q: 'How do I list a product?', a: 'Go to your dashboard, click "Create Listing", fill in the details, upload images, and set your price. A daily ad fee will be deducted from your wallet.' },
      { q: 'Can I negotiate prices?', a: 'Yes! All prices are negotiable. Use the chat feature to discuss and agree on a final price with buyers.' },
    ],
  },
  {
    category: 'Payments',
    questions: [
      { q: 'How do payments work?', a: 'All payments are made offline directly between parties. The platform does not handle customer payments.' },
      { q: 'What is the wallet for?', a: 'Sellers, Service Providers, and Riders use wallets to pay platform fees and commissions.' },
    ],
  },
  {
    category: 'Services',
    questions: [
      { q: 'How do I book a service?', a: 'Browse services, select a provider, chat to negotiate price, and confirm the booking.' },
      { q: 'What is the service commission?', a: 'Service providers pay a 10% commission on confirmed bookings, deducted from their wallet.' },
    ],
  },
];

export function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="heading-display mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">Search our knowledge base or browse categories below</p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help..."
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-yellow rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">FAQs</h3>
              <p className="text-sm text-gray-600">Find answers to common questions</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-orange rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Chat with our support team</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-red rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">Get help via email</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Frequently Asked Questions</h2>
          {faqs.map((category, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-brand-red">{category.category}</h3>
              <Accordion type="single" collapsible className="bg-white rounded-lg">
                {category.questions.map((faq, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger className="px-6">{faq.q}</AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}