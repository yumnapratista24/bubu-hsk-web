'use client';

import { Box, Button, Heading, Skeleton, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { LuShuffle } from 'react-icons/lu';

import { HanziCard } from '@/components/hsk-reading/hanzi-card';
import { HanziDetailSheet } from '@/components/hsk-reading/hanzi-detail-sheet';
import { HanziPopoverCard } from '@/components/hsk-reading/hanzi-popover-card';
import { LevelSelect } from '@/components/hsk-reading/level-select';
import { LevelSelectSheet } from '@/components/hsk-reading/level-select-sheet';
import { useHskWords } from '@/lib/hooks/use-hsk-words';
import type { HanziWord, HskApiResponse, HskLevel } from '@/lib/types/hsk';

interface PracticeHubSectionProps {
  initialData?: HskApiResponse;
  initialLevel: HskLevel;
  initialPage?: number;
  error?: string;
}

export const PracticeHubSection = ({
  initialData,
  initialLevel,
  initialPage = 1,
  error: initialError,
}: PracticeHubSectionProps) => {
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
    fallbackData: initialData,
  });

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

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
        {/* Hanzi Grid - 3 lines with horizontal scrolling for desktop */}
        {isDesktop ? (
          <Box
            display="flex"
            flexDirection="column"
            gap={4}
            width="full"
            height="280px" // Balanced height
            overflowX="auto"
            overflowY="hidden"
            css={{
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: isDark ? '#1e293b' : '#f1f5f9',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDark ? '#475569' : '#cbd5e1',
                borderRadius: '4px',
              },
            }}
          >
            {/* Create 3 rows */}
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <Box
                key={`row-${rowIndex}`}
                display="flex"
                gap={4}
                minWidth="max-content"
              >
                {displayWords
                  .slice(rowIndex * Math.ceil(displayWords.length / 3), (rowIndex + 1) * Math.ceil(displayWords.length / 3))
                  .map((hanzi: HanziWord) => (
                    <Box key={hanzi.id} minW="100px">
                      <HanziPopoverCard hanzi={hanzi} />
                    </Box>
                  ))}
              </Box>
            ))}
          </Box>
        ) : (
          // Vertical Grid for Mobile
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{
              base: 'repeat(3, 1fr)',
              md: 'repeat(auto-fill, minmax(100px, 1fr))',
            }}
            width="full"
          >
            {displayWords.map((hanzi: HanziWord) => (
              <HanziCard
                hanzi={hanzi}
                key={hanzi.id}
                onClick={() => handleCardClick(hanzi)}
              />
            ))}
          </Box>
        )}

        {/* Load More Button */}
        {words.length < total && (
          <Box textAlign="center">
            <Text color={subtitleColor} fontSize="sm">
              {isLoading ? '...' : `${total} words`}
            </Text>
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
      </Box>
    );
  }

  return (
    <Box id="practice-hub" py={8} borderTop="1px solid" borderColor={isDark ? '#475569' : '#e2e8f0'}>
      {/* Section Header */}
      <Stack align="center" gap={4} mb={8}>
        <Heading color={textColor} size={{ base: '2xl', md: '3xl' }} textAlign="center">
          Practice Hub
        </Heading>
        <Text color={subtitleColor} fontSize={{ base: 'sm', md: 'md' }} textAlign="center" maxW="600px">
          Welcome to the practice hub, this is your place to practice each word, shuffle the words for better 
          memorization, and check the detail to understand the meaning
        </Text>

        {/* HSK Level Filter and Shuffle */}
        <Stack align="center" direction="row" gap={3}>
          {isDesktop ? (
            <LevelSelect onChange={handleLevelChange} value={selectedLevel} />
          ) : (
            <LevelSelectSheet onChange={handleLevelChange} value={selectedLevel} />
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

      {/* Hanzi Content */}
      <Box maxW="6xl" mx="auto">
        {renderHanziContent()}
      </Box>

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
