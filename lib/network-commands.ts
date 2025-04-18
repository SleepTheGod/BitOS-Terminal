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

  // Simulate ifconfig/ipconfig command
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

      output += formatInterface(iface)
      return output
    }

    // Otherwise show all interfaces
    interfaces.forEach((iface) => {
      output += formatInterface(iface)
      output += "\n"
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

      output += `${i}  ${hopName} (${ip})  ${time1} ms  ${time2} ms  ${time3} ms\n`
    }

    return output
  },

  // Simulate netstat command
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

    output += "\nProto Recv-Q Send-Q Local Address           Foreign Address         State\n"

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

      output += `${proto.padEnd(6)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(7)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(
          7,
        )} ${localIp}:${localPort.toString().padEnd(5)} ${foreignIp}:${foreignPort.toString().padEnd(5)} ${state}\n`
    }

    return output
  },

  // Simulate nslookup/dig command
  nslookup: async (args: string[]): Promise<string> => {
    if (args.length === 0) {
      return "Usage: nslookup <domain>"
    }

    const domain = args[0]

    // Check for options
    const isDetailed = args.includes("-type=any") || args.includes("-type=ALL")

    // Add random delay to make it look realistic
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 200))

    // Nslookup format
    let output = `Server:\t\t8.8.8.8\n`
    output += `Address:\t8.8.8.8#53\n\n`

    output += `Non-authoritative answer:\n`
    output += `Name:\t${domain}\n`
    output += `Address: ${generateRandomIp()}\n`

    if (isDetailed) {
      output += `Name:\t${domain}\n`
      output += `Address: ${generateRandomIpv6()}\n\n`

      output += `${domain}\tmail exchanger = 10 mail1.${domain}.\n`
      output += `${domain}\tmail exchanger = 20 mail2.${domain}.\n\n`

      output += `${domain}\ttext = "v=spf1 include:_spf.${domain} ~all"\n`
      output += `${domain}\tnameserver = ns1.${domain}.\n`
      output += `${domain}\tnameserver = ns2.${domain}.\n`
    }

    return output
  },

  // Simulate curl/wget command
  curl: async (args: string[]): Promise<string> => {
    if (args.length === 0) {
      return "Usage: curl [options] <url>"
    }

    // Parse options
    let url = ""
    let outputFile = null
    let verbose = false
    let headers = false

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-o" && i + 1 < args.length) {
        outputFile = args[i + 1]
        i++
      } else if (args[i] === "-v") {
        verbose = true
      } else if (args[i] === "-I" || args[i] === "--head") {
        headers = true
      } else if (!args[i].startsWith("-")) {
        url = args[i]
      }
    }

    if (!url) {
      return "curl: try 'curl --help' or 'curl --manual' for more information"
    }

    // Add random delay to make it look realistic
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 800 + 200))

    if (verbose) {
      let output = `* Trying ${generateRandomIp()}:443...\n`
      output += `* Connected to ${url.split("/")[2] || url} (${generateRandomIp()}) port 443 (#0)\n`
      output += `* ALPN, offering h2\n`
      output += `* ALPN, offering http/1.1\n`
      output += `* TLSv1.3 (OUT), TLS handshake, Client hello (1):\n`
      output += `* TLSv1.3 (IN), TLS handshake, Server hello (2):\n`
      output += `* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):\n`
      output += `* TLSv1.3 (IN), TLS handshake, Certificate (11):\n`
      output += `* TLSv1.3 (IN), TLS handshake, CERT verify (15):\n`
      output += `* TLSv1.3 (IN), TLS handshake, Finished (20):\n`
      output += `* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):\n`
      output += `* TLSv1.3 (OUT), TLS handshake, Finished (20):\n`
      output += `* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384\n`
      output += `* ALPN, server accepted to use h2\n`
      output += `* Server certificate:\n`
      output += `*  subject: CN=${url.split("/")[2] || url}\n`
      output += `*  start date: Jan 1 00:00:00 2023 GMT\n`
      output += `*  expire date: Dec 31 23:59:59 2023 GMT\n`
      output += `*  subjectAltName: host "${url.split("/")[2] || url}" matched cert's "${url.split("/")[2] || url}"\n`
      output += `*  issuer: C=US; O=Let's Encrypt; CN=R3\n`
      output += `*  SSL certificate verify ok.\n`
      output += `* Using HTTP2, server supports multiplexing\n`
      output += `* Connection state changed (HTTP/2 confirmed)\n`
      output += `* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0\n`
      output += `* Using Stream ID: 1 (easy handle 0x55b5a9bb4280)\n`
      output += `> GET / HTTP/2\n`
      output += `> Host: ${url.split("/")[2] || url}\n`
      output += `> user-agent: curl/7.88.1\n`
      output += `> accept: */*\n`
      output += `>\n`
      output += `* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!\n`
      output += `< HTTP/2 200\n`
      output += `< content-type: text/html; charset=utf-8\n`
      output += `< date: ${new Date().toUTCString()}\n`
      output += `< server: nginx\n`
      output += `< content-length: 1256\n`
      output += `<\n`

      if (!headers) {
        output += `<!DOCTYPE html>\n`
        output += `<html>\n`
        output += `<head>\n`
        output += `  <title>${url}</title>\n`
        output += `  <meta charset="UTF-8">\n`
        output += `</head>\n`
        output += `<body>\n`
        output += `  <h1>Welcome to ${url}</h1>\n`
        output += `  <p>This is a simulated response from curl command in BitOS.</p>\n`
        output += `</body>\n`
        output += `</html>\n`
      }

      output += `* Connection #0 to host ${url.split("/")[2] || url} left intact\n`

      return output
    }

    if (headers) {
      return (
        `HTTP/2 200\n` +
        `content-type: text/html; charset=utf-8\n` +
        `date: ${new Date().toUTCString()}\n` +
        `server: nginx\n` +
        `content-length: 1256\n`
      )
    }

    if (outputFile) {
      return (
        `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n` +
        `                                 Dload  Upload   Total   Spent    Left  Speed\n` +
        `100  1256  100  1256    0     0  12560      0 --:--:-- --:--:-- --:--:-- 12560\n` +
        `curl: Saved to filename '${outputFile}'`
      )
    }

    return `<!DOCTYPE html>
<html>
<head>
  <title>${url}</title>
  <meta charset="UTF-8">
</head>
<body>
  <h1>Welcome to ${url}</h1>
  <p>This is a simulated response from curl command in BitOS.</p>
</body>
</html>`
  },

  // Simulate ss (socket statistics) command
  socketStats: (args: string[]): string => {
    // Parse options
    const all = args.includes("-a") || args.includes("--all")
    const tcp = args.includes("-t") || args.includes("--tcp")
    const udp = args.includes("-u") || args.includes("--udp")
    const listening = args.includes("-l") || args.includes("--listening")
    const processes = args.includes("-p") || args.includes("--processes")

    let output = "Netid  State      Recv-Q Send-Q   Local Address:Port     Peer Address:Port  Process\n"

    // Generate random socket statistics
    const netids = tcp && !udp ? ["tcp"] : udp && !tcp ? ["udp"] : ["tcp", "udp", "tcp6", "udp6", "raw", "unix"]
    const states = [
      "ESTAB",
      "LISTEN",
      "TIME-WAIT",
      "CLOSE-WAIT",
      "SYN-SENT",
      "SYN-RECV",
      "FIN-WAIT-1",
      "FIN-WAIT-2",
      "LAST-ACK",
      "CLOSING",
      "CLOSED",
    ]
    const localPorts = [22, 53, 80, 443, 3000, 3306, 5432, 8080, 8443]

    for (let i = 0; i < 10; i++) {
      const netid = netids[Math.floor(Math.random() * netids.length)]
      const state = states[Math.floor(Math.random() * states.length)]

      // Skip entries based on options
      if (listening && state !== "LISTEN") continue
      if (!all && state === "LISTEN") continue

      const localPort = localPorts[Math.floor(Math.random() * localPorts.length)]
      const localIp = netid.includes("6") ? "::1" : "127.0.0.1"
      const peerIp =
        state === "LISTEN"
          ? netid.includes("6")
            ? ":::"
            : "0.0.0.0"
          : netid.includes("6")
            ? "::1"
            : generateRandomIp()
      const peerPort = state === "LISTEN" ? "*" : Math.floor(Math.random() * 60000 + 1024)
      const process = processes
        ? `users:(("nginx",pid=${Math.floor(Math.random() * 10000)},fd=${Math.floor(Math.random() * 20)}))`
        : ""

      output += `${netid.padEnd(6)} ${state.padEnd(11)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(7)} ${Math.floor(Math.random() * 10)
        .toString()
        .padEnd(
          7,
        )} ${localIp}:${localPort.toString().padEnd(5)} ${peerIp}:${peerPort.toString().padEnd(5)} ${process}\n`
    }

    return output
  },

  // Simulate route command
  routeTable: (args: string[]): string => {
    // Parse options
    const numeric = args.includes("-n") || args.includes("--numeric")

    let output = "Kernel IP routing table\n"
    output += "Destination     Gateway         Genmask         Flags Metric Ref    Use Iface\n"
    output += "default         192.168.1.1     0.0.0.0         UG    100    0        0 eth0\n"
    output += "192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0\n"
    output += "192.168.0.0     0.0.0.0         255.255.255.0   U     600    0        0 wlan0\n"
    output += "127.0.0.0       0.0.0.0         255.0.0.0       U     0      0        0 lo\n"

    return output
  },

  // Simulate ip command
  ipCommand: (args: string[]): string => {
    if (args.length === 0) {
      return (
        "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }\n" +
        "where  OBJECT := { link | address | route | rule | neigh | tunnel |\n" +
        "                   maddr | mroute | monitor | xfrm }\n" +
        "       OPTIONS := { -V[ersion] | -s[tatistics] | -d[etails] | -r[esolve] |\n" +
        "                    -h[uman-readable] | -iec | -f[amily] { inet | inet6 | ipx | dnet | link } |\n" +
        "                    -o[neline] | -t[imestamp] | -b[atch] [filename] }\n"
      )
    }

    const object = args[0]

    if (object === "addr" || object === "address") {
      return (
        "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000\n" +
        "    inet 127.0.0.1/8 scope host lo\n" +
        "       valid_lft forever preferred_lft forever\n" +
        "    inet6 ::1/128 scope host \n" +
        "       valid_lft forever preferred_lft forever\n" +
        "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000\n" +
        "    inet 192.168.1.100/24 brd 192.168.1.255 scope global dynamic noprefixroute eth0\n" +
        "       valid_lft 86389sec preferred_lft 86389sec\n" +
        "    inet6 fe80::1234:5678:9abc:def0/64 scope link noprefixroute \n" +
        "       valid_lft forever preferred_lft forever\n" +
        "3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000\n" +
        "    inet 192.168.0.100/24 brd 192.168.0.255 scope global dynamic noprefixroute wlan0\n" +
        "       valid_lft 86389sec preferred_lft 86389sec\n" +
        "    inet6 fe80::abcd:ef01:2345:6789/64 scope link noprefixroute \n" +
        "       valid_lft forever preferred_lft forever\n"
      )
    }

    if (object === "link") {
      return (
        "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000\n" +
        "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n" +
        "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000\n" +
        "    link/ether 00:11:22:33:44:55 brd ff:ff:ff:ff:ff:ff\n" +
        "3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000\n" +
        "    link/ether aa:bb:cc:dd:ee:ff brd ff:ff:ff:ff:ff:ff\n"
      )
    }

    if (object === "route") {
      return (
        "default via 192.168.1.1 dev eth0 proto dhcp metric 100 \n" +
        "192.168.0.0/24 dev wlan0 proto kernel scope link src 192.168.0.100 metric 600 \n" +
        "192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100 \n"
      )
    }

    return `ip: unknown command "${object}"`
  },

  // Simulate arp command
  arpCommand: (args: string[]): string => {
    // Parse options
    const numeric = args.includes("-n") || args.includes("--numeric")

    let output = "Address                  HWtype  HWaddress           Flags Mask            Iface\n"
    output += "192.168.1.1               ether   00:11:22:33:44:55   C                     eth0\n"
    output += "192.168.1.5               ether   aa:bb:cc:dd:ee:ff   C                     eth0\n"
    output += "192.168.0.1               ether   11:22:33:44:55:66   C                     wlan0\n"
    output += "192.168.0.10              ether   22:33:44:55:66:77   C                     wlan0\n"

    return output
  },

  // Simulate host command
  hostCommand: async (args: string[]): Promise<string> => {
    if (args.length === 0) {
      return "Usage: host [-a] [-t type] name [server]"
    }

    const domain = args[0]

    // Add random delay to make it look realistic
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 100))

    return (
      `${domain} has address ${generateRandomIp()}\n` +
      `${domain} has IPv6 address ${generateRandomIpv6()}\n` +
      `${domain} mail is handled by 10 mail1.${domain}.\n` +
      `${domain} mail is handled by 20 mail2.${domain}.`
    )
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

function formatInterface(iface: any): string {
  let output = `${iface.name}: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n`
  output += `        inet ${iface.ip}  netmask ${iface.mask}  broadcast ${iface.ip.split(".").slice(0, 3).join(".")}.255\n`
  if (iface.mac) {
    output += `        ether ${iface.mac}  txqueuelen 1000  (Ethernet)\n`
  }
  output += `        RX packets ${Math.floor(iface.rx / 1000)}  bytes ${iface.rx} (${(iface.rx / 1024 / 1024).toFixed(2)} MiB)\n`
  output += `        TX packets ${Math.floor(iface.tx / 1000)}  bytes ${iface.tx} (${(iface.tx / 1024 / 1024).toFixed(2)} MiB)\n`

  return output
}
