import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import { error, Status, success } from '@/lib/responses';

export async function POST(request:NextRequest) {

    const body = await request.json()

    const email = body.email;
    if (!email) return error(Status.BAD_REQUEST, "You need to provide an email.")

    const password = body.password;
    if (!password) return error(Status.BAD_REQUEST, "You need to provide a password.")

    const { data: user, error: dbError } = await supabase
        .from('users')
        .select('id, email, password')
        .eq('email', email)
        .maybeSingle();

    if (dbError || !user || user.password !== password) {
        return error(Status.FORBIDDEN, "Invalid email or password.")
    }

    const res = success({ id: user.id, email: user.email })
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" })
    res.cookies.set("token", token /*, { httpOnly: false, secure: true, sameSite: "none" } */)
    return res;

}