import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

export function isMidnight(date:Date): boolean {
  if (date.getHours() != 0) return false;
  if (date.getMinutes() != 0) return false;
  if (date.getSeconds() != 0) return false;
  if (date.getMilliseconds() != 0) return false;
  return true;
}