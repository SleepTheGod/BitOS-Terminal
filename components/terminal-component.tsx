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

        // Initial welcome message with attribution
        term.writeln("\x1b[1;32m  ____  _ _    ___  ____  \x1b[0m")
        term.writeln("\x1b[1;32m | __ )(_) |_ / _ \\/ ___| \x1b[0m")
        term.writeln("\x1b[1;32m |  _ \\| | __| | | \\___ \\ \x1b[0m")
        term.writeln("\x1b[1;32m | |_) | | |_| |_| |___) |\x1b[0m")
        term.writeln("\x1b[1;32m |____/|_|\\__|\\___/|____/ \x1b[0m")
        term.writeln("\x1b[1;34mDebian GNU/Linux 12 (Bookworm) - BitOS Terminal v1.0.0\x1b[0m")
        term.writeln("\x1b[1;33mCreated by Taylor Christian Newsome\x1b[0m")
        term.writeln("")
        term.writeln("The programs included with the Debian GNU/Linux system are free software;")
        term.writeln("the exact distribution terms for each program are described in the")
        term.writeln("individual files in /usr/share/doc/*/copyright.")
        term.writeln("")
        term.writeln("Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent")
        term.writeln("permitted by applicable law.")
        term.writeln("")
        term.writeln(
          "Type \x1b[1;33mhelp\x1b[0m for available commands or \x1b[1;33mabout\x1b[0m for system information.",
        )
        term.writeln("")

        // Set up the prompt in Debian style
        const getPrompt = () => {
          const username = "user"
          const hostname = "BitOS"
          const currentPath = getCurrentDirectory()
          // Simplified path display like in real terminals
          const displayPath = currentPath === "/home/user" ? "~" : currentPath.replace("/home/user", "~")

          return `\x1b[1;32m${username}@${hostname}\x1b[0m:\x1b[1;34m${displayPath}\x1b[0m$ `
        }

        const prompt = getPrompt()
        const promptLength = calculatePromptLength(prompt)
        term.write(prompt)

        let currentLine = ""
        let cursorPosition = 0
        const commandHistory: string[] = []
        let historyIndex = -1

        // Function to calculate visible length of prompt (excluding ANSI escape codes)
        function calculatePromptLength(promptWithColors: string): number {
          // Remove ANSI color codes to get actual length
          const plainPrompt = promptWithColors.replace(/\x1b\[[0-9;]*m/g, "")
          return plainPrompt.length
        }

        // Function to get current directory for prompt
        function getCurrentDirectory(): string {
          // This should ideally be synced with the actual current directory in command-executor
          // For now, we'll use a simple approach
          return window.localStorage.getItem("currentDirectory") || "/home/user"
        }

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
              const newPrompt = getPrompt()
              term.write(newPrompt)
            }
            currentLine = ""
            cursorPosition = 0
          } else if (domEvent.keyCode === 8) {
            // Backspace
            if (cursorPosition > 0) {
              currentLine = currentLine.substring(0, cursorPosition - 1) + currentLine.substring(cursorPosition)
              cursorPosition--

              // Redraw the current line
              const currentPrompt = getPrompt()
              term.write("\x1b[2K\r" + currentPrompt + currentLine)

              // Move cursor to the correct position
              if (cursorPosition < currentLine.length) {
                term.write(`\x1b[${calculatePromptLength(currentPrompt) + cursorPosition}G`)
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
                const currentPrompt = getPrompt()
                term.write("\x1b[2K\r" + currentPrompt + historyCommand)
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
              const currentPrompt = getPrompt()
              term.write("\x1b[2K\r" + currentPrompt + historyCommand)
            } else if (historyIndex === 0) {
              historyIndex = -1
              currentLine = ""
              cursorPosition = 0
              const currentPrompt = getPrompt()
              term.write("\x1b[2K\r" + currentPrompt)
            }
          } else if (domEvent.keyCode === 9) {
            // Tab - command completion (simplified)
            if (currentLine.trim()) {
              // Get available commands that start with the current input
              const availableCommands = getAvailableCommands(currentLine)

              if (availableCommands.length === 1) {
                // If there's only one match, complete it
                currentLine = availableCommands[0]
                cursorPosition = currentLine.length
                const currentPrompt = getPrompt()
                term.write("\x1b[2K\r" + currentPrompt + currentLine)
              } else if (availableCommands.length > 1) {
                // If there are multiple matches, show them
                term.write("\r\n")
                term.writeln(availableCommands.join("  "))
                const currentPrompt = getPrompt()
                term.write(currentPrompt + currentLine)
              }
            }
          } else if (printable) {
            // Insert character at cursor position
            currentLine = currentLine.substring(0, cursorPosition) + key + currentLine.substring(cursorPosition)
            cursorPosition++

            // Redraw the current line
            const currentPrompt = getPrompt()
            term.write("\x1b[2K\r" + currentPrompt + currentLine)

            // Move cursor to the correct position
            if (cursorPosition < currentLine.length) {
              term.write(`\x1b[${calculatePromptLength(currentPrompt) + cursorPosition}G`)
            }
          }
        })

        // Simple command completion function
        function getAvailableCommands(input: string): string[] {
          const allCommands = [
            "ls",
            "cd",
            "pwd",
            "cat",
            "mkdir",
            "touch",
            "rm",
            "cp",
            "mv",
            "find",
            "grep",
            "ping",
            "ifconfig",
            "traceroute",
            "netstat",
            "nslookup",
            "curl",
            "wget",
            "ss",
            "route",
            "ip",
            "uname",
            "ps",
            "top",
            "free",
            "df",
            "uptime",
            "date",
            "dmesg",
            "sysctl",
            "lsmod",
            "strace",
            "lsof",
            "vmstat",
            "iostat",
            "apt",
            "apt-get",
            "apt-cache",
            "dpkg",
            "systemctl",
            "journalctl",
            "who",
            "whoami",
            "w",
            "passwd",
            "adduser",
            "usermod",
            "groupadd",
            "chown",
            "chmod",
            "chgrp",
            "tar",
            "gzip",
            "gunzip",
            "zip",
            "unzip",
            "ssh",
            "scp",
            "rsync",
            "git",
            "nano",
            "vi",
            "less",
            "more",
            "head",
            "tail",
            "sort",
            "uniq",
            "wc",
            "cut",
            "sed",
            "awk",
            "diff",
            "cron",
            "crontab",
            "kill",
            "killall",
            "nice",
            "renice",
            "bg",
            "fg",
            "jobs",
            "nohup",
            "screen",
            "tmux",
            "su",
            "sudo",
            "history",
            "clear",
            "exit",
            "shutdown",
            "reboot",
            "help",
            "man",
            "info",
            "echo",
            "printf",
            "about",
          ]

          return allCommands.filter((cmd) => cmd.startsWith(input))
        }

        const processCommand = async (command: string) => {
          try {
            // Store the command in localStorage for history
            const history = JSON.parse(localStorage.getItem("commandHistory") || "[]")
            history.push(command)
            localStorage.setItem("commandHistory", JSON.stringify(history.slice(-100))) // Keep last 100 commands

            const output = await executeCommand(command)

            // Handle special case for clear command
            if (output === "\x1Bc") {
              term.clear()
            } else {
              term.writeln(output)
            }

            const newPrompt = getPrompt()
            term.write(newPrompt)
          } catch (error) {
            term.writeln(`Error: ${error}`)
            const newPrompt = getPrompt()
            term.write(newPrompt)
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
