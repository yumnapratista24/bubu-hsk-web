import useSWR from 'swr';

import type { HskApiResponse, HskLevel } from '@/lib/types/hsk';
import { fetcher } from '@/lib/utils/fetcher';

interface UseHskWordsOptions {
  level: HskLevel;
  page?: number;
  limit?: number;
  fallbackData?: HskApiResponse;
}

export const useHskWords = ({
  level,
  page = 1,
  limit = 200,
  fallbackData,
}: UseHskWordsOptions) => {
  const url = `/api/hsk-words/${level}?page=${page}&limit=${limit}`;

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<HskApiResponse>(url, fetcher, {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    });

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    words: data?.data?.list || [],
    total: data?.data?.total || 0,
  };
};
