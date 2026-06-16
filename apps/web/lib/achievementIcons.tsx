import {
  Award,
  BookMarked,
  BookOpen,
  Flame,
  Gem,
  GraduationCap,
  Star,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  Target,
  BookOpen,
  BookMarked,
  GraduationCap,
  Trophy,
  Flame,
  Star,
  Gem,
  Award,
};

export function getAchievementIcon(name: string | null | undefined): LucideIcon {
  return (name && ACHIEVEMENT_ICONS[name]) || Award;
}
