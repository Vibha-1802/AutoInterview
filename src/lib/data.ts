import type { Avatar, Candidate, InterviewSummary } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return {
    url: image?.imageUrl || '',
    hint: image?.imageHint || '',
  };
};

export const avatars: Avatar[] = [
  { id: 'avatar-1', name: 'DSA Guru', role: 'SDE-DSA', imageUrl: findImage('avatar-sde').url, imageHint: findImage('avatar-sde').hint, difficulty: 'Hard', isActive: true },
  { id: 'avatar-2', name: 'Pixel Perfect', role: 'Frontend', imageUrl: findImage('avatar-frontend').url, imageHint: findImage('avatar-frontend').hint, difficulty: 'Medium', isActive: true },
  { id: 'avatar-3', name: 'API Architect', role: 'Backend', imageUrl: findImage('avatar-backend').url, imageHint: findImage('avatar-backend').hint, difficulty: 'Hard', isActive: false },
  { id: 'avatar-4', name: 'Culture Fit', role: 'HR', imageUrl: findImage('avatar-hr').url, imageHint: findImage('avatar-hr').hint, difficulty: 'Easy', isActive: true },
  { id: 'avatar-5', name: 'Cloud Native', role: 'Cloud', imageUrl: findImage('avatar-cloud').url, imageHint: findImage('avatar-cloud').hint, difficulty: 'Medium', isActive: true },
  { id: 'avatar-6', name: 'Infra Wizard', role: 'DevOps', imageUrl: findImage('avatar-devops').url, imageHint: findImage('avatar-devops').hint, difficulty: 'Hard', isActive: false },
];

export const candidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: findImage('candidate-1').url,
    avatarHint: findImage('candidate-1').hint,
    role: 'SDE-DSA',
    interviewDate: '2024-08-15',
    status: 'Completed',
    score: { technical: 92, communication: 85, problemSolving: 88, cultureFit: 90, overall: 89 },
    roundScores: { round1: 90, round2: 85, round3: 92 },
    interviewId: 'interview-1',
  },
  {
    id: 'cand-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatarUrl: findImage('candidate-2').url,
    avatarHint: findImage('candidate-2').hint,
    role: 'Frontend Developer',
    interviewDate: '2024-08-14',
    status: 'Completed',
    score: { technical: 78, communication: 90, problemSolving: 82, cultureFit: 85, overall: 84 },
    roundScores: { round1: 75, round2: 90, round3: 80 },
    interviewId: 'interview-2',
  },
  {
    id: 'cand-3',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatarUrl: findImage('candidate-3').url,
    avatarHint: findImage('candidate-3').hint,
    role: 'Backend Developer',
    interviewDate: '2024-08-18',
    status: 'Scheduled',
    interviewId: 'interview-3',
  },
  {
    id: 'cand-4',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatarUrl: findImage('candidate-4').url,
    avatarHint: findImage('candidate-4').hint,
    role: 'SDE-DSA',
    interviewDate: '2024-08-12',
    status: 'Failed Round 1',
    score: { technical: 55, communication: 75, problemSolving: 60, cultureFit: 80, overall: 58 },
    roundScores: { round1: 55, round2: null, round3: null },
    interviewId: 'interview-4',
  },
  {
    id: 'cand-5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatarUrl: findImage('candidate-5').url,
    avatarHint: findImage('candidate-5').hint,
    role: 'HR Coordinator',
    interviewDate: '2024-08-20',
    status: 'In-Progress',
    interviewId: 'interview-5',
  },
];

export const interviewSummaries: InterviewSummary[] = [
  {
    id: 'interview-1',
    candidateId: 'cand-1',
    summary: 'John demonstrated exceptional problem-solving skills and a deep understanding of data structures and algorithms. He communicated his thought process clearly and wrote clean, efficient code.',
    strengths: 'Strong algorithmic thinking, clear communication, proficient in multiple programming languages.',
    weaknesses: 'Slightly less experience with large-scale distributed systems, but showed a strong willingness to learn.',
    overallSuitability: 'Excellent fit for the role. Possesses the core technical skills and a collaborative attitude.',
    recommendation: 'Strong Hire',
    transcript: [
      { speaker: 'AI', text: 'Can you explain the time and space complexity of a hash map?' },
      { speaker: 'Candidate', text: 'Sure. On average, insertion, deletion, and retrieval operations are O(1)...' },
    ],
    codeSubmission: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
  },
  {
    id: 'interview-2',
    candidateId: 'cand-2',
    summary: 'Jane has a solid grasp of frontend technologies and design principles. She showcased great communication skills and a passion for user experience.',
    strengths: 'Expertise in React, strong CSS skills, excellent communication, and a user-centric mindset.',
    weaknesses: 'Lacked deep knowledge of state management patterns beyond basic context and Redux.',
    overallSuitability: 'Good fit for the team. Her design sense and React skills are a plus.',
    recommendation: 'Hire',
    transcript: [],
    codeSubmission: 'N/A',
  },
  {
    id: 'interview-4',
    candidateId: 'cand-4',
    summary: 'Priya struggled with some of the more complex algorithmic questions. While she has a foundational knowledge, she needs more practice with advanced topics.',
    strengths: 'Good understanding of basic data structures. Positive attitude and receptive to feedback.',
    weaknesses: 'Difficulty with dynamic programming and graph traversal algorithms. Code was not always optimal.',
    overallSuitability: 'Might be a better fit for a junior role or requires further development before being considered for this position.',
    recommendation: 'Maybe',
    transcript: [],
    codeSubmission: `// Inefficient solution provided`,
  },
];
