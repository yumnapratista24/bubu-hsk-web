'use client';

import {
  Box,
  Popover,
  Portal,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

interface GradedTextPopoverProps {
  line: {
    word: string;
    pinyin: string;
    english: string;
  };
  onWordClick?: () => void;
}

export const GradedTextPopover = ({ line, onWordClick }: GradedTextPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const cardBg = isDark ? 'slate.800' : 'white';
  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';
  const _borderColor = isDark ? 'slate.700' : 'slate.200';

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

  const _getWordStyle = () => {
    if (isOpen) {
      return {
        color: 'blue.500',
        textDecoration: 'underline',
        textDecorationColor: 'blue.300',
        textDecorationThickness: '2px',
        textUnderlineOffset: '4px',
      };
    }
    return {};
  };

  return (
    <Popover.Root
      onOpenChange={(details) => setIsOpen(details.open)}
      open={isOpen}
      positioning={{ placement: 'top-end' }}
    >
      <Popover.Trigger asChild>
        <Box
          _hover={{
            color: 'blue.500',
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationColor: 'blue.300',
            textDecorationThickness: '2px',
            textUnderlineOffset: '4px',
          }}
          as="span"
          mx={0.5}
          onClick={() => {
            setIsOpen(!isOpen);
            onWordClick?.();
          }}
          style={{
            color: isOpen ? 'blue.500' : 'inherit',
            textDecoration: isOpen ? 'underline' : 'none',
            textDecorationColor: isOpen ? '#93c5fd' : 'inherit',
            textDecorationThickness: isOpen ? '2px' : 'inherit',
            textUnderlineOffset: isOpen ? '4px' : 'inherit',
          }}
          transition="all 0.2s"
        >
          {line.word}
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            bg={getOpenBgColor()}
            border="1px solid"
            borderColor={getClosedBorderColor()}
            borderRadius="md"
            boxShadow="lg"
            maxWidth={isDesktop ? '300px' : '140px'}
            p={isDesktop ? 4 : 1}
          >
            <Popover.Body>
              <Box textAlign="center">
                {/* Pinyin */}
                <Text
                  color={subtitleColor}
                  fontSize={isDesktop ? 'lg' : 'md'}
                  mb={2}
                  textAlign="center"
                >
                  {line.pinyin}
                </Text>

                {/* English */}
                <Text
                  color={textColor}
                  fontSize={isDesktop ? 'md' : 'sm'}
                  fontWeight="medium"
                  textAlign="center"
                >
                  {line.english}
                </Text>
              </Box>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
