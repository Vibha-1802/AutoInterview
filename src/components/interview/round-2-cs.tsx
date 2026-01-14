'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { csFundamentalsQuestions } from '@/lib/questions';
import { Send } from 'lucide-react';
import { Progress } from '../ui/progress';

interface Round2CSProps {
  onRoundComplete: (score: number) => void;
}

export function Round2CS({ onRoundComplete }: Round2CSProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>(new Array(csFundamentalsQuestions.length).fill(undefined));

  const question = csFundamentalsQuestions[currentQuestionIndex];

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < csFundamentalsQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, submit and calculate score
      let correctAnswers = 0;
      answers.forEach((answer, index) => {
        if (answer && answer.toLowerCase() === csFundamentalsQuestions[index].answer?.toLowerCase()) {
          correctAnswers++;
        }
      });
      const score = Math.round((correctAnswers / csFundamentalsQuestions.length) * 100);
      onRoundComplete(score);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}/{csFundamentalsQuestions.length}: {question.topic}</CardTitle>
        <Progress value={((currentQuestionIndex + 1) / csFundamentalsQuestions.length) * 100} className="mt-2"/>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div>
            <p className="mb-6 text-lg">{question.text}</p>
            {question.type === 'mcq' && question.options && (
            <RadioGroup onValueChange={handleAnswerChange} value={answers[currentQuestionIndex]}>
                {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
                ))}
            </RadioGroup>
            )}
            {question.type === 'short-answer' && (
            <Input 
                placeholder="Your answer..." 
                onChange={(e) => handleAnswerChange(e.target.value)}
                value={answers[currentQuestionIndex] || ''}
            />
            )}
        </div>
        <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
            <Button onClick={handleNextQuestion}>
                <Send className="mr-2 h-4 w-4" />
                {currentQuestionIndex < csFundamentalsQuestions.length - 1 ? 'Next Question' : 'Finish Round'}
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
