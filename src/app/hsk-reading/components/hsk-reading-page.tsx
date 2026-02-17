'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { LuShuffle } from 'react-icons/lu';

import { DialoguePanel } from '@/components/hsk-reading/dialogue-panel';
import { HanziCard } from '@/components/hsk-reading/hanzi-card';
import { HanziDetailSheet } from '@/components/hsk-reading/hanzi-detail-sheet';
import { HanziPopoverCard } from '@/components/hsk-reading/hanzi-popover-card';
import { LevelSelect } from '@/components/hsk-reading/level-select';
import { LevelSelectSheet } from '@/components/hsk-reading/level-select-sheet';
import { useHskWords } from '@/lib/hooks/use-hsk-words';
import type { HanziWord, HskApiResponse, HskLevel } from '@/lib/types/hsk';

interface HskReadingPageProps {
  initialData: HskApiResponse | null;
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
  const [selectedLevel, setSelectedLevel] = useState<HskLevel>(initialLevel);
  const [selectedHanzi, setSelectedHanzi] = useState<HanziWord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<Array<HanziWord>>([]);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  // Use SWR with SSR fallback data
  const { words, total, isLoading, error } = useHskWords({
    level: selectedLevel,
    page: initialPage,
    fallbackData:
      selectedLevel === initialLevel ? (initialData ?? undefined) : undefined,
  });

  // Handle level change - updates state, SWR fetches new data
  const handleLevelChange = (level: string) => {
    const newLevel = Number.parseInt(level, 10) as HskLevel;
    setSelectedLevel(newLevel);
  };

  const handleCardClick = (hanzi: HanziWord) => {
    setSelectedHanzi(hanzi);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHanzi(null);
  };

  const handleShuffle = () => {
    const currentWords = shuffledWords.length > 0 ? shuffledWords : words;
    const shuffled = [...currentWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  };

  const displayWords = shuffledWords.length > 0 ? shuffledWords : words;

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

  const renderHanziContent = () => {
    if (isLoading) {
      return (
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{
            base: 'repeat(3, 1fr)',
            md: 'repeat(auto-fill, minmax(100px, 1fr))',
          }}
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <Skeleton
              borderRadius="lg"
              h={{ base: '80px', md: '72px' }}
              key={`skeleton-${String(index)}`}
            />
          ))}
        </Box>
      );
    }

    if (words.length === 0) {
      return (
        <Box py={12} textAlign="center">
          <Text color={subtitleColor}>
            No words found for HSK {selectedLevel}.
          </Text>
        </Box>
      );
    }

    return (
      <VStack gap={6}>
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{
            base: 'repeat(3, 1fr)',
            md: 'repeat(auto-fill, minmax(100px, 1fr))',
          }}
          width="full"
        >
          {displayWords.map((hanzi: HanziWord) =>
            isDesktop ? (
              <HanziPopoverCard hanzi={hanzi} key={hanzi.id} />
            ) : (
              <HanziCard
                hanzi={hanzi}
                key={hanzi.id}
                onClick={() => handleCardClick(hanzi)}
              />
            )
          )}
        </Box>

        {words.length < total && (
          <Box textAlign="center">
            <Button variant="outline">Load More</Button>
          </Box>
        )}
      </VStack>
    );
  };

  if (initialError || error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" mb={4}>
          {initialError || 'Failed to load HSK words'}
        </Text>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box px={{ base: 2, md: 6 }} py={{ base: 4, md: 6 }}>
      {/* Header */}
      <Stack align="center" gap={3} mb={6}>
        <Heading
          color={textColor}
          size={{ base: 'xl', md: '3xl' }}
          textAlign="center"
        >
          步步 HSK - Bù Bù HSK
        </Heading>
        <Text
          color={subtitleColor}
          fontSize={{ base: 'sm', md: 'lg' }}
          textAlign="center"
        >
          Step by Step HSK Learning.
          <br />
          Mastering Chinese characters are not easy.
          <br />
          You need consistency and practice.
          <br />
          Start by re-reading the words you already know.
          <br />
          Then explore more texts through reading exercises.
        </Text>

        {/* HSK Level Filter */}
        <Stack align="center" direction="row" gap={3}>
          {isDesktop ? (
            <LevelSelect onChange={handleLevelChange} value={selectedLevel} />
          ) : (
            <LevelSelectSheet
              onChange={handleLevelChange}
              value={selectedLevel}
            />
          )}

          <Button onClick={handleShuffle} size="sm" variant="outline">
            <LuShuffle />
            Shuffle
          </Button>

          <Text color={subtitleColor} fontSize="sm">
            {isLoading ? '...' : `${total} words`}
          </Text>
        </Stack>
      </Stack>

      {/* Main Content - Desktop: Split Layout */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
        {/* Hanzi Grid */}
        <Box flex={{ base: '1', md: '0 0 40%' }}>{renderHanziContent()}</Box>

        {/* Dialogue Panel - Desktop Only (Floating) */}
        {isDesktop && (
          <Box
            alignSelf="flex-start"
            flex="0 0 60%"
            maxW="60%"
            position="sticky"
            top="20px"
          >
            <DialoguePanel hskLevel={selectedLevel} />
          </Box>
        )}
      </Flex>

      {/* Mobile Bottom Sheet */}
      {!isDesktop && selectedHanzi && (
        <HanziDetailSheet
          hanzi={selectedHanzi}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </Box>
  );
};
