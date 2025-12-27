import { prisma } from "./prisma";
import jwt from "jsonwebtoken";

export async function getCurrentUser(cookies:any) {

    const token = cookies.get("token")
    if (!token) return null; // { error: "You need to sign in first!", status: 403 };

    const jwtUser = jwt.verify(token.value, process.env.JWT_SECRET!)
    if (!jwtUser) return null; // { error: "Your token is not valid!", status: 403 };

    const user = await prisma.user.findUnique({ where: { id: (jwtUser as any).id } });
    if (!user) return null; // { error: "User not found!", status: 404 };

    return user;

}