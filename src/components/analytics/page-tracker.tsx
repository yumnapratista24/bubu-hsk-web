'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useAnalytics } from '@/lib/hooks/use-analytics';

export const PageTracker = () => {
  const pathname = usePathname();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page view when pathname changes
    if (pathname) {
      const pageTitle = getPageTitle(pathname);
      trackPageView(pathname, pageTitle);
    }
  }, [pathname, trackPageView]);

  return null; // This component doesn't render anything
};

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/hsk-reading':
      return 'HSK Reading';
    case '/hsk-text':
      return 'HSK Text Generator';
    default:
      // Extract page name from pathname
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        return segments[segments.length - 1]
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return 'Unknown Page';
  }
};
