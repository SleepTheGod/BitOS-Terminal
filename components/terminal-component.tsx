"use client"

import { useRef, useEffect, useState } from "react"
import { executeCommand } from "@/lib/command-executor"

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isTerminalReady, setIsTerminalReady] = useState(false)

  useEffect(() => {
    if (!terminalRef.current) return

    let term: any
    let fitAddon: any

    // Dynamically import xterm to avoid SSR issues
    const initializeTerminal = async () => {
      try {
        const { Terminal } = await import("xterm")
        const { FitAddon } = await import("xterm-addon-fit")

        // Note: We're not importing CSS here anymore as it's included in layout.tsx

        term = new Terminal({
          cursorBlink: true,
          theme: {
            background: "#000000",
            foreground: "#F8F8F8",
            cursor: "#A0A0A0",
            green: "#50FA7B",
            yellow: "#F1FA8C",
            blue: "#BD93F9",
            red: "#FF5555",
          },
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: 14,
        })

        fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.open(terminalRef.current)
        fitAddon.fit()

        setIsTerminalReady(true)

        const prompt = "bitos@browser:~$ "
        const promptLength = prompt.length

        // Initial welcome message
        term.writeln("\x1b[1;32m  ____  _ _    ___  ____  \x1b[0m")
        term.writeln("\x1b[1;32m | __ )(_) |_ / _ \\/ ___| \x1b[0m")
        term.writeln("\x1b[1;32m |  _ \\| | __| | | \\___ \\ \x1b[0m")
        term.writeln("\x1b[1;32m | |_) | | |_| |_| |___) |\x1b[0m")
        term.writeln("\x1b[1;32m |____/|_|\\__|\\___/|____/ \x1b[0m")
        term.writeln("\x1b[1;34mBrowser-based Terminal OS v1.0.0\x1b[0m")
        term.writeln("Type \x1b[1;33mhelp\x1b[0m for available commands.")
        term.writeln("")
        term.write(prompt)

        let currentLine = ""
        let cursorPosition = 0
        const commandHistory: string[] = []
        let historyIndex = -1

        term.onKey(({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) => {
          const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

          if (domEvent.keyCode === 13) {
            // Enter
            term.write("\r\n")
            if (currentLine.trim()) {
              processCommand(currentLine.trim())
              commandHistory.push(currentLine.trim())
              historyIndex = -1
            } else {
              term.write(prompt)
            }
            currentLine = ""
            cursorPosition = 0
          } else if (domEvent.keyCode === 8) {
            // Backspace
            if (cursorPosition > 0) {
              currentLine = currentLine.substring(0, cursorPosition - 1) + currentLine.substring(cursorPosition)
              cursorPosition--

              // Redraw the current line
              term.write("\x1b[2K\r" + prompt + currentLine)

              // Move cursor to the correct position
              if (cursorPosition < currentLine.length) {
                term.write(`\x1b[${promptLength + cursorPosition}G`)
              }
            }
          } else if (domEvent.keyCode === 37) {
            // Left arrow
            if (cursorPosition > 0) {
              cursorPosition--
              term.write(key)
            }
          } else if (domEvent.keyCode === 39) {
            // Right arrow
            if (cursorPosition < currentLine.length) {
              cursorPosition++
              term.write(key)
            }
          } else if (domEvent.keyCode === 38) {
            // Up arrow - history
            if (commandHistory.length > 0) {
              const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
              historyIndex = newIndex
              const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]

              if (historyCommand) {
                currentLine = historyCommand
                cursorPosition = historyCommand.length
                term.write("\x1b[2K\r" + prompt + historyCommand)
              }
            }
          } else if (domEvent.keyCode === 40) {
            // Down arrow - history
            if (historyIndex > 0) {
              const newIndex = historyIndex - 1
              historyIndex = newIndex
              const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]

              currentLine = historyCommand
              cursorPosition = historyCommand.length
              term.write("\x1b[2K\r" + prompt + historyCommand)
            } else if (historyIndex === 0) {
              historyIndex = -1
              currentLine = ""
              cursorPosition = 0
              term.write("\x1b[2K\r" + prompt)
            }
          } else if (printable) {
            // Insert character at cursor position
            currentLine = currentLine.substring(0, cursorPosition) + key + currentLine.substring(cursorPosition)
            cursorPosition++

            // Redraw the current line
            term.write("\x1b[2K\r" + prompt + currentLine)

            // Move cursor to the correct position
            if (cursorPosition < currentLine.length) {
              term.write(`\x1b[${promptLength + cursorPosition}G`)
            }
          }
        })

        const processCommand = async (command: string) => {
          try {
            const output = await executeCommand(command)

            // Handle special case for clear command
            if (output === "\x1Bc") {
              term.clear()
            } else {
              term.writeln(output)
            }

            term.write(prompt)
          } catch (error) {
            term.writeln(`Error: ${error}`)
            term.write(prompt)
          }
        }

        const handleResize = () => {
          if (fitAddon) {
            fitAddon.fit()
          }
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (term) {
            term.dispose()
          }
        }
      } catch (error) {
        console.error("Failed to initialize terminal:", error)
        if (terminalRef.current) {
          terminalRef.current.innerHTML = `<div class="p-4 text-red-500">Failed to load terminal: ${error}</div>`
        }
      }
    }

    initializeTerminal()
  }, [])

  return <div ref={terminalRef} className="h-[calc(100%-36px)]" />
}
