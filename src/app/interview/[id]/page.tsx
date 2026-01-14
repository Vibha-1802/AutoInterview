'use client';

import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { candidates } from "@/lib/data";
import { Bot, Check, Timer, X } from "lucide-react";
import { Round1DSA } from "@/components/interview/round-1-dsa";
import { Round2CS } from "@/components/interview/round-2-cs";
import { Round3SystemDesign } from "@/components/interview/round-3-system-design";

const roundComponents = {
  1: Round1DSA,
  2: Round2CS,
  3: Round3SystemDesign,
};

const roundPassScores = {
  1: 60,
  2: 65,
  3: 0, // Round 3 is the final round
};

export default function InterviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const candidate = candidates.find(c => c.interviewId === params.id);

  const [currentRound, setCurrentRound] = useState(1);
  const [roundScores, setRoundScores] = useState<{ [key: number]: number }>({});
  const [showTransition, setShowTransition] = useState(false);
  const [passed, setPassed] = useState(false);

  if (!candidate) {
    notFound();
  }

  const handleRoundComplete = (score: number) => {
    setRoundScores(prev => ({ ...prev, [currentRound]: score }));
    const pass = score >= roundPassScores[currentRound as keyof typeof roundPassScores];
    setPassed(pass);
    setShowTransition(true);
  };

  const handleContinue = () => {
    setShowTransition(false);
    if (passed && currentRound < 3) {
      setCurrentRound(currentRound + 1);
    } else {
      // Logic to end interview and show final summary
      router.push(`/dashboard/candidates/${candidate.id}`);
    }
  };

  const RoundComponent = roundComponents[currentRound as keyof typeof roundComponents];

  return (
    <>
      <div className="container mx-auto h-full p-4 flex flex-col">
        <header className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Round {currentRound}/3: {currentRound === 1 ? 'Data Structures & Algorithms' : currentRound === 2 ? 'CS Fundamentals' : 'System Design'}</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <Timer className="h-4 w-4" />
              <span>{currentRound === 1 ? '30:00' : currentRound === 2 ? '25:00' : '20:00'}</span>
            </div>
          </div>
          <Progress value={(currentRound / 3) * 100} className="mt-2" />
        </header>

        <main className="flex-1">
          <RoundComponent onRoundComplete={handleRoundComplete} />
        </main>
      </div>

      <AlertDialog open={showTransition}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {passed ? <Check className="text-success h-8 w-8" /> : <X className="text-error h-8 w-8" />}
              Round {currentRound} {passed ? 'Passed' : 'Failed'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your score for this round is: <span className="font-bold text-2xl text-primary">{roundScores[currentRound]}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleContinue}>
              {passed && currentRound < 3 ? `Continue to Round ${currentRound + 1}` : 'View Final Summary'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
