'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { systemDesignQuestions } from '@/lib/questions';
import { Send } from 'lucide-react';

interface Round3SystemDesignProps {
  onRoundComplete: (score: number) => void;
}

export function Round3SystemDesign({ onRoundComplete }: Round3SystemDesignProps) {
  const [answer, setAnswer] = useState('');
  const question = systemDesignQuestions[0]; // For now, only one system design question

  const handleSubmit = () => {
    // Mock scoring
    const score = Math.floor(Math.random() * 40 + 60); // Random score between 60-100
    onRoundComplete(score);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-secondary mb-4">
          Provide a detailed explanation of your design, covering architecture, scalability, database choices, and trade-offs.
        </p>
        <Textarea
          placeholder="Start designing your solution here..."
          className="flex-grow resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
         <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            Finish Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
