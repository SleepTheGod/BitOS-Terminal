import { getCurrentDirectory, getCurrentPath, getDirectoryFromPath, changeDirectory } from "./command-executor"

export const fileSystemCommands = {
  executeFileCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "ls":
      case "dir":
        return fileSystemCommands.listDirectory(args)
      case "cd":
        return fileSystemCommands.changeDirectory(args[0] || "~")
      case "pwd":
        return fileSystemCommands.printWorkingDirectory()
      case "cat":
      case "type":
        return fileSystemCommands.catFile(args[0])
      case "mkdir":
        return fileSystemCommands.makeDirectory(args[0])
      case "touch":
        return fileSystemCommands.createFile(args[0], args.slice(1).join(" "))
      case "rm":
        return fileSystemCommands.removeFile(args)
      case "cp":
        return fileSystemCommands.copyFile(args[0], args[1])
      case "mv":
        return fileSystemCommands.moveFile(args[0], args[1])
      case "find":
        return fileSystemCommands.findFiles(args)
      case "grep":
        return fileSystemCommands.grepFiles(args)
      case "chmod":
        return fileSystemCommands.changeMode(args)
      case "chown":
        return fileSystemCommands.changeOwner(args)
      default:
        return `${command}: command not found`
    }
  },

  // List directory contents
  listDirectory: (args: string[]): string => {
    // Parse options
    const showAll = args.includes("-a") || args.includes("--all")
    const longFormat = args.includes("-l")
    const humanReadable = args.includes("-h")

    // Get target directory
    let targetPath = ""
    for (const arg of args) {
      if (!arg.startsWith("-")) {
        targetPath = arg
        break
      }
    }

    const dir = targetPath ? getDirectoryFromPath(targetPath) : getCurrentDirectory()
    if (!dir) {
      return `ls: cannot access '${targetPath}': No such file or directory`
    }

    const entries = Object.keys(dir)
    if (entries.length === 0) {
      return ""
    }

    // Filter hidden files unless -a is specified
    const filteredEntries = showAll ? entries : entries.filter((entry) => !entry.startsWith("."))

    if (longFormat) {
      // Long format listing
      let output = "total " + filteredEntries.length + "\n"

      filteredEntries.forEach((entry) => {
        const isDirectory = typeof dir[entry] === "object"
        const permissions = isDirectory ? "drwxr-xr-x" : "-rw-r--r--"
        const owner = "user"
        const group = "user"
        const size = isDirectory ? 4096 : typeof dir[entry] === "string" ? dir[entry].length : 0
        const sizeStr = humanReadable ? formatSize(size) : size.toString()
        const date = "Apr 18 12:34"

        output += `${permissions} 1 ${owner} ${group} ${sizeStr.padStart(8)} ${date} ${isDirectory ? "\x1b[1;34m" + entry + "/\x1b[0m" : entry}\n`
      })

      return output.trim()
    } else {
      // Simple listing with colors
      let output = ""
      filteredEntries.forEach((entry) => {
        const isDirectory = typeof dir[entry] === "object"
        if (isDirectory) {
          output += `\x1b[1;34m${entry}/\x1b[0m  `
        } else {
          output += `${entry}  `
        }
      })

      return output.trim()
    }
  },

  // Change directory
  changeDirectory: (path: string): string => {
    if (!path) {
      return ""
    }

    const success = changeDirectory(path)
    if (!success) {
      return `cd: ${path}: No such file or directory`
    }

    return ""
  },

  // Print working directory
  printWorkingDirectory: (): string => {
    return getCurrentPath()
  },

  // Display file contents
  catFile: (path: string): string => {
    if (!path) {
      return "Usage: cat <filename>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    // Handle absolute vs relative path
    let fileContent
    if (path.startsWith("/")) {
      // Absolute path
      const pathParts = path.split("/")
      const fileName = pathParts.pop() || ""
      const dirPath = pathParts.join("/")
      const dir = getDirectoryFromPath(dirPath)

      if (dir && dir[fileName] && typeof dir[fileName] === "string") {
        fileContent = dir[fileName]
      }
    } else {
      // Relative path
      if (currentDir[path] && typeof currentDir[path] === "string") {
        fileContent = currentDir[path]
      }
    }

    if (fileContent) {
      return fileContent
    } else {
      return `cat: ${path}: No such file or directory`
    }
  },

  // Create directory
  makeDirectory: (path: string): string => {
    if (!path) {
      return "Usage: mkdir <directory>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    if (currentDir[path]) {
      return `mkdir: cannot create directory '${path}': File exists`
    }

    // Create new directory
    currentDir[path] = {}
    return ""
  },

  // Create file
  createFile: (path: string, content = ""): string => {
    if (!path) {
      return "Usage: touch <filename>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    // Create or update file
    currentDir[path] = content
    return ""
  },

  // Remove file or directory
  removeFile: (args: string[]): string => {
    // Parse options
    const recursive = args.includes("-r") || args.includes("-R") || args.includes("--recursive")
    const force = args.includes("-f") || args.includes("--force")

    // Get target path
    let targetPath = ""
    for (const arg of args) {
      if (!arg.startsWith("-")) {
        targetPath = arg
        break
      }
    }

    if (!targetPath) {
      return "Usage: rm [-r] [-f] <file|directory>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    if (!currentDir[targetPath]) {
      if (force) {
        return ""
      }
      return `rm: cannot remove '${targetPath}': No such file or directory`
    }

    // Check if it's a directory
    if (typeof currentDir[targetPath] === "object" && !recursive) {
      return `rm: cannot remove '${targetPath}': Is a directory`
    }

    // Remove the file or directory
    delete currentDir[targetPath]
    return ""
  },

  // Copy file
  copyFile: (source: string, destination: string): string => {
    if (!source || !destination) {
      return "Usage: cp <source> <destination>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    if (!currentDir[source]) {
      return `cp: cannot stat '${source}': No such file or directory`
    }

    // Check if source is a file
    if (typeof currentDir[source] !== "string") {
      return `cp: omitting directory '${source}'`
    }

    // Copy the file
    currentDir[destination] = currentDir[source]
    return ""
  },

  // Move file
  moveFile: (source: string, destination: string): string => {
    if (!source || !destination) {
      return "Usage: mv <source> <destination>"
    }

    const currentDir = getCurrentDirectory()
    if (!currentDir) {
      return "Error: Current directory not found"
    }

    if (!currentDir[source]) {
      return `mv: cannot stat '${source}': No such file or directory`
    }

    // Move the file or directory
    currentDir[destination] = currentDir[source]
    delete currentDir[source]
    return ""
  },

  // Find files
  findFiles: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: find [path] [expression]"
    }

    // Simplified find implementation
    return "find: This is a simplified simulation of the find command.\nIn a real Debian system, find would search for files in a directory hierarchy."
  },

  // Grep files
  grepFiles: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: grep [options] PATTERN [FILE...]"
    }

    const pattern = args[0]
    const file = args[1]

    const currentDir = getCurrentDirectory()
    if (!currentDir || !currentDir[file] || typeof currentDir[file] !== "string") {
      return `grep: ${file}: No such file or directory`
    }

    const content = currentDir[file] as string
    const lines = content.split("\n")
    const matches = lines.filter((line) => line.includes(pattern))

    if (matches.length === 0) {
      return ""
    }

    return matches.join("\n")
  },

  // Change file permissions
  changeMode: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: chmod [options] MODE FILE"
    }

    return "chmod: This is a simplified simulation of the chmod command.\nIn a real Debian system, chmod would change file mode bits."
  },

  // Change file owner
  changeOwner: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: chown [options] OWNER[:GROUP] FILE"
    }

    return "chown: This is a simplified simulation of the chown command.\nIn a real Debian system, chown would change file owner and group."
  },
}

// Helper function to format size in human-readable format
function formatSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes}B`
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)}K`
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}M`
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)}G`
  }
}
