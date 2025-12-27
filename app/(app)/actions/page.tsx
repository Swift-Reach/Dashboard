'use client';

import { act, useEffect, useState } from 'react';
import { Search, Filter, ArrowUpDown, Phone, Plus, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '../(components)/Button';
import { AxiosError } from 'axios';
import { sameDay } from '@/lib/utils';
import { ActionCard } from './(components)/ActionCard';

export default function ActionQueue() {

    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [actions, setActions] = useState<Action[]>([])

    useEffect(() => {
        (async () => {

            try {

                const res = await api.get("/self/actions");

                const actions: Action[] = res.data.map((a: any) => ({ ...a, due: new Date(a.due) }));

                const grouped = actions.reduce((groups: any[], a: Action) => {
                    const group = groups.find((g: any) => sameDay(g[0].due, a.due));
                    if (group) group.push(a)
                    else groups.push([a]);
                    return groups;
                }, []);

                grouped.forEach(g => {
                    g.sort((a: Action, b: Action) => {
                        const priorityOrder: any = { 'High': 0, 'Medium': 1, 'Low': 2 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    });
                });

                grouped.sort((a: Action[], b: Action[]) => a[0].due.getTime() - b[0].due.getTime());

                setActions(grouped.flat());

            } catch (e) {
                if (e instanceof AxiosError) setError(e.response?.data?.error);
                else {
                    setError("An unknown error occurred!");
                    console.error("Failed to fetch next action", e);
                }
            }

        })();
    }, []);

    return (
        <div className="p-8 space-y-6">
            <div className='flex flex-row justify-between'>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Action Queue
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {actions.length} Actions in queue
                    </p>
                </div>
                <div className='flex items-center'>
                    <Button className='aspect-square' variant='success' onClick={async () => {

                        try {

                            const res = await api.get("/self/actions/next")
                            const action: Action = { ...res.data, due: new Date(res.data.due) };
                            router.push(`/actions/${action.id}`)

                        } catch (e) {
                            if (e instanceof AxiosError) setError(e.response?.data?.error);
                            else {
                                setError("An unknown error occurred!");
                                console.error("Failed to fetch next action", e);
                            }
                        }

                    }}><Plus />
                    </Button>
                </div>
            </div>
            {error && (
                <div className='p-4 bg-[#ff535321] text-red-400 text-lg rounded-md shadow-md border border-[#ff4444c9]'>
                    <TriangleAlert className='inline h-5 w-5 mr-2 mb-1' />
                    {error}
                </div>
            )}
            <div className="space-y-4">
                {actions.map((a: Action) => ActionCard({ action: a }))}
            </div>
        </div>
    );
}
