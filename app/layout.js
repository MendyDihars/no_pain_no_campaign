import { PenToolIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Lato } from 'next/font/google';
import Link from 'next/link';
import Sidebar from '@root/components/Sidebar';
import './globals.css';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'No Pain No Campaign',
  description: 'No Pain No Campaign'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`dark ${lato.className}`}>
      <body className="bg-background flex flex-col h-screen">
        <Toaster position="bottom-center" />
        <Sidebar />
        <main className="flex-1">
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
      </body>
    </html>
  );
}
