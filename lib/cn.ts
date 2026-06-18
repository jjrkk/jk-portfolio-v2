import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. Lets component callers
 *  override base styles via a `className` prop without specificity fights. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
