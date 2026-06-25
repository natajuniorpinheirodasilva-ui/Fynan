import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "../../../generated/prisma/client"
import { cookies } from "next/headers"

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export async function POST(request: Request){
    const body = await request.json()
    const {email, password} = body
    if (email.length === 0) { return Response.json({ error: "Invalid credentials." }, { status: 401 } )}
    if (password.length === 0) { return Response.json({ error: "Invalid credentials." }, { status: 401 } )}

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if (existingUser === null) {return Response.json({ error: "Invalid credentials." }, { status: 401 } )}
    if (password != existingUser.password) { return Response.json({ error: "Invalid credentials."}, { status: 401 } )}
    
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 )
    const session = await prisma.session.create({
    data: { userId: existingUser.id, expiresAt }
    })

    const cookieStore = await cookies()
    cookieStore.set("sessionId", session.id, { httpOnly: true })

    const { password: _, ...userWithoutPassword } = existingUser

    return Response.json(userWithoutPassword)

}