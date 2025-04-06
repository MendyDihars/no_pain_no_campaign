import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-gray-950 text-gray-300">
        {children}
      </body>
    </html>
  );
}
