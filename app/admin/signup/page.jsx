'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { signUp } from '@root/lib/auth-client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const schema = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    });
    const validation = schema.safeParse(formData);
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
    } else if (!validation.success) {
      const fields = validation.error.issues.map((issue) => issue.validation);
      toast.error(`Les champs suivants sont invalides: ${fields.join(', ')}`);
    } else {
      const res = await signUp.email({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      })
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success('Inscription réussie');
        router.push('/admin');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Créer un compte</h2>
          <p className="mt-2 text-sm text-white">
            Rejoignez-nous et commencez votre voyage
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Jean"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 text-white block w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-gray-300 focus:border-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-white focus:ring-secondary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-white">
              J'accepte les{' '}
              <a href="#" className="text-white hover:text-gray-300">
                conditions d'utilisation
              </a>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            S'inscrire
          </motion.button>

          <div className="flex justify-end gap-2 text-xs text-white">
            <div>
              Déjà un compte ?
            </div>
            <a href="/admin/login" className="text-white hover:text-gray-300">
              Se connecter
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

