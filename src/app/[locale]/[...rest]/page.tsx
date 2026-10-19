import { notFound } from "next/navigation";

// This segment always 404s, so there is no UI for instant-navigation
// validation to check.
export const instant = false;

// Unknown paths under a locale render the localized not-found page inside the
// site layout, instead of Next's unstyled global 404.
export default function CatchAll() {
  notFound();
}
