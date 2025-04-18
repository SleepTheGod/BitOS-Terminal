import { getFileContent } from "./command-executor"

export const kernelCommands = {
  executeKernelCommand: (command: string, args: string[]): string => {
    switch (command) {
      case "dmesg":
        return kernelCommands.dmesg(args)
      case "sysctl":
        return kernelCommands.sysctl(args)
      case "lsmod":
      case "modinfo":
        return kernelCommands.lsmod(args[0])
      case "strace":
        return kernelCommands.strace(args)
      case "lsof":
        return kernelCommands.lsof(args)
      case "vmstat":
        return kernelCommands.vmstat()
      case "iostat":
        return kernelCommands.iostat()
      case "top":
      case "htop":
        return kernelCommands.top()
      default:
        return `${command}: command not found`
    }
  },

  // Display kernel messages
  dmesg: (args: string[]): string => {
    const dmesgContent = getFileContent("/var/log/dmesg.log")

    if (!dmesgContent) {
      return "Error: Could not read kernel messages"
    }

    // Check for flags
    if (args.includes("-c")) {
      return "dmesg: kernel ring buffer cleared"
    }

    if (args.includes("-H") || args.includes("--human")) {
      // Human readable format with timestamps
      const lines = dmesgContent.split("\n")
      return lines
        .map((line) => {
          const match = line.match(/\[\s*(\d+\.\d+)\]/)
          if (match) {
            const timestamp = Number.parseFloat(match[1])
            const date = new Date(timestamp * 1000)
            return line.replace(/\[\s*\d+\.\d+\]/, `[${date.toISOString()}]`)
          }
          return line
        })
        .join("\n")
    }

    return dmesgContent
  },

  // Display/configure kernel parameters
  sysctl: (args: string[]): string => {
    if (args.length === 0) {
      // Display all kernel parameters
      return "kernel.hostname = bitos\nkernel.ostype = Linux\nkernel.osrelease = 5.15.0-bitos\nkernel.version = #1 SMP PREEMPT\nkernel.sysrq = 1\nnet.ipv4.ip_forward = 1\nnet.ipv4.tcp_syncookies = 1\nnet.ipv6.conf.all.disable_ipv6 = 0\nvm.swappiness = 60\nfs.file-max = 65536"
    }

    if (args[0] === "-a") {
      // Display all kernel parameters (same as no args)
      return "kernel.hostname = bitos\nkernel.ostype = Linux\nkernel.osrelease = 5.15.0-bitos\nkernel.version = #1 SMP PREEMPT\nkernel.sysrq = 1\nnet.ipv4.ip_forward = 1\nnet.ipv4.tcp_syncookies = 1\nnet.ipv6.conf.all.disable_ipv6 = 0\nvm.swappiness = 60\nfs.file-max = 65536"
    }

    if (args[0] === "-w") {
      // Write a value
      if (args.length < 2) {
        return "sysctl: option requires an argument -- 'w'"
      }
      const setting = args[1].split("=")
      if (setting.length !== 2) {
        return "sysctl: invalid argument format"
      }
      return `${setting[0]} = ${setting[1]}`
    }

    // Read a specific parameter
    const param = args[0]
    if (param === "kernel.hostname") return "kernel.hostname = bitos"
    if (param === "kernel.ostype") return "kernel.ostype = Linux"
    if (param === "kernel.osrelease") return "kernel.osrelease = 5.15.0-bitos"
    if (param === "kernel.version") return "kernel.version = #1 SMP PREEMPT"
    if (param === "kernel.sysrq") return "kernel.sysrq = 1"
    if (param === "net.ipv4.ip_forward") return "net.ipv4.ip_forward = 1"

    return `sysctl: cannot stat ${param}: No such file or directory`
  },

  // List loaded kernel modules
  lsmod: (module?: string): string => {
    const modulesContent = getFileContent("/proc/modules")

    if (!modulesContent) {
      return "Error: Could not read modules information"
    }

    if (module) {
      // Show info for specific module
      const lines = modulesContent.split("\n")
      const moduleInfo = lines.find((line) => line.startsWith(module))

      if (!moduleInfo) {
        return `modinfo: ERROR: Module ${module} not found.`
      }

      const [name, size, usedBy] = moduleInfo.split(/\s+/)
      return `filename:       /lib/modules/5.15.0-bitos/kernel/drivers/${name}.ko\nversion:        5.15.0-bitos\nlicense:        GPL\ndescription:    ${name.toUpperCase()} driver\nauthor:         BitOS Kernel Team\nsrcversion:     8BAFD9832CAFB3324528121\nname:           ${name}\nvermagic:       5.15.0-bitos SMP preempt mod_unload\nparm:           debug:Debug level (0-3) (int)`
    }

    return "Module                  Size  Used by\n" + modulesContent
  },

  // Trace system calls
  strace: (args: string[]): string => {
    if (args.length === 0) {
      return "strace: must have PROG [ARGS] or -p PID"
    }

    let pid: string | undefined
    let command: string | undefined

    if (args[0] === "-p") {
      pid = args[1]
    } else {
      command = args[0]
    }

    if (pid) {
      return `strace: Process ${pid} attached\nexecve("/usr/bin/bash", ["bash"], 0x7ffd2e127ed0 /* 56 vars */) = 0\nbrk(NULL)                               = 0x55a7c4d33000\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nfstat(3, {st_mode=S_IFREG|0644, st_size=67893, ...}) = 0\nmmap(NULL, 67893, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bcd3f9000\nclose(3)                                = 0\n--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=1234, si_uid=1000, si_status=0, si_utime=0, si_stime=0} ---\nwait4(-1, 0x7ffd2e127a74, WNOHANG, NULL) = 0\nrt_sigreturn({mask=[]})                = 0\nread(0, "e", 1)                         = 1\nread(0, "x", 1)                         = 1\nread(0, "i", 1)                         = 1\nread(0, "t", 1)                         = 1\nread(0, "\n", 1)                        = 1\nwrite(1, "exit\n", 5)                    = 5\nexit_group(0)                           = ?\n+++ exited with 0 +++`
    }

    if (command) {
      return `execve("/usr/bin/${command}", ["${command}"], 0x7ffd2e127ed0 /* 56 vars */) = 0\nbrk(NULL)                               = 0x55a7c4d33000\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nfstat(3, {st_mode=S_IFREG|0644, st_size=67893, ...}) = 0\nmmap(NULL, 67893, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bcd3f9000\nclose(3)                                = 0\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(0x88, 0), ...}) = 0\nioctl(1, TCGETS, {B38400 opost isig icanon echo ...}) = 0\nwrite(1, "Hello, world!\n", 14)          = 14\nexit_group(0)                           = ?\n+++ exited with 0 +++`
    }

    return "strace: invalid arguments"
  },

  // List open files
  lsof: (args: string[]): string => {
    let output = "COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME\n"

    output += "systemd       1   root  cwd    DIR    8,1     4096      2 /\n"
    output += "systemd       1   root  rtd    DIR    8,1     4096      2 /\n"
    output += "systemd       1   root  txt    REG    8,1  1620224 1835082 /lib/systemd/systemd\n"
    output += "systemd       1   root  mem    REG    8,1   157224 1844865 /lib/x86_64-linux-gnu/libudev.so.1.6.17\n"
    output += "bash        400   user  cwd    DIR    8,1     4096 1048578 /home/user\n"
    output += "bash        400   user  rtd    DIR    8,1     4096      2 /\n"
    output += "bash        400   user  txt    REG    8,1  1183448 1835337 /bin/bash\n"
    output += "browser    1024   user  cwd    DIR    8,1     4096 1048578 /home/user\n"
    output += "browser    1024   user  rtd    DIR    8,1     4096      2 /\n"
    output += "browser    1024   user  txt    REG    8,1 15482216 1835429 /usr/lib/browser\n"
    output += "browser    1024   user    0u   CHR  136,0      0t0      3 /dev/pts/0\n"
    output += "browser    1024   user    1u   CHR  136,0      0t0      3 /dev/pts/0\n"
    output += "browser    1024   user    2u   CHR  136,0      0t0      3 /dev/pts/0\n"

    return output
  },

  // Virtual memory statistics
  vmstat: (): string => {
    return (
      "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n" +
      " r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n" +
      " 1  0      0 8192000 512000 2048000    0    0    12    25  100  200  5  2 93  0  0"
    )
  },

  // IO statistics
  iostat: (): string => {
    return (
      "Linux 5.15.0-bitos (bitos)    04/18/2025    _x86_64_    (4 CPU)\n\n" +
      "avg-cpu:  %user   %nice %system %iowait  %steal   %idle\n" +
      "           5.25    0.00    1.75    0.00    0.00   93.00\n\n" +
      "Device             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn\n" +
      "sda               8.35        25.45        65.80     123456     318790\n" +
      "sdb               0.00         0.00         0.00          0          0"
    )
  },

  // Top command
  top: (): string => {
    const now = new Date()
    const uptime = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime()) / 1000,
    )

    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = uptime % 60

    const users = Math.floor(Math.random() * 3) + 1
    const load1 = (Math.random() * 1.5).toFixed(2)
    const load5 = (Math.random() * 1.0).toFixed(2)
    const load15 = (Math.random() * 0.8).toFixed(2)

    // Generate top output
    let output = `top - ${now.toLocaleTimeString()} up ${days ? days + " days, " : ""}${hours}:${minutes.toString().padStart(2, "0")}, ${users} user${users > 1 ? "s" : ""}, load average: ${load1}, ${load5}, ${load15}\n`
    output += "Tasks: 110 total,   1 running, 109 sleeping,   0 stopped,   0 zombie\n"
    output += "%Cpu(s):  5.9 us,  2.0 sy,  0.0 ni, 91.7 id,  0.4 wa,  0.0 hi,  0.0 si,  0.0 st\n"
    output += "MiB Mem :  16384.0 total,   8192.0 free,   6144.0 used,   2048.0 buff/cache\n"
    output += "MiB Swap:   8192.0 total,   8192.0 free,      0.0 used.  10240.0 avail Mem\n\n"

    output += "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n"
    output += "    1 root      20   0    4680   1360   1080 S   0.0   0.0   0:02.00 init\n"
    output += "    2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd\n"
    output += "    3 root      20   0       0      0      0 S   0.0   0.0   0:00.00 ksoftirqd/0\n"
    output += "    5 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kworker/0:0H\n"
    output += "    7 root      20   0       0      0      0 S   0.0   0.0   0:01.00 rcu_sched\n"
    output += "    8 root      20   0       0      0      0 S   0.0   0.0   0:00.00 rcu_bh\n"
    output += "    9 root      20   0       0      0      0 S   0.0   0.0   0:00.00 migration/0\n"
    output += "  400 user      20   0   56892  15432   8760 S   1.2   0.1   0:05.00 bash\n"
    output += " 1024 user      20   0 1458200 246000 112000 S   5.0   1.5   1:12.00 browser\n"
    output += " 1337 user      20   0  985600 124800  76800 R   2.5   0.8   0:45.00 bitos-terminal\n"

    return output
  },
}
