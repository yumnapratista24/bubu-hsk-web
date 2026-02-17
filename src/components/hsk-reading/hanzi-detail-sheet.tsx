'use client';

import {
  Box,
  Drawer,
  Heading,
  IconButton,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { LuX } from 'react-icons/lu';

import type { HanziWord } from '@/lib/types/hsk';

interface HanziDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  hanzi: HanziWord;
}

export const HanziDetailSheet = ({
  isOpen,
  onClose,
  hanzi,
}: HanziDetailSheetProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';
  const borderColor = isDark ? 'slate.700' : 'slate.200';

  return (
    <Drawer.Root
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      open={isOpen}
      placement="bottom"
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={isDark ? 'slate.900' : 'white'}>
            <Drawer.Header pb={2}>
              <Drawer.Title>
                <Heading color={textColor} size="md">
                  Character Details
                </Heading>
              </Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <LuX />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body pb={4} pt={0}>
              <Stack align="center" gap={3}>
                {/* Main Hanzi */}
                <Text
                  color={textColor}
                  fontSize="4xl"
                  fontWeight="bold"
                  lineHeight="1"
                >
                  {hanzi.hanzi}
                </Text>
                <Text color={subtitleColor} fontSize="lg">
                  {hanzi.pinyin}
                </Text>
                <Text color={textColor} fontSize="md" textAlign="center">
                  {hanzi.english_translation}
                </Text>

                {/* Example */}
                <Box
                  borderColor={borderColor}
                  borderTop="1px"
                  mt={2}
                  pt={3}
                  width="full"
                >
                  <Text color={subtitleColor} fontSize="xs" mb={2}>
                    Example
                  </Text>
                  <Text color={textColor} fontSize="md">
                    {hanzi.example.hanzi}
                  </Text>
                  <Text color={subtitleColor} fontSize="sm" fontStyle="italic">
                    {hanzi.example.pinyin}
                  </Text>
                  <Text color={subtitleColor} fontSize="sm">
                    {hanzi.example.english}
                  </Text>
                </Box>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
