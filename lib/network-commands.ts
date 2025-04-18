export const networkCommands = {
  executeNetworkCommand: async (command: string, args: string[]): Promise<string> => {
    switch (command) {
      case "ping":
        return await networkCommands.ping(args)
      case "ifconfig":
      case "ipconfig":
        return networkCommands.ifconfig(args)
      case "traceroute":
      case "tracert":
        return await networkCommands.traceroute(args)
      case "netstat":
        return networkCommands.netstat(args)
      case "nslookup":
      case "dig":
        return await networkCommands.nslookup(args)
      case "curl":
      case "wget":
        return await networkCommands.curl(args)
      case "ss":
        return networkCommands.socketStats(args)
      case "route":
        return networkCommands.routeTable(args)
      case "ip":
        return networkCommands.ipCommand(args)
      case "arp":
        return networkCommands.arpCommand(args)
      case "host":
        return await networkCommands.hostCommand(args)
      default:
        return `${command}: command not found`
    }
  },

  // Simulate ping command
  ping: async (args: string[]): Promise<string> => {
    // Parse options
    let count = 4
    let host = ""

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-c" && i + 1 < args.length) {
        count = Number.parseInt(args[i + 1])
        i++
      } else if (!args[i].startsWith("-")) {
        host = args[i]
      }
    }

    if (!host) {
      return "Usage: ping [-c count] <hostname or IP>"
    }

    let output = `PING ${host} (${generateRandomIp()}) 56(84) bytes of data.\n`

    // Simulate ping responses
    for (let i = 0; i < count; i++) {
      // Add random delay to make it look realistic
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 50))

      const time = (Math.random() * 50 + 10).toFixed(3)
      output += `64 bytes from ${host} (${generateRandomIp()}): icmp_seq=${i + 1} ttl=64 time=${time} ms\n`
    }

    output += `\n--- ${host} ping statistics ---\n`
    output += `${count} packets transmitted, ${count} received, 0% packet loss, time ${Math.floor(Math.random() * 100 + 50)}ms\n`
    output += `rtt min/avg/max/mdev = 10.123/${(Math.random() * 20 + 15).toFixed(3)}/${(Math.random() * 30 + 25).toFixed(3)}/${(Math.random() * 5 + 2).toFixed(3)} ms`

    return output
  },

  // Simulate ifconfig/ipconfig command with more compact output
  ifconfig: (args: string[]): string => {
    const interface_name = args.length > 0 ? args[0] : ""

    const interfaces = [
      {
        name: "eth0",
        ip: "192.168.1." + Math.floor(Math.random() * 254 + 1),
        mac: generateRandomMac(),
        mask: "255.255.255.0",
        rx: Math.floor(Math.random() * 1000000),
        tx: Math.floor(Math.random() * 1000000),
      },
      {
        name: "wlan0",
        ip: "192.168.0." + Math.floor(Math.random() * 254 + 1),
        mac: generateRandomMac(),
        mask: "255.255.255.0",
        rx: Math.floor(Math.random() * 1000000),
        tx: Math.floor(Math.random() * 1000000),
      },
      {
        name: "lo",
        ip: "127.0.0.1",
        mask: "255.0.0.0",
        rx: Math.floor(Math.random() * 10000),
        tx: Math.floor(Math.random() * 10000),
      },
    ]

    let output = ""

    // If interface name is provided, only show that interface
    if (interface_name) {
      const iface = interfaces.find((i) => i.name === interface_name)
      if (!iface) {
        return `ifconfig: interface ${interface_name} does not exist.`
      }

      output += formatInterfaceCompact(iface)
      return output
    }

    // Otherwise show all interfaces
    interfaces.forEach((iface, index) => {
      output += formatInterfaceCompact(iface)
      if (index < interfaces.length - 1) {
        output += "\n"
      }
    })

    return output
  },

  // Simulate traceroute command
  traceroute: async (args: string[]): Promise<string> => {
    if (args.length === 0) {
      return "Usage: traceroute <hostname or IP>"
    }

    const host = args[0]
    let output = `traceroute to ${host} (${generateRandomIp()}), 30 hops max, 60 byte packets\n`

    // Generate random number of hops (3-8)
    const hops = Math.floor(Math.random() * 6) + 3

    for (let i = 1; i <= hops; i++) {
      // Add random delay to make it look realistic
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100))

      const ip = generateRandomIp()
      const time1 = (Math.random() * 50 + 10).toFixed(3)
      const time2 = (Math.random() * 50 + 10).toFixed(3)
      const time3 = (Math.random() * 50 + 10).toFixed(3)

      // Last hop is the destination
      const hopName = i === hops ? host : `router-${i}.example.com`

      // Make sure the hostname is not too long
      const displayName = hopName.length > 20 ? hopName.substring(0, 17) + "..." : hopName

      output += ` ${i.toString().padStart(2)}  ${displayName} (${ip})\n    ${time1} ms  ${time2} ms  ${time3} ms\n`
    }

    return output.trim()
  },

  // Simulate netstat command with more compact output
  netstat: (args: string[]): string => {
    // Parse options
    const all = args.includes("-a") || args.includes("--all")
    const tcp = args.includes("-t") || args.includes("--tcp")
    const udp = args.includes("-u") || args.includes("--udp")
    const listening = args.includes("-l") || args.includes("--listening")
    const numeric = args.includes("-n") || args.includes("--numeric")

    let output = "Active Internet connections"

    if (listening) {
      output += " (only servers)"
    } else if (all) {
      output += " (servers and established)"
    } else {
      output += " (w/o servers)"
    }

    output += "\nProto Recv-Q Send-Q Local Address          Foreign Address        State\n"

    // Generate random connections
    const protocols = tcp && !udp ? ["tcp"] : udp && !tcp ? ["udp"] : ["tcp", "udp", "tcp6", "udp6"]
    const states = [
      "ESTABLISHED",
      "LISTEN",
      "TIME_WAIT",
      "CLOSE_WAIT",
      "SYN_SENT",
      "SYN_RECV",
      "FIN_WAIT1",
      "FIN_WAIT2",
      "LAST_ACK",
      "CLOSING",
      "CLOSED",
    ]
    const localPorts = [22, 53, 80, 443, 3000, 3306, 5432, 8080, 8443]

    for (let i = 0; i < 15; i++) {
      const proto = protocols[Math.floor(Math.random() * protocols.length)]
      const state = states[Math.floor(Math.random() * states.length)]

      // Skip entries based on options
      if (listening && state !== "LISTEN") continue
      if (!all && state === "LISTEN") continue

      const localPort = localPorts[Math.floor(Math.random() * localPorts.length)]
      const localIp = proto.includes("6") ? "::1" : "127.0.0.1"
      const foreignIp =
        state === "LISTEN"
          ? proto.includes("6")
            ? ":::"
            : "0.0.0.0"
          : proto.includes("6")
            ? "::1"
            : generateRandomIp()
      const foreignPort = state === "LISTEN" ? "*" : Math.floor(Math.random() * 60000 + 1024)

      const localAddr = `${localIp}:${localPort}`
      const foreignAddr = `${foreignIp}:${foreignPort}`

      output += `${proto.padEnd(5)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(7)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(7)} ${localAddr.padEnd(22)} ${foreignAddr.padEnd(22)} ${state}\n`
    }

    return output.trim()
  },

  // Other command implementations remain the same...
}

