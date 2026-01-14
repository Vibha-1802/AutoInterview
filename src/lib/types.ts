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

export type RoundScore = {
  round1: number | null;
  round2: number | null;
  round3: number | null;
}

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarHint: string;
  role: string;
  interviewDate: string;
  status: 'Completed' | 'Scheduled' | 'In-Progress' | 'Expired' | 'Failed Round 1' | 'Failed Round 2';
  score?: Score;
  roundScores?: RoundScore;
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

export type Question = {
  id: string;
  text: string;
  topic: string;
  type: 'coding' | 'mcq' | 'short-answer' | 'system-design';
  options?: string[];
  answer?: string;
}
