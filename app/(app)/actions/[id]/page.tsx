'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { typeIcons } from "@/lib/static";
import { Building, Mail, Phone, User, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { CallWizard } from "./(call_wizard)";
import Link from "next/link";

export default function ActionPage() {
    const { id } = useParams();

    const [action, setAction] = useState<Action | null>(null);
    const [actions, setActions] = useState<Action[] | null>([]);
    const [self, setSelf] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const action = await api.get(`/actions/${id}`).then(res => res.data);
                setAction(action);
                setSelf(await api.get(`/self`).then(res => res.data));
                setActions(await api.get(`/leads/${action?.lead.id}/actions`).then(res => res.data));
                setLoading(false);
            } catch (e) {
                if (!(e instanceof AxiosError)) {
                    console.error("Failed to fetch action", e);
                }
            }
        })();
    }, [id]);

    if (loading || !action) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Skeleton className="h-12 w-64 bg-white/50 rounded-2xl" />
                    <Skeleton className="h-96 w-full bg-white/50 rounded-3xl" />
                </div>
            </div>
        );
    }

    const points = {'Appointment': 10, 'Call': 5, 'Email': 3}[action.type] * {'High': 5, 'Medium': 2, 'Low': 1}[action.priority]

    const completedActions = actions?.filter(a => a.done && a.id !== action.id) || [];
    const showScript = ["New", "Attempted_Contact"].includes(action?.lead.status);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50 p-8">
            <div className="mx-52">
                <Link
                    href="/actions"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group mb-6"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Actions</span>
                </Link>

                <div className="bg-linear-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-100 p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    {action.lead.name}
                                </h1>
                                <span className="px-4 py-1.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-md">
                                    {action.lead.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-xl text-gray-600 font-medium">{action.lead.company}</p>
                            <div className="flex items-center gap-2 mt-4">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    Due {new Date(action.due).toLocaleDateString('de-DE', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-orange-500 blur-2xl opacity-20 rounded-3xl"></div>
                            <div className="relative bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-lg min-w-35">
                                <div className="text-center">
                                    <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
                                    <div className="text-4xl font-bold text-white">
                                        {points}
                                    </div>
                                    <div className="text-xs text-white/90 uppercase tracking-wider font-semibold mt-1">
                                        Points
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="bg-linear-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-8 animate-in fade-in slide-in-from-left duration-500">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md">
                                            <Phone className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-500 font-semibold mb-1">Phone</div>
                                            <div className="font-bold text-gray-900 truncate">{action.lead.number}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl shadow-md">
                                            <Mail className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-500 font-semibold mb-1">Email</div>
                                            <div className="font-bold text-gray-900 truncate text-sm">{action.lead.email}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-500 font-semibold mb-1">Position</div>
                                            <div className="font-bold text-gray-900 truncate">{action.lead.position || "Not specified"}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-orange-50 to-rose-50 rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-linear-to-br from-orange-500 to-rose-500 rounded-xl shadow-md">
                                            <Building className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs text-gray-500 font-semibold mb-1">Company</div>
                                            <div className="font-bold text-gray-900 truncate">{action.lead.company || "Not specified"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {completedActions.length > 0 && (
                            <div className="bg-linear-to-br from-white to-indigo-50 rounded-3xl shadow-lg border border-indigo-100 p-8 animate-in fade-in slide-in-from-left duration-700">
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-linear-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                                    History
                                </h2>
                                <div className="space-y-3">
                                    {completedActions.map(a => {
                                        const Icon = typeIcons[a.type];
                                        return (
                                            <div
                                                key={a.id}
                                                className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-linear-to-br from-indigo-500 to-purple-500 rounded-lg shadow-sm">
                                                        <Icon className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {new Date(a.due).toLocaleDateString('de-DE', {
                                                                weekday: 'short',
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                        {a.note && (
                                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                                {a.note}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {showScript && (
                            <div className="bg-linear-to-br from-white to-purple-50 rounded-3xl shadow-lg border border-purple-100 p-8 animate-in fade-in slide-in-from-left duration-1000">
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                    Call Script
                                </h2>
                                <div className="space-y-4 text-gray-700">
                                    <div className="bg-white rounded-2xl p-5 border border-purple-100">
                                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Opening</div>
                                        <p className="leading-relaxed">
                                            {self?.name} hier<br />
                                            <br />
                                            Ich will ehrlich sein: Das ist ein Akquiseanruf.<br />
                                            Wollen Sie gleich auflegen oder hab ich 20 Sekunden?
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-5 border border-purple-100">
                                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Introduction</div>
                                        <p className="leading-relaxed">
                                            Ich spreche häufig mit Unternehmern aus der [BRANCHE] wie Ihnen.<br />
                                            Die haben oft das Problem, dass sie nur zufällig Kaufanfragen bekommen, weil Sie von Empfehlungen abhängig sind.
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-5 border border-purple-100">
                                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Value Proposition</div>
                                        <p className="leading-relaxed">
                                            Da wollte ich fragen, ob es sich für Sie interessant anhört, wenn wir zusammen ein System aufsetzen,
                                            dass die Interessenten eben genau im Moment abholt, in dem Sie überlegen zu kaufen und die Anfrage vorqualifiziert.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="animate-in fade-in slide-in-from-right duration-500">
                        {action.type === "Call" && (
                            <div className="bg-linear-to-br from-white to-blue-50 rounded-3xl shadow-lg border border-blue-100 p-8">
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                    Complete Call
                                </h2>
                                <CallWizard action={action} />
                            </div>
                        )}

                        {action.type === "Email" && (
                            <div className="bg-linear-to-br from-white to-purple-50 rounded-3xl shadow-lg border border-purple-100 p-8">
                                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                    Send Email
                                </h2>
                                <div className="text-center py-12">
                                    <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Email workflow coming soon</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