// Helper functions
function generateRandomIp(): string {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`
}

function generateRandomIpv6(): string {
  const segments = []
  for (let i = 0; i < 8; i++) {
    segments.push(
      Math.floor(Math.random() * 65535)
        .toString(16)
        .padStart(4, "0"),
    )
  }
  return segments.join(":")
}

function generateRandomMac(): string {
  const hexDigits = "0123456789ABCDEF"
  let mac = ""
  for (let i = 0; i < 6; i++) {
    let segment = ""
    for (let j = 0; j < 2; j++) {
      segment += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length))
    }
    mac += (i === 0 ? "" : ":") + segment
  }
  return mac
}

// More compact interface formatting
function formatInterfaceCompact(iface: any): string {
  let output = `${iface.name}: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n`
  output += `        inet ${iface.ip}  netmask ${iface.mask}\n`
  if (iface.mac) {
    output += `        ether ${iface.mac}\n`
  }
  output += `        RX packets ${Math.floor(iface.rx / 1000)}  bytes ${iface.rx} (${(iface.rx / 1024 / 1024).toFixed(1)}M)\n`
  output += `        TX packets ${Math.floor(iface.tx / 1000)}  bytes ${iface.tx} (${(iface.tx / 1024 / 1024).toFixed(1)}M)`

  return output
}
