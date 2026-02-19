'use client';

import {
  Box,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { LevelSelect } from '@/components/hsk-reading/level-select';
import { LevelSelectSheet } from '@/components/hsk-reading/level-select-sheet';
import { TabbedDialoguePanel } from '@/components/hsk-reading/tabbed-dialogue-panel';
import type { HskLevel } from '@/lib/types/hsk';

export const ReadingHubSection = () => {
  const [selectedLevel, setSelectedLevel] = useState<HskLevel>(1);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

  const handleLevelChange = (level: string) => {
    const newLevel = Number.parseInt(level, 10) as HskLevel;
    setSelectedLevel(newLevel);
  };

  return (
    <Box id="reading-hub" py={8}>
      {/* Section Header */}
      <Stack align="center" gap={4} mb={8}>
        <Heading
          color={textColor}
          size={{ base: '2xl', md: '3xl' }}
          textAlign="center"
        >
          Reading Hub
        </Heading>
        <Text
          color={subtitleColor}
          fontSize={{ base: 'sm', md: 'md' }}
          maxW="600px"
          textAlign="center"
        >
          Welcome to the reading hub, this is your place to exercise your
          Chinese characters reading skills. Feel free to generate, and
          re-generate the text!
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
        </Stack>
      </Stack>

      {/* Tabbed Dialogue Panel - Larger Container */}
      <Box maxW="4xl" mx="auto">
        <TabbedDialoguePanel hskLevel={selectedLevel} />
      </Box>
    </Box>
  );
};
