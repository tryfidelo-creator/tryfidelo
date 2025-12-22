import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Briefcase, Truck, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/lib/constants/routes';

const features = [
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Buy and sell products with ease',
    items: [
      'Post unlimited ads',
      'Negotiate prices',
      'Secure transactions',
      'Wide product range',
    ],
  },
  {
    icon: Briefcase,
    title: 'Services',
    description: 'Book professional services',
    items: [
      'Verified providers',
      'Flexible pricing',
      'Easy booking',
      'Quality assurance',
    ],
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Fast and reliable parcel delivery',
    items: [
      'Real-time tracking',
      'Flexible pricing',
      'Instant booking',
      'Safe delivery',
    ],
  },
  {
    icon: HeadphonesIcon,
    title: 'Chat & Support',
    description: 'Connect with buyers and sellers',
    items: [
      '24/7 live chat',
      'Dispute resolution',
      'Price negotiation',
      'Instant messaging',
    ],
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/1920/800?blur=2"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="heading-display font-serif mb-6 text-white">
              YOUR COMPLETE
              <br />
              <span className="gradient-text">
                MARKETPLACE SOLUTION
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Buy products, book services, and send packages all in one platform. Connect with trusted vendors and riders across the nation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={ROUTES.MARKETPLACE}>
                <Button className="bg-brand-yellow text-black hover:bg-brand-orange btn-rounded-full text-lg h-14 px-8">
                  Explore
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button variant="outline" className="border-2 border-white text-white bg-black hover:bg-white hover:text-black btn-rounded-full text-lg h-14 px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cream py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-orange text-lg font-semibold mb-4">
              Redefining access to services, trade, and delivery for
            </p>
            <h2 className="heading-display font-serif text-brand-red mb-12">
              MILLIONS OF PEOPLE
            </h2>
            <div className="max-w-3xl mx-auto">
              <img
                src="https://picsum.photos/900/500?random=1"
                alt="Marketplace showcase"
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-brand-orange text-lg font-semibold mb-2">One Platform</p>
            <h2 className="heading-display font-serif text-brand-red">
              EVERYTHING YOU NEED
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full bg-gray-50">
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-full flex items-center justify-center shadow-lg">
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm">{feature.description}</p>
                    <ul className="text-sm text-left space-y-3 w-full">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-brand-yellow font-bold flex-shrink-0">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://picsum.photos/1920/800?blur=3"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-display font-serif mb-4 text-brand-yellow">
              READY TO GET STARTED?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users already enjoying our platform
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button className="bg-brand-yellow text-black hover:bg-brand-orange btn-rounded-full text-lg h-14 px-12">
                Create Free Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-serif font-bold mb-2">
                <span className="text-brand-orange">Try</span>
                <br />
                <span className="text-brand-red">Fidelo</span>
              </h3>
            </div>
            <div className="text-center md:text-right text-sm text-gray-600">
              <p>hellogofidelo.com</p>
              <p>(212) 842-5500</p>
              <p className="mt-2">456 Anywhere St.</p>
              <p>Any City, ST 12345</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-brand-yellow transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  f
                </div>
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-yellow transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  t
                </div>
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-yellow transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  in
                </div>
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-yellow transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  yt
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}