export const utilityCommands = {
  executeUtilityCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "tar":
        return utilityCommands.tar(args)
      case "gzip":
      case "gunzip":
        return utilityCommands.gzip(command, args)
      case "zip":
      case "unzip":
        return utilityCommands.zip(command, args)
      case "ssh":
        return utilityCommands.ssh(args)
      case "scp":
        return utilityCommands.scp(args)
      case "rsync":
        return utilityCommands.rsync(args)
      case "git":
        return utilityCommands.git(args)
      case "nano":
      case "vi":
        return utilityCommands.editor(command, args)
      case "less":
      case "more":
        return utilityCommands.pager(command, args)
      case "head":
      case "tail":
        return utilityCommands.headTail(command, args)
      case "sort":
      case "uniq":
      case "wc":
      case "cut":
      case "sed":
      case "awk":
        return utilityCommands.textProcessing(command, args)
      case "diff":
        return utilityCommands.diff(args)
      case "cron":
      case "crontab":
        return utilityCommands.cron(command, args)
      default:
        return `${command}: command not found`
    }
  },

  // Archive utility
  tar: (args: string[]): string => {
    if (args.length === 0) {
      return "tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options"
    }

    const option = args[0]

    if (option === "-c" || option === "--create") {
      return "tar: Cowardly refusing to create an empty archive"
    }

    if (option === "-x" || option === "--extract") {
      return "tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options\nTry 'tar --help' or 'tar --usage' for more information."
    }

    if (option === "-t" || option === "--list") {
      return "tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options\nTry 'tar --help' or 'tar --usage' for more information."
    }

    return "tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options\nTry 'tar --help' or 'tar --usage' for more information."
  },

  // Compression utilities
  gzip: (command: string, args: string[]): string => {
    if (args.length === 0) {
      return `${command}: missing operand\nTry '${command} --help' for more information.`
    }

    const filename = args[0]

    if (command === "gzip") {
      return `${command}: ${filename}: No such file or directory`
    } else {
      return `${command}: ${filename}: No such file or directory`
    }
  },

  // Zip utilities
  zip: (command: string, args: string[]): string => {
    if (args.length === 0) {
      if (command === "zip") {
        return "zip: missing zipfile and archive name\nusage: zip [-options] zipfile list"
      } else {
        return "unzip: missing zipfile and archive name\nusage: unzip [-options] zipfile list"
      }
    }

    const filename = args[0]

    if (command === "zip") {
      return `adding: ${args[1] || "file.txt"} (stored 0%)`
    } else {
      return `Archive:  ${filename}\n  inflating: ${args[1] || "file.txt"}`
    }
  },

  // SSH client
  ssh: (args: string[]): string => {
    if (args.length === 0) {
      return "usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]\n           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]\n           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]\n           [-i identity_file] [-J [user@]host[:port]] [-L address]\n           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]\n           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]\n           [-w local_tun[:remote_tun]] destination [command]"
    }

    const destination = args[0]

    return `ssh: connect to host ${destination} port 22: Connection refused`
  },

  // Secure copy
  scp: (args: string[]): string => {
    if (args.length < 2) {
      return "usage: scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file]\n           [-J destination] [-l limit] [-o ssh_option] [-P port]\n           [-S program] source ... target"
    }

    const source = args[0]
    const destination = args[1]

    return `scp: ${source}: No such file or directory`
  },

  // Remote sync
  rsync: (args: string[]): string => {
    if (args.length < 2) {
      return "rsync: missing source or destination\nrsync error: syntax or usage error (code 1) at main.c(1428) [client=3.2.3]"
    }

    const source = args[0]
    const destination = args[1]

    return `rsync: link_stat "${source}" failed: No such file or directory (2)\nrsync error: some files/attrs were not transferred (see previous errors) (code 23) at main.c(1207) [sender=3.2.3]`
  },

  // Git version control
  git: (args: string[]): string => {
    if (args.length === 0) {
      return "usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]\n           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]\n           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]\n           [--super-prefix=<path>] [--config-env=<name>=<envvar>]\n           <command> [<args>]"
    }

    const subcommand = args[0]

    if (subcommand === "init") {
      return `Initialized empty Git repository in ${process.cwd()}/.git/`
    }

    if (subcommand === "status") {
      return `fatal: not a git repository (or any of the parent directories): .git`
    }

    if (subcommand === "clone") {
      if (args.length < 2) {
        return "fatal: You must specify a repository to clone."
      }

      const repo = args[1]
      return `Cloning into '${repo.split("/").pop()?.replace(".git", "")}'...\nfatal: unable to access '${repo}': Failed to connect to ${repo.split("/")[2]} port 443: Connection refused`
    }

    return `git: '${subcommand}' is not a git command. See 'git --help'.`
  },

  // Text editors
  editor: (command: string, args: string[]): string => {
    if (args.length === 0) {
      return `Usage: ${command} [options] [file]...`
    }

    const filename = args[0]

    return `This is a simplified simulation of the ${command} editor.\nIn a real Debian system, ${command} would open an interactive text editor.`
  },

  // Text pagers
  pager: (command: string, args: string[]): string => {
    if (args.length === 0) {
      return `${command}: No files to display`
    }

    const filename = args[0]

    return `This is a simplified simulation of the ${command} pager.\nIn a real Debian system, ${command} would display the contents of ${filename} with pagination.`
  },

  // Head and tail commands
  headTail: (command: string, args: string[]): string => {
    if (args.length === 0) {
      return `${command}: missing operand\nTry '${command} --help' for more information.`
    }

    let filename = ""
    let lines = 10

    if (args[0] === "-n") {
      lines = Number.parseInt(args[1])
      filename = args[2]
    } else {
      filename = args[0]
    }

    return `This is a simplified simulation of the ${command} command.\nIn a real Debian system, ${command} would display the ${command === "head" ? "first" : "last"} ${lines} lines of ${filename}.`
  },

  // Text processing utilities
  textProcessing: (command: string, args: string[]): string => {
    if (args.length === 0) {
      return `${command}: missing operand\nTry '${command} --help' for more information.`
    }

    return `This is a simplified simulation of the ${command} command.\nIn a real Debian system, ${command} would process text according to its function.`
  },

  // Diff utility
  diff: (args: string[]): string => {
    if (args.length < 2) {
      return "diff: missing operand after 'diff'\ndiff: Try 'diff --help' for more information."
    }

    const file1 = args[0]
    const file2 = args[1]

    return `diff: ${file1}: No such file or directory\ndiff: ${file2}: No such file or directory`
  },

  // Cron utilities
  cron: (command: string, args: string[]): string => {
    if (command === "crontab") {
      if (args.length === 0) {
        return "no crontab for user"
      }

      if (args[0] === "-l") {
        return "no crontab for user"
      }

      if (args[0] === "-e") {
        return "no crontab for user - using an empty one\ncrontab: installing new crontab"
      }
    }

    return `This is a simplified simulation of the ${command} command.\nIn a real Debian system, ${command} would manage scheduled tasks.`
  },
}
