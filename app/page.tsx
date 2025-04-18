import Terminal from "@/components/terminal"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-4 text-center text-2xl font-bold text-green-500">BitOS Terminal</h1>
        <Terminal />
      </div>
    </main>
  )
}
