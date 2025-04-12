'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@root/components/ui/Button';
import { signIn } from '@root/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';  
import { useTranslations } from 'next-intl';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const t = useTranslations();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn.email({
      email,
      password,
    });
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success('Connexion réussie');
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{t('Login.welcome')}</h2>
          <p className="mt-2 text-sm text-white">
            {t('Login.welcome')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                {t('Login.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                {t('Login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-white focus:ring-secondary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                {t('Login.rememberMe')}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:text-gray-300">
                {t('Login.forgotPassword')}
              </a>
            </div>
          </div>

          <Button type="submit">
            {t('Login.loginButton')}
          </Button>
        </form>

        <div className="flex items-center justify-end gap-2 text-xs">
          <div>
            {t('Login.noAccount')}
          </div>
          <a href="/admin/signup" className="text-white hover:text-gray-300">
            {t('Login.signup')}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

