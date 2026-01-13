import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { candidates, interviewSummaries } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CandidateSummaryPage({ params }: { params: { id: string } }) {
  const candidate = candidates.find((c) => c.id === params.id);
  const summary = interviewSummaries.find((s) => s.candidateId === params.id);

  if (!candidate || !summary || !candidate.score) {
    notFound();
  }

  const recommendationBadges = {
    'Strong Hire': 'bg-green-500 hover:bg-green-600',
    'Hire': 'bg-blue-500 hover:bg-blue-600',
    'Maybe': 'bg-yellow-500 hover:bg-yellow-600',
    'No Hire': 'bg-red-500 hover:bg-red-600',
  }

  return (
    <>
      <PageHeader title="Interview Summary">
        <Button variant="outline">
          <ThumbsDown className="mr-2 h-4 w-4" /> Reject
        </Button>
        <Button>
          <ThumbsUp className="mr-2 h-4 w-4" /> Accept
        </Button>
      </PageHeader>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} data-ai-hint={candidate.avatarHint} />
                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-2xl">{candidate.name}</CardTitle>
                <p className="text-muted-foreground">{candidate.role}</p>
              </div>
              <Badge className={cn("ml-auto text-white", recommendationBadges[summary.recommendation])}>
                {summary.recommendation}
              </Badge>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4">Overall Score: {candidate.score.overall}/100</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1"><span>Technical</span><span>{candidate.score.technical}</span></div>
                  <Progress value={candidate.score.technical} />
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span>Problem Solving</span><span>{candidate.score.problemSolving}</span></div>
                  <Progress value={candidate.score.problemSolving} />
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span>Communication</span><span>{candidate.score.communication}</span></div>
                  <Progress value={candidate.score.communication} />
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span>Culture Fit</span><span>{candidate.score.cultureFit}</span></div>
                  <Progress value={candidate.score.cultureFit} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary" className="mt-8">
            <TabsList>
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="code">Code Submission</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{summary.summary}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transcript">
              <Card>
                 <CardHeader><CardTitle>Interview Transcript</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    {summary.transcript.map((line, i) => (
                        <div key={i} className={cn("flex items-start gap-3", line.speaker === 'Candidate' && 'justify-end')}>
                            {line.speaker === 'AI' && <Avatar className="h-8 w-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                            <p className={cn("max-w-md rounded-lg p-3", line.speaker === 'AI' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>{line.text}</p>
                            {line.speaker === 'Candidate' && <Avatar className="h-8 w-8"><AvatarImage src={candidate.avatarUrl} /></Avatar>}
                        </div>
                    ))}
                 </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="code">
               <Card>
                 <CardHeader><CardTitle>Code Submission</CardTitle></CardHeader>
                 <CardContent>
                    <pre className="bg-muted p-4 rounded-md font-code text-sm overflow-x-auto">
                        <code>{summary.codeSubmission}</code>
                    </pre>
                 </CardContent>
               </Card>
            </TabsContent>
          </Tabs>

        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{summary.strengths}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weaknesses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{summary.weaknesses}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Overall Suitability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{summary.overallSuitability}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}