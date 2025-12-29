import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Voicemail, Phone, ThumbsDown, Calendar, Mail, PhoneCall, ArrowLeft, CheckCircle2, Sparkles, CalendarDays } from "lucide-react";
import { TimeSelector } from "./(components)/TimeSelector";
import { CalendarPicker } from "./(components)/CalendarPicker";
import { NotesInput } from "./(components)/NotesInput";
import { adjustForWeekend } from "@/lib/utils";
import { WizardStage, STAGE_INFO } from "./(components)/constants";
import { Confetti } from "@/app/(app)/(components)/Confetti";
import { FloatingPoints } from "@/app/(app)/(components)/FloatingPoints";
import { LevelUpModal } from "@/app/(app)/(components)/LevelUpModal";

export function CallWizard({ action }: { action: Action }) {
    const router = useRouter();
    const [stage, setStage] = useState<WizardStage>("0");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [customDays, setCustomDays] = useState<number | ''>(1);
    const [customWeeks, setCustomWeeks] = useState<number | ''>(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState<number>(10);
    const [selectedMinute, setSelectedMinute] = useState<number>(0);
    const [emailNote, setEmailNote] = useState<string>('');
    const [callNote, setCallNote] = useState<string>('');
    const [appointmentNote, setAppointmentNote] = useState<string>('');
    const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

    const [showConfetti, setShowConfetti] = useState(false);
    const [showFloatingPoints, setShowFloatingPoints] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [oldLevel, setOldLevel] = useState(0);
    const [newLevel, setNewLevel] = useState(0);

    const handleComplete = async (result: string, scheduledDate?: Date, note?: string) => {
        setIsLoading(true);
        try {
            const userBeforeRes = await api.get("/self/stats/level");
            const userBefore = userBeforeRes.data;
            const levelBefore = userBefore.level || 0;

            const points = {'Appointment': 10, 'Call': 5, 'Email': 3}[action.type] * {'High': 5, 'Medium': 2, 'Low': 1}[action.priority];

            const payload: { result: string; scheduledDate?: string; note?: string } = { result };
            if (scheduledDate) {
                payload.scheduledDate = scheduledDate.toISOString();
            }
            if (note) {
                payload.note = note;
            }
            const finishRes = await api.post(`/actions/${action.id}/finish`, payload);
            const { level: levelAfter } = finishRes.data;

            setShowSuccess(true);
            setShowConfetti(true);
            setEarnedPoints(points);

            setTimeout(() => {
                setShowFloatingPoints(true);
            }, 200);

            const didLevelUp = levelAfter > levelBefore;

            if (didLevelUp) {
                setOldLevel(levelBefore);
                setNewLevel(levelAfter);
                setTimeout(() => {
                    setShowLevelUp(true);
                }, 2200);
            } else {
                setTimeout(async () => {
                    try {
                        const res = await api.get("/self/actions/next");
                        const newAction: Action = { ...res.data, due: new Date(res.data.due) };
                        router.push(`/actions/${newAction.id}`);
                    } catch (e) {
                        if (!(e instanceof AxiosError)) console.error("Failed to fetch next action", e);
                        router.push(`/actions`);
                    }
                }, 2200);
            }
        } catch (e) {
            if (!(e instanceof AxiosError)) console.error("Failed to finish action", e);
            router.push(`/actions`);
            setIsLoading(false);
        }
    };

    const canGoBack = stage !== "0";

    const goBack = () => {
        if (stage === "1") setStage("0");
        if (stage === "2.1" || stage === "2.2") setStage("1");
        if (stage === "2.1.1") setStage("2.1");
        if (stage === "2.1.2") setStage("2.1.1");
        if (stage === "2.1.3") setStage("2.1.2");
        if (stage === "2.2.1") setStage("2.2");
        if (stage === "2.2.2") setStage("2.2.1");
        if (stage === "2.3") setStage("2.1");
    };

    const handleFollowUpDateSelection = (date: Date) => {
        const adjustedDate = adjustForWeekend(new Date(date));
        setSelectedDate(adjustedDate);
        setStage("2.1.2");
    };

    const handleAppointmentDateSelection = (date: Date) => {
        setSelectedDate(date);
        setStage("2.2.1");
    };

    const calculateDate = (days: number): Date => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return adjustForWeekend(date);
    };

    const createScheduledDate = (): Date => {
        const date = new Date(selectedDate!);
        date.setHours(selectedHour, selectedMinute, 0, 0);
        return date;
    };

    return (
        <>
            <Confetti active={showConfetti} />
            <FloatingPoints points={earnedPoints} active={showFloatingPoints} />
            <LevelUpModal
                oldLevel={oldLevel}
                newLevel={newLevel}
                show={showLevelUp}
                onClose={async () => {
                    setShowLevelUp(false);
                    try {
                        const res = await api.get("/self/actions/next");
                        const newAction: Action = { ...res.data, due: new Date(res.data.due) };
                        router.push(`/actions/${newAction.id}`);
                    } catch (e) {
                        if (!(e instanceof AxiosError)) console.error("Failed to fetch next action", e);
                        router.push(`/actions`);
                    }
                }}
            />

            {showSuccess ? (
                <div className="flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <CheckCircle2 className="w-24 h-24 text-emerald-500 animate-in zoom-in duration-300" />
                        <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6">Perfect!</h3>
                    <p className="text-gray-600 mt-2">Loading next action...</p>
                </div>
            ) : (
            <div className="w-full max-w-3xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold text-gray-800">{STAGE_INFO[stage].title}</h2>
                        <span className="text-sm font-medium text-gray-500">
                            Step {STAGE_INFO[stage].step} of {STAGE_INFO[stage].total}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500 ease-out"
                            style={{ width: `${(STAGE_INFO[stage].step / STAGE_INFO[stage].total) * 100}%` }}
                        />
                    </div>
                </div>

            {canGoBack && !isLoading && (
                <button
                    onClick={goBack}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {stage === "0" && (
                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={() => handleComplete("mailbox")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <Voicemail className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-2">Mailbox</h3>
                                <p className="text-sm opacity-90 text-center">Voicemail reached</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setStage("1")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <Phone className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-2">Rangegangen</h3>
                                <p className="text-sm opacity-90 text-center">Call was answered</p>
                            </div>
                        </button>
                    </div>
                )}

                {stage === "1" && (
                    <div className="grid grid-cols-3 gap-6">
                        <button
                            onClick={() => handleComplete("uninterested")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-400 to-pink-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <ThumbsDown className="w-14 h-14 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-xl font-bold mb-2">Kein Interesse</h3>
                                <p className="text-xs opacity-90 text-center">Not interested</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setStage("2.1")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-400 to-indigo-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <PhoneCall className="w-14 h-14 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-xl font-bold mb-2">Follow Up</h3>
                                <p className="text-xs opacity-90 text-center">Needs follow-up</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setStage("2.2")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-400 to-green-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <Calendar className="w-14 h-14 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-xl font-bold mb-2">Termin</h3>
                                <p className="text-xs opacity-90 text-center">Appointment set</p>
                            </div>
                        </button>
                    </div>
                )}

                {stage === "2.1" && (
                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={() => setStage("2.3")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-sky-400 to-blue-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <Mail className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-2">E-Mail</h3>
                                <p className="text-sm opacity-90 text-center">Send follow-up email</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setStage("2.1.1")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-400 to-purple-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <PhoneCall className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-2">Call</h3>
                                <p className="text-sm opacity-90 text-center">Schedule another call</p>
                            </div>
                        </button>
                    </div>
                )}

                {stage === "2.1.1" && (
                    <div className="space-y-6">
                        <button
                            onClick={() => handleFollowUpDateSelection(calculateDate(0))}
                            disabled={isLoading}
                            className="group w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-400 to-teal-400 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex items-center justify-between text-white relative z-10">
                                <div className="flex items-center gap-4">
                                    <Sparkles className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold">Today</h3>
                                        <p className="text-sm opacity-90">{calculateDate(0).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>
                                <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>

                        <button
                            onClick={() => handleFollowUpDateSelection(calculateDate(customDays || 1))}
                            disabled={isLoading}
                            className="group w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-400 to-indigo-400 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex items-center justify-between text-white relative z-10">
                                <div className="flex items-center gap-4 flex-1">
                                    <CalendarDays className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                                    <div className="text-left flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold">In</span>
                                            <input
                                                type="number"
                                                max="30"
                                                value={customDays}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    const val = e.target.value;
                                                    if (val === '') {
                                                        setCustomDays('');
                                                    } else {
                                                        const num = parseInt(val);
                                                        if (!isNaN(num)) {
                                                            setCustomDays(Math.min(30, num));
                                                        }
                                                    }
                                                }}
                                                onBlur={() => {
                                                    if (customDays === '' || customDays < 1) {
                                                        setCustomDays(1);
                                                    }
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                onFocus={(e) => e.target.select()}
                                                className="w-16 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                                            />
                                            <span className="text-2xl font-bold">Day{customDays !== 1 ? 's' : ''}</span>
                                        </div>
                                        <p className="text-sm opacity-90 mt-1">{calculateDate(customDays || 1).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>
                                <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform ml-4" />
                            </div>
                        </button>

                        <button
                            onClick={() => handleFollowUpDateSelection(calculateDate((customWeeks || 1) * 7))}
                            disabled={isLoading}
                            className="group w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-400 to-purple-400 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex items-center justify-between text-white relative z-10">
                                <div className="flex items-center gap-4 flex-1">
                                    <Calendar className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
                                    <div className="text-left flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold">In</span>
                                            <input
                                                type="number"
                                                max="8"
                                                value={customWeeks}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    const val = e.target.value;
                                                    if (val === '') {
                                                        setCustomWeeks('');
                                                    } else {
                                                        const num = parseInt(val);
                                                        if (!isNaN(num)) {
                                                            setCustomWeeks(Math.min(8, num));
                                                        }
                                                    }
                                                }}
                                                onBlur={() => {
                                                    if (customWeeks === '' || customWeeks < 1) {
                                                        setCustomWeeks(1);
                                                    }
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                onFocus={(e) => e.target.select()}
                                                className="w-16 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                                            />
                                            <span className="text-2xl font-bold">Week{customWeeks !== 1 ? 's' : ''}</span>
                                        </div>
                                        <p className="text-sm opacity-90 mt-1">{calculateDate((customWeeks || 1) * 7).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                    </div>
                                </div>
                                <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform ml-4" />
                            </div>
                        </button>
                    </div>
                )}

                {stage === "2.1.2" && (
                    <TimeSelector
                        selectedDate={selectedDate}
                        selectedHour={selectedHour}
                        selectedMinute={selectedMinute}
                        onHourChange={setSelectedHour}
                        onMinuteChange={setSelectedMinute}
                        onContinue={() => setStage("2.1.3")}
                        onSkip={() => setStage("2.1.3")}
                        isLoading={isLoading}
                        colorScheme="blue"
                    />
                )}

                {stage === "2.1.3" && (
                    <NotesInput
                        title="Call Notes"
                        description="What should be discussed on this call?"
                        placeholder="e.g., Follow up on pricing concerns, discuss implementation timeline..."
                        value={callNote}
                        onChange={setCallNote}
                        onSkip={() => handleComplete("follow_up_call", createScheduledDate(), "")}
                        onComplete={() => handleComplete("follow_up_call", createScheduledDate(), callNote)}
                        isLoading={isLoading}
                        icon={PhoneCall}
                        colorScheme="blue"
                    />
                )}

                {stage === "2.2" && (
                    <CalendarPicker
                        selectedDate={selectedDate}
                        calendarMonth={calendarMonth}
                        onDateSelect={handleAppointmentDateSelection}
                        onMonthChange={(delta) => {
                            setCalendarMonth(prev => {
                                const newDate = new Date(prev);
                                newDate.setMonth(newDate.getMonth() + delta);
                                return newDate;
                            });
                        }}
                        isLoading={isLoading}
                    />
                )}

                {stage === "2.2.1" && (
                    <TimeSelector
                        selectedDate={selectedDate}
                        selectedHour={selectedHour}
                        selectedMinute={selectedMinute}
                        onHourChange={setSelectedHour}
                        onMinuteChange={setSelectedMinute}
                        onContinue={() => setStage("2.2.2")}
                        onSkip={() => setStage("2.2.2")}
                        isLoading={isLoading}
                        colorScheme="emerald"
                    />
                )}

                {stage === "2.2.2" && (
                    <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 shadow-xl border border-emerald-100">
                        <div className="text-center mb-8">
                            <div className="relative inline-block mb-4">
                                <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 rounded-full"></div>
                                <Calendar className="w-16 h-16 text-emerald-600 relative" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Appointment Confirmed!</h3>
                            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-emerald-200 mb-6">
                                <CalendarDays className="w-5 h-5 text-emerald-600" />
                                <div className="text-left">
                                    <p className="text-sm text-gray-600 leading-tight">
                                        {selectedDate?.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                    <p className="text-emerald-600 text-lg font-bold leading-tight">
                                        {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">Add appointment details</p>
                        </div>
                        <textarea
                            value={appointmentNote}
                            onChange={(e) => setAppointmentNote(e.target.value)}
                            placeholder="e.g., Product demo, Contract discussion, Initial meeting..."
                            className="w-full px-5 py-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-3 focus:ring-emerald-200 focus:outline-none transition-all resize-none text-gray-700 shadow-md hover:border-emerald-300"
                            rows={4}
                        />
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => handleComplete("appointment_scheduled", createScheduledDate(), "")}
                                disabled={isLoading}
                                className="flex-1 bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-400 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Skip
                            </button>
                            <button
                                onClick={() => handleComplete("appointment_scheduled", createScheduledDate(), appointmentNote)}
                                disabled={isLoading}
                                className="flex-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                )}

                {stage === "2.3" && (
                    <NotesInput
                        title="Email Notes"
                        description="What information should be sent via email?"
                        placeholder="e.g., Wants product information, pricing details..."
                        value={emailNote}
                        onChange={setEmailNote}
                        onSkip={() => handleComplete("follow_up_email", undefined, "")}
                        onComplete={() => handleComplete("follow_up_email", undefined, emailNote)}
                        isLoading={isLoading}
                        icon={Mail}
                        colorScheme="sky"
                    />
                )}
            </div>
        </div>
            )}
        </>
    );
}
