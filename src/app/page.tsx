import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Code, Cpu, LineChart, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'landing-hero');
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Avatars',
      description: 'Create custom AI interviewers for any role, from technical to HR.',
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: 'Live Code Execution',
      description: 'Test candidates in real-time with an integrated code editor and execution engine.',
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: 'Adaptive Questioning',
      description: 'Our AI asks intelligent follow-up questions based on candidate responses.',
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: 'In-Depth Analytics',
      description: 'Get structured summaries and multi-dimensional scores for every interview.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[500px] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          <div className="container relative mx-auto flex h-full flex-col items-start justify-center px-4 text-left">
            <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl">
              Hire smarter, not harder.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
              AutoInterview provides autonomous AI avatars to conduct technical and behavioral interviews, so you can focus on the best candidates.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="container mx-auto py-16 px-4 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              The Future of Technical Hiring is Here
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Streamline your entire interview process with our intelligent platform.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutoInterview. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
