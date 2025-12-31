export interface GeneratedContent {
    headline: string;
    subheadline: string;
  }
  
  export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
  }