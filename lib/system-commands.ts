// Simulated system commands

// System start time for uptime calculation
const systemStartTime = new Date()

export const systemCommands = {
  executeSystemCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "uname":
      case "ver":
        return systemCommands.uname(args.includes("-a") || args.includes("--all"))
      case "ps":
      case "tasklist":
        return systemCommands.processList()
      case "free":
      case "mem":
        return systemCommands.memoryUsage()
      case "df":
      case "diskspace":
        return systemCommands.diskUsage()
      case "uptime":
        return systemCommands.uptime()
      case "date":
      case "time":
        return systemCommands.dateTime()
      case "clear":
      case "cls":
        return "\x1Bc" // ANSI escape code to clear screen
      case "reboot":
      case "shutdown":
        return "Cannot reboot/shutdown. This is a browser-based simulation."
      default:
        return `${command}: command not found`
    }
  },

  // Simulate uname command
  uname: (all: boolean): string => {
    if (all) {
      return "BitOS Browser 1.0.0 #1 SMP PREEMPT Wed Apr 17 00:00:00 UTC 2025 x86_64 JavaScript/ECMAScript"
    }
    return "BitOS"
  },

  // Simulate ps/tasklist command
  processList: (): string => {
    const processes = [
      {
        pid: 1,
        user: "root",
        cpu: 0.1,
        mem: 0.5,
        vsz: 4680,
        rss: 1360,
        tty: "?",
        stat: "Ss",
        start: "00:00",
        time: "0:02",
        command: "init",
      },
      {
        pid: 2,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S",
        start: "00:00",
        time: "0:00",
        command: "kthreadd",
      },
      {
        pid: 3,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S",
        start: "00:00",
        time: "0:00",
        command: "ksoftirqd/0",
      },
      {
        pid: 5,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S<",
        start: "00:00",
        time: "0:00",
        command: "kworker/0:0H",
      },
      {
        pid: 7,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S",
        start: "00:00",
        time: "0:01",
        command: "rcu_sched",
      },
      {
        pid: 8,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S",
        start: "00:00",
        time: "0:00",
        command: "rcu_bh",
      },
      {
        pid: 9,
        user: "root",
        cpu: 0.0,
        mem: 0.0,
        vsz: 0,
        rss: 0,
        tty: "?",
        stat: "S",
        start: "00:00",
        time: "0:00",
        command: "migration/0",
      },
      {
        pid: 400,
        user: "user",
        cpu: 1.2,
        mem: 2.5,
        vsz: 56892,
        rss: 15432,
        tty: "pts/0",
        stat: "Ss",
        start: "08:16",
        time: "0:05",
        command: "bash",
      },
      {
        pid: 1024,
        user: "user",
        cpu: 5.0,
        mem: 8.0,
        vsz: 1458200,
        rss: 246000,
        tty: "?",
        stat: "Sl",
        start: "08:20",
        time: "1:12",
        command: "browser",
      },
      {
        pid: 1337,
        user: "user",
        cpu: 2.5,
        mem: 4.0,
        vsz: 985600,
        rss: 124800,
        tty: "?",
        stat: "Sl",
        start: "08:25",
        time: "0:45",
        command: "bitos-terminal",
      },
    ]

    // Create a more compact output format for smaller screens
    let output = "  PID USER     %CPU %MEM    VSZ   RSS TTY  STAT START TIME CMD\n"

    processes.forEach((proc) => {
      output += `${proc.pid.toString().padStart(5)} ${proc.user.padEnd(8)} ${proc.cpu.toFixed(1).padEnd(5)} ${proc.mem.toFixed(1).padEnd(4)} ${proc.vsz.toString().padEnd(7)} ${proc.rss.toString().padEnd(5)} ${proc.tty.padEnd(4)} ${proc.stat.padEnd(4)} ${proc.start.padEnd(5)} ${proc.time.padEnd(5)} ${proc.command}\n`
    })

    return output.trim()
  },

  // Simulate free/mem command
  memoryUsage: (): string => {
    const total = 16384 // 16GB in MB
    const used = Math.floor(Math.random() * 8192) + 4096 // 4-12GB used
    const free = total - used
    const shared = Math.floor(Math.random() * 512)
    const buffers = Math.floor(Math.random() * 1024)
    const cached = Math.floor(Math.random() * 2048) + 2048

    // Create a more compact output format
    let output = "            total     used     free   shared buff/cache available\n"
    output += `Mem:       ${total.toString().padStart(7)} ${used.toString().padStart(8)} ${free.toString().padStart(8)} ${shared.toString().padStart(8)} ${(buffers + cached).toString().padStart(9)} ${(free + buffers + cached).toString().padStart(9)}\n`
    output += `Swap:      ${(total / 2).toString().padStart(7)} ${Math.floor(Math.random() * 1024)
      .toString()
      .padStart(8)} ${(total / 2 - Math.floor(Math.random() * 1024)).toString().padStart(8)}`

    return output
  },

  // Simulate df command
  diskUsage: (): string => {
    const filesystems = [
      {
        fs: "/dev/sda1",
        type: "ext4",
        size: 512 * 1024,
        used: 128 * 1024,
        avail: 384 * 1024,
        use: 25,
        mountpoint: "/",
      },
      {
        fs: "/dev/sda2",
        type: "ext4",
        size: 1024 * 1024,
        used: 512 * 1024,
        avail: 512 * 1024,
        use: 50,
        mountpoint: "/home",
      },
      { fs: "tmpfs", type: "tmpfs", size: 8 * 1024, used: 0, avail: 8 * 1024, use: 0, mountpoint: "/tmp" },
      { fs: "devtmpfs", type: "devtmpfs", size: 4 * 1024, used: 0, avail: 4 * 1024, use: 0, mountpoint: "/dev" },
    ]

    // Create a more compact output format
    let output = "Filesystem  Type   Size Used Avail Use% Mounted on\n"

    filesystems.forEach((fs) => {
      output += `${fs.fs.padEnd(12)} ${fs.type.padEnd(6)} ${formatSize(fs.size).padEnd(5)} ${formatSize(fs.used).padEnd(5)} ${formatSize(fs.avail).padEnd(5)} ${fs.use.toString().padEnd(3)}% ${fs.mountpoint}\n`
    })

    return output.trim()
  },

  // Simulate uptime command
  uptime: (): string => {
    const now = new Date()
    const uptime = Math.floor((now.getTime() - systemStartTime.getTime()) / 1000)

    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = uptime % 60

    const users = Math.floor(Math.random() * 3) + 1
    const load1 = (Math.random() * 1.5).toFixed(2)
    const load5 = (Math.random() * 1.0).toFixed(2)
    const load15 = (Math.random() * 0.8).toFixed(2)

    const currentTime = now.toLocaleTimeString()

    let uptimeStr = ""
    if (days > 0) uptimeStr += `${days} day${days > 1 ? "s" : ""}, `
    uptimeStr += `${hours}:${minutes.toString().padStart(2, "0")}`

    return ` ${currentTime} up ${uptimeStr}, ${users} user${users > 1 ? "s" : ""}, load average: ${load1}, ${load5}, ${load15}`
  },

  // Simulate date/time command
  dateTime: (): string => {
    const now = new Date()
    return now.toString()
  },

  // Simulate top command
  top: (): string => {
    const now = new Date()
    const uptime = Math.floor((now.getTime() - systemStartTime.getTime()) / 1000)

    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = uptime % 60

    const users = Math.floor(Math.random() * 3) + 1
    const load1 = (Math.random() * 1.5).toFixed(2)
    const load5 = (Math.random() * 1.0).toFixed(2)
    const load15 = (Math.random() * 0.8).toFixed(2)

    // Generate top output with more compact formatting
    let output = `top - ${now.toLocaleTimeString()} up ${days ? days + "d, " : ""}${hours}:${minutes.toString().padStart(2, "0")}, ${users} user${users > 1 ? "s" : ""}, load: ${load1}, ${load5}, ${load15}\n`
    output += "Tasks: 110 total,   1 running, 109 sleeping,   0 stopped,   0 zombie\n"
    output += "%Cpu(s):  5.9 us,  2.0 sy,  0.0 ni, 91.7 id,  0.4 wa,  0.0 hi,  0.0 si\n"
    output += "MiB Mem :  16384.0 total,   8192.0 free,   6144.0 used,   2048.0 buff/cache\n"
    output += "MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  10240.0 avail Mem\n\n"

    output += "  PID USER     PR NI    VIRT    RES    SHR S %CPU %MEM  TIME+ COMMAND\n"
    output += "    1 root     20  0    4680   1360   1080 S  0.0  0.0  0:02 init\n"
    output += "    2 root     20  0       0      0      0 S  0.0  0.0  0:00 kthreadd\n"
    output += "    3 root     20  0       0      0      0 S  0.0  0.0  0:00 ksoftirqd/0\n"
    output += "    5 root     20  0       0      0      0 S  0.0  0.0  0:00 kworker/0:0H\n"
    output += "    7 root     20  0       0      0      0 S  0.0  0.0  0:01 rcu_sched\n"
    output += "    8 root     20  0       0      0      0 S  0.0  0.0  0:00 rcu_bh\n"
    output += "    9 root     20  0       0      0      0 S  0.0  0.0  0:00 migration/0\n"
    output += "  400 user     20  0   56892  15432   8760 S  1.2  0.1  0:05 bash\n"
    output += " 1024 user     20  0 1458200 246000 112000 S  5.0  1.5  1:12 browser\n"
    output += " 1337 user     20  0  985600 124800  76800 R  2.5  0.8  0:45 bitos-terminal\n"

    return output
  },
}

// Helper function to format size in KB, MB, GB
function formatSize(sizeInMB: number): string {
  if (sizeInMB < 1024) {
    return `${sizeInMB}M`
  } else {
    return `${(sizeInMB / 1024).toFixed(1)}G`
  }
}
