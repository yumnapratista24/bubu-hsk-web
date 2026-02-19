'use client';

import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

import { GradedTextPopover } from '@/components/hsk-reading/graded-text-popover';
import type { GradedTextLine } from '@/lib/types/hsk';

interface GradedTextLineProps {
  line: GradedTextLine;
  showEnglish: boolean;
}

export const GradedTextLineComponent = ({ line, showEnglish }: GradedTextLineProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';
  const borderColor = isDark ? '#475569' : '#cbd5e1';

  const hanziSize = isDesktop ? '2xl' : 'xl';
  const lineSpacing = isDesktop ? 6 : 4;

  return (
    <Box mb={lineSpacing}>
      {/* Hanzi line with interactive characters - horizontal layout */}
      <Text
        color={textColor}
        fontSize={hanziSize}
        fontWeight="medium"
        lineHeight="tall"
        mb={2}
      >
        {line.word.split('').map((char, index) => (
          <GradedTextPopover
            key={`${char}-${index}`}
            line={{
              word: char,
              pinyin: line.pinyin,
              english: line.english,
            }}
          >
            <Box
              as="span"
              _hover={{
                color: 'blue.500',
                cursor: 'pointer',
                textDecoration: 'underline',
                textDecorationColor: 'blue.300',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
              }}
              transition="all 0.2s"
              mx={0.5}
            >
              {char}
            </Box>
          </GradedTextPopover>
        ))}
      </Text>

      {/* English translation (optional) */}
      {showEnglish && (
        <Text
          color={subtitleColor}
          fontSize={isDesktop ? 'md' : 'sm'}
          fontStyle="italic"
          pl={4}
          borderLeft="2px solid"
          borderColor={borderColor}
        >
          {line.english}
        </Text>
      )}
    </Box>
  );
};
