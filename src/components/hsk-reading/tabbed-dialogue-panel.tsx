'use client';

import { Tabs } from '@chakra-ui/react';

import { DialoguePanel } from '@/components/hsk-reading/dialogue-panel';
import { GradedTextTab } from '@/components/hsk-reading/graded-text-tab';
import type { HskLevel } from '@/lib/types/hsk';

interface TabbedDialoguePanelProps {
  hskLevel: HskLevel;
}

export const TabbedDialoguePanel = ({ hskLevel }: TabbedDialoguePanelProps) => {
  return (
    <Tabs.Root defaultValue="dialogue" size="md">
      <Tabs.List>
        <Tabs.Trigger value="dialogue">Dialogue</Tabs.Trigger>
        <Tabs.Trigger value="graded-text">Graded Text</Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="dialogue">
        <DialoguePanel hskLevel={hskLevel} />
      </Tabs.Content>
      
      <Tabs.Content value="graded-text">
        <GradedTextTab hskLevel={hskLevel} />
      </Tabs.Content>
    </Tabs.Root>
  );
};
