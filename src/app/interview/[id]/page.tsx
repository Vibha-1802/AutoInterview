import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { avatars, candidates } from "@/lib/data";
import { Bot, Send, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterviewPage({ params }: { params: { id: string } }) {
  const candidate = candidates.find(c => c.interviewId === params.id);
  const avatar = avatars.find(a => a.role === candidate?.role);

  if (!candidate || !avatar) {
    notFound();
  }

  return (
    <div className="container mx-auto h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
        
        <div className="flex flex-col rounded-lg border bg-card">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={avatar.imageUrl} alt={avatar.name} data-ai-hint={avatar.imageHint} />
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{avatar.name}</h2>
                <p className="text-sm text-secondary">Your AI Interviewer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary">
                <Timer className="h-4 w-4" />
                <span>45:00</span>
            </div>
          </div>
          
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback>AI</AvatarFallback></Avatar>
              <div className="space-y-2">
                <p className="max-w-md rounded-lg p-3 bg-accent">Welcome, {candidate.name}! This interview is for the {candidate.role} position. We'll start with a few technical questions. Are you ready?</p>
                <p className="max-w-md rounded-lg p-3 bg-accent">Let's begin. Please explain the difference between `let`, `const`, and `var` in JavaScript.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <p className="max-w-md rounded-lg p-3 bg-muted text-card-foreground">Yes, I'm ready. `var` is function-scoped, while `let` and `const` are block-scoped. `const` cannot be reassigned.</p>
              <Avatar className="h-8 w-8"><AvatarImage src={candidate.avatarUrl} alt={candidate.name} /></Avatar>
            </div>
          </div>

          <div className="p-4 border-t bg-card">
            <div className="relative">
              <Textarea placeholder="Type your answer here..." className="pr-20"/>
              <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Code Editor</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                    <div className="h-full rounded-md border bg-gray-800 p-4 font-code text-sm text-gray-200 flex items-center justify-center">
                        Your coding challenge will appear here.
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
