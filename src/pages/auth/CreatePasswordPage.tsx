import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/lib/constants/routes';

export function CreatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      // TODO: API call to create password
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 w-fit">
            <Logo size="sm" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-4xl font-serif font-bold text-center mb-12">
            Enter a new password
          </h1>

          <form onSubmit={handleSave} className="space-y-6">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="h-16 text-lg border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-black"
              required
              minLength={8}
            />

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="retype password"
              className="h-16 text-lg border-2 border-black rounded-none focus-visible:ring-0 focus-visible:border-black"
              required
              minLength={8}
            />

            <Button
              type="submit"
              disabled={password !== confirmPassword || password.length < 8}
              className="w-full h-16 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              Save
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}