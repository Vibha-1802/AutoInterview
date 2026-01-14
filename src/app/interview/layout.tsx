import { Logo } from "@/components/logo";

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-card">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 border-b">
        <Logo />
        <span className="text-sm text-secondary">Candidate Interview</span>
      </header>
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
}
