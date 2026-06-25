import Link from "next/link"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client";
import LogoutButton from "@/components/LogoutButton";

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

      <nav className="p-4 text-4xl font-bold flex justify-between items-center" > 
        <div>Fynan</div> 
        <div className="flex gap-4">
          <span>{user.email}</span>
          <LogoutButton> Logout </LogoutButton>
        </div>
      </nav>

      <div className="bg-blue-500 items-center text-center text-red-200 min-h-screen p-8 text-4x1 font-bold">
        <h1>Dashboard de Usuários</h1>
        <Link href="/sign_in" > Ir para login </Link>
      </div>

    </div>

  )
}
