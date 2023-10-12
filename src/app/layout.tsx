import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserContextProvider } from '@/utils/contexts/UserContext';
import NavBar from '@/components/navBar/NavBar';
const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Trouve ton festival',
  description:
    'met toi en relation avec les festivaliers de ta région et trouve ton festival',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <UserContextProvider>
          <NavBar />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
