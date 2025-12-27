import { prisma } from "./prisma";
import jwt from "jsonwebtoken";

export async function getCurrentUser(cookies:any) {

    const token = cookies.get("token")
    if (!token) return null;

    const jwtUser = jwt.verify(token.value, process.env.JWT_SECRET!)
    if (!jwtUser) return null;

    const user = await prisma.user.findUnique({ where: { id: (jwtUser as any).id } });
    if (!user) return null;

    return user;

}