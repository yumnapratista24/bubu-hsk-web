import type { HskLevel } from '@/lib/types/hsk';

import { HskReadingPage } from './components/hsk-reading-page';

interface HskReadingPageProps {
  searchParams: Promise<{
    level?: string;
    page?: string;
  }>;
}

export default async function HskReading({
  searchParams,
}: HskReadingPageProps) {
  const params = await searchParams;
  const level = params.level
    ? (Number.parseInt(params.level, 10) as HskLevel)
    : 1;
  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const limit = 200;

  try {
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    const API_KEY = process.env.API_KEY;

    if (!(API_HOST && API_KEY)) {
      throw new Error('API configuration missing');
    }

    const apiUrl = `${API_HOST}/api/hsk-sources/${level}/words?page=${page}&limit=${limit}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return (
      <HskReadingPage
        initialData={data}
        initialLevel={level}
        initialPage={page}
      />
    );
  } catch (error) {
    console.error('Failed to fetch HSK words:', error);
    return (
      <HskReadingPage
        error={error instanceof Error ? error.message : 'Unknown error'}
        initialLevel={level}
      />
    );
  }
}
