import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: {
    default: 'Slice & Spice | Premium Fast Food Delivery',
    template: '%s | Slice & Spice'
  },
  description: 'Experience the ultimate taste with Slice & Spice. Artisanal sourdough pizzas, bold exotic burgers, and premium organic juices delivered in 30 minutes.',
  keywords: ['premium fast food', 'artisanal pizza', 'gourmet burgers', 'Nairobi delivery', 'Slice & Spice'],
  authors: [{ name: 'Slice & Spice Group' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://slice-spice.com',
    siteName: 'Slice & Spice',
    title: 'Slice & Spice | Premium Fast Food',
    description: 'The Gold Standard of Fast Food. Artisanal precision meets bold flavor innovation.',
    images: [
      {
        url: 'https://picsum.photos/seed/ss-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Slice & Spice Experience',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
        <FirebaseClientProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
