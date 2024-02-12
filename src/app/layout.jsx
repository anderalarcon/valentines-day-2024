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
        <link rel="canonical" href="https://valentines-day-2024-nu.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title"
          content="¡Sorprende con Amor! San Valentín 2024: Mensajes Personalizados y Detalles Especiales" />
        <meta property="og:description" content="Sorprende a tu pareja este San Valentin" />
        <meta property="og:image"
          content="https://i.ytimg.com/vi/OJ2mfZAwVQ8/maxresdefault.jpg" />
        <meta property="og:url" content="https://valentines-day-2024-nu.vercel.app/" />
        <meta name="twitter:title"
          content="¡Sorprende con Amor! San Valentín 2024: Mensajes Personalizados y Detalles Especiales" />
        <meta name="twitter:description" content="Sorprende a tu pareja este San Valentin" />
        <meta name="twitter:image"
          content="https://i.ytimg.com/vi/OJ2mfZAwVQ8/maxresdefault.jpg" />
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
