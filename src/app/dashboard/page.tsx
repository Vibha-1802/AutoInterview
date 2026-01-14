import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, MoreVertical, Clock, Radio, Users, BarChart, Eye } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function Dashboard() {

  const statusIcons = {
    Completed: <CheckCircle2 className="h-4 w-4 text-success" />,
    Scheduled: <Clock className="h-4 w-4 text-blue-500" />,
    'In-Progress': <Radio className="h-4 w-4 text-inprogress animate-pulse" />,
    Expired: <Clock className="h-4 w-4 text-error" />,
  }

  return (
    <>
      <PageHeader title="Welcome Back, Manager" description="Here's a summary of your active interview pipelines." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{candidates.length}</div>
            <p className="text-xs text-secondary">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Interviews Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{candidates.filter(c => c.status === 'Completed').length}</div>
            <p className="text-xs text-secondary">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Avg. Overall Score</CardTitle>
            <BarChart className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">81.5</div>
            <p className="text-xs text-secondary">Across all completed interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Pending Reviews</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-secondary">Awaiting your decision</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={candidate.avatarUrl} alt={candidate.name} data-ai-hint={candidate.avatarHint}/>
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-secondary">{candidate.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>
                    <Badge variant={candidate.score && candidate.score.overall > 75 ? "default" : "secondary"}
                      className={cn(
                        candidate.score && candidate.score.overall > 75 && "bg-primary text-primary-foreground",
                        candidate.score && candidate.score.overall < 75 && "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {candidate.score ? `${candidate.score.overall}` : 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {statusIcons[candidate.status]}
                      <span>{candidate.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.interviewDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/candidates/${candidate.id}`}>
                        View Summary <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
