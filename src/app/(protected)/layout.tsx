import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "@/generated/prisma/client";
import Navbar from "@/components/Navbar";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-body" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
        <div className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`} >
            <Navbar user={{ email: user.email }} />
            {children}
        </div>

    )
}