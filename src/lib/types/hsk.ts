export interface ExampleSentence {
  hanzi: string;
  pinyin: string;
  english: string;
  indonesian: string;
}

export interface HanziWord {
  id: number;
  hanzi: string;
  pinyin: string;
  english_translation: string;
  indonesian_translation: string;
  example: ExampleSentence;
}

export interface HskApiResponse {
  data: {
    list: Array<HanziWord>;
    total: number;
  };
  success: boolean;
}

export interface DialogueData {
  dialogue: Array<string>;
  pinyin: Array<string>;
  english: Array<string>;
  error: string | null;
}

export interface DialogueResponse {
  data: DialogueData;
  success: boolean;
}

export interface GradedTextLine {
  word: string;
  pinyin: string;
  english: string;
}

export interface GradedTextData {
  title: string;
  line_details: Array<GradedTextLine>;
  english: Array<string>;
  error: string | null;
}

export interface GradedTextResponse {
  data: GradedTextData;
  success: boolean;
}

export type HskLevel = 1 | 2 | 3 | 4;

export type Complexity = 1 | 2 | 3;
