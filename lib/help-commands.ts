export const helpCommands = {
  executeHelpCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "help":
        return helpCommands.help(args[0])
      case "man":
        return helpCommands.manual(args[0])
      case "info":
        return helpCommands.info(args[0])
      default:
        return `${command}: command not found`
    }
  },

  // General help command
  help: (command?: string): string => {
    if (command) {
      return helpCommands.manual(command)
    }

    let output = "\x1b[1;32mBitOS - Debian GNU/Linux Terminal Help\x1b[0m\n"
    output += "\x1b[1;33mCreated by Taylor Christian Newsome\x1b[0m\n\n"
    output += "Available commands by category:\n\n"

    output += "\x1b[1;34mFile System Commands:\x1b[0m\n"
    output += "  ls, dir           - List directory contents\n"
    output += "  cd                - Change directory\n"
    output += "  pwd               - Print working directory\n"
    output += "  cat, type         - Display file contents\n"
    output += "  mkdir             - Create directory\n"
    output += "  touch             - Create empty file\n"
    output += "  rm                - Remove files or directories\n"
    output += "  cp                - Copy files and directories\n"
    output += "  mv                - Move/rename files and directories\n"
    output += "  find              - Search for files in a directory hierarchy\n"
    output += "  grep              - Search text using patterns\n"
    output += "  chmod             - Change file permissions\n"
    output += "  chown             - Change file owner and group\n\n"

    output += "\x1b[1;34mNetwork Commands:\x1b[0m\n"
    output += "  ping              - Send ICMP echo requests\n"
    output += "  ifconfig, ipconfig - Display network interfaces\n"
    output += "  traceroute, tracert - Print the route packets take\n"
    output += "  netstat           - Network statistics\n"
    output += "  nslookup, dig     - Query DNS records\n"
    output += "  curl, wget        - Transfer data from a URL\n"
    output += "  ssh               - OpenSSH client (remote login)\n"
    output += "  scp               - Secure copy (remote file copy)\n"
    output += "  rsync             - Remote and local file synchronization\n\n"

    output += "\x1b[1;34mSystem Commands:\x1b[0m\n"
    output += "  uname, ver        - Print system information\n"
    output += "  ps, tasklist      - List running processes\n"
    output += "  top               - Display system processes\n"
    output += "  free, mem         - Display memory usage\n"
    output += "  df, diskspace     - Show disk usage\n"
    output += "  uptime            - System uptime\n"
    output += "  date, time        - Show current date and time\n"
    output += "  clear, cls        - Clear the terminal screen\n\n"

    output += "\x1b[1;34mPackage Management:\x1b[0m\n"
    output += "  apt, apt-get      - Advanced Package Tool\n"
    output += "  dpkg              - Debian package manager\n"
    output += "  apt-cache         - Query the APT cache\n\n"

    output += "\x1b[1;34mUser Management:\x1b[0m\n"
    output += "  whoami            - Print effective user ID\n"
    output += "  who               - Show who is logged in\n"
    output += "  w                 - Show who is logged in and what they're doing\n"
    output += "  passwd            - Change user password\n"
    output += "  adduser           - Add a user to the system\n"
    output += "  usermod           - Modify a user account\n"
    output += "  groupadd          - Create a new group\n"
    output += "  su                - Switch user\n"
    output += "  sudo              - Execute a command as another user\n\n"

    output += "\x1b[1;34mProcess Management:\x1b[0m\n"
    output += "  kill              - Terminate processes\n"
    output += "  killall           - Kill processes by name\n"
    output += "  nice              - Run a program with modified scheduling priority\n"
    output += "  renice            - Alter priority of running processes\n"
    output += "  bg                - Move jobs to the background\n"
    output += "  fg                - Move jobs to the foreground\n"
    output += "  jobs              - List active jobs\n"
    output += "  nohup             - Run a command immune to hangups\n\n"

    output += "\x1b[1;34mKernel & System Debugging:\x1b[0m\n"
    output += "  dmesg             - Print kernel ring buffer\n"
    output += "  sysctl            - Configure kernel parameters\n"
    output += "  lsmod, modinfo    - List loaded kernel modules\n"
    output += "  strace            - Trace system calls and signals\n"
    output += "  lsof              - List open files\n"
    output += "  vmstat            - Report virtual memory statistics\n"
    output += "  iostat            - Report CPU and I/O statistics\n\n"

    output += "\x1b[1;34mUtilities:\x1b[0m\n"
    output += "  tar               - Tape archiver\n"
    output += "  gzip, gunzip      - Compress or expand files\n"
    output += "  zip, unzip        - Package and compress files\n"
    output += "  git               - Version control system\n"
    output += "  nano, vi          - Text editors\n"
    output += "  less, more        - File pagers\n"
    output += "  head, tail        - Output the first/last part of files\n"
    output += "  sort, uniq        - Sort text files / Report or filter out repeated lines\n"
    output += "  wc                - Print newline, word, and byte counts\n"
    output += "  cut               - Remove sections from each line of files\n"
    output += "  sed               - Stream editor for filtering and transforming text\n"
    output += "  awk               - Pattern scanning and processing language\n"
    output += "  diff              - Compare files line by line\n\n"

    output += "\x1b[1;34mShell Built-ins:\x1b[0m\n"
    output += "  echo              - Display a line of text\n"
    output += "  printf            - Format and print data\n"
    output += "  history           - Command history\n"
    output += "  exit, logout      - Exit the shell\n\n"

    output += "\x1b[1;34mHelp & Documentation:\x1b[0m\n"
    output += "  help              - Display this help message\n"
    output += "  man               - Display manual for a command\n"
    output += "  info              - Read Info documents\n"
    output += "  about             - Display information about BitOS\n\n"

    output += "Type \x1b[1;36mman <command>\x1b[0m for more information about a specific command."

    return output
  },

  // Manual pages for commands
  manual: (command?: string): string => {
    if (!command) {
      return "What manual page do you want?\nFor example, try 'man man'."
    }

    const manPages: Record<string, string> = {
      ls: "NAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls [OPTION]... [FILE]...\n\nDESCRIPTION\n    List information about the FILEs (the current directory by default).\n    Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.\n\n    Mandatory arguments to long options are mandatory for short options too.\n\n    -a, --all\n          do not ignore entries starting with .\n    -l     use a long listing format\n    -h, --human-readable\n          with -l, print sizes in human readable format (e.g., 1K 234M 2G)",

      cd: "NAME\n    cd - change directory\n\nSYNOPSIS\n    cd [directory]\n\nDESCRIPTION\n    Change the current working directory to directory.\n    The default directory is the value of the HOME shell variable.\n\n    The variable CDPATH defines the search path for the directory containing directory.\n    Alternative directory names in CDPATH are separated by a colon (:).\n    A null directory name is the same as the current directory.  If directory begins\n    with a slash (/), then CDPATH is not used.",

      pwd: "NAME\n    pwd - print name of current/working directory\n\nSYNOPSIS\n    pwd [OPTION]...\n\nDESCRIPTION\n    Print the full filename of the current working directory.\n\n    -L, --logical\n          use PWD from environment, even if it contains symlinks\n    -P, --physical\n          avoid all symlinks",

      cat: "NAME\n    cat - concatenate files and print on the standard output\n\nSYNOPSIS\n    cat [OPTION]... [FILE]...\n\nDESCRIPTION\n    Concatenate FILE(s) to standard output.\n\n    With no FILE, or when FILE is -, read standard input.\n\n    -A, --show-all\n          equivalent to -vET\n    -b, --number-nonblank\n          number nonempty output lines, overrides -n\n    -e     equivalent to -vE\n    -E, --show-ends\n          display $ at end of each line",

      apt: "NAME\n    apt - command-line interface to the Advanced Package Tool\n\nSYNOPSIS\n    apt [options] command\n\nDESCRIPTION\n    apt provides a high-level command-line interface for the package management system.\n    It is intended as an end user interface and enables some options better suited for\n    interactive usage by default compared to more specialized APT tools like apt-get and\n    apt-cache.\n\n    Most used commands:\n      update - Retrieve new lists of packages\n      upgrade - Perform an upgrade\n      install - Install new packages\n      remove - Remove packages\n      list - List packages based on package names\n      search - Search in package descriptions\n      show - Show package details\n      clean - Erase downloaded archive files\n      autoremove - Remove automatically all unused packages",

      ping: "NAME\n    ping - send ICMP ECHO_REQUEST to network hosts\n\nSYNOPSIS\n    ping [options] destination\n\nDESCRIPTION\n    ping uses the ICMP protocol's mandatory ECHO_REQUEST datagram to elicit an\n    ICMP ECHO_RESPONSE from a host or gateway. ECHO_REQUEST datagrams (''pings'')\n    have an IP and ICMP header, followed by a struct timeval and then an arbitrary\n    number of ''pad'' bytes used to fill out the packet.\n\n    -c count\n          Stop after sending count ECHO_REQUEST packets. With deadline option, ping\n          waits for count ECHO_REPLY packets, until the timeout expires.",

      man: "NAME\n    man - an interface to the system reference manuals\n\nSYNOPSIS\n    man [man options] [[section] page ...] ...\n    man -k [apropos options] regexp ...\n\nDESCRIPTION\n    man is the system's manual pager. Each page argument given to man is normally\n    the name of a program, utility or function. The manual page associated with each\n    of these arguments is then found and displayed. A section, if provided, will\n    direct man to look only in that section of the manual.",

      help: "NAME\n    help - display help for built-in commands\n\nSYNOPSIS\n    help [pattern ...]\n\nDESCRIPTION\n    Display helpful information about built-in commands.\n\n    If PATTERN is specified, gives detailed help on all commands matching PATTERN,\n    otherwise the list of help topics is printed.\n\n    Arguments:\n      PATTERN   Pattern specifying a help topic",

      about:
        "NAME\n    about - display information about BitOS\n\nSYNOPSIS\n    about\n\nDESCRIPTION\n    Display information about the BitOS terminal emulator, including version,\n    creator, and system information.",
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
      return `\x1b[1mMANUAL: ${lookupCommand}(1)\x1b[0m\n\n${manPages[lookupCommand]}`
    } else {
      return `No manual entry for ${command}`
    }
  },

  // Info documentation
  info: (command?: string): string => {
    if (!command) {
      return "Try 'info info' for the help on using Info."
    }

    return `This is a simplified simulation of the info command.\nIn a real Debian system, info would display documentation for ${command}.`
  },
}
