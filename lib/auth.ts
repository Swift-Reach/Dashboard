import { supabase } from "./supabase";
import jwt from "jsonwebtoken";

export async function getCurrentUser(cookies:any) {

    const token = cookies.get("token")
    if (!token) return null;

    const jwtUser = jwt.verify(token.value, process.env.JWT_SECRET!)
    if (!jwtUser) return null;

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', (jwtUser as any).id)
        .maybeSingle();

    if (error || !user) return null;

    return user;

}