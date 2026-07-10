import Dashboard from "@/components/Dashboard"

export default async function Home(){
  return (
    <div 
    className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8)), url(/backgroundGif.gif)` }} >
      <div className="items-center text-center min-h-screen p-10 font-bold">
        <h1 className="text-4xl pb-8 ">Welcome to Your Financial App</h1>
        <div className="flex items-center justify-center px-4"> <Dashboard/> </div>
      </div>
    </div>
  )
}