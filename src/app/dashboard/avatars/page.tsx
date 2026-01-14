import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { avatars } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { PlusCircle } from "lucide-react";

export default function AvatarsPage() {
  const bgColors = ['bg-[#B8E0FF]', 'bg-[#E5D4FF]', 'bg-[#FFD4E5]', 'bg-[#FFF4CC]', 'bg-[#B8E0FF]', 'bg-[#E5D4FF]'];

  return (
    <>
      <PageHeader
        title="Avatar Management"
        description="Create and configure your AI-powered interview avatars."
      >
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Avatar
        </Button>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {avatars.map((avatar, index) => (
          <Card key={avatar.id} className={bgColors[index % bgColors.length]}>
            <CardHeader>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.name}
                  fill
                  className="object-cover"
                  data-ai-hint={avatar.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-bold text-xl text-card-foreground">{avatar.name}</CardTitle>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-card-foreground/50 text-card-foreground">{avatar.role}</Badge>
                <Badge variant="outline" className="border-card-foreground/50 text-card-foreground">Difficulty: {avatar.difficulty}</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-card-foreground">Status</span>
              <div className="flex items-center gap-2">
                <Switch id={`active-${avatar.id}`} checked={avatar.isActive} />
                <label htmlFor={`active-${avatar.id}`} className="text-sm font-medium text-card-foreground">
                  {avatar.isActive ? 'Active' : 'Inactive'}
                </label>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
