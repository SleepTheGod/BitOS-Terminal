import { networkCommands } from "./network-commands"
import { systemCommands } from "./system-commands"
import { fileSystemCommands } from "./file-system-commands"
import { helpCommands } from "./help-commands"
import { kernelCommands } from "./kernel-commands"

// Virtual file system structure
export const fileSystem = {
  "/": {
    home: {
      user: {
        documents: {
          "readme.txt": "Welcome to BitOS!\nThis is a browser-based terminal simulation.",
          "network.md":
            "# Network Diagnostics\n\nUse `ping`, `traceroute`, and `ifconfig` commands to diagnose network issues.",
          "kernel.md": "# Kernel Debugging\n\nUse `dmesg`, `sysctl`, and `lsmod` commands to debug kernel issues.",
        },
        downloads: {},
        pictures: {},
      },
    },
    bin: {},
    etc: {
      hosts: "127.0.0.1 localhost\n::1 localhost",
      "resolv.conf": "nameserver 8.8.8.8\nnameserver 8.8.4.4",
      "sysctl.conf": "# System configuration file\nnet.ipv4.ip_forward=1\nkernel.sysrq=1",
    },
    var: {
      log: {
        "system.log": "System started successfully.\nAll services running normally.",
        "dmesg.log":
          "[    0.000000] Linux version 5.15.0-bitos (user@bitos) (gcc version 11.2.0) #1 SMP PREEMPT\n[    0.100000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-bitos root=UUID=1234-5678\n[    0.200000] BIOS-provided physical RAM map\n[    0.300000] Kernel command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-bitos root=UUID=1234-5678\n[    0.400000] Initializing cgroup subsys cpuset\n[    0.500000] Initializing cgroup subsys cpu\n[    0.600000] NR_IRQS:16640 nr_irqs:552 16\n[    0.700000] Console: colour VGA+ 80x25\n[    0.800000] console [tty0] enabled\n[    0.900000] Detected 2.4 GHz processor.\n[    1.000000] Booting paravirtualized kernel on bare hardware\n[    1.100000] Initialized network device eth0\n[    1.200000] Initialized network device wlan0\n[    1.300000] Mounted root filesystem\n[    1.400000] BitOS initialization complete",
      },
    },
    proc: {
      cpuinfo:
        "processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\nmodel\t\t: 142\nmodel name\t: Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz\nstepping\t: 11\nmicrocode\t: 0xea\ncpu MHz\t\t: 2000.000\ncache size\t: 8192 KB\nphysical id\t: 0\nsiblings\t: 8\ncore id\t\t: 0\ncpu cores\t: 4\napicid\t\t: 0\ninitial apicid\t: 0\nfpu\t\t: yes\nfpu_exception\t: yes\ncpuid level\t: 22\nwp\t\t: yes\nflags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb invpcid_single ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d arch_capabilities\nbugs\t\t: spectre_v1 spectre_v2 spec_store_bypass mds swapgs taa itlb_multihit srbds mmio_stale_data retbleed\nbogomips\t: 4000.00\nclflush size\t: 64\ncache_alignment\t: 64\naddress sizes\t: 39 bits physical, 48 bits virtual\npower management:",
      meminfo:
        "MemTotal:       16384000 kB\nMemFree:         8192000 kB\nMemAvailable:   10240000 kB\nBuffers:          512000 kB\nCached:          2048000 kB\nSwapCached:            0 kB\nActive:          4096000 kB\nInactive:        2048000 kB\nActive(anon):    3584000 kB\nInactive(anon):   512000 kB\nActive(file):     512000 kB\nInactive(file):  1536000 kB\nUnevictable:           0 kB\nMlocked:               0 kB\nSwapTotal:       8192000 kB\nSwapFree:        8192000 kB\nDirty:                 0 kB\nWriteback:             0 kB\nAnonPages:       4096000 kB\nMapped:           512000 kB\nShmem:                 0 kB\nSlab:             512000 kB\nSReclaimable:     384000 kB\nSUnreclaim:       128000 kB\nKernelStack:        8192 kB\nPageTables:        32768 kB\nNFS_Unstable:          0 kB\nBounce:                0 kB\nWritebackTmp:          0 kB\nCommitLimit:    16384000 kB\nCommitted_AS:    8192000 kB\nVmallocTotal:   34359738367 kB\nVmallocUsed:      262144 kB\nVmallocChunk:          0 kB\nHardwareCorrupted:     0 kB\nAnonHugePages:         0 kB\nShmemHugePages:        0 kB\nShmemPmdMapped:        0 kB\nCmaTotal:              0 kB\nCmaFree:               0 kB\nHugePages_Total:       0\nHugePages_Free:        0\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nDirectMap4k:      262144 kB\nDirectMap2M:     8388608 kB\nDirectMap1G:     8388608 kB",
      modules:
        "Module                  Size  Used by\nnvme                   98304  0\nintel_pmc_core         20480  1\nintel_rapl_msr         16384  0\nintel_rapl_common      24576  1 intel_rapl_msr\nip_tables              32768  0\nx_tables               40960  1 ip_tables\nbluetooth             651264  0\necdh_generic           16384  1 bluetooth\necc                    32768  1 ecdh_generic\nrfkill                 28672  1 bluetooth\nsnd_hda_codec_realtek   131072  1\nsnd_hda_codec_generic   90112  1 snd_hda_codec_realtek\nledtrig_audio          16384  1 snd_hda_codec_generic\nsnd_hda_codec_hdmi     65536  1\nsnd_hda_intel          53248  0\nsnd_intel_dspcfg       24576  1 snd_hda_intel\nsnd_hda_codec         143360  4 snd_hda_codec_generic,snd_hda_codec_hdmi,snd_hda_intel,snd_hda_codec_realtek\nsnd_hda_core           94208  5 snd_hda_codec_generic,snd_hda_codec_hdmi,snd_hda_intel,snd_hda_codec,snd_hda_codec_realtek\nsnd_hwdep              16384  1 snd_hda_codec\nsnd_pcm               118784  4 snd_hda_codec_hdmi,snd_hda_intel,snd_hda_codec,snd_hda_core\nsnd_timer              40960  1 snd_pcm\nsnd                    94208  6 snd_hda_codec_generic,snd_hwdep,snd_hda_codec_hdmi,snd_hda_intel,snd_hda_codec,snd_pcm\nsoundcore              16384  1 snd",
      mounts:
        "sysfs /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0\nproc /proc proc rw,nosuid,nodev,noexec,relatime 0 0\nudev /dev devtmpfs rw,nosuid,noexec,relatime,size=4096000k,nr_inodes=1048576,mode=755 0 0\ndevpts /dev/pts devpts rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000 0 0\ntmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=1638400k,mode=755 0 0\n/dev/sda1 / ext4 rw,relatime,errors=remount-ro 0 0\n/dev/sda2 /home ext4 rw,relatime 0 0\ntmpfs /dev/shm tmpfs rw,nosuid,nodev 0 0\ntmpfs /run/lock tmpfs rw,nosuid,nodev,noexec,relatime,size=5120k 0 0\ntmpfs /sys/fs/cgroup tmpfs ro,nosuid,nodev,noexec,mode=755 0 0",
      net: {
        dev: "Inter-|   Receive                                                |  Transmit\n face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed\n    lo:  123456     789    0    0    0     0          0         0   123456     789    0    0    0     0       0          0\n  eth0: 9876543   12345    0    0    0     0          0         0  9876543   12345    0    0    0     0       0          0\n wlan0: 5432109    6789    0    0    0     0          0         0  5432109    6789    0    0    0     0       0          0",
        route:
          "Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\ndefault         192.168.1.1     0.0.0.0         UG    100    0        0 eth0\n192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0\n192.168.0.0     0.0.0.0         255.255.255.0   U     600    0        0 wlan0",
      },
      sys: {
        kernel: {
          hostname: "bitos",
          version: "5.15.0-bitos",
          ostype: "Linux",
          osrelease: "5.15.0-bitos",
        },
      },
    },
    sys: {
      class: {
        net: {
          eth0: {
            address: "00:11:22:33:44:55",
            mtu: "1500",
          },
          wlan0: {
            address: "AA:BB:CC:DD:EE:FF",
            mtu: "1500",
          },
        },
      },
    },
  },
}

