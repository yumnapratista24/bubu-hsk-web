'use client';

import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { DialoguePanel } from '@/components/hsk-reading/dialogue-panel';
import { LevelSelectSheet } from '@/components/hsk-reading/level-select-sheet';
import type { HskLevel } from '@/lib/types/hsk';

export const GenerateDialoguePage = () => {
  const [selectedLevel, setSelectedLevel] = useState<HskLevel>(1);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';

  const handleLevelChange = (level: string) => {
    const newLevel = Number.parseInt(level, 10) as HskLevel;
    setSelectedLevel(newLevel);
  };

  return (
    <Box px={2} py={6}>
      {/* Header */}
      <Stack align="center" gap={3} mb={6}>
        <Heading color={textColor} size="xl" textAlign="center">
          Generate Dialogue
        </Heading>
        <Text color={subtitleColor} fontSize="sm" textAlign="center">
          Generate AI-powered dialogues based on HSK level
        </Text>

        {/* HSK Level Filter - Bottom Sheet for mobile */}
        <LevelSelectSheet onChange={handleLevelChange} value={selectedLevel} />
      </Stack>

      {/* Dialogue Panel */}
      <DialoguePanel hskLevel={selectedLevel} />
    </Box>
  );
};
