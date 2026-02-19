'use client';

import { sendGAEvent } from '@next/third-parties/google';

interface AnalyticsEvent {
  eventName: string;
  parameters?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = ({ eventName, parameters }: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      sendGAEvent('event', eventName, parameters || {});
    }
  };

  const trackPageView = (pagePath: string, title?: string) => {
    if (typeof window !== 'undefined') {
      sendGAEvent('config', pagePath, { page_title: title });
    }
  };

  const trackDialogueGeneration = (params: {
    hskLevel: number;
    complexity: string;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'dialogue_generate',
      parameters: params,
    });
  };

  const trackGradedTextGeneration = (params: {
    hskLevel: number;
    complexity: string;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'graded_text_generate',
      parameters: params,
    });
  };

  const trackTabSwitch = (params: {
    fromTab: string;
    toTab: string;
    featureType: string;
  }) => {
    trackEvent({
      eventName: 'tab_switch',
      parameters: params,
    });
  };

  const trackHskLevelSelect = (params: {
    fromLevel?: number;
    toLevel: number;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'hsk_level_select',
      parameters: params,
    });
  };

  const trackHanziShuffle = (params: {
    hskLevel: number;
    wordCount: number;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'hanzi_shuffle',
      parameters: params,
    });
  };

  const trackHanziPopoverOpen = (params: {
    hskLevel: number;
    wordId: string;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'hanzi_popover_open',
      parameters: params,
    });
  };

  const trackGradedTextWordClick = (params: {
    word: string;
    hskLevel: number;
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'graded_text_word_click',
      parameters: params,
    });
  };

  const trackTranslationToggle = (params: {
    action: 'show' | 'hide';
    deviceType: 'desktop' | 'mobile';
  }) => {
    trackEvent({
      eventName: 'translation_toggle',
      parameters: params,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackDialogueGeneration,
    trackGradedTextGeneration,
    trackTabSwitch,
    trackHskLevelSelect,
    trackHanziShuffle,
    trackHanziPopoverOpen,
    trackGradedTextWordClick,
    trackTranslationToggle,
  };
};
