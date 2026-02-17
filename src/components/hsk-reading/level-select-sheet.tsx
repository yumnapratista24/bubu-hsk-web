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

import type { HskLevel } from '@/lib/types/hsk';

interface LevelSelectSheetProps {
  value: HskLevel;
  onChange: (value: string) => void;
}

const HSK_LEVELS: Array<HskLevel> = [1, 2, 3, 4];

export const LevelSelectSheet = ({
  value,
  onChange,
}: LevelSelectSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const textColor = isDark ? 'slate.50' : 'slate.900';
  const borderColor = isDark ? '#475569' : '#cbd5e1';
  const bgColor = isDark ? '#1e293b' : 'white';

  const handleSelect = (level: HskLevel) => {
    onChange(String(level));
    setIsOpen(false);
  };

  const getLevelBg = (level: HskLevel) => {
    if (value !== level) {
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
        HSK {value}
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
                    Select HSK Level
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
                  {HSK_LEVELS.map((level) => (
                    <Box
                      _hover={{
                        bg: isDark ? 'slate.800' : 'slate.100',
                      }}
                      bg={getLevelBg(level)}
                      borderRadius="md"
                      cursor="pointer"
                      key={level}
                      onClick={() => handleSelect(level)}
                      p={3}
                      textAlign="center"
                    >
                      <Box
                        color={value === level ? 'blue.500' : textColor}
                        fontWeight={value === level ? 'bold' : 'normal'}
                      >
                        HSK {level}
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
