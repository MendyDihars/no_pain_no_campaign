import { Lato } from 'next/font/google';
import localFont from 'next/font/local';

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

export const roxborough = localFont({
  src: './roxborough/roxborough-regular.ttf',
  display: 'swap',
  variable: '--font-roxborough',
  style: 'normal',
});

export const roxboroughItalic = localFont({
  src: './roxborough/roxborough-regular-italic.otf',
  display: 'swap',
  variable: '--font-roxborough-italic',
  style: 'italic',
});
