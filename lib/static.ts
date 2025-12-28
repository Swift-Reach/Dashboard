import { Calendar, Mail, Phone } from "lucide-react";

export const priorityColors: any = {
    High: 'text-red-600' as const,
    Medium: 'text-orange-500' as const,
    Low: 'text-yellow-400' as const,
};

export const typeIcons: any = {
    Call: Phone,
    Email: Mail,
    Appointment: Calendar
}

export const statusColors: any = {
    New: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300',
    'Attempted_Contact': 'bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-300',
    Connected: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-300',
    Appointment: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300',
    Uninterested: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300'
};