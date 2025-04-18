import { packageCommands } from "./package-commands"

export const userCommands = {
  executeUserCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "whoami":
        return userCommands.whoami()
      case "who":
        return userCommands.who()
      case "w":
        return userCommands.w()
      case "passwd":
        return userCommands.passwd(args)
      case "adduser":
        return userCommands.adduser(args)
      case "usermod":
        return userCommands.usermod(args)
      case "groupadd":
        return userCommands.groupadd(args)
      case "su":
        return userCommands.su(args)
      case "sudo":
        return userCommands.sudo(args)
      default:
        return `${command}: command not found`
    }
  },

  // Display current user
  whoami: (): string => {
    return "user"
  },

  // Display who is logged in
  who: (): string => {
    const now = new Date()
    const dateStr = now.toDateString().slice(4) // Remove day of week
    const timeStr = now.toTimeString().slice(0, 5) // HH:MM format

    return `user     tty1         ${dateStr} ${timeStr} (:0)
user     pts/0        ${dateStr} ${timeStr} (:0)`
  },

  // Display who is logged in and what they are doing
  w: (): string => {
    const now = new Date()
    const timeStr = now.toTimeString().slice(0, 5) // HH:MM format
    const uptimeHours = Math.floor(Math.random() * 24)
    const uptimeMinutes = Math.floor(Math.random() * 60)
    const load1 = (Math.random() * 1.5).toFixed(2)
    const load5 = (Math.random() * 1.0).toFixed(2)
    const load15 = (Math.random() * 0.8).toFixed(2)

    return ` ${timeStr} up  ${uptimeHours}:${uptimeMinutes.toString().padStart(2, "0")},  2 users,  load average: ${load1}, ${load5}, ${load15}
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
user     tty1     :0               08:00    0.00s  0.05s  0.02s -bash
user     pts/0    :0               08:05    0.00s  0.04s  0.00s w`
  },

  // Change user password
  passwd: (args: string[]): string => {
    const username = args.length > 0 ? args[0] : "user"

    if (username !== "user" && username !== "root") {
      return `passwd: user '${username}' does not exist`
    }

    return `passwd: password updated successfully`
  },

  // Add a new user
  adduser: (args: string[]): string => {
    if (args.length === 0) {
      return "adduser: Please enter a username"
    }

    const username = args[0]

    return `Adding user '${username}' ...
Adding new group '${username}' (1001) ...
Adding new user '${username}' (1001) with group '${username}' ...
Creating home directory '/home/${username}' ...
Copying files from '/etc/skel' ...
New password: 
Retype new password: 
passwd: password updated successfully
Changing the user information for ${username}
Enter the new value, or press ENTER for the default
	Full Name []: 
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] y
Adding new user '${username}' to extra groups ...
Adding user '${username}' to group 'audio' ...
Adding user '${username}' to group 'video' ...
Adding user '${username}' to group 'netdev' ...`
  },

  // Modify a user account
  usermod: (args: string[]): string => {
    if (args.length < 2) {
      return "usermod: option requires an argument -- 'option'"
    }

    const option = args[0]
    const username = args[1]

    if (option === "-G" || option === "--groups") {
      if (args.length < 3) {
        return "usermod: option requires an argument -- 'G'"
      }

      const groups = args[2]
      return `usermod: user '${username}' added to group '${groups}'`
    }

    if (option === "-s" || option === "--shell") {
      if (args.length < 3) {
        return "usermod: option requires an argument -- 's'"
      }

      const shell = args[2]
      return `usermod: changed shell for '${username}' to '${shell}'`
    }

    return `usermod: unrecognized option '${option}'
Try 'usermod --help' for more information.`
  },

  // Add a new group
  groupadd: (args: string[]): string => {
    if (args.length === 0) {
      return "groupadd: Please enter a group name"
    }

    const groupname = args[0]

    return `groupadd: group '${groupname}' added`
  },

  // Switch user
  su: (args: string[]): string => {
    const username = args.length > 0 ? args[0] : "root"

    if (username === "root") {
      return "Password: \nsu: Authentication failure"
    }

    return `su: user '${username}' does not exist`
  },

  // Execute a command as another user
  sudo: (args: string[]): string => {
    if (args.length === 0) {
      return "usage: sudo -h | -K | -k | -V\nusage: sudo -v [-ABknS] [-g group] [-h host] [-p prompt] [-u user]\nusage: sudo -l [-ABknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]\nusage: sudo [-ABbEHknPS] [-C num] [-D directory] [-g group] [-h host] [-p prompt] [-R directory] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]\nusage: sudo -e [-ABknS] [-C num] [-D directory] [-g group] [-h host] [-p prompt] [-R directory] [-T timeout] [-u user] file ..."
    }

    // For demonstration, let's simulate sudo working for apt commands
    if (args[0] === "apt" || args[0] === "apt-get") {
      const aptArgs = args.slice(1)
      return packageCommands.apt(aptArgs)
    }

    if (args[0] === "dpkg") {
      const dpkgArgs = args.slice(1)
      return packageCommands.dpkg(dpkgArgs)
    }

    if (args[0] === "apt-cache") {
      const aptCacheArgs = args.slice(1)
      return packageCommands.aptCache(aptCacheArgs)
    }

    // For other commands, simulate sudo execution
    if (args[0] === "-i") {
      return "root@BitOS:~# "
    }

    return `[sudo] password for user: 
${args.join(" ")}`
  },
}
