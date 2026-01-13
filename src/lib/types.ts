export type Avatar = {
  id: string;
  name: string;
  role: 'SDE-DSA' | 'Frontend' | 'Backend' | 'Cloud' | 'DevOps' | 'HR';
  imageUrl: string;
  imageHint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isActive: boolean;
};

export type Score = {
  technical: number;
  communication: number;
  problemSolving: number;
  cultureFit: number;
  overall: number;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
  role: string;
  interviewDate: string;
  status: 'Completed' | 'Scheduled' | 'In-Progress' | 'Expired';
  score?: Score;
  interviewId: string;
};

export type InterviewSummary = {
  id: string;
  candidateId: string;
  summary: string;
  strengths: string;
  weaknesses: string;
  overallSuitability: string;
  recommendation: 'Strong Hire' | 'Hire' | 'Maybe' | 'No Hire';
  transcript: { speaker: 'AI' | 'Candidate'; text: string }[];
  codeSubmission: string;
};
