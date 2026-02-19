'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { LuSparkles } from 'react-icons/lu';

import { ComplexitySelect } from '@/components/hsk-reading/complexity-select';
import { ComplexitySelectSheet } from '@/components/hsk-reading/complexity-select-sheet';
import { GradedTextPopover } from '@/components/hsk-reading/graded-text-popover';
import type { Complexity, GradedTextData, HskLevel } from '@/lib/types/hsk';

interface GradedTextTabProps {
  hskLevel: HskLevel;
}

export const GradedTextTab = ({ hskLevel }: GradedTextTabProps) => {
  const [complexity, setComplexity] = useState<Complexity>(1);
  const [gradedText, setGradedText] = useState<GradedTextData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEnglish, setShowEnglish] = useState(true);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const borderColor = isDark ? '#475569' : '#cbd5e1';
  const bgColor = isDark ? '#1e293b' : '#f8fafc';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const subtitleColor = isDark ? '#94a3b8' : '#64748b';

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/hsk-sources/${hskLevel}/generate-graded-text?complexity=${complexity}`
      );

      if (!response.ok) {
        throw new Error('Failed to generate graded text');
      }

      const data = await response.json();
      
      if (data.success) {
        setGradedText(data.data);
      } else {
        setError(data.data?.error || 'Failed to generate graded text');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderGradedTextContent = () => {
    if (isLoading) {
      return (
        <Stack gap={4}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Box key={`skeleton-${index}`}>
              <Skeleton height="40px" mb={2} />
              <Skeleton height="20px" width="80%" />
            </Box>
          ))}
        </Stack>
      );
    }

    if (error) {
      return (
        <Box textAlign="center" py={8}>
          <Text color="red.500" mb={4}>
            {error}
          </Text>
          <Button onClick={handleGenerate} size="sm" variant="outline">
            Try Again
          </Button>
        </Box>
      );
    }

    if (!gradedText) {
      return (
        <Box textAlign="center" py={12}>
          <Text color={subtitleColor} fontSize="lg" mb={4}>
            Click generate to create a graded text for reading practice
          </Text>
        </Box>
      );
    }

    return (
      <Stack gap={2}>
        {/* Title */}
        {gradedText.title && (
          <Heading
            color={textColor}
            size={{ base: 'lg', md: 'xl' }}
            mb={6}
            textAlign="center"
          >
            {gradedText.title}
          </Heading>
        )}

        {/* Text Lines - Horizontal flow */}
        <Text
          color={textColor}
          fontSize={isDesktop ? '2xl' : 'xl'}
          fontWeight="medium"
          lineHeight="tall"
          mb={4}
        >
          {gradedText.line_details.map((line, index) => (
            <Box key={index} as="span">
              <GradedTextPopover
                line={{
                  word: line.word,
                  pinyin: line.pinyin,
                  english: line.english,
                }}
              />
              {/* Add space between words */}
              <Box as="span" mx={2} />
            </Box>
          ))}
        </Text>

        {/* English Translation */}
        {showEnglish && gradedText.english.length > 0 && (
          <Box
            borderTop="1px solid"
            borderColor={borderColor}
            mt={6}
            pt={4}
          >
            <Text color={subtitleColor} fontSize="sm" mb={2} fontWeight="medium">
              Translation
            </Text>
            <Text
              color={textColor}
              fontSize="sm"
              lineHeight="relaxed"
            >
              {gradedText.english.map((sentence, index) => (
                <Box key={index} as="span">
                  {sentence}
                  {index < gradedText.english.length - 1 && ' '}
                </Box>
              ))}
            </Text>
          </Box>
        )}
      </Stack>
    );
  };

  return (
    <Box>
      {/* Beta Notice */}
      <Text color={subtitleColor} fontSize="xs" textAlign="center" mb={3}>
        The process to generate might take up to 30 seconds due to beta version limitation
      </Text>

      {/* Controls */}
      <Stack gap={2} mb={4}>
        {isDesktop ? (
          <Flex align="center" gap={2}>
            <ComplexitySelect
              hskLevel={hskLevel}
              onChange={setComplexity}
              value={complexity}
            />
            <Button
              colorPalette="blue"
              loading={isLoading}
              onClick={handleGenerate}
              size="sm"
            >
              <LuSparkles />
              Generate
            </Button>
            <Checkbox.Root
              checked={showEnglish}
              onCheckedChange={(details) => setShowEnglish(!!details.checked)}
              size="sm"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>English</Checkbox.Label>
            </Checkbox.Root>
          </Flex>
        ) : (
          <>
            {/* Top row: Complexity, English checkbox */}
            <Flex align="center" justify="space-between" mb={2}>
              <ComplexitySelectSheet
                hskLevel={hskLevel}
                onChange={setComplexity}
                value={complexity}
              />
              <Checkbox.Root
                checked={showEnglish}
                onCheckedChange={(details) => setShowEnglish(!!details.checked)}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>English</Checkbox.Label>
              </Checkbox.Root>
            </Flex>

            {/* Bottom: Full-width Generate button */}
            <Button
              colorPalette="blue"
              loading={isLoading}
              onClick={handleGenerate}
              size="md"
              width="full"
              mb={2}
            >
              <LuSparkles />
              Generate
            </Button>
          </>
        )}
      </Stack>

      {/* Content Area */}
      <Box
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        maxH={isDesktop ? "600px" : "500px"}
        minH={isDesktop ? "300px" : "200px"}
        overflowY="auto"
        p={isDesktop ? 4 : 3}
      >
        {renderGradedTextContent()}
      </Box>
    </Box>
  );
};
