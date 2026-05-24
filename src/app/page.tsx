import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="
    bg-blue-500
    items-center
    text-center
    text-red-200
    min-h-screen
    p-8
    text-4x1
    font-bold
    ">
      <h1>Dashboard de Usuários</h1>
      <Link href="/sign_in" > Ir para login </Link>
      
    </div>
  );
}
