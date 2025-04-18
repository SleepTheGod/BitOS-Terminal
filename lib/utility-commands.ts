export const utilityCommands = {
  executeUtilityCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "tar":
        return utilityCommands.tar(args)
      case "gzip":
      case "gunzip":
        return utilityCommands.gzip(args)
      case "zip":
      case "unzip":
        return utilityCommands.zip(args)
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
        return utilityCommands.pager(args)
      case "head":
        return utilityCommands.head(args)
      case "tail":
        return utilityCommands.tail(args)
      case "sort":
        return utilityCommands.sort(args)
      case "uniq":
        return utilityCommands.uniq(args)
      case "wc":
        return utilityCommands.wc(args)
      case "cut":
        return utilityCommands.cut(args)
      case "sed":
        return utilityCommands.sed(args)
      case "awk":
        return utilityCommands.awk(args)
      case "diff":
        return utilityCommands.diff(args)
      case "cron":
      case "crontab":
        return utilityCommands.cron(args)
      default:
        return `${command}: command not found`
    }
  },

  // Simulate tar command
  tar: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: tar [options] [file]..."
    }

    const option = args[0]
    if (option === "-c" || option === "--create") {
      return "tar: Removing leading '/' from member names"
    }

    if (option === "-x" || option === "--extract") {
      return "tar: Removing leading '/' from member names"
    }

    if (option === "-t" || option === "--list") {
      return "drwxr-xr-x user/user         0 2023-04-18 12:00 ./\n-rw-r--r-- user/user      1024 2023-04-18 12:00 ./file1.txt\n-rw-r--r-- user/user      2048 2023-04-18 12:00 ./file2.txt"
    }

    return "tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options"
  },

  // Simulate gzip/gunzip command
  gzip: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: gzip [options] [file]..."
    }

    const filename = args[args.length - 1]
    if (args[0] === "-d" || args[0] === "--decompress") {
      return ""
    }

    return ""
  },

  // Simulate zip/unzip command
  zip: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: zip [options] zipfile files..."
    }

    const zipfile = args[0]
    const files = args.slice(1)

    if (args[0] === "-r") {
      return `adding: ${args[2]}/ (stored 0%)\nadding: ${args[2]}/file1.txt (deflated 50%)\nadding: ${args[2]}/file2.txt (deflated 50%)`
    }

    return `adding: ${files[0]} (deflated 50%)`
  },

  // Simulate ssh command
  ssh: (args: string[]): string => {
    if (args.length === 0) {
      return "usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]\n           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]\n           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]\n           [-i identity_file] [-J [user@]host[:port]] [-L address]\n           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]\n           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]\n           [-w local_tun[:remote_tun]] destination [command]"
    }

    const host = args[0]
    return `ssh: connect to host ${host} port 22: Connection refused`
  },

  // Simulate scp command
  scp: (args: string[]): string => {
    if (args.length < 2) {
      return "usage: scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file]\n           [-J destination] [-l limit] [-o ssh_option] [-P port]\n           [-S program] source ... target"
    }

    const source = args[0]
    const target = args[1]
    return `scp: ${source}: No such file or directory`
  },

  // Simulate rsync command
  rsync: (args: string[]): string => {
    if (args.length < 2) {
      return "usage: rsync [OPTION]... SRC [SRC]... DEST\n   or: rsync [OPTION]... SRC [SRC]... [USER@]HOST:DEST\n   or: rsync [OPTION]... SRC [SRC]... [USER@]HOST::DEST\n   or: rsync [OPTION]... SRC [SRC]... rsync://[USER@]HOST[:PORT]/DEST\n   or: rsync [OPTION]... [USER@]HOST:SRC [DEST]\n   or: rsync [OPTION]... [USER@]HOST::SRC [DEST]\n   or: rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]"
    }

    const source = args[0]
    const target = args[1]
    return `rsync: link_stat "${source}" failed: No such file or directory (2)`
  },

  // Simulate git command
  git: (args: string[]): string => {
    if (args.length === 0) {
      return "usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]\n           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]\n           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]\n           [--super-prefix=<path>] [--config-env=<name>=<envvar>]\n           <command> [<args>]"
    }

    const subcommand = args[0]

    if (subcommand === "init") {
      return `Initialized empty Git repository in ${process.cwd()}/.git/`
    }

    if (subcommand === "status") {
      return `On branch main\nNo commits yet\nnothing to commit (create/copy files and use "git add" to track)`
    }

    if (subcommand === "clone") {
      if (args.length < 2) {
        return "fatal: You must specify a repository to clone."
      }

      const repo = args[1]
      const repoName = repo.split("/").pop()?.replace(".git", "") || "repo"

      return `Cloning into '${repoName}'...\nremote: Enumerating objects: 1463, done.\nremote: Counting objects: 100% (1463/1463), done.\nremote: Compressing objects: 100% (750/750), done.\nremote: Total 1463 (delta 713), reused 1463 (delta 713), pack-reused 0\nReceiving objects: 100% (1463/1463), 8.25 MiB | 10.62 MiB/s, done.\nResolving deltas: 100% (713/713), done.`
    }

    if (subcommand === "add") {
      if (args.length < 2) {
        return "Nothing specified, nothing added.\nMaybe you wanted to say 'git add .'?"
      }

      return "" // Success, no output
    }

    if (subcommand === "commit") {
      if (!args.includes("-m")) {
        return "error: switch `m' requires a value"
      }

      const messageIndex = args.indexOf("-m") + 1
      if (messageIndex >= args.length) {
        return "error: switch `m' requires a value"
      }

      const message = args[messageIndex]
      return `[main (root-commit) ${generateRandomCommitHash()}] ${message}\n1 file changed, 1 insertion(+)\ncreate mode 100644 README.md`
    }

    if (subcommand === "push") {
      return `Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 281 bytes | 281.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0), pack-reused 0\nTo github.com:user/repo.git\n* [new branch]      main -> main`
    }

    if (subcommand === "pull") {
      return `Already up to date.`
    }

    if (subcommand === "branch") {
      return `* main`
    }

    if (subcommand === "checkout") {
      if (args.length < 2) {
        return "error: pathspec '' did not match any file(s) known to git"
      }

      const branch = args[1]
      if (args.includes("-b")) {
        return `Switched to a new branch '${branch}'`
      }

      return `Switched to branch '${branch}'`
    }

    if (subcommand === "log") {
      return `commit ${generateRandomCommitHash()} (HEAD -> main)\nAuthor: User <user@example.com>\nDate:   ${new Date().toUTCString()}\n\n   Initial commit`
    }

    return `git: '${subcommand}' is not a git command. See 'git --help'.`
  },

  // Simulate text editor (nano/vi)
  editor: (editor: string, args: string[]): string => {
    if (args.length === 0) {
      return `${editor}: No file specified`
    }

    const filename = args[0]
    return `${editor}: Cannot open file '${filename}': No such file or directory`
  },

  // Simulate pager (less/more)
  pager: (args: string[]): string => {
    if (args.length === 0) {
      return "Missing filename"
    }

    const filename = args[0]
    return `${filename}: No such file or directory`
  },

  // Simulate head command
  head: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: head [options] [file]..."
    }

    let lines = 10
    let filename = ""

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-n" && i + 1 < args.length) {
        lines = Number.parseInt(args[i + 1])
        i++
      } else if (!args[i].startsWith("-")) {
        filename = args[i]
      }
    }

    if (!filename) {
      return "head: no input file specified"
    }

    return `head: cannot open '${filename}' for reading: No such file or directory`
  },

  // Simulate tail command
  tail: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: tail [options] [file]..."
    }

    let lines = 10
    let filename = ""
    let follow = false

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-n" && i + 1 < args.length) {
        lines = Number.parseInt(args[i + 1])
        i++
      } else if (args[i] === "-f" || args[i] === "--follow") {
        follow = true
      } else if (!args[i].startsWith("-")) {
        filename = args[i]
      }
    }

    if (!filename) {
      return "tail: no input file specified"
    }

    return `tail: cannot open '${filename}' for reading: No such file or directory`
  },

  // Simulate sort command
  sort: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: sort [options] [file]..."
    }

    const filename = args[args.length - 1]
    return `sort: cannot read: ${filename}: No such file or directory`
  },

  // Simulate uniq command
  uniq: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: uniq [options] [input [output]]"
    }

    const filename = args[args.length - 1]
    return `uniq: cannot read: ${filename}: No such file or directory`
  },

  // Simulate wc command
  wc: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: wc [options] [file]..."
    }

    const filename = args[args.length - 1]
    return `wc: ${filename}: No such file or directory`
  },

  // Simulate cut command
  cut: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: cut [options] [file]..."
    }

    if (!args.includes("-d") || !args.includes("-f")) {
      return "cut: you must specify a list of bytes, characters, or fields"
    }

    const filename = args[args.length - 1]
    return `cut: ${filename}: No such file or directory`
  },

  // Simulate sed command
  sed: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: sed [options] {script} [input-file]..."
    }

    const script = args[0]
    const filename = args[1]
    return `sed: can't read ${filename}: No such file or directory`
  },

  // Simulate awk command
  awk: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: awk [options] 'program' file ..."
    }

    const program = args[0]
    const filename = args[1]
    return `awk: cannot open ${filename} (No such file or directory)`
  },

  // Simulate diff command
  diff: (args: string[]): string => {
    if (args.length < 2) {
      return "Usage: diff [options] from-file to-file"
    }

    const file1 = args[0]
    const file2 = args[1]
    return `diff: ${file1}: No such file or directory\ndiff: ${file2}: No such file or directory`
  },

  // Simulate cron/crontab command
  cron: (args: string[]): string => {
    if (args.length === 0) {
      return "Usage: crontab [-u user] file\n   or: crontab [-u user] [ -e | -l | -r ]"
    }

    const option = args[0]
    if (option === "-l") {
      return "no crontab for user"
    }

    if (option === "-e") {
      return "no crontab for user - using an empty one"
    }

    if (option === "-r") {
      return "no crontab for user"
    }

    return "crontab: invalid option -- 'option'"
  },
}

// Helper function to generate random commit hash
function generateRandomCommitHash(): string {
  const characters = "0123456789abcdef"
  let hash = ""
  for (let i = 0; i < 40; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return hash
}
