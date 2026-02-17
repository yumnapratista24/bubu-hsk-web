import { Box, Flex, Heading, Link } from '@chakra-ui/react';

import { ColorModeButton } from '@/components/ui/color-mode';

export const Header = () => {
  return (
    <Flex align="center" as="header" justify="space-between" width="full">
      <Link href="/">
        <Heading color="blue.500" cursor="pointer" size="md">
          Bù Bù HSK
        </Heading>
      </Link>

      <Flex align="center" gap={4}>
        <Link display={{ base: 'block', md: 'none' }} href="/generate-dialogue">
          <Box
            _hover={{ color: 'blue.500' }}
            color="slate.600"
            cursor="pointer"
            fontSize="sm"
            transition="color 0.2s"
          >
            Dialogue
          </Box>
        </Link>
        <Link href="/hsk-reading">
          <Box
            _hover={{ color: 'blue.500' }}
            color="slate.600"
            cursor="pointer"
            fontSize="sm"
            transition="color 0.2s"
          >
            Hanzi
          </Box>
        </Link>
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};
