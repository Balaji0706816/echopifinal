// types.ts

// Chat-related types
export type ChatRole = 'user' | 'model';

export interface ChatMessage {
  id: string;           // Unique identifier for the message
  role: ChatRole;       // Who sent the message: 'user' or 'model'
  text: string;         // The content of the message
  timestamp: Date;      // When the message was sent
}

// Existing generated content type
export interface GeneratedContent {
  headline: string;
  subheadline: string;
}

// Loading states for async operations
export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
