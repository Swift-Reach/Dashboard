import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { success, error, Status } from '@/lib/responses';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const user = await getCurrentUser(request.cookies)

    const { id } = await params;

    const action = await prisma.action.findUnique({ where: { id: Number(id) }, include: { lead: true } })

    if (!action) return error(Status.NOT_FOUND, "Action not found")

    if (action?.lead.ownerId != user!.id) return error(Status.FORBIDDEN, "This is not your Lead")
    if (action.done) return error(Status.BAD_REQUEST, "This Action is already finished")

    const body = await request.json();

    switch (body.result) {
        case "mailbox": {

            await prisma.action.update({
                where: { id: action.id },
                data: {
                    done: true,
                    note: "Mailbox"
                }
            })

            await prisma.lead.update({
                where: { id: action.lead.id },
                data: {
                    status: "Attempted_Contact"
                }
            })

            const newDate = new Date();
            newDate.setDate(newDate.getDate() + 2);
            if (newDate.getDay() === 0) newDate.setDate(newDate.getDate() + 1);
            if (newDate.getDay() === 6) newDate.setDate(newDate.getDate() + 2);
            newDate.setHours(0, 0, 0, 0);

            await prisma.action.create({
                data: {
                    type: 'Call',
                    due: newDate,
                    leadId: action.lead.id,
                    priority: "Low"
                }
            })

            break;
        }
        case "uninterested": {



            break;
        }
        default: return error(Status.BAD_REQUEST, "This is not a valid result!");
    }

    return success();

}
