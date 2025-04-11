import { Lato } from 'next/font/google';
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
      <body className="bg-gray-950 text-gray-300">
        {children}
      </body>
    </html>
  );
}
