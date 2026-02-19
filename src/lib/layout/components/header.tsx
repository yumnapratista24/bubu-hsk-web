import { Box, Flex, Heading, Link, useBreakpointValue } from '@chakra-ui/react';

import { ColorModeButton } from '@/components/ui/color-mode';

export const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex align="center" as="header" justify="space-between" width="full">
      <Link href="/">
        <Heading color="blue.500" cursor="pointer" size="md">
          Bù Bù HSK
        </Heading>
      </Link>

      <Flex align="center" gap={4}>
        <Link display={{ base: 'block', md: 'none' }} href="/hsk-text">
          <Box
            _hover={{ color: 'blue.500' }}
            color="slate.600"
            cursor="pointer"
            fontSize="sm"
            transition="color 0.2s"
          >
            Reading Hub
          </Box>
        </Link>
        <Link display={{ base: 'block', md: 'none' }} href="/hsk-reading">
          <Box
            _hover={{ color: 'blue.500' }}
            color="slate.600"
            cursor="pointer"
            fontSize="sm"
            transition="color 0.2s"
          >
            Practice Hub
          </Box>
        </Link>
        {isDesktop && (
          <>
            <Box
              _hover={{ color: 'blue.500' }}
              color="slate.600"
              cursor="pointer"
              fontSize="sm"
              onClick={() => {
                const element = document.getElementById('reading-hub');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              transition="color 0.2s"
            >
              Reading Hub
            </Box>
            <Box
              _hover={{ color: 'blue.500' }}
              color="slate.600"
              cursor="pointer"
              fontSize="sm"
              onClick={() => {
                const element = document.getElementById('practice-hub');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              transition="color 0.2s"
            >
              Practice Hub
            </Box>
          </>
        )}
        <ColorModeButton />
      </Flex>
    </Flex>
  );
};
