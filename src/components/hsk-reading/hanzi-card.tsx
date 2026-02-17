'use client';

import { Box, Skeleton, Text } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

import type { HanziWord } from '@/lib/types/hsk';

interface HanziCardProps {
  hanzi: HanziWord;
  onClick: () => void;
  isLoading?: boolean;
}

export const HanziCard = ({
  hanzi,
  onClick,
  isLoading = false,
}: HanziCardProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const cardBg = isDark ? 'slate.800' : 'white';
  const hanziColor = isDark ? 'slate.50' : 'slate.900';

  if (isLoading) {
    return (
      <Skeleton
        borderRadius="lg"
        h={{ base: '60px', md: '72px' }}
        w={{ base: '60px', md: '72px' }}
      />
    );
  }

  return (
    <Box
      _active={{ transform: 'scale(0.95)' }}
      _hover={{
        borderColor: 'blue.400',
        shadow: 'md',
      }}
      alignItems="center"
      bg={cardBg}
      borderRadius="lg"
      borderWidth="1px"
      cursor="pointer"
      display="flex"
      h={{ base: '80px', md: '72px' }}
      justifyContent="center"
      onClick={onClick}
      shadow="sm"
      style={{ borderColor: isDark ? '#94a3b8' : '#e2e8f0' }}
      transition="all 0.15s ease-in-out"
      w="full"
    >
      <Text
        color={hanziColor}
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="medium"
        lineHeight="1"
        textAlign="center"
      >
        {hanzi.hanzi}
      </Text>
    </Box>
  );
};
