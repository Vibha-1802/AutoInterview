import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dsaQuestions, csFundamentalsQuestions, systemDesignQuestions } from "@/lib/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function QuestionsPage() {
    return (
        <>
            <PageHeader title="Question Bank" description="Manage all interview questions across different categories.">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Question
                </Button>
            </PageHeader>
            <Tabs defaultValue="dsa">
                <TabsList>
                    <TabsTrigger value="dsa">Data Structures & Algorithms</TabsTrigger>
                    <TabsTrigger value="cs_fundamentals">CS Fundamentals</TabsTrigger>
                    <TabsTrigger value="system_design">System Design</TabsTrigger>
                </TabsList>
                <TabsContent value="dsa">
                    <Card>
                        <CardHeader>
                            <CardTitle>DSA Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {dsaQuestions.map(q => (
                                <div key={q.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold">{q.text}</p>
                                        <Badge>{q.topic}</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="cs_fundamentals">
                    <Card>
                        <CardHeader>
                            <CardTitle>CS Fundamentals Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {csFundamentalsQuestions.map(q => (
                                <div key={q.id} className="p-4 border rounded-lg">
                                     <div className="flex justify-between items-start">
                                        <p className="font-semibold">{q.text}</p>
                                        <div className="flex gap-2">
                                            <Badge>{q.topic}</Badge>
                                            <Badge variant="secondary">{q.type}</Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="system_design">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Design Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {systemDesignQuestions.map(q => (
                                <div key={q.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold">{q.text}</p>
                                        <Badge>{q.topic}</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
