import localFont from 'next/font/local';
import './globals.scss';

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
  description: 'Developed by 4A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}
