'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
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
import { useAnalytics } from '@/lib/hooks/use-analytics';
import type { Complexity, DialogueData, HskLevel } from '@/lib/types/hsk';

interface DialoguePanelProps {
  hskLevel: HskLevel;
}

export const DialoguePanel = ({ hskLevel }: DialoguePanelProps) => {
  const [complexity, setComplexity] = useState<Complexity>(1);
  const [dialogue, setDialogue] = useState<DialogueData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { trackDialogueGeneration } = useAnalytics();

  const borderColor = isDark ? '#475569' : '#cbd5e1';
  const bgColor = isDark ? '#1e293b' : '#f8fafc';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const subtitleColor = isDark ? '#94a3b8' : '#64748b';
  const speakerAColor = isDark ? '#60a5fa' : '#2563eb';
  const speakerBColor = isDark ? '#4ade80' : '#16a34a';

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/hsk-sources/${hskLevel}/generate-dialogue?complexity=${complexity}`
      );

      if (!response.ok) {
        throw new Error('Failed to generate dialogue');
      }

      const result = await response.json();

      if (result.success && result.data) {
        setDialogue(result.data);
        // Track successful dialogue generation
        trackDialogueGeneration({
          hskLevel,
          complexity: complexity.toString(),
          deviceType: isDesktop ? 'desktop' : 'mobile',
        });
      } else {
        throw new Error(result.data?.error || 'Failed to generate dialogue');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getSpeaker = (index: number) => (index % 2 === 0 ? 'A' : 'B');
  const getSpeakerColor = (index: number) =>
    index % 2 === 0 ? speakerAColor : speakerBColor;

  const renderDialogueContent = () => {
    if (isLoading) {
      return (
        <Stack gap={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              borderRadius="md"
              height="20px"
              key={`skel-${String(i)}`}
            />
          ))}
        </Stack>
      );
    }

    if (error) {
      return (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      );
    }

    if (dialogue) {
      return (
        <Flex gap={4}>
          {/* Left: Hanzi + Pinyin */}
          <Box flex="1">
            {dialogue.dialogue.map((line, index) => (
              <Box
                key={`dialogue-${line.slice(0, 10)}-${String(index)}`}
                mb={1}
              >
                <Text color={textColor} fontSize={{ base: 'md', md: 'lg' }}>
                  <Text
                    as="span"
                    color={getSpeakerColor(index)}
                    fontWeight="bold"
                  >
                    {getSpeaker(index)}:
                  </Text>{' '}
                  {line}
                </Text>
                {showPinyin && dialogue.pinyin[index] && (
                  <Text
                    color={subtitleColor}
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontStyle="italic"
                    ml={4}
                  >
                    {dialogue.pinyin[index]}
                  </Text>
                )}
              </Box>
            ))}
          </Box>

          {/* Divider */}
          {showEnglish && (
            <Box borderColor={borderColor} borderLeft="1px solid" mx={2} />
          )}

          {/* Right: English Translations */}
          {showEnglish && (
            <Box flex="1">
              <Text
                color={subtitleColor}
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="bold"
                mb={2}
              >
                Translation:
              </Text>
              {dialogue.english.map((line, index) => (
                <Box key={`eng-${line.slice(0, 10)}-${String(index)}`} mb={1}>
                  <Text
                    color={subtitleColor}
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    <Text
                      as="span"
                      color={getSpeakerColor(index)}
                      fontWeight="bold"
                    >
                      {getSpeaker(index)}:
                    </Text>{' '}
                    {line}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Flex>
      );
    }

    return (
      <Text color={subtitleColor} fontSize="sm" textAlign="center">
        Click &quot;Generate&quot; to create a dialogue
      </Text>
    );
  };

  return (
    <Box
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={isDesktop ? 6 : 4}
      width="full"
    >
      {/* Description */}
      <Text color={subtitleColor} fontSize="xs" mb={3}>
        Generate dialogue based on selected HSK level and choose your complexity
      </Text>

      {/* Controls - Desktop */}
      {isDesktop && (
        <Flex align="center" flexWrap="nowrap" gap={2} mb={4}>
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
            checked={showPinyin}
            onCheckedChange={(details) => setShowPinyin(!!details.checked)}
            size="sm"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Pinyin</Checkbox.Label>
          </Checkbox.Root>
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
      )}

      {/* Controls - Mobile */}
      {!isDesktop && (
        <>
          {/* Top row: Complexity, Pinyin, English checkboxes */}
          <Flex align="center" justify="space-between" mb={4}>
            <ComplexitySelectSheet
              hskLevel={hskLevel}
              onChange={setComplexity}
              value={complexity}
            />
            <Flex align="center" gap={3}>
              <Checkbox.Root
                checked={showPinyin}
                onCheckedChange={(details) => setShowPinyin(!!details.checked)}
                size="sm"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Pinyin</Checkbox.Label>
              </Checkbox.Root>
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
          </Flex>

          {/* Bottom: Full-width Generate button */}
          <Button
            colorPalette="blue"
            loading={isLoading}
            mb={4}
            onClick={handleGenerate}
            size="md"
            width="full"
          >
            <LuSparkles />
            Generate
          </Button>
        </>
      )}

      {/* Content Area */}
      <Box
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        maxH={isDesktop ? '600px' : '500px'}
        minH={isDesktop ? '300px' : '200px'}
        overflowY="auto"
        p={isDesktop ? 4 : 3}
      >
        {renderDialogueContent()}
      </Box>
    </Box>
  );
};
