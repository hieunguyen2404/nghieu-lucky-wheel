export interface Question {
  question: string;
  answer: string;
}

export interface WheelSettings {
  wheelMode: number;
  wheelData: string[];
  spinResults: Record<number, number>;
  spins: number;
  duration: number;
  showGiftSection: boolean;
  numberFontSize: number;
  nameFontSize: number;
  textPosition: number;
  questions: Question[];
}
