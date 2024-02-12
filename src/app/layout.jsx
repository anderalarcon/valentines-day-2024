import localFont from 'next/font/local';
import './globals.scss';

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/ProximaNova-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Proxima Nova Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Proxima Nova Extrabold.otf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Proxima Nova Black.otf',
      weight: '900',
      style: 'normal'
    }
  ],
  display: 'swap'
});

export const metadata = {
  title: 'San Valentin',
  description: 'Developed by 4A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}
