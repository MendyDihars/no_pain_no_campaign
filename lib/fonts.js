import { Lato } from 'next/font/google';
import localFont from 'next/font/local';

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

export const roxborough = localFont({
  src: './Roxborough CF.ttf',
  display: 'swap',
  variable: '--font-roxborough',
});
