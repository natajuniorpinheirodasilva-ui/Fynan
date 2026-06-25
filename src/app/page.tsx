import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client";
import Navbar from "@/components/Navbar";

type Transaction = {
  description: string
  value: number
  type: "income" | "expense"
  category: string
}

export default async function Home(){

  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })
  
  const cookieStorage = await cookies()
  const sessionCookie = cookieStorage.get("sessionId")
  if (!sessionCookie) {redirect("/sign_in")}

  const session = await prisma.session.findUnique({
    where: {id: sessionCookie.value}
  })
  if (!session) {redirect("/sign_in")}

  const user = await prisma.user.findUnique({
    where: {id: session.userId}
  })
  if (!user) {redirect("/sign_in")}

  return (
    <div>
      <Navbar user={{ email: user.email }}/>
      <div className="items-center text-center text-red-200 min-h-screen p-8 text-4x1 font-bold">
      <h1>Dashboard de Usuários</h1>
      </div>
    </div>

  )
}