import Dashboard from "@/components/Dashboard"

export default async function Home(){
  return (
    <div>
      <div className="items-center text-center min-h-screen p-8 text-4x1 font-bold">
        <h1 className="text-4xl pb-8 ">Welcome to Your Financial App</h1>
        <div className="flex items-center justify-center bg-background px-4"> <Dashboard/> </div>
      </div>
    </div>
  )
}