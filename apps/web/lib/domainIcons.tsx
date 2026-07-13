import { Code2, Briefcase, Plane, ChefHat, Network, Compass } from "lucide-react";

interface DomainIconProps {
  name: string | null | undefined;
  className?: string;
}

export function DomainIcon({ name, className }: DomainIconProps) {
  if (name === "Code2") return <Code2 className={className} strokeWidth={2} />;
  if (name === "Briefcase") return <Briefcase className={className} strokeWidth={2} />;
  if (name === "Plane") return <Plane className={className} strokeWidth={2} />;
  if (name === "ChefHat") return <ChefHat className={className} strokeWidth={2} />;
  if (name === "Network") return <Network className={className} strokeWidth={2} />;
  return <Compass className={className} strokeWidth={2} />;
}
