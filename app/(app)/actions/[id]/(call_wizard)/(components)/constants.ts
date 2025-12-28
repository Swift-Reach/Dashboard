export const TIME_PRESETS = [
    { hour: 9, minute: 0, label: '09:00' },
    { hour: 10, minute: 0, label: '10:00' },
    { hour: 11, minute: 0, label: '11:00' },
    { hour: 13, minute: 0, label: '13:00' },
    { hour: 14, minute: 0, label: '14:00' },
    { hour: 15, minute: 0, label: '15:00' },
    { hour: 16, minute: 0, label: '16:00' },
    { hour: 17, minute: 0, label: '17:00' },
];

export const DEFAULT_TIME = { hour: 10, minute: 0 };

export const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export type WizardStage = "0" | "1" | "2.1" | "2.1.1" | "2.1.2" | "2.1.3" | "2.2" | "2.2.1" | "2.2.2" | "2.3";

export const STAGE_INFO: Record<WizardStage, { title: string; step: number; total: number }> = {
    "0": { title: "Call Outcome", step: 1, total: 5 },
    "1": { title: "What Happened?", step: 2, total: 5 },
    "2.1": { title: "Follow-Up Method", step: 3, total: 5 },
    "2.1.1": { title: "Select Date", step: 3, total: 5 },
    "2.1.2": { title: "Select Time", step: 4, total: 5 },
    "2.1.3": { title: "Add Notes", step: 5, total: 5 },
    "2.2": { title: "Select Date", step: 3, total: 5 },
    "2.2.1": { title: "Select Time", step: 4, total: 5 },
    "2.2.2": { title: "Appointment Details", step: 5, total: 5 },
    "2.3": { title: "Add Notes", step: 4, total: 5 },
};
