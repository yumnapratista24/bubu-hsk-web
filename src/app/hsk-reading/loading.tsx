import { Box, Grid, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* Header */}
      <Stack align="center" gap={4} mb={8}>
        <Heading size={{ base: '2xl', md: '3xl' }} textAlign="center">
          步步 HSK - Bù Bù HSK
        </Heading>
        <Text
          color="slate.500"
          fontSize={{ base: 'md', md: 'lg' }}
          textAlign="center"
        >
          Step by Step HSK Learning. {'\n'}
          Chinese is not easy, you need consistency and practice. {'\n'}
          Start by re-reading the words you already know. Then explore more
          texts through reading exercises.
        </Text>

        {/* Filter skeleton */}
        <Stack align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
          <Skeleton borderRadius="md" height="40px" width="200px" />
          <Skeleton height="20px" width="80px" />
        </Stack>
      </Stack>

      {/* Grid skeleton */}
      <Grid
        gap={{ base: 2, md: 4 }}
        templateColumns={{
          base: 'repeat(auto-fit, minmax(120px, 1fr))',
          md: 'repeat(auto-fit, minmax(140px, 1fr))',
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            borderRadius="lg"
            height={{ base: '120px', md: '140px' }}
            key={`skeleton-${String(index)}`}
          />
        ))}
      </Grid>
    </Box>
  );
}
