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

export function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function generateCalendarDays(calendarMonth: Date): (Date | null)[] {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = getDaysInMonth(calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarMonth);

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    return days;
}

export function isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

export function isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return isSameDay(date, today);
}

export function isPastDate(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
}

export function adjustForWeekend(date: Date): Date {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        date.setDate(date.getDate() + 1);
    } else if (dayOfWeek === 6) {
        date.setDate(date.getDate() + 2);
    }
    return date;
}
