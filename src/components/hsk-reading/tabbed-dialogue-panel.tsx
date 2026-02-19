'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';

import { DialoguePanel } from '@/components/hsk-reading/dialogue-panel';
import { GradedTextTab } from '@/components/hsk-reading/graded-text-tab';
import { useAnalytics } from '@/lib/hooks/use-analytics';
import type { HskLevel } from '@/lib/types/hsk';

interface TabbedDialoguePanelProps {
  hskLevel: HskLevel;
}

export const TabbedDialoguePanel = ({ hskLevel }: TabbedDialoguePanelProps) => {
  const [activeTab, setActiveTab] = useState('dialogue');
  const { trackTabSwitch } = useAnalytics();

  const handleTabChange = (details: { value: string }) => {
    const previousTab = activeTab;
    setActiveTab(details.value);
    
    // Track tab switching
    trackTabSwitch({
      fromTab: previousTab,
      toTab: details.value,
      featureType: 'reading_hub',
    });
  };

  return (
    <Tabs.Root defaultValue="dialogue" size="md" onValueChange={handleTabChange}>
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
