import { PenToolIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Sidebar from '@root/components/Sidebar';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@root/i18n/routing';

export default async function Layout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <NextIntlClientProvider>
        <Toaster position="bottom-center" />
        <Sidebar />
        <main className="flex-1  overflow-auto">
          {children}
        </main>
        <footer className="bg-background text-white flex justify-between py-2 px-4 text-xs">
          <p />
          <p>
            &copy; {new Date().getFullYear()} No Pain No Campaign. Tous droits réservés.
          </p>
          <p>
            <Link href="/admin">
              <PenToolIcon className="w-4 h-4" />
            </Link>
          </p>
        </footer>
      </NextIntlClientProvider>
    </div>
  )
}
