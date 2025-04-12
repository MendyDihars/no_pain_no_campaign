import { lato } from '@root/lib/fonts';
import './globals.css';

export const metadata = {
  title: 'No Pain No Campaign',
  description: 'No Pain No Campaign'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={lato.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
