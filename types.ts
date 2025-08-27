
export interface WorkshopStep {
  id: string;
  shortTitle: 'Intro' | 'O' | 'D1' | 'V' | 'D2' | 'M' | 'S' | 'C';
  title: string;
  duration: number; // in minutes
  description: string;
  details: string[];
  questions: string[];
}
