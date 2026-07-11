import Dashboard from "@/components/Dashboard"

export default async function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat font-body"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82)), url(/backgroundGif.gif)` }}
    >
      <div className="flex flex-col items-center px-6 py-16 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase mb-3">
          Personal Finance
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
          Welcome to Fynan
        </h1>
        <p className="text-white/50 mb-12 max-w-md">
          Track what comes in, what goes out, and everything in between.
        </p>
        <Dashboard />
      </div>
    </div>
  )
}