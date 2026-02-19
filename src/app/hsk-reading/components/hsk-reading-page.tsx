'use client';

import {
  Box,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';

import { PracticeHubSection } from '@/app/hsk-reading/components/practice-hub-section';
import { ReadingHubSection } from '@/app/hsk-reading/components/reading-hub-section';
import type { HskApiResponse, HskLevel } from '@/lib/types/hsk';

interface HskReadingPageProps {
  initialData?: HskApiResponse;
  initialLevel: HskLevel;
  initialPage?: number;
  error?: string;
}

export const HskReadingPage = ({
  initialData,
  initialLevel,
  initialPage = 1,
  error: initialError,
}: HskReadingPageProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

  if (initialError) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" mb={4}>
          {initialError || 'Failed to load HSK words'}
        </Text>
      </Box>
    );
  }

  return (
    <Box px={{ base: 2, md: 6 }} py={{ base: 4, md: 6 }}>
      {/* Header */}
      <Stack align="center" gap={3} mb={6}>
        <Heading
          color={textColor}
          size={{ base: '2xl', md: '4xl' }}
          textAlign="center"
        >
          步步 HSK - Bù Bù HSK
        </Heading>
        <Text
          color={subtitleColor}
          fontSize={{ base: 'sm', md: 'lg' }}
          textAlign="center"
        >
          Your complete HSK learning companion
        </Text>
      </Stack>

      {/* Desktop: Vertical Sections */}
      {isDesktop ? (
        <VStack gap={0} width="full">
          <ReadingHubSection />
          <PracticeHubSection
            initialData={initialData}
            initialLevel={initialLevel}
            initialPage={initialPage}
            error={initialError}
          />
        </VStack>
      ) : (
        // Mobile: Practice Hub Only (Reading Hub is separate page)
        <PracticeHubSection
          initialData={initialData}
          initialLevel={initialLevel}
          initialPage={initialPage}
          error={initialError}
        />
      )}
    </Box>
  );
};
