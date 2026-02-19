'use client';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { LevelSelectSheet } from '@/components/hsk-reading/level-select-sheet';
import { TabbedDialoguePanel } from '@/components/hsk-reading/tabbed-dialogue-panel';
import type { HskLevel } from '@/lib/types/hsk';

export const GenerateDialoguePage = () => {
  const [selectedLevel, setSelectedLevel] = useState<HskLevel>(1);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

  const handleLevelChange = (level: string) => {
    const newLevel = Number.parseInt(level, 10) as HskLevel;
    console.log('Level changed to:', newLevel); // Debug log
    setSelectedLevel(newLevel);
  };

  return (
    <Box px={2} py={6}>
      {/* Main Header */}
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

      {/* Section Header */}
      <Stack align="center" gap={4} mb={8}>
        <Heading
          color={textColor}
          size={{ base: 'xl', md: '2xl' }}
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

        {/* HSK Level Filter - Bottom Sheet for mobile */}
        <LevelSelectSheet onChange={handleLevelChange} value={selectedLevel} />
      </Stack>

      {/* Tabbed Dialogue Panel */}
      <TabbedDialoguePanel hskLevel={selectedLevel} />
    </Box>
  );
};
