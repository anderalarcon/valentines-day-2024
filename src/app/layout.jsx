import localFont from 'next/font/local';
import './globals.scss';
import { Suspense } from 'react';

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Proxima Nova Black.otf',
      weight: '900',
      style: 'normal'
    }
  ],
  display: 'swap'
});

export const metadata = {
  title: 'San Valentin 2024',
  description: 'Sorprende a tu pareja este San Valentin'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}
    >
      <head>
        <link rel="canonical" href="https://valentines-day-2024-m8rz0rd0k-anderalarcon.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="San Valentin 2024" />
        <meta property="og:description" content="Sorprende a tu pareja este San Valentin" />
        <meta property="og:image"
          content="https://i.pinimg.com/originals/2b/18/1c/2b181cbe4bc9e1cdf33e39d7ce2df5fd.jpg" />
        <meta property="og:url" content="https://valentines-day-2024-m8rz0rd0k-anderalarcon.vercel.app/" />
        <meta name="twitter:title" content="San Valentin 2024" />
        <meta name="twitter:description" content="Sorprende a tu pareja este San Valentin" />
        <meta name="twitter:image"
          content="https://i.pinimg.com/originals/2b/18/1c/2b181cbe4bc9e1cdf33e39d7ce2df5fd.jpg" />
        <meta name="twitter:card" content="summary_large_image" />

      </head>
      <body>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