// Current working directory path
let currentPath = "/home/user"

// Get current directory object from path
export const getCurrentDirectory = () => {
  const pathParts = currentPath.split("/").filter(Boolean)
  let current = fileSystem["/"]

  for (const part of pathParts) {
    if (current[part]) {
      current = current[part]
    } else {
      return null
    }
  }

  return current
}

// Change current directory
export const changeDirectory = (path: string) => {
  if (path.startsWith("/")) {
    // Absolute path
    const targetDir = getDirectoryFromPath(path)
    if (targetDir) {
      currentPath = path
      return true
    }
    return false
  } else if (path === "..") {
    // Go up one level
    const pathParts = currentPath.split("/").filter(Boolean)
    if (pathParts.length > 0) {
      pathParts.pop()
      currentPath = "/" + pathParts.join("/")
      return true
    }
    return currentPath !== "/"
  } else {
    // Relative path
    const currentDir = getCurrentDirectory()
    if (currentDir && currentDir[path]) {
      currentPath = currentPath === "/" ? `/${path}` : `${currentPath}/${path}`
      return true
    }
    return false
  }
}

// Get directory object from path
export const getDirectoryFromPath = (path: string) => {
  const pathParts = path.split("/").filter(Boolean)
  let current = fileSystem["/"]

  for (const part of pathParts) {
    if (current[part]) {
      current = current[part]
    } else {
      return null
    }
  }

  return current
}

