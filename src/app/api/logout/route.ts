import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "../../../generated/prisma/client"
import { cookies } from "next/headers"

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export async function POST (request: Request) {
    
    const cookieStorage = await cookies()
    const sessionCookie = cookieStorage.get("sessionId")
    if (!sessionCookie) {return Response.json({ error: "Undefined Session Cookie." })}

    const logout = await prisma.session.delete({
        where: {id: sessionCookie.value}
    })

    cookieStorage.delete("sessionId")

    return (Response.json({ success: "Session deleted." }))
}