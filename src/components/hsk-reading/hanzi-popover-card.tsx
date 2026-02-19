'use client';

import { Box, Popover, Portal, Text } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import type { HanziWord } from '@/lib/types/hsk';

interface HanziPopoverCardProps {
  hanzi: HanziWord;
}

export const HanziPopoverCard = ({ hanzi }: HanziPopoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const cardBg = isDark ? 'slate.800' : 'white';
  const hanziColor = isDark ? 'slate.50' : 'slate.900';
  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';
  const borderColor = isDark ? 'slate.700' : 'slate.200';

  const getOpenBgColor = () => {
    if (!isOpen) {
      return cardBg;
    }
    return isDark ? '#64748b' : '#e2e8f0';
  };

  const getClosedBorderColor = () => {
    if (isOpen) {
      return undefined;
    }
    return isDark ? '#94a3b8' : '#e2e8f0';
  };

  return (
    <Popover.Root
      onOpenChange={(details) => setIsOpen(details.open)}
      open={isOpen}
      positioning={{ placement: 'top-end' }}
    >
      <Popover.Trigger asChild>
        <Box
          _active={{ transform: 'scale(0.95)' }}
          _hover={{
            borderColor: 'blue.400',
            shadow: 'md',
          }}
          alignItems="center"
          backgroundColor={getOpenBgColor()}
          borderColor={isOpen ? 'blue.400' : undefined}
          borderRadius="lg"
          borderWidth="1px"
          cursor="pointer"
          display="flex"
          h="72px"
          justifyContent="center"
          shadow={isOpen ? 'lg' : 'sm'}
          style={{ borderColor: getClosedBorderColor() }}
          transition="all 0.15s ease-in-out"
          w="full"
        >
          <Text
            color={hanziColor}
            fontSize="3xl"
            fontWeight="medium"
            lineHeight="1"
            textAlign="center"
          >
            {hanzi.hanzi}
          </Text>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            bg={isDark ? 'slate.900' : 'white'}
            borderColor={borderColor}
            borderRadius="lg"
            maxW="280px"
            p={4}
            shadow="lg"
          >
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.Body p={0}>
              <Box>
                {/* Pinyin */}
                <Text
                  color={subtitleColor}
                  fontSize="lg"
                  mb={1}
                  textAlign="center"
                >
                  {hanzi.pinyin}
                </Text>
                {/* English */}
                <Text color={textColor} fontSize="md" mb={3} textAlign="center">
                  {hanzi.english_translation}
                </Text>

                {/* Example */}
                <Box borderColor={borderColor} borderTop="1px" pt={3}>
                  <Text color={subtitleColor} fontSize="sm" mb={1}>
                    Example
                  </Text>
                  <Text color={textColor} fontSize="md" fontWeight="medium">
                    {hanzi.example.hanzi}
                  </Text>
                  <Text color={subtitleColor} fontSize="sm" fontStyle="italic">
                    {hanzi.example.pinyin}
                  </Text>
                  <Text color={subtitleColor} fontSize="sm">
                    {hanzi.example.english}
                  </Text>
                </Box>
              </Box>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
