import { networkCommands } from "./network-commands"
import { systemCommands } from "./system-commands"
import { fileSystemCommands } from "./file-system-commands"
import { helpCommands } from "./help-commands"
import { kernelCommands } from "./kernel-commands"
import { packageCommands } from "./package-commands"
import { userCommands } from "./user-commands"
import { processCommands } from "./process-commands"
import { utilityCommands } from "./utility-commands"

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
        ".bashrc":
          "# ~/.bashrc: executed by bash(1) for non-login shells.\n# see /usr/share/doc/bash/examples/startup-files for examples",
        ".bash_history": "ls\ncd documents\ncat readme.txt\nifconfig\nuname -a",
      },
    },
    bin: {},
    sbin: {},
    etc: {
      hosts: "127.0.0.1 localhost\n::1 localhost ip6-localhost ip6-loopback\n127.0.1.1 debian-bitos",
      "resolv.conf": "nameserver 8.8.8.8\nnameserver 8.8.4.4",
      "sysctl.conf": "# System configuration file\nnet.ipv4.ip_forward=1\nkernel.sysrq=1",
      apt: {
        "sources.list":
          "deb http://deb.debian.org/debian bookworm main\ndeb http://security.debian.org/debian-security bookworm-security main\ndeb http://deb.debian.org/debian bookworm-updates main",
      },
      passwd:
        "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nuser:x:1000:1000:User,,,:/home/user:/bin/bash",
      group: "root:x:0:\ndaemon:x:1:\nbin:x:2:\nsys:x:3:\nadm:x:4:user\nsudo:x:27:user\nuser:x:1000:",
      shadow:
        "root:!:19462:0:99999:7:::\ndaemon:*:19462:0:99999:7:::\nbin:*:19462:0:99999:7:::\nsys:*:19462:0:99999:7:::\nuser:$6$xyz:19462:0:99999:7:::",
    },
    var: {
      log: {
        syslog:
          "Apr 18 12:00:01 debian-bitos systemd[1]: Started System Logging Service.\nApr 18 12:00:05 debian-bitos kernel: [    0.000000] Linux version 5.15.0-bitos\nApr 18 12:01:23 debian-bitos NetworkManager[687]: <info>  [1681819283.4638] NetworkManager (version 1.42.0) is starting...",
        "auth.log":
          "Apr 18 12:00:01 debian-bitos sshd[1234]: Server listening on 0.0.0.0 port 22.\nApr 18 12:05:22 debian-bitos sudo:     user : TTY=pts/0 ; PWD=/home/user ; USER=root ; COMMAND=/usr/bin/apt update",
        "dpkg.log":
          "2023-04-18 12:10:05 status installed linux-image-5.15.0-bitos:amd64 5.15.0-1\n2023-04-18 12:10:10 status installed bash:amd64 5.2.15-2+b2\n2023-04-18 12:10:15 status installed coreutils:amd64 9.1-1",
        apt: {
          "history.log":
            "Start-Date: 2023-04-18  12:10:00\nCommandline: apt install bash\nInstall: bash:amd64 (5.2.15-2+b2)\nEnd-Date: 2023-04-18  12:10:05",
          "term.log":
            "Log started: 2023-04-18  12:10:00\nReading package lists...\nBuilding dependency tree...\nReading state information...\nThe following packages will be upgraded:\n  bash\n1 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 1,564 kB of archives.\nAfter this operation, 0 B of additional disk space will be used.\nGet:1 http://deb.debian.org/debian bookworm/main amd64 bash amd64 5.2.15-2+b2 [1,564 kB]\nFetched 1,564 kB in 0s (3,128 kB/s)\nReading changelogs... Done\n(Reading database ... 132517 files and directories currently installed.)\nPreparing to unpack .../bash_5.2.15-2+b2_amd64.deb ...\nUnpacking bash (5.2.15-2+b2) over (5.2.15-2+b1) ...\nSetting up bash (5.2.15-2+b2) ...\nLog ended: 2023-04-18  12:10:05",
        },
      },
      cache: {
        apt: {
          "pkgcache.bin": "Binary package cache file",
          "srcpkgcache.bin": "Source package cache file",
        },
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
          hostname: "debian-bitos",
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
    usr: {
      bin: {},
      sbin: {},
      share: {
        doc: {
          bash: {
            copyright:
              "This is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.",
            changelog: "bash (5.2.15-2+b2) bookworm; urgency=medium\n\n  * Rebuild for bookworm.",
          },
        },
        man: {},
      },
      lib: {},
    },
    tmp: {},
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
      // Store current directory in localStorage for prompt
      localStorage.setItem("currentDirectory", currentPath)
      return true
    }
    return false
  } else if (path === "..") {
    // Go up one level
    const pathParts = currentPath.split("/").filter(Boolean)
    if (pathParts.length > 0) {
      pathParts.pop()
      currentPath = "/" + pathParts.join("/")
      // Store current directory in localStorage for prompt
      localStorage.setItem("currentDirectory", currentPath)
      return true
    }
    return currentPath !== "/"
  } else if (path === "~" || path === "$HOME") {
    // Go to home directory
    currentPath = "/home/user"
    // Store current directory in localStorage for prompt
    localStorage.setItem("currentDirectory", currentPath)
    return true
  } else {
    // Relative path
    const currentDir = getCurrentDirectory()
    if (currentDir && currentDir[path]) {
      currentPath = currentPath === "/" ? `/${path}` : `${currentPath}/${path}`
      // Store current directory in localStorage for prompt
      localStorage.setItem("currentDirectory", currentPath)
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
  // Handle command with arguments
  const args = input.trim().split(/\s+/)
  const command = args[0].toLowerCase()
  const commandArgs = args.slice(1)

  // Special case for "about" command
  if (command === "about") {
    return `BitOS - Debian GNU/Linux Terminal Emulator
Version: 1.0.0
Created by: Taylor Christian Newsome

This is a browser-based terminal emulation that simulates a Debian Linux environment.
It supports a wide range of standard Linux commands and utilities.

System Information:
- Kernel: Linux 5.15.0-bitos
- Distribution: Debian GNU/Linux 12 (Bookworm)
- Architecture: x86_64
- Memory: 16GB RAM

Type 'help' for a list of available commands.`
  }

  // Basic command routing by category
  // File System Commands
  if (
    [
      "ls",
      "dir",
      "cd",
      "pwd",
      "cat",
      "type",
      "mkdir",
      "touch",
      "rm",
      "cp",
      "mv",
      "find",
      "grep",
      "chmod",
      "chown",
    ].includes(command)
  ) {
    return fileSystemCommands.executeFileCommand(command, commandArgs)
  }

  // Network Commands
  else if (
    [
      "ping",
      "ifconfig",
      "ipconfig",
      "traceroute",
      "tracert",
      "netstat",
      "nslookup",
      "dig",
      "curl",
      "wget",
      "ss",
      "route",
      "ip",
      "arp",
      "host",
    ].includes(command)
  ) {
    return await networkCommands.executeNetworkCommand(command, commandArgs)
  }

  // System Commands
  else if (
    [
      "uname",
      "ver",
      "ps",
      "tasklist",
      "free",
      "mem",
      "df",
      "diskspace",
      "uptime",
      "date",
      "time",
      "clear",
      "cls",
      "reboot",
      "shutdown",
    ].includes(command)
  ) {
    return systemCommands.executeSystemCommand(command, commandArgs)
  }

  // Kernel Debugging Commands
  else if (
    ["dmesg", "sysctl", "lsmod", "modinfo", "strace", "lsof", "vmstat", "iostat", "top", "htop"].includes(command)
  ) {
    return kernelCommands.executeKernelCommand(command, commandArgs)
  }

  // Package Management Commands
  else if (["apt", "apt-get", "dpkg", "apt-cache"].includes(command)) {
    return packageCommands.executePackageCommand(command, commandArgs)
  }

  // User Management Commands
  else if (["whoami", "who", "w", "passwd", "adduser", "usermod", "groupadd", "su", "sudo"].includes(command)) {
    return userCommands.executeUserCommand(command, commandArgs)
  }

  // Process Management Commands
  else if (["kill", "killall", "nice", "renice", "bg", "fg", "jobs", "nohup"].includes(command)) {
    return processCommands.executeProcessCommand(command, commandArgs)
  }

  // Utility Commands
  else if (
    [
      "tar",
      "gzip",
      "gunzip",
      "zip",
      "unzip",
      "ssh",
      "scp",
      "rsync",
      "git",
      "nano",
      "vi",
      "less",
      "more",
      "head",
      "tail",
      "sort",
      "uniq",
      "wc",
      "cut",
      "sed",
      "awk",
      "diff",
      "cron",
      "crontab",
    ].includes(command)
  ) {
    return utilityCommands.executeUtilityCommand(command, commandArgs)
  }

  // Help and Documentation
  else if (["help", "man", "info"].includes(command)) {
    return helpCommands.executeHelpCommand(command, commandArgs)
  }

  // Shell Built-ins
  else if (["echo", "printf", "history", "exit", "logout"].includes(command)) {
    if (command === "echo") {
      return commandArgs.join(" ")
    } else if (command === "history") {
      const history = JSON.parse(localStorage.getItem("commandHistory") || "[]")
      return history.map((cmd: string, i: number) => `${i + 1}  ${cmd}`).join("\n")
    } else if (command === "exit" || command === "logout") {
      return "Cannot exit terminal. This is a browser-based simulation."
    }
    return `${command}: command not fully implemented in this simulation.`
  }

  // Command not found
  else {
    if (command) {
      return `${command}: command not found. Type 'help' for a list of available commands.`
    }
    return ""
  }
}
