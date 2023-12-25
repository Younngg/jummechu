import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import AuthContext from '@/context/AuthContext';
import Header from '@/components/Header';
import QueryClientContext from '@/context/QueryClientContext';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={sans.className}>
        <AuthContext>
          <header className='border-b'>
            <div className='max-w-screen-md mx-auto'>
              <Header />
            </div>
          </header>
          <main className='max-w-screen-md mx-auto'>
            <QueryClientContext>{children}</QueryClientContext>
          </main>
        </AuthContext>
        <div id='modal' />
      </body>
    </html>
  );
}
