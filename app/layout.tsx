import type { Metadata } from 'next';
import './globals.css';
import { arvo, nunito } from '@/public/fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${arvo.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
