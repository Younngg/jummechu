import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import AuthContext from '@/context/AuthContext';
import Header from '@/components/Header';
import QueryClientContext from '@/context/QueryClientContext';
import Script from 'next/script';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '점메추',
  description: '메뉴 투표 사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${sans.className} max-w-full overflow-x-hidden`}>
        <AuthContext>
          <header className='border-b'>
            <div className='md:max-w-screen-md mx-auto'>
              <Header />
            </div>
          </header>
          <main className='md:max-w-screen-md mx-auto'>
            <QueryClientContext>{children}</QueryClientContext>
          </main>
        </AuthContext>
        <div id='modal' />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_CLIENT_ID}&libraries=services,clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
        <Script
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js'
          integrity='sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8'
          crossOrigin='anonymous'
        />
      </body>
    </html>
  );
}
