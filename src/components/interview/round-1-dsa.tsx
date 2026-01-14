'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dsaQuestions } from '@/lib/questions';
import { Bot, Code, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';

interface Round1DSAProps {
  onRoundComplete: (score: number) => void;
}

export function Round1DSA({ onRoundComplete }: Round1DSAProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [code, setCode] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const question = dsaQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    const newAnswers = [...answers, code];
    setAnswers(newAnswers);
    setCode('');

    if (currentQuestionIndex < dsaQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question submitted, calculate score and complete round
      // This is a mock scoring logic
      const score = Math.floor(Math.random() * 50 + 50); // Random score between 50-100
      onRoundComplete(score);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col rounded-lg border bg-card h-full">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">DSA Guru</h2>
              <p className="text-sm text-secondary">AI Interviewer</p>
            </div>
          </div>
          <p className="text-sm font-bold">Question {currentQuestionIndex + 1}/{dsaQuestions.length}</p>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">{question.topic}</h3>
            <p className="text-secondary">{question.text}</p>
          </CardContent>
        </ScrollArea>
      </div>

      <div className="flex flex-col h-full">
        <Tabs defaultValue="editor" className="flex flex-col h-full">
          <TabsList>
            <TabsTrigger value="editor">
              <Code className="mr-2 h-4 w-4" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger value="chat">
              <Bot className="mr-2 h-4 w-4" />
              Chat with AI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="flex-grow">
            <Card className="h-full flex flex-col">
              <CardContent className="flex-grow p-0">
                <Textarea
                  placeholder="Write your code here..."
                  className="h-full rounded-b-lg rounded-t-none border-0 resize-none font-code bg-gray-800 text-gray-200"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chat" className="flex-grow">
             <Card className="h-full">
                <CardContent className="p-4 flex items-center justify-center text-secondary">
                  AI chat is disabled for this round.
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
         <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Run Code</Button>
            <Button onClick={handleNextQuestion}>
              <Send className="mr-2 h-4 w-4" />
              {currentQuestionIndex < dsaQuestions.length - 1 ? 'Submit & Next' : 'Submit & Finish Round'}
            </Button>
          </div>
      </div>
    </div>
  );
}
