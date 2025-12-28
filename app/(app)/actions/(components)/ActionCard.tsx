import { useRouter } from 'next/navigation';
import { isMidnight } from '@/lib/utils';
import { statusColors, typeIcons } from '@/lib/static';
import { Building, Sparkles } from 'lucide-react';

export function ActionCard({ action }: { action: Action }) {
    const router = useRouter();
    const Icon = typeIcons[action.type];

    const points = {'Appointment': 10, 'Call': 5, 'Email': 3}[action.type] * {'High': 5, 'Medium': 2, 'Low': 1}[action.priority]

    const typeColors = {
        Call: 'from-blue-600 to-blue-500',
        Email: 'from-teal-600 to-teal-500',
        Appointment: 'from-lime-600 to-lime-500'
    };

    const priorityGradients = {
        High: 'from-red-600 to-red-500',
        Medium: 'from-orange-500 to-orange-400',
        Low: 'from-gray-700 to-gray-500'
    };

    const priorityBackgrounds = {
        High: 'from-white to-red-50 border-red-200',
        Medium: 'from-white to-orange-50 border-orange-200',
        Low: 'from-white to-gray-50 border-gray-200'
    };

    return (
        <div
            onClick={() => router.push(`/actions/${action.id}`)}
            className={`group relative bg-gradient-to-br ${priorityBackgrounds[action.priority]} rounded-3xl shadow-md border hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
                <div className="flex items-center gap-6">
                    <div className={`p-4 bg-gradient-to-br ${typeColors[action.type]} rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 truncate">
                                {action.lead.name}
                            </h3>
                            <span className={`px-3 py-1 ${statusColors[action.lead.status]} text-xs font-semibold rounded-full whitespace-nowrap`}>
                                {action.lead.status.replace('_', ' ')}
                            </span>
                        </div>

                        {action.lead.company && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                                <Building className="w-4 h-4 text-gray-500" />
                                <span className="font-medium">
                                    {action.lead.position ? `${action.lead.position} @ ` : ''}{action.lead.company}
                                </span>
                            </div>
                        )}

                        {!isMidnight(action.due) && (
                            <div className="text-sm text-gray-600 font-medium">
                                {action.due.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })} Uhr
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                                {action.type}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">
                                {action.due.toLocaleDateString("de-DE", {
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </div>
                        </div>

                        <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${priorityGradients[action.priority]} blur-xl opacity-20 rounded-2xl`}></div>
                            <div className={`relative bg-gradient-to-br ${priorityGradients[action.priority]} rounded-2xl p-4 shadow-md min-w-[80px] group-hover:scale-110 transition-transform duration-200`}>
                                <div className="text-center">
                                    <Sparkles className="w-4 h-4 text-white mx-auto mb-1" />
                                    <div className="text-2xl font-bold text-white">
                                        {points}
                                    </div>
                                    <div className="text-[10px] text-white/90 uppercase tracking-wider font-semibold">
                                        Points
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
