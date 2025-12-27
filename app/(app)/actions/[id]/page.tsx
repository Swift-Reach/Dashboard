'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "../../(components)/Card";
import { Badge } from "../../(components)/Badge";
import { priorityColors, statusColors, typeIcons } from "@/lib/static";
import { Building, Car, GoalIcon, Mail, Phone } from "lucide-react";
import { CallWizard } from "./(components)/CallWizard";

export default function ActionPage() {

    const { id } = useParams();

    const [action, setAction] = useState<Action | null>(null);
    const [actions, setActions] = useState<Action[] | null>([]);
    const [self, setSelf] = useState<User | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                if (e instanceof AxiosError) setError(e.response?.data?.error);
                else {
                    setError("An unknown error occurred!");
                    console.error("Failed to fetch next action", e);
                }
            }

        })();
    }, [id]);

    return <div className="my-8 mx-16">
        <div className="pb-8">{
            loading
                ? <Skeleton className="h-6 w-64 bg-black/5 dark:bg-accent" />
                : <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/actions">Actions</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/actions/${id}`}>{action?.lead?.name || id}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
        }</div>
        {loading || !action
            ? <></>
            : <div className="w-full h-full">
                <div className="flex items-center space-x-6 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                                {action.lead.name}
                            </h1>
                            <Badge color={statusColors[action.lead.status!]} size="md">
                                {action.lead.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-lg text-gray-500 dark:text-gray-400">{action.lead.company}</p>
                    </div>
                    <div className="text-right px-6 py-4 bg-gray-100 dark:bg-gray-900 rounded-2xl">
                        <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                            {(action.type === 'Call' ? 5 : action.type === 'Email' ? 3 : 0) * (action.priority == 'High' ? 2 : action.priority == "Medium" ? 1.5 : 1)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Points</div>
                    </div>
                </div>
                <div className="flex flex-row w-full h-full justify-between space-x-8">
                    <div className="w-1/2">
                        <Card className="p-8 mb-8 border-2 border-gray-200 dark:border-gray-800 sticky top-6">
                            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <div className="p-3 mr-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                                        <Phone className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{action.lead.number}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 mr-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                                        <Mail className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</div>
                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{action.lead.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 mr-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                                        <GoalIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Position</div>
                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{action.lead.position || "/"}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-3 mr-4 bg-gray-100 dark:bg-gray-900 rounded-xl">
                                        <Building className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Company</div>
                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{action.lead.company || "/"}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {
                            actions && actions.length > 1 &&
                            <Card className="p-8 border-2 border-gray-200 dark:border-gray-800">
                                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                    Context
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg space-y-4">
                                    {actions.filter(a => a.done).map(a => {

                                        const Icon = typeIcons[a.type];

                                        return <div className="flex" key={a.id}>
                                            <Badge color={a.done ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300" : "gray"} size="md">
                                                <Icon className="m-1 inline h-5 w-5 mr-2 text-gray-900 dark:text-gray-100" />
                                                {new Date(a.due).toLocaleDateString()}
                                            </Badge>
                                            {a.note && <p className="ml-2 flex flex-col justify-center text-lg">{a.note}</p>}
                                        </div>
                                    })}
                                </p>
                            </Card>
                        }
                    </div>
                    {
                        action.type == "Call" && <Card className="p-8 h-min border-2 w-full border-gray-200 dark:border-gray-800">
                            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                Call
                            </h2>
                            <CallWizard action={action} />
                        </Card>
                    }
                    {
                        action.type == "Email" && <Card className="p-8 h-min border-2 w-full border-gray-200 dark:border-gray-800">
                            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                                Mail
                            </h2>
                            <div>

                            </div>
                        </Card>
                    }
                    {["New", "Attempted_Contact"].includes(action?.lead.status) &&
                        <Card className="w-1/2 h-min p-8 border-2 border-gray-200 dark:border-gray-800 sticky top-6 max-w-4xl">
                            <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                                Script
                            </h2>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <pre className="whitespace-pre-wrap text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">

                                    {self?.name} hier  <br />
                                    <br />
                                    **Hook:** <br />
                                    Ich will ehrlich sein: Das ist ein Akquiseanruf. <br />
                                    Wollen Sie gleich auflegen oder hab ich 20 Sekunden?  <br />
                                    <br />
                                    **Intro:** <br />
                                    Ich spreche häufig mit Unternehmern aus der [BRANCHE] wie Ihnen.  <br />
                                    Die haben oft das Problem, dass sie nur zufällig Kaufanfragen bekommen, weil Sie von Empfehlungen abhängig sind.  <br />
                                    <br />
                                    **Pitch:** <br />
                                    Da wollte ich fragen, ob es sich für Sie interessant anhört, wenn wir zusammen ein System aufsetzen, dass die Interessenten eben genau im Moment abholt, in dem Sie überlegen zu kaufen und die Anfrage vorqualifiziert.  <br />
                                    <br />
                                    **Next Steps:**<br />
                                    - Interested: Schedule demo/meeting<br />
                                    - Not Interested: Thank and end call politely
                                </pre>
                            </div>
                        </Card>}
                </div></div>}
    </div>;

}
