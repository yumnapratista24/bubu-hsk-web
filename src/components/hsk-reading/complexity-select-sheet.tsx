'use client';

import {
  Box,
  Button,
  Drawer,
  Heading,
  IconButton,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { LuChevronDown, LuX } from 'react-icons/lu';

import type { Complexity, HskLevel } from '@/lib/types/hsk';

interface ComplexitySelectSheetProps {
  value: Complexity;
  onChange: (value: Complexity) => void;
  hskLevel: HskLevel;
}

const COMPLEXITY_OPTIONS = [
  { value: 1 as Complexity, label: 'Simple' },
  { value: 2 as Complexity, label: 'Medium' },
  { value: 3 as Complexity, label: 'Complex' },
];

export const ComplexitySelectSheet = ({
  value,
  onChange,
  hskLevel,
}: ComplexitySelectSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const borderColor = isDark ? '#475569' : '#cbd5e1';
  const bgColor = isDark ? '#1e293b' : 'white';

  const availableOptions =
    hskLevel === 1
      ? COMPLEXITY_OPTIONS.filter((opt) => opt.value !== 3)
      : COMPLEXITY_OPTIONS;

  const currentLabel =
    COMPLEXITY_OPTIONS.find((opt) => opt.value === value)?.label || 'Simple';

  const handleSelect = (complexity: Complexity) => {
    onChange(complexity);
    setIsOpen(false);
  };

  const getOptionBg = (optionValue: Complexity) => {
    if (value !== optionValue) {
      return 'transparent';
    }
    return isDark ? 'blue.900' : 'blue.50';
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        style={{
          borderColor,
          backgroundColor: bgColor,
          color: isDark ? '#f8fafc' : '#0f172a',
        }}
        variant="outline"
      >
        {currentLabel}
        <LuChevronDown />
      </Button>

      <Drawer.Root
        onOpenChange={(details) => setIsOpen(details.open)}
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
                    Select Complexity
                  </Heading>
                </Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton size="sm" variant="ghost">
                    <LuX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body pb={6} pt={0}>
                <Stack gap={2}>
                  {availableOptions.map((option) => (
                    <Box
                      _hover={{
                        bg: isDark ? 'slate.800' : 'slate.100',
                      }}
                      bg={getOptionBg(option.value)}
                      borderRadius="md"
                      cursor="pointer"
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      p={3}
                      textAlign="center"
                    >
                      <Box
                        color={value === option.value ? 'blue.500' : textColor}
                        fontWeight={value === option.value ? 'bold' : 'normal'}
                      >
                        {option.label}
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
