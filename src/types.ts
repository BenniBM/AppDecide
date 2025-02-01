export interface Question {
  id: string;
  text: string;
  options: Option[];
  explanation: string;
}

export interface Option {
  text: string;
  scores: {
    native: number;
    crossPlatform: number;
    webApp: number;
  };
  reasoning: string;
}

export interface Strategy {
  name: string;
  score: number;
  criticalQuestions: string[];
}

export type StrategyType = 'native' | 'crossPlatform' | 'webApp';