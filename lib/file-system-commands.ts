import { getCurrentDirectory, getCurrentPath, changeDirectory, getDirectoryFromPath } from "./command-executor"

export const fileSystemCommands = {
  // List directory contents
  listDirectory: (path?: string): string => {
    const targetPath = path || getCurrentPath()
    const dir = path ? getDirectoryFromPath(path) : getCurrentDirectory()

    if (!dir) {
      return `ls: cannot access '${path}': No such file or directory`
    }

    const entries = Object.keys(dir)
    if (entries.length === 0) {
      return ""
    }

    // Format output with colors
    let output = ""
    entries.forEach((entry) => {
      // Check if it's a directory or file
      const isDirectory = typeof dir[entry] === "object"
      if (isDirectory) {
        output += `\x1b[1;34m${entry}/\x1b[0m  `
      } else {
        output += `${entry}  `
      }
    })

    return output
  },

  // Change directory
  changeDirectory: (path: string): string => {
    if (!path) {
      return ""
    }

    // Handle home directory shortcut
    if (path === "~") {
      path = "/home/user"
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
      const currentDir = getCurrentDirectory()
      if (currentDir && currentDir[path] && typeof currentDir[path] === "string") {
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
}
