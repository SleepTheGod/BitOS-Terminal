export const processCommands = {
  executeProcessCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "kill":
        return processCommands.kill(args)
      case "killall":
        return processCommands.killall(args)
      case "nice":
        return processCommands.nice(args)
      case "renice":
        return processCommands.renice(args)
      case "bg":
        return processCommands.bg(args)
      case "fg":
        return processCommands.fg(args)
      case "jobs":
        return processCommands.jobs()
      case "nohup":
        return processCommands.nohup(args)
      default:
        return `${command}: command not found`
    }
  },

  // Kill a process
  kill: (args: string[]): string => {
    if (args.length === 0) {
      return "kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]"
    }

    // Check if it's a signal specification
    if (args[0] === "-l") {
      return (
        " 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP\n" +
        " 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1\n" +
        "11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM\n" +
        "16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP\n" +
        "21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ\n" +
        "26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR\n" +
        "31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3\n" +
        "38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8\n" +
        "43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13\n" +
        "48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12\n" +
        "53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7\n" +
        "58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2\n" +
        "63) SIGRTMAX-1  64) SIGRTMAX"
      )
    }

    let signal = ""
    let pid = ""

    if (args[0].startsWith("-")) {
      signal = args[0]
      pid = args[1]
    } else {
      pid = args[0]
    }

    // Check if PID is valid
    if (isNaN(Number(pid))) {
      return `kill: ${pid}: arguments must be process or job IDs`
    }

    // Simulate killing a process
    if (Number(pid) < 100) {
      return `kill: (${pid}) - Operation not permitted`
    }

    return "" // Success, no output
  },

  // Kill processes by name
  killall: (args: string[]): string => {
    if (args.length === 0) {
      return "killall: usage: killall [-u user] [-signal] process ..."
    }

    const processName = args[0]

    // Simulate killing processes
    if (["init", "systemd", "bash"].includes(processName)) {
      return `killall: ${processName}: Operation not permitted`
    }

    return "" // Success, no output
  },

  // Run a program with modified scheduling priority
  nice: (args: string[]): string => {
    if (args.length === 0) {
      return "nice: usage: nice [-n adjustment] [command [arg]...]"
    }

    let niceness = ""
    let command = ""

    if (args[0] === "-n") {
      niceness = args[1]
      command = args[2]
    } else {
      command = args[0]
    }

    return `${command}: command not found`
  },

  // Alter priority of running processes
  renice: (args: string[]): string => {
    if (args.length < 2) {
      return "renice: usage: renice [-n] priority [[-p] pid ...] [[-g] pgrp ...] [[-u] user ...]"
    }

    const priority = args[0]
    const pid = args[1]

    return `${pid}: old priority 0, new priority ${priority}`
  },

  // Move jobs to the background
  bg: (args: string[]): string => {
    const jobId = args.length > 0 ? args[0] : "%1"

    return `[1]+ Running                 sleep 100 &`
  },

  // Move jobs to the foreground
  fg: (args: string[]): string => {
    const jobId = args.length > 0 ? args[0] : "%1"

    return `sleep 100`
  },

  // List current jobs
  jobs: (): string => {
    return `[1]+  Running                 sleep 100 &`
  },

  // Run a command immune to hangups
  nohup: (args: string[]): string => {
    if (args.length === 0) {
      return "nohup: usage: nohup COMMAND [ARG]..."
    }

    const command = args[0]

    return `nohup: appending output to 'nohup.out'`
  },
}
