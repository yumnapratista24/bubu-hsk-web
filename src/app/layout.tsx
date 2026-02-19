import type { Metadata, Viewport } from 'next';
import { Figtree as FontBody } from 'next/font/google';

import { PageTracker } from '@/components/analytics/page-tracker';
import { Provider } from '@/components/ui/provider';
import { Layout } from '@/lib/layout';
import { GoogleAnalytics } from '@next/third-parties/google';

const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'BuBu HSK';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s | BuBu HSK' },
  description:
    'Step by Step HSK Learning - Learn Chinese characters systematically',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://bubu-hsk.sznm.dev',
    title: 'BuBu HSK - Step by Step HSK Learning',
    description:
      'Learn Chinese characters step by step with our HSK reading practice app',
    images: {
      url: 'https://og-image.sznm.dev/**bubu-hsk**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'BuBu HSK - Step by Step HSK Learning og-image',
    },
  },
  twitter: {
    creator: '@bubu_hsk',
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html className={fontBody.className} lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Layout>
            {children}
            <PageTracker />
          </Layout>
        </Provider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
};

export default RootLayout;
