import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"



export function CallWizard({ action }: { action: Action }) {

    const router = useRouter();

    const [stage, setStage] = useState<"0" | "1" | "2.1" | "2.2">("0");

    const stages = {
        "0": <div className="w-full flex gap-4">
            <div
                onClick={async () => {

                    try {

                        await api.post(`/actions/${action.id}/finish`, { result: "mailbox" })

                        const res = await api.get("/self/actions/next")
                        const newAction: Action = { ...res.data, due: new Date(res.data.due) };
                        router.push(`/actions/${newAction.id}`)

                    } catch (e) {
                        if (!(e instanceof AxiosError)) console.error("Failed to fetch next action", e) 
                        router.push(`/actions`)
                        console.log(e)
                    }

                }}
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-red-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-red-950">Mailbox</p>
            </div>
            <div
                onClick={() => { 
                    setStage("1")
                }}
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-green-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-green-950">Rangegangen</p>
            </div>
        </div>,
        "1": <div className="w-full flex gap-4">
            <div
                onClick={async () => {
                    try {
                        await api.post(`/actions/${action.id}/finish`, { result: "uninterested" })

                        const res = await api.get("/self/actions/next")
                        const newAction: Action = { ...res.data, due: new Date(res.data.due) };
                        router.push(`/actions/${newAction.id}`)

                    } catch (e) {
                        if (!(e instanceof AxiosError)) console.error("Failed to fetch next action", e) 
                        router.push(`/actions`)
                        console.log(e)
                    }
                }}
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-red-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-red-950">Kein Interesse</p>
            </div>
            <div
                onClick={() => setStage("2.1")}
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-blue-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-green-950">Follow Up</p>
            </div>
            <div
                onClick={() => setStage("2.2")}
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-green-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-green-950">Termin</p>
            </div>
        </div>,
        "2.1": <div className="w-full flex gap-4">
            <div
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-blue-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-red-950">E-Mail</p>
            </div>
            <div
                className="w-1/2 flex flex-row items-center aspect-3/2 rounded-md bg-green-500 cursor-pointer transition hover:scale-101">
                <p className="w-full text-center text-xl text-green-950">Call</p>
            </div>
        </div>,
        "2.2": <></>
    }

    return <div className="flex ">
        {stages[stage]}
    </div>

}