// Get current path
export const getCurrentPath = () => currentPath

// Get file content from path
export const getFileContent = (path: string) => {
  if (path.startsWith("/")) {
    // Absolute path
    const pathParts = path.split("/").filter(Boolean)
    const fileName = pathParts.pop() || ""
    let current = fileSystem["/"]

    for (const part of pathParts) {
      if (current[part]) {
        current = current[part]
      } else {
        return null
      }
    }

    return typeof current[fileName] === "string" ? current[fileName] : null
  } else {
    // Relative path
    const currentDir = getCurrentDirectory()
    return currentDir && typeof currentDir[path] === "string" ? currentDir[path] : null
  }
}

// Main command executor
export const executeCommand = async (input: string): Promise<string> => {
  const [command, ...args] = input.trim().split(" ")

  // Basic command routing
  switch (command.toLowerCase()) {
    // File system commands
    case "ls":
    case "dir":
      return fileSystemCommands.listDirectory(args[0])
    case "cd":
      return fileSystemCommands.changeDirectory(args[0] || "~")
    case "pwd":
      return fileSystemCommands.printWorkingDirectory()
    case "cat":
    case "type":
      return fileSystemCommands.catFile(args[0])
    case "mkdir":
      return fileSystemCommands.makeDirectory(args[0])
    case "touch":
    case "new-item":
      return fileSystemCommands.createFile(args[0], args.slice(1).join(" "))

    // Network commands
    case "ping":
      return await networkCommands.ping(args[0])
    case "ifconfig":
    case "ipconfig":
      return networkCommands.ifconfig()
    case "traceroute":
    case "tracert":
      return await networkCommands.traceroute(args[0])
    case "netstat":
      return networkCommands.netstat()
    case "nslookup":
    case "dig":
      return await networkCommands.nslookup(args[0])
    case "curl":
    case "wget":
      return await networkCommands.curl(args[0])
    case "ss":
      return networkCommands.socketStats()
    case "route":
      return networkCommands.routeTable()

    // System commands
    case "uname":
    case "ver":
      return systemCommands.uname(args[0] === "-a")
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
      return "\x1Bc"

    // Kernel debugging commands
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
      return systemCommands.top()

    // Help and misc
    case "help":
      return helpCommands.help(args[0])
    case "man":
      return helpCommands.manual(args[0])
    case "echo":
      return args.join(" ")
    case "whoami":
      return "user@bitos"
    case "exit":
    case "logout":
      return "Cannot exit terminal. This is a browser-based simulation."

    default:
      if (command) {
        return `Command not found: ${command}. Type 'help' for a list of available commands.`
      }
      return ""
  }
}
