import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, MoreVertical, Clock, Radio, Users, BarChart, Eye, XCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function CandidatesPage() {

  const statusIcons = {
    Completed: <CheckCircle2 className="h-4 w-4 text-success" />,
    Scheduled: <Clock className="h-4 w-4 text-blue-500" />,
    'In-Progress': <Radio className="h-4 w-4 text-inprogress animate-pulse" />,
    Expired: <Clock className="h-4 w-4 text-error" />,
    'Failed Round 1': <XCircle className="h-4 w-4 text-error" />,
    'Failed Round 2': <XCircle className="h-4 w-4 text-error" />,
  }

  const getStatusIcon = (status: keyof typeof statusIcons) => {
    return statusIcons[status] || <Clock className="h-4 w-4 text-secondary" />;
  }

  return (
    <>
      <PageHeader title="Candidates" description="Review and manage all candidates in the pipeline." />
      
      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Interview Date</TableHead>
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
                        candidate.score && candidate.score.overall > 80 && "bg-success text-white",
                        candidate.score && candidate.score.overall >= 70 && candidate.score.overall < 80 && "bg-primary text-primary-foreground",
                        candidate.score && candidate.score.overall >= 60 && candidate.score.overall < 70 && "bg-warning text-warning-foreground",
                        candidate.score && candidate.score.overall < 60 && "bg-error text-error-foreground",
                      )}
                    >
                      {candidate.score ? `${candidate.score.overall}` : 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(candidate.status)}
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
