import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Voicemail, Phone, ThumbsDown, Calendar, Mail, PhoneCall, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react"

export function CallWizard({ action }: { action: Action }) {
    const router = useRouter();
    const [stage, setStage] = useState<"0" | "1" | "2.1" | "2.2">("0");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleComplete = async (result: string) => {
        setIsLoading(true);
        try {
            await api.post(`/actions/${action.id}/finish`, { result });
            setShowSuccess(true);

            setTimeout(async () => {
                try {
                    const res = await api.get("/self/actions/next");
                    const newAction: Action = { ...res.data, due: new Date(res.data.due) };
                    router.push(`/actions/${newAction.id}`);
                } catch (e) {
                    if (!(e instanceof AxiosError)) console.error("Failed to fetch next action", e);
                    router.push(`/actions`);
                }
            }, 800);
        } catch (e) {
            if (!(e instanceof AxiosError)) console.error("Failed to finish action", e);
            router.push(`/actions`);
            setIsLoading(false);
        }
    };

    const stageInfo = {
        "0": { title: "Call Outcome", step: 1, total: 2 },
        "1": { title: "What Happened?", step: 2, total: 2 },
        "2.1": { title: "Follow-Up Method", step: 2, total: 2 },
        "2.2": { title: "Appointment Details", step: 2, total: 2 },
    };

    const canGoBack = stage !== "0";

    const goBack = () => {
        if (stage === "1") setStage("0");
        if (stage === "2.1" || stage === "2.2") setStage("1");
    };

    if (showSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                    <CheckCircle2 className="w-24 h-24 text-emerald-500 animate-in zoom-in duration-300" />
                    <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-6">Perfect!</h3>
                <p className="text-gray-600 mt-2">Loading next action...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">{stageInfo[stage].title}</h2>
                    <span className="text-sm font-medium text-gray-500">
                        Step {stageInfo[stage].step} of {stageInfo[stage].total}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500 ease-out"
                        style={{ width: `${(stageInfo[stage].step / stageInfo[stage].total) * 100}%` }}
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
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            onClick={() => handleComplete("follow_up_email")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="flex flex-col items-center text-white relative z-10">
                                <Mail className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-2">E-Mail</h3>
                                <p className="text-sm opacity-90 text-center">Send follow-up email</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleComplete("follow_up_call")}
                            disabled={isLoading}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

                {stage === "2.2" && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200">
                        <div className="text-center">
                            <Calendar className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h3>
                            <p className="text-gray-600 mb-8">Great job securing an appointment with this lead.</p>
                            <button
                                onClick={() => handleComplete("appointment_scheduled")}
                                disabled={isLoading}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Complete & Continue
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
