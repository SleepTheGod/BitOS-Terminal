export const helpCommands = {
  // General help command
  help: (command?: string): string => {
    if (command) {
      return helpCommands.manual(command)
    }

    let output = "\x1b[1;32mBitOS Terminal Help\x1b[0m\n\n"
    output += "Available commands:\n\n"

    output += "\x1b[1;33mFile System Commands:\x1b[0m\n"
    output += "  ls, dir           - List directory contents\n"
    output += "  cd                - Change directory\n"
    output += "  pwd               - Print working directory\n"
    output += "  cat, type         - Display file contents\n"
    output += "  mkdir             - Create directory\n"
    output += "  touch, new-item   - Create empty file\n\n"

    output += "\x1b[1;33mNetwork Commands:\x1b[0m\n"
    output += "  ping              - Send ICMP echo requests\n"
    output += "  ifconfig, ipconfig - Display network interfaces\n"
    output += "  traceroute, tracert - Print the route packets take\n"
    output += "  netstat           - Network statistics\n"
    output += "  nslookup, dig     - Query DNS records\n"
    output += "  curl, wget        - Transfer data from a URL\n"
    output += "  ss                - Socket statistics\n"
    output += "  route             - Show routing table\n\n"

    output += "\x1b[1;33mSystem Commands:\x1b[0m\n"
    output += "  uname, ver        - Print system information\n"
    output += "  ps, tasklist      - List running processes\n"
    output += "  free, mem         - Display memory usage\n"
    output += "  df, diskspace     - Show disk usage\n"
    output += "  uptime            - System uptime\n"
    output += "  date, time        - Show current date and time\n"
    output += "  top               - Display system processes\n"
    output += "  clear, cls        - Clear the terminal screen\n\n"

    output += "\x1b[1;33mKernel Debugging:\x1b[0m\n"
    output += "  dmesg             - Print kernel ring buffer\n"
    output += "  sysctl            - Configure kernel parameters\n"
    output += "  lsmod, modinfo    - List loaded kernel modules\n"
    output += "  strace            - Trace system calls and signals\n"
    output += "  lsof              - List open files\n"
    output += "  vmstat            - Report virtual memory statistics\n"
    output += "  iostat            - Report CPU and I/O statistics\n\n"

    output += "\x1b[1;33mMiscellaneous:\x1b[0m\n"
    output += "  help              - Display this help message\n"
    output += "  man               - Display manual for a command\n"
    output += "  echo              - Display a line of text\n"
    output += "  whoami            - Print current user\n\n"

    output += "Type \x1b[1;36mman <command>\x1b[0m for more information about a specific command."

    return output
  },

  // Manual pages for commands
  manual: (command?: string): string => {
    if (!command) {
      return "Usage: man <command>"
    }

    const manPages: Record<string, string> = {
      ls: "NAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [DIRECTORY]\n\nDESCRIPTION\n    List information about files in the current directory or specified DIRECTORY.",

      cd: "NAME\n    cd - change directory\n\nSYNOPSIS\n    cd [DIRECTORY]\n\nDESCRIPTION\n    Change the current working directory to DIRECTORY.\n    If no directory is specified, changes to the home directory (~).",

      pwd: "NAME\n    pwd - print working directory\n\nSYNOPSIS\n    pwd\n\nDESCRIPTION\n    Print the full filename of the current working directory.",

      cat: "NAME\n    cat - concatenate and display files\n\nSYNOPSIS\n    cat FILE\n\nDESCRIPTION\n    Concatenate FILE to standard output.",

      ping: "NAME\n    ping - send ICMP ECHO_REQUEST to network hosts\n\nSYNOPSIS\n    ping HOST\n\nDESCRIPTION\n    Ping uses the ICMP protocol's mandatory ECHO_REQUEST datagram to elicit an ICMP ECHO_RESPONSE from a host or gateway.",

      ifconfig:
        "NAME\n    ifconfig - configure a network interface\n\nSYNOPSIS\n    ifconfig\n\nDESCRIPTION\n    Display information about all network interfaces.",

      traceroute:
        "NAME\n    traceroute - print the route packets trace to network host\n\nSYNOPSIS\n    traceroute HOST\n\nDESCRIPTION\n    Traceroute tracks the route packets taken from an IP network on their way to a given host.",

      uname:
        "NAME\n    uname - print system information\n\nSYNOPSIS\n    uname [-a]\n\nDESCRIPTION\n    Print certain system information.\n    With no options, print the kernel name.\n    -a, --all    print all information",

      ps: "NAME\n    ps - report process status\n\nSYNOPSIS\n    ps\n\nDESCRIPTION\n    ps displays information about a selection of the active processes.",

      free: "NAME\n    free - Display amount of free and used memory in the system\n\nSYNOPSIS\n    free\n\nDESCRIPTION\n    free displays the total amount of free and used physical and swap memory in the system.",

      clear:
        "NAME\n    clear - clear the terminal screen\n\nSYNOPSIS\n    clear\n\nDESCRIPTION\n    clear clears your screen if this is possible.",

      help: "NAME\n    help - display help for built-in commands\n\nSYNOPSIS\n    help [COMMAND]\n\nDESCRIPTION\n    Display helpful information about built-in commands.\n    If COMMAND is specified, gives detailed help on that command.",

      whoami:
        "NAME\n    whoami - print effective userid\n\nSYNOPSIS\n    whoami\n\nDESCRIPTION\n    Print the user name associated with the current effective user ID.",

      dmesg:
        "NAME\n    dmesg - print or control the kernel ring buffer\n\nSYNOPSIS\n    dmesg [options]\n\nDESCRIPTION\n    dmesg is used to examine or control the kernel ring buffer.\n    The program helps users to print out their bootup messages.",

      sysctl:
        "NAME\n    sysctl - configure kernel parameters at runtime\n\nSYNOPSIS\n    sysctl [options] [variable[=value]] [...]\n\nDESCRIPTION\n    sysctl is used to modify kernel parameters at runtime.\n    The parameters available are those listed under /proc/sys/.",

      lsmod:
        "NAME\n    lsmod - Show the status of modules in the Linux Kernel\n\nSYNOPSIS\n    lsmod\n\nDESCRIPTION\n    lsmod is a program that nicely formats the contents of the /proc/modules,\n    showing what kernel modules are currently loaded.",

      strace:
        "NAME\n    strace - trace system calls and signals\n\nSYNOPSIS\n    strace [-p pid] | [command [args]]\n\nDESCRIPTION\n    strace is a diagnostic, debugging and instructional userspace utility for Linux.\n    It is used to monitor and tamper with interactions between processes and the Linux kernel.",

      lsof: "NAME\n    lsof - list open files\n\nSYNOPSIS\n    lsof [options]\n\nDESCRIPTION\n    lsof lists information about files that are open by processes running on the system.",

      curl: "NAME\n    curl - transfer a URL\n\nSYNOPSIS\n    curl [options] [URL...]\n\nDESCRIPTION\n    curl is a tool to transfer data from or to a server, using one of the supported protocols.\n    The command is designed to work without user interaction.",

      top: "NAME\n    top - display Linux processes\n\nSYNOPSIS\n    top\n\nDESCRIPTION\n    The top program provides a dynamic real-time view of a running system.\n    It can display system summary information as well as a list of processes or threads currently being managed by the Linux kernel.",
    }

    // Handle command aliases
    const aliases: Record<string, string> = {
      dir: "ls",
      type: "cat",
      ipconfig: "ifconfig",
      tracert: "traceroute",
      ver: "uname",
      tasklist: "ps",
      mem: "free",
      diskspace: "df",
      cls: "clear",
      wget: "curl",
      modinfo: "lsmod",
      dig: "nslookup",
    }

    const lookupCommand = aliases[command] || command

    if (manPages[lookupCommand]) {
      return `\x1b[1mMANUAL: ${lookupCommand}\x1b[0m\n\n${manPages[lookupCommand]}`
    } else {
      return `No manual entry for ${command}`
    }
  },
}
