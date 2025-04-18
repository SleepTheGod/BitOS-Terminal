// Simulated network commands

export const networkCommands = {
  // Simulate ping command
  ping: async (host: string): Promise<string> => {
    if (!host) {
      return "Usage: ping <hostname or IP>"
    }

    let output = `PING ${host} (${generateRandomIp()}): 56 data bytes\n`

    // Simulate 4 ping responses
    for (let i = 0; i < 4; i++) {
      // Add random delay to make it look realistic
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 50))

      const time = (Math.random() * 50 + 10).toFixed(3)
      output += `64 bytes from ${generateRandomIp()}: icmp_seq=${i} ttl=64 time=${time} ms\n`
    }

    output += `\n--- ${host} ping statistics ---\n`
    output += `4 packets transmitted, 4 received, 0% packet loss\n`
    output += `round-trip min/avg/max/stddev = 12.345/23.456/34.567/5.678 ms`

    return output
  },

  // Simulate ifconfig/ipconfig command
  ifconfig: (): string => {
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

    interfaces.forEach((iface) => {
      output += `${iface.name}: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n`
      output += `        inet ${iface.ip}  netmask ${iface.mask}  broadcast ${iface.ip.split(".").slice(0, 3).join(".")}.255\n`
      if (iface.mac) {
        output += `        ether ${iface.mac}  txqueuelen 1000  (Ethernet)\n`
      }
      output += `        RX packets ${Math.floor(iface.rx / 1000)}  bytes ${iface.rx} (${(iface.rx / 1024 / 1024).toFixed(2)} MiB)\n`
      output += `        TX packets ${Math.floor(iface.tx / 1000)}  bytes ${iface.tx} (${(iface.tx / 1024 / 1024).toFixed(2)} MiB)\n\n`
    })

    return output
  },

  // Simulate traceroute command
  traceroute: async (host: string): Promise<string> => {
    if (!host) {
      return "Usage: traceroute <hostname or IP>"
    }

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

      output += `${i}  ${hopName} (${ip})  ${time1} ms  ${time2} ms  ${time3} ms\n`
    }

    return output
  },

  // Simulate netstat command
  netstat: (): string => {
    let output = "Active Internet connections (servers and established)\n"
    output += "Proto Recv-Q Send-Q Local Address           Foreign Address         State\n"

    // Generate random connections
    const protocols = ["tcp", "udp"]
    const states = ["ESTABLISHED", "LISTEN", "TIME_WAIT", "CLOSE_WAIT"]
    const localPorts = [80, 443, 22, 3000, 3306, 5432, 8080]

    for (let i = 0; i < 8; i++) {
      const proto = protocols[Math.floor(Math.random() * protocols.length)]
      const state = states[Math.floor(Math.random() * states.length)]
      const localPort = localPorts[Math.floor(Math.random() * localPorts.length)]
      const localIp = "127.0.0.1"
      const foreignIp = state === "LISTEN" ? "0.0.0.0" : generateRandomIp()
      const foreignPort = state === "LISTEN" ? "*" : Math.floor(Math.random() * 60000 + 1024)

      output += `${proto}        0      0 ${localIp}:${localPort}          ${foreignIp}:${foreignPort}          ${state}\n`
    }

    return output
  },

  // Simulate nslookup/dig command
  nslookup: async (domain: string): Promise<string> => {
    if (!domain) {
      return "Usage: nslookup <domain>"
    }

    // Add random delay to make it look realistic
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 200))

    let output = `Server:		8.8.8.8\n`
    output += `Address:	8.8.8.8#53\n\n`
    output += `Non-authoritative answer:\n`
    output += `Name:	${domain}\n`
    output += `Address: ${generateRandomIp()}\n`

    // Add IPv6 address sometimes
    if (Math.random() > 0.5) {
      output += `Name:	${domain}\n`
      output += `Address: ${generateRandomIpv6()}\n`
    }

    return output
  },

  // Simulate curl/wget command
  curl: async (url: string): Promise<string> => {
    if (!url) {
      return "Usage: curl <url>"
    }

    // Add random delay to make it look realistic
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 800 + 200))

    if (url.includes("example.com")) {
      return `<!doctype html>
<html>
<head>
    <title>Example Domain</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
    <div>
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents.</p>
        <p>You may use this domain in literature without prior coordination.</p>
    </div>
</body>
</html>`
    }

    return `<!DOCTYPE html>
<html>
<head>
    <title>${url}</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Welcome to ${url}</h1>
    <p>This is a simulated response from the BitOS terminal.</p>
</body>
</html>`
  },

  // Simulate ss command (socket statistics)
  socketStats: (): string => {
    let output = "Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process\n"

    output += "tcp    LISTEN  0       128      0.0.0.0:22             0.0.0.0:*\n"
    output += "tcp    LISTEN  0       128      127.0.0.1:631           0.0.0.0:*\n"
    output += "tcp    ESTAB   0       0        192.168.1.5:22          192.168.1.10:49721\n"
    output += "tcp    ESTAB   0       0        192.168.1.5:22          192.168.1.15:52410\n"
    output += "tcp    LISTEN  0       128      [::]:22                [::]:*\n"
    output += "tcp    LISTEN  0       128      [::1]:631              [::]:*\n"
    output += "udp    UNCONN  0       0        0.0.0.0:631            0.0.0.0:*\n"
    output += "udp    UNCONN  0       0        0.0.0.0:5353           0.0.0.0:*\n"

    return output
  },

  // Simulate route command
  routeTable: (): string => {
    let output = "Kernel IP routing table\n"
    output += "Destination     Gateway         Genmask         Flags Metric Ref    Use Iface\n"
    output += "default         192.168.1.1     0.0.0.0         UG    100    0        0 eth0\n"
    output += "192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0\n"
    output += "192.168.0.0     0.0.0.0         255.255.255.0   U     600    0        0 wlan0\n"

    return output
  },
}

// Helper functions
function generateRandomIp(): string {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`
}

function generateRandomIpv6(): string {
  const segments = []
  for (let i = 0; i < 8; i++) {
    segments.push(Math.floor(Math.random() * 65535).toString(16))
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
