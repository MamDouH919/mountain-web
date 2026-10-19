import {
  AppWindow,
  Camera,
  Megaphone,
  MessagesSquare,
  Palette,
  PenTool,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const serviceIds = [
  "media-buying",
  "designs",
  "logos",
  "websites",
  "mobile-apps",
  "photography",
  "social-media",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "media-buying": Megaphone,
  designs: Palette,
  logos: PenTool,
  websites: AppWindow,
  "mobile-apps": Smartphone,
  photography: Camera,
  "social-media": MessagesSquare,
};
