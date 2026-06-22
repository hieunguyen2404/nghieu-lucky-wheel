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
const defaultSettings: WheelSettings = {
  wheelMode: 2,

  wheelData: ["Lương Viết Hiệu", "Cao Viết Được", "Định Thị Thanh Huyền"],

  spinResults: {},

  spins: 16,

  duration: 19500,

  showGiftSection: true,

  numberFontSize: 0.08,

  nameFontSize: 0.045,

  textPosition: 0.85,

  questions: [
    {
      question: "Câu hỏi 1",
      answer: "Đáp án 1",
    },
    {
      question: "Câu hỏi 2",
      answer: "Đáp án 2",
    },
  ],
};
