'use client';

import {
  Box,
  Dialog,
  Heading,
  IconButton,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { LuX } from 'react-icons/lu';

import type { HanziWord } from '@/lib/types/hsk';

interface HanziDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hanzi: HanziWord;
}

export const HanziDetailDialog = ({
  isOpen,
  onClose,
  hanzi,
}: HanziDetailDialogProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const subtitleColor = isDark ? 'slate.400' : 'slate.600';
  const borderColor = isDark ? 'slate.700' : 'slate.200';

  return (
    <Dialog.Root
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      open={isOpen}
      size="sm"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={isDark ? 'slate.900' : 'white'}>
            <Dialog.Header pb={2}>
              <Dialog.Title>
                <Heading color={textColor} size="md">
                  Character Details
                </Heading>
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <LuX />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body pt={0}>
              <Stack align="center" gap={3}>
                {/* Main Hanzi */}
                <Text
                  color={textColor}
                  fontSize="5xl"
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
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
