import {
  Activity,
  Cpu,
  Database,
  Eye,
  Layers,
  Lock,
  MessageCircle,
  Monitor,
  Network,
  Play,
  RefreshCw,
  Rocket,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Cpu,
  Database,
  Eye,
  Layers,
  Lock,
  MessageCircle,
  Monitor,
  Network,
  Play,
  RefreshCw,
  Rocket,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
};

export { ICON_MAP };

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Server;
}
