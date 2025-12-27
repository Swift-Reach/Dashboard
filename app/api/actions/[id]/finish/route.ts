import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { success, error, Status } from '@/lib/responses';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const user = await getCurrentUser(request.cookies)

    const { id } = await params;

    const { data: action, error: actionError } = await supabase
        .from('actions')
        .select('*, lead:leads(*)')
        .eq('id', Number(id))
        .maybeSingle();

    if (actionError || !action) return error(Status.NOT_FOUND, "Action not found")

    if (action?.lead.owner_id != user!.id) return error(Status.FORBIDDEN, "This is not your Lead")
    if (action.done) return error(Status.BAD_REQUEST, "This Action is already finished")

    const body = await request.json();

    switch (body.result) {
        case "mailbox": {

            await supabase
                .from('actions')
                .update({
                    done: true,
                    note: "Mailbox"
                })
                .eq('id', action.id);

            await supabase
                .from('leads')
                .update({
                    status: "Attempted_Contact"
                })
                .eq('id', action.lead.id);

            const newDate = new Date();
            newDate.setDate(newDate.getDate() + 2);
            if (newDate.getDay() === 0) newDate.setDate(newDate.getDate() + 1);
            if (newDate.getDay() === 6) newDate.setDate(newDate.getDate() + 2);
            newDate.setHours(0, 0, 0, 0);

            await supabase
                .from('actions')
                .insert({
                    type: 'Call',
                    due: newDate.toISOString(),
                    lead_id: action.lead.id,
                    priority: "Low"
                });

            break;
        }
        case "uninterested": {



            break;
        }
        default: return error(Status.BAD_REQUEST, "This is not a valid result!");
    }

    return success();

}
