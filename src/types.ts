export interface Question {
    id: string;
    text: string;
    options: Option[];
    explanation: string;
    sources?: Source[];
}

export interface Option {
    text: string;
    scores: {
        native: number;
        crossPlatform: number;
        webApp: number;
    };
}

export interface Source {
    name: string;
    url: string;
}

export interface Strategy {
    name: string;
    score: number;
    criticalQuestions: string[];
    criticalAnswers: {
        question: string;
        answer: string;
        reasoning: string;
    }[];
}

export type StrategyType = "native" | "crossPlatform" | "webApp";
