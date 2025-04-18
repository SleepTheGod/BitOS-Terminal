"use client"
import dynamic from "next/dynamic"

// Dynamically import xterm to avoid SSR issues
const TerminalComponent = dynamic(() => import("@/components/terminal-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100%-36px)] bg-black flex items-center justify-center text-gray-400">
      Loading terminal...
    </div>
  ),
})

export default function Terminal() {
  return (
    <div className="terminal-container border border-gray-700 rounded-md overflow-hidden h-[500px]">
      <div className="terminal-header bg-gray-900 p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-400 text-sm">BitOS Terminal</div>
      </div>
      <TerminalComponent />
    </div>
  )
}
