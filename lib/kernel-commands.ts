import { getFileContent } from "./command-executor"

export const kernelCommands = {
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
      return `strace: Process ${pid} attached\nexecve("/usr/bin/bash", ["bash"], 0x7ffd2e127ed0 /* 56 vars */) = 0\nbrk(NULL)                               = 0x55a7c4d33000\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nfstat(3, {st_mode=S_IFREG|0644, st_size=67893, ...}) = 0\nmmap(NULL, 67893, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bcd3f9000\nclose(3)                                = 0\n--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=1234, si_uid=1000, si_status=0, si_utime=0, si_stime=0} ---\nwait4(-1, 0x7ffd2e127a74, WNOHANG, NULL) = 0\nrt_sigreturn({mask=[]})                = 0\nread(0, "e", 1)                         = 1\nread(0, "x", 1)                         = 1\nread(0, "i", 1)                         = 1\nread(0, "t", 1)                         = 1\nread(0, "\\n", 1)                        = 1\nwrite(1, "exit\\n", 5)                    = 5\nexit_group(0)                           = ?\n+++ exited with 0 +++`
    }

    if (command) {
      return `execve("/usr/bin/${command}", ["${command}"], 0x7ffd2e127ed0 /* 56 vars */) = 0\nbrk(NULL)                               = 0x55a7c4d33000\naccess("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)\nopenat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3\nfstat(3, {st_mode=S_IFREG|0644, st_size=67893, ...}) = 0\nmmap(NULL, 67893, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bcd3f9000\nclose(3)                                = 0\nfstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(0x88, 0), ...}) = 0\nioctl(1, TCGETS, {B38400 opost isig icanon echo ...}) = 0\nwrite(1, "Hello, world!\\n", 14)          = 14\nexit_group(0)                           = ?\n+++ exited with 0 +++`
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
}
