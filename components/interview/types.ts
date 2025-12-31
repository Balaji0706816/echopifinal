
export type InterviewType = 'behavioral' | 'technical' | 'hr' | 'system-design';

export interface InterviewInfo {
  interviewType: InterviewType;
  companyName: string;
  role: string;
  interviewDate: string;
}

export type Tab = "details" | "mock" | "feedback";

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface InterviewFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  overallSummary: string;
}
