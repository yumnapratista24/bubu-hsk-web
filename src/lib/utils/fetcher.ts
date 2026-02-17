import type { HskApiResponse } from '@/lib/types/hsk';

export const fetcher = async (url: string): Promise<HskApiResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
