import { act, ReactNode, useEffect } from 'react';
import { Card } from '../../(components)/Card';
import { Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { isMidnight, sameDay } from '@/lib/utils';
import { Badge } from '../../(components)/Badge';
import { priorityColors, statusColors, typeIcons } from '@/lib/static';

export function ActionCard({ action }: { action: Action }) {

    const router = useRouter();

    const Icon = typeIcons[action.type];

    const tet = new Date()
    tet.setHours(0, 0, 0, 0)

    return (
        <Card
            key={action.id}
            className="p-6 cursor-pointer"
            hover
            onClick={() => router.push(`/actions/${action.id}`)}
        >
            <div className="flex items-center justify-between">
                <div className="mr-6 p-5 rounded-lg bg-gray-100 dark:bg-gray-900">
                    <Icon className={`h-7 w-7 ${priorityColors[action.priority]}`} />
                </div>

                <div className="flex-1 justify-between">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                            {action.lead.name}
                        </h3>
                        <Badge color={statusColors[action.lead.status]}>
                            {action.lead.status.replace('_', ' ')}
                        </Badge>
                    </div>

                    { action.lead.company && <div className="flex items-center text-sm mb-2 text-gray-700 dark:text-gray-300">
                         {action.lead.position ? action.lead.position + " @" : ""} {action.lead.company}
                    </div>}

                    {isMidnight(action.due) ||
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            um {action.due.toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })} Uhr
                        </div>
                    }
                </div>

                <div className="text-right flex flex-row self-center ml-6">
                    <div className='h-full font-bold flex flex-row'>
                        <div className="text-3xl text-blue-600 dark:text-blue-400">
                            {(action.type === 'Call' ? 5 : action.type === 'Email' ? 3 : 0) * (action.priority == 'High' ? 2 : action.priority == "Medium" ? 1.5 : 1)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            P
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )

}
