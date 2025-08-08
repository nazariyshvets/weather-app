import type { Metadata } from 'next';
import './globals.css';

import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A beautiful weather app showing weather in selected cities',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
