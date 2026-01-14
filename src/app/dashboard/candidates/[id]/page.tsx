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
import { Check, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CandidateSummaryPage({ params }: { params: { id: string } }) {
  const candidate = candidates.find((c) => c.id === params.id);
  const summary = interviewSummaries.find((s) => s.candidateId === params.id);

  if (!candidate) {
    notFound();
  }

  const recommendationBadges: { [key: string]: string } = {
    'Strong Hire': 'bg-success hover:bg-success/90',
    'Hire': 'bg-primary hover:bg-primary/90',
    'Maybe': 'bg-warning hover:bg-warning/90',
    'No Hire': 'bg-error hover:bg-error/90',
  }

  const getOverallScore = () => {
    if (!candidate.roundScores || !candidate.score) return { score: 0, text: 'Not Graded' };

    const { round1, round2, round3 } = candidate.roundScores;
    const overall = candidate.score.overall;

    if (candidate.status === 'Failed Round 1') return { score: round1 || 0, text: `Failed Round 1 with ${round1}` }
    if (candidate.status === 'Failed Round 2') return { score: round2 || 0, text: `Failed Round 2 with ${round2}` }
    if (candidate.status === 'Completed') return { score: overall, text: 'Completed' }

    return { score: overall, text: `Overall: ${overall}/100` };
  }

  const overall = getOverallScore();

  return (
    <>
      <PageHeader title="Interview Summary">
        <Button variant="outline" className='text-error border-error hover:bg-error hover:text-white'>
          <ThumbsDown className="mr-2 h-4 w-4" /> Reject
        </Button>
        <Button variant='success'>
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
                <CardTitle className="font-bold text-2xl">{candidate.name}</CardTitle>
                <p className="text-secondary">{candidate.role}</p>
              </div>
              {summary && <Badge className={cn("ml-auto text-white", recommendationBadges[summary.recommendation])}>
                {summary.recommendation}
              </Badge>}
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4">{overall.text}</h3>
              {candidate.score && <div className="space-y-4">
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
              </div>}
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Round-by-Round Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className={cn("p-4 rounded-lg", candidate.roundScores?.round1 ? (candidate.roundScores.round1 >= 60 ? 'bg-success/10' : 'bg-error/10') : 'bg-muted')}>
                <h4 className="font-bold">Round 1: DSA</h4>
                {candidate.roundScores?.round1 !== null && candidate.roundScores?.round1 !== undefined ? (
                  <p className="text-3xl font-bold">{candidate.roundScores.round1}</p>
                ) : <p className="text-secondary">N/A</p>}
                {candidate.roundScores?.round1 ? (candidate.roundScores.round1 >= 60 ? <p className="text-sm text-success">Passed</p> : <p className="text-sm text-error">Failed</p>): null}
              </div>
              <div className={cn("p-4 rounded-lg", candidate.roundScores?.round2 ? (candidate.roundScores.round2 >= 65 ? 'bg-success/10' : 'bg-error/10') : 'bg-muted')}>
                <h4 className="font-bold">Round 2: CS Fundamentals</h4>
                {candidate.roundScores?.round2 !== null && candidate.roundScores?.round2 !== undefined ? (
                  <p className="text-3xl font-bold">{candidate.roundScores.round2}</p>
                ) : <p className="text-secondary">N/A</p>}
                {candidate.roundScores?.round2 ? (candidate.roundScores.round2 >= 65 ? <p className="text-sm text-success">Passed</p> : <p className="text-sm text-error">Failed</p>): null}
              </div>
              <div className={cn("p-4 rounded-lg", candidate.roundScores?.round3 ? 'bg-accent' : 'bg-muted')}>
                <h4 className="font-bold">Round 3: System Design</h4>
                {candidate.roundScores?.round3 !== null && candidate.roundScores?.round3 !== undefined ? (
                  <p className="text-3xl font-bold">{candidate.roundScores.round3}</p>
                ) : <p className="text-secondary">N/A</p>}
              </div>
            </CardContent>
          </Card>

          {summary && <Tabs defaultValue="summary" className="mt-8">
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
                  <p className="text-secondary">{summary.summary}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transcript">
              <Card>
                 <CardHeader><CardTitle>Interview Transcript</CardTitle></CardHeader>
                 <CardContent className="space-y-4 bg-background p-4 rounded-lg">
                    {summary.transcript.map((line, i) => (
                        <div key={i} className={cn("flex items-start gap-3", line.speaker === 'Candidate' && 'justify-end')}>
                            {line.speaker === 'AI' && <Avatar className="h-8 w-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                            <p className={cn("max-w-md rounded-lg p-3", line.speaker === 'AI' ? 'bg-accent' : 'bg-muted')}>{line.text}</p>
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
                    <pre className="bg-gray-800 text-white p-4 rounded-md font-code text-sm overflow-x-auto">
                        <code>{summary.codeSubmission}</code>
                    </pre>
                 </CardContent>
               </Card>
            </TabsContent>
          </Tabs>}

        </div>
        {summary && <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">{summary.strengths}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Weaknesses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">{summary.weaknesses}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Overall Suitability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary">{summary.overallSuitability}</p>
            </CardContent>
          </Card>
        </div>}
      </div>
    </>
  );
}
