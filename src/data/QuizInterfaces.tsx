export interface Quiz {
  id: string;
  title?: string;
  description?: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  questionText: string;
  type: string;
  options: Option[];
}

export interface Option {
  id: number;
  optionText: string;
  correct: boolean;
}
