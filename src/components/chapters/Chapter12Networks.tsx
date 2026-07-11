import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Network, Wifi, Server, Shield, Wrench, AlertTriangle, Cloud, HardDrive, Share2, Cable, CircleDot, Lightbulb, Check, X, Gauge, ArrowRightLeft, Phone, Route, RadioTower, Link2, Router, DoorOpen, Layers } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const networkTypes = [
  {
    name: "LAN (Local Area Network)",
    range: "< 1 km",
    description: "Connects devices within a small geographical area like an office, school, or home.",
    examples: "Office network, Home WiFi",
    color: "bg-green-500",
  },
  {
    name: "MAN (Metropolitan Area Network)",
    range: "1-50 km",
    description: "Covers a city or large campus, connecting multiple LANs together.",
    examples: "City-wide network, University campus",
    color: "bg-yellow-500",
  },
  {
    name: "WAN (Wide Area Network)",
    range: "> 50 km",
    description: "Spans countries or continents, connecting multiple MANs/LANs.",
    examples: "Internet, Corporate WAN",
    color: "bg-primary",
  },
];

const topologies = [
  { name: "Bus Topology", shape: "─●─●─●─", desc: "All devices share a single communication cable." },
  { name: "Star Topology", shape: "●↔Hub↔●", desc: "A central hub/switch connects all devices individually." },
  { name: "Ring Topology", shape: "●→●→●→●", desc: "Each device connects to two others, forming a circular ring." },
  { name: "Mesh Topology", shape: "●⟷●⟷●", desc: "Every device is connected to every other device for redundancy." },
  { name: "Tree Topology", shape: "●-●-●", desc: "A hierarchical structure combining star and bus topologies." },
];

const internetServices = [
  { name: "WWW (World Wide Web)", desc: "A system of interlinked hypertext documents accessed via browsers using HTTP/HTTPS." },
  { name: "Email (Electronic Mail)", desc: "Service for sending and receiving digital messages asynchronously." },
  { name: "FTP (File Transfer Protocol)", desc: "Standard network protocol used for transfer of files between client and server." },
  { name: "DNS (Domain Name System)", desc: "Acts as the phonebook of the internet, translating domain names (e.g. google.com) to IP addresses." },
  { name: "VoIP (Voice over IP)", desc: "Enables voice communications and multimedia sessions over Internet Protocol networks." },
  { name: "Cloud Services", desc: "On-demand storage, databases, and servers hosted remotely on the internet." },
];

const virusTypes = [
  { name: "Virus", desc: "Attaches to executable files and spreads when the file is shared and run." },
  { name: "Worm", desc: "Self-replicating program that spreads across networks automatically without human action." },
  { name: "Trojan Horse", desc: "Disguises itself as legitimate software to trick users into installing it." },
  { name: "Ransomware", desc: "Encrypts files and demands ransom payments for the decryption key." },
  { name: "Spyware", desc: "Secretly monitors user activity, keystrokes, and gathers sensitive data." },
];

const netComparison = [
  {
    feature: "Definition",
    internet: "Global network of interconnected computers open to the public.",
    intranet: "Private network accessible only to an organization's staff.",
    extranet: "Private network that allows controlled access from outside partners."
  },
  {
    feature: "Access",
    internet: "Public (Anyone)",
    intranet: "Private (Employees only)",
    extranet: "Semi-private (Employees and authorized external partners)"
  },
  {
    feature: "Security",
    internet: "Low security, high exposure",
    intranet: "High security, firewall protected",
    extranet: "High security with encryption/VPN access"
  },
  {
    feature: "Purpose",
    internet: "Information sharing, commerce, communication",
    intranet: "Internal file sharing, collaboration, directories",
    extranet: "Customer support, client portals, supplier coordination"
  }
];

const transmissionMedia = [
  {
    name: "Twisted Pair",
    icon: Cable,
    intro:
      "Twisted pair consists of pairs of insulated copper wires twisted around each other. The twisting causes electromagnetic noise picked up by one wire to be cancelled by the other, which is what makes ordinary copper usable for fast networking. It comes in two builds: Unshielded Twisted Pair (UTP) — the inexpensive, flexible cable used in almost every home and office LAN — and Shielded Twisted Pair (STP), which wraps foil or braid around the pairs for extra protection in electrically noisy environments such as factories.",
    detailTitle: "Common Categories",
    details: [
      { label: "Cat5e", value: "Up to 1 Gbps at 100 MHz bandwidth — the baseline for gigabit office and home LANs." },
      { label: "Cat6", value: "1 Gbps up to 100 m, or 10 Gbps up to ~55 m at 250 MHz — common in newer office cabling." },
      { label: "Cat7", value: "10 Gbps up to 100 m at 600 MHz; individually shielded pairs (always STP) for data centres and high-EMI sites." },
    ],
    specs: [
      { label: "Max distance", value: "100 m per segment (Ethernet standard)" },
      { label: "Bandwidth", value: "100 Mbps – 10 Gbps depending on category" },
      { label: "Cost", value: "Lowest of all wired media" },
      { label: "EMI resistance", value: "Moderate (UTP) to good (STP)" },
    ],
    pros: ["Very cheap and widely available", "Easy to install, bend, and terminate (RJ-45)", "Supports modern gigabit/10-gigabit Ethernet", "Powers devices via Power over Ethernet (PoE)"],
    cons: ["100 m distance limit per run", "UTP is susceptible to EMI and crosstalk", "Higher categories cost more and are stiffer", "Signals can be tapped relatively easily"],
    useCases: ["Home and office LAN wiring", "Telephone systems", "Connecting PCs, printers, and access points to switches"],
  },
  {
    name: "Coaxial Cable",
    icon: CircleDot,
    intro:
      "Coaxial cable places a single copper core at the exact centre of a tube-shaped shield, separated by a thick dielectric insulator and covered by an outer jacket. Because the braided/foil shield completely surrounds the conductor, coax resists electromagnetic interference much better than unshielded twisted pair and can carry high-frequency signals further. It wired the first generation of Ethernet LANs (10BASE2 'thinnet' and 10BASE5 'thicknet') and remains the physical medium for cable television and DOCSIS cable internet today.",
    detailTitle: "Physical Structure (inside → out)",
    details: [
      { label: "Copper core", value: "The central conductor that carries the signal." },
      { label: "Dielectric insulator", value: "Keeps a fixed distance between core and shield, preserving signal quality." },
      { label: "Metal shield", value: "Braided or foil layer that blocks external interference and contains the signal." },
      { label: "Outer jacket", value: "Plastic sheath protecting the cable from moisture and abrasion." },
    ],
    specs: [
      { label: "Max distance", value: "185 m (10BASE2) – 500 m (10BASE5); kilometres with amplifiers in cable-TV plants" },
      { label: "Bandwidth", value: "10 Mbps legacy LANs; ~1–10 Gbps shared with modern DOCSIS 3.1" },
      { label: "Cost", value: "Moderate — more than UTP, far less than fiber" },
      { label: "EMI resistance", value: "Good — full metallic shield" },
    ],
    pros: ["Better EMI resistance and longer reach than twisted pair", "Proven, durable medium", "Reuses existing cable-TV plant for broadband"],
    cons: ["Stiffer and harder to install than twisted pair", "Legacy bus LANs failed entirely from one cable break", "Bandwidth on cable internet is shared with neighbours", "Largely obsolete for new LAN installs"],
    useCases: ["Cable internet (DOCSIS) last-mile connections", "Cable/satellite TV distribution", "Legacy 10BASE2/10BASE5 Ethernet LANs", "Antenna and CCTV feeds"],
  },
  {
    name: "Fiber Optic Cable",
    icon: Lightbulb,
    intro:
      "Fiber optic cable transmits data as pulses of light travelling through a hair-thin strand of glass, so it is completely immune to electromagnetic interference and extremely hard to eavesdrop on — tapping the glass disturbs the light and is detectable. Single-mode fiber uses a tiny ~9 μm core and a laser source to carry one light path for tens of kilometres, making it the choice for long-haul telecom, undersea cables, and campus backbones. Multi-mode fiber uses a wider 50/62.5 μm core with cheaper LED/VCSEL sources; light bounces along multiple paths, limiting reach to a few hundred metres — ideal inside data centres and buildings.",
    detailTitle: "Single-Mode vs. Multi-Mode",
    details: [
      { label: "Single-mode (SMF)", value: "~9 μm core, laser light, 10–100+ km reach — long-distance backbones and metro/undersea links." },
      { label: "Multi-mode (MMF)", value: "50/62.5 μm core, LED/VCSEL light, ~300–550 m at 10 Gbps — short high-speed runs in buildings and data centres." },
    ],
    specs: [
      { label: "Max distance", value: "~550 m (multi-mode) to 100+ km (single-mode)" },
      { label: "Bandwidth", value: "10 / 40 / 100 / 400 Gbps and beyond per strand" },
      { label: "Cost", value: "Highest — optics, splicing, and skilled labour" },
      { label: "EMI resistance", value: "Total immunity (light, not electricity)" },
    ],
    pros: ["Highest bandwidth of any medium", "Longest transmission distances", "Immune to EMI and electrical noise", "Very difficult to tap — strong physical security"],
    cons: ["Expensive transceivers and installation", "Glass strands are fragile and bend-sensitive", "Termination and splicing require special tools and skills"],
    useCases: ["High-speed backbone networks between buildings and floors", "Data-centre interconnects", "Fiber-to-the-home (FTTH) broadband", "Undersea and long-haul telecom links"],
  },
  {
    name: "Wireless Media",
    icon: Wifi,
    intro:
      "Wireless LANs replace cables with radio waves. Wi-Fi (the IEEE 802.11 family) is the dominant technology: an access point bridges radio clients onto the wired LAN, giving laptops, phones, and IoT devices mobility within roughly 30–50 m indoors. Bluetooth serves short-range 'personal area' links — headsets, keyboards, wearables — at ~10 m and low power, while related protocols such as Zigbee/Thread (low-power mesh for smart-home sensors) and NFC (a few centimetres, for tap-to-pay) fill niche roles. Radio is a shared, open medium, so encryption (WPA2/WPA3) is essential — anyone in range can receive the signal, and open networks expose traffic to eavesdropping.",
    detailTitle: "Wi-Fi (IEEE 802.11) Standards",
    details: [
      { label: "802.11a / b / g", value: "Early standards: 54 Mbps at 5 GHz (a), 11 Mbps (b) and 54 Mbps (g) at 2.4 GHz." },
      { label: "802.11n (Wi-Fi 4)", value: "Up to 600 Mbps using MIMO antennas on 2.4 and 5 GHz." },
      { label: "802.11ac (Wi-Fi 5)", value: "~1.3–6.9 Gbps on 5 GHz with wider channels and MU-MIMO." },
      { label: "802.11ax (Wi-Fi 6/6E)", value: "Up to ~9.6 Gbps, far better performance in crowded networks; 6E adds the 6 GHz band." },
    ],
    specs: [
      { label: "Coverage", value: "Wi-Fi ~30–50 m indoors per access point; Bluetooth ~10 m (up to 100 m class 1)" },
      { label: "Bandwidth", value: "Wi-Fi up to ~9.6 Gbps shared per access point; Bluetooth ~1–3 Mbps" },
      { label: "Cost", value: "Low per client — no cabling; access points required" },
      { label: "Security", value: "Requires WPA2/WPA3 encryption; open radio medium" },
    ],
    pros: ["Mobility — no cables to run", "Fast, cheap deployment and easy guest access", "Connects devices that cannot take a cable (phones, sensors)"],
    cons: ["Bandwidth is shared and drops with distance/walls", "Interference from other networks and appliances", "Weaker security if misconfigured — signal leaves the building", "Higher and more variable latency than wired links"],
    useCases: ["Home and office wireless LANs", "Guest and BYOD access", "IoT and smart-home devices", "Peripherals via Bluetooth (audio, input devices)"],
  },
];

const wanConcepts = [
  {
    title: "Bandwidth",
    icon: Gauge,
    paragraphs: [
      "Bandwidth is the data-carrying capacity of a link, measured in bits per second (bps, Kbps, Mbps, Gbps). It sets the ceiling on how much information can cross a WAN connection in a given time — a 100 Mbps line can move at most 100 million bits every second.",
      "Theoretical bandwidth is the rated maximum of the technology; real-world throughput is always lower because of protocol overhead (packet headers, acknowledgements), distance-related signal loss, equipment limits, and traffic from other users. A '100 Mbps' connection commonly delivers 80–94 Mbps of useful data.",
      "Performance also degrades from network congestion — when demand exceeds capacity, routers queue and eventually drop packets, raising latency — and from bandwidth throttling, where a provider deliberately slows certain traffic or slows customers after a usage cap.",
      "Because WAN infrastructure is shared, providers allocate capacity deliberately: leased lines guarantee dedicated bandwidth, broadband is sold at contention ratios (many subscribers share a trunk), and Quality of Service (QoS) rules prioritize delay-sensitive traffic such as voice and video over bulk downloads.",
    ],
  },
  {
    title: "Switching",
    icon: ArrowRightLeft,
    paragraphs: [
      "Switching is how a network moves data from source to destination across shared infrastructure. Three classic methods exist, each with different trade-offs.",
    ],
    subItems: [
      {
        name: "Circuit Switching",
        desc: "A dedicated physical path is reserved end-to-end before communication starts (like a classic telephone call). Guaranteed capacity and constant delay, but the reserved circuit is wasted whenever the parties are silent, and setup takes time.",
        verdict: "Best for: traditional voice calls, legacy telephone WANs (PSTN/ISDN).",
      },
      {
        name: "Packet Switching",
        desc: "Messages are cut into small packets, each carrying a destination address. Packets travel independently, share links with everyone else's traffic, and are reassembled at the destination. Extremely efficient and fault-tolerant — if a router fails, packets route around it.",
        verdict: "Best for: virtually everything today — it is the foundation of the internet and modern WANs.",
      },
      {
        name: "Message Switching",
        desc: "The entire message is sent hop-by-hop, stored completely at each intermediate node and forwarded when a link is free ('store-and-forward'). No dedicated path is needed, but large messages create long delays and demand big buffers at every node.",
        verdict: "Best for: historical telegraph/email relay systems; conceptually survives in email servers.",
      },
    ],
    closing:
      "Modern internet and WAN communication is overwhelmingly packet-switched: it uses expensive long-distance links efficiently, tolerates failures, and lets millions of conversations share the same wires simultaneously.",
  },
  {
    title: "Communication over Telephone Lines",
    icon: Phone,
    paragraphs: [
      "For decades the telephone network was the only wiring that reached every home and office, so early wide-area data communication was built on top of it.",
    ],
    subItems: [
      {
        name: "Dial-up",
        desc: "A modem converts digital data into audible tones carried over an ordinary voice call, reaching at most 56 Kbps. It occupied the phone line entirely, had to redial for every session, and dropped when someone picked up the phone — yet it brought the first taste of the internet to the world in the 1980s–90s.",
        verdict: "Limitation: 56 Kbps ceiling, ties up the voice line, per-call connection.",
      },
      {
        name: "DSL (Digital Subscriber Line)",
        desc: "DSL sends data on high frequencies above the voice band of the same copper pair, so internet and phone work simultaneously with an always-on connection. ADSL/VDSL deliver roughly 1–100 Mbps, but speed falls sharply with distance from the telephone exchange.",
        verdict: "Limitation: strongly distance-sensitive; copper caps practical speeds.",
      },
      {
        name: "Fiber-backed lines (FTTN / FTTH)",
        desc: "Providers progressively replaced copper trunks with fiber — fiber-to-the-node keeps a short copper tail (VDSL2), while fiber-to-the-home runs glass all the way, delivering 100 Mbps to multi-gigabit speeds and effectively ending the telephone line's technical limits.",
        verdict: "Today's standard: the transition from voice-line data to purpose-built high-speed broadband.",
      },
    ],
    closing:
      "This evolution — dial-up to DSL to fiber — turned a network built for voice into the on-ramp of the modern internet, each step removing a limitation of the last: speed, always-on availability, and finally the copper medium itself.",
  },
  {
    title: "Information Superhighway",
    icon: Globe,
    paragraphs: [
      "'Information superhighway' was popularized in the early 1990s (notably by US policy initiatives around a 'National Information Infrastructure') to describe a proposed high-speed network that would carry information into every home the way highways carry goods.",
      "In its modern interpretation, the term simply describes the global internet infrastructure that was actually built: high-capacity fiber backbones and undersea cables spanning continents, satellite constellations covering remote regions, and 4G/5G cellular networks providing mobile on-ramps.",
      "Together these integrated systems move data, voice, and video worldwide in milliseconds — enabling commerce, education, telemedicine, media, and government services, and making digital connectivity as fundamental to individuals and organizations as physical transport once was.",
    ],
  },
];

const networkDevices = [
  {
    name: "Repeaters",
    icon: RadioTower,
    layer: "Layer 1 · Physical",
    func: "Regenerates and re-amplifies a weakening electrical, optical, or radio signal so it can travel further without errors.",
    useCase: "Extending a cable run or wireless coverage beyond the medium's normal distance limit (e.g., Wi-Fi range extenders, long fiber links).",
    capabilities: ["Signal regeneration", "Extends max transmission distance", "No filtering or addressing — repeats everything"],
  },
  {
    name: "Bridges",
    icon: Link2,
    layer: "Layer 2 · Data Link",
    func: "Connects two separate network segments and forwards frames between them based on MAC addresses.",
    useCase: "Splitting a busy LAN into segments to reduce collisions/traffic, or linking two small LANs into one logical network.",
    capabilities: ["Learns MAC addresses per segment", "Filters local traffic — forwards only cross-segment frames", "Modern switches are multiport bridges"],
  },
  {
    name: "Routers",
    icon: Router,
    layer: "Layer 3 · Network",
    func: "Routes data packets between different networks using IP addresses and routing tables to choose the best path.",
    useCase: "Connecting a LAN to the internet or linking branch-office networks across a WAN — every home 'internet box' contains one.",
    capabilities: ["IP-based path selection & routing protocols", "Connects unlike networks (LAN ↔ WAN)", "NAT, DHCP, and basic traffic filtering"],
  },
  {
    name: "Gateways",
    icon: DoorOpen,
    layer: "Any layer (often 4–7)",
    func: "Translates between networks that use incompatible protocols or architectures, converting data formats, addressing, and procedures.",
    useCase: "Linking a VoIP phone system to the traditional telephone network, connecting IoT sensor protocols to IP, or bridging email systems.",
    capabilities: ["Full protocol conversion/translation", "Joins fundamentally different systems", "Often implemented in software on servers"],
  },
  {
    name: "Hubs",
    icon: Share2,
    layer: "Layer 1 · Physical (legacy)",
    func: "Repeats every incoming signal out of all other ports — a multiport repeater with no intelligence.",
    useCase: "Early star-topology LANs of the 1990s; now obsolete, replaced by switches which send frames only to the intended port.",
    capabilities: ["Simple, cheap connectivity", "All ports share one collision domain", "No addressing, filtering, or security"],
  },
  {
    name: "Firewall",
    icon: Shield,
    layer: "Layers 3–7 · Security",
    func: "Filters incoming and outgoing traffic against predefined security rules, blocking unauthorized access while allowing legitimate communication.",
    useCase: "Placed at the boundary between a private LAN and the internet (and on individual hosts) to stop attacks, malware traffic, and data exfiltration.",
    capabilities: ["Rule-based packet filtering (IP/port/protocol)", "Stateful connection tracking", "Modern versions add deep inspection, VPN, and intrusion prevention"],
  },
];

const tcpipLayers = [
  {
    num: 5,
    name: "Application Layer",
    responsibilities: "Provides network services directly to user programs: web browsing, email, file transfer, name lookup. Defines how applications format and exchange their messages.",
    protocols: "HTTP/HTTPS, SMTP, FTP, DNS, SSH",
    role: "Creates the actual data users care about — a web request, an email — and hands it to the transport layer for delivery.",
  },
  {
    num: 4,
    name: "Transport Layer",
    responsibilities: "Delivers data between the specific applications (identified by port numbers) on two hosts, providing either reliable (TCP) or fast connectionless (UDP) service.",
    protocols: "TCP, UDP",
    role: "Splits application data into segments, ensures they arrive correctly and in order (TCP), and multiplexes many conversations over one network connection.",
  },
  {
    num: 3,
    name: "Network (Internet) Layer",
    responsibilities: "Addresses hosts globally and routes packets across multiple networks, hop by hop, from source to final destination.",
    protocols: "IP (IPv4/IPv6), ICMP, routing protocols (OSPF, BGP)",
    role: "Wraps segments into IP packets with source/destination addresses; every router along the way reads these to forward the packet closer to its target.",
  },
  {
    num: 2,
    name: "Data Link Layer",
    responsibilities: "Moves frames between directly connected devices on the same local network, handling MAC addressing, framing, and error detection on the link.",
    protocols: "Ethernet, Wi-Fi (802.11), ARP, PPP",
    role: "Packages packets into frames addressed to the next device's MAC address and manages access to the shared medium.",
  },
  {
    num: 1,
    name: "Physical Layer",
    responsibilities: "Transmits raw bits as electrical voltages, light pulses, or radio waves over the actual medium; defines connectors, cabling, and signaling.",
    protocols: "Ethernet cabling standards, fiber optics, DSL, radio (Wi-Fi PHY)",
    role: "The real-world foundation — every higher-layer message ultimately becomes signals on copper, glass, or air here.",
  },
];

export function Chapter12Networks({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c12-l1") {
    // Lesson 1: Introduction to Computer Networks
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Introduction to Computer Networks</h2>
          <p className="text-muted-foreground">
            A computer network is a group of computers and devices connected together to share resources, exchange files, and facilitate communication.
          </p>
        </div>

        {/* Types */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Types of Networks by Coverage</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {networkTypes.map((type, index) => (
              <div key={type.name} className="bg-card rounded-2xl p-6 border shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-base">{type.name}</h4>
                  <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full ${type.color}`}>
                    {type.range}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{type.description}</p>
                <div className="text-[10px] uppercase font-bold text-muted-foreground">
                  <strong>Example:</strong> {type.examples}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Topologies */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Network Topologies</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto">
            Network topology refers to the geometric arrangement of links and nodes in a network.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topologies.map((top) => (
              <div key={top.name} className="bg-card rounded-xl p-5 border shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">{top.name}</h4>
                  <span className="font-mono text-xs text-primary font-bold">{top.shape}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{top.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c12-l2") {
    // Lesson 2: Local Area Networks (LAN)
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: Local Area Networks</h2>
          <p className="text-muted-foreground">
            A Local Area Network (LAN) connects computers and devices within a limited geographical area, such as a single room, home, office, or school building.
          </p>
        </div>

        <section className="bg-card rounded-2xl p-8 border shadow-card space-y-4">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <Wifi className="w-5 h-5" /> LAN Characteristics & Components
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <li>
              <strong>High Speed:</strong> LANs generally transfer data at high rates (100 Mbps to 10 Gbps) using Ethernet cables or high-speed Wi-Fi.
            </li>
            <li>
              <strong>Low Error Rates:</strong> Due to short physical distances, LAN data transfers are highly reliable.
            </li>
            <li>
              <strong>Private Ownership:</strong> Usually owned and administered by a single organization or household.
            </li>
            <li>
              <strong>Key Hardware:</strong> Includes Network Interface Cards (NICs), switches, routers, access points, and coaxial or fiber cables.
            </li>
          </ul>
        </section>

        {/* Transmission Media — detailed */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">Transmission Media</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The transmission medium is the physical path a signal travels between devices. LANs use four
              main media — three wired, one wireless — each trading off speed, distance, cost, and
              resistance to electromagnetic interference (EMI).
            </p>
          </div>

          {transmissionMedia.map((medium) => (
            <div key={medium.name} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <medium.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl">{medium.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{medium.intro}</p>
              <div className="bg-muted/40 rounded-xl p-5 border border-border/30 space-y-3">
                <h5 className="font-semibold text-xs uppercase tracking-wider text-primary">{medium.detailTitle}</h5>
                <ul className="space-y-2">
                  {medium.details.map((d) => (
                    <li key={d.label} className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">{d.label}:</strong> {d.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Reference cards */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">Transmission Media Reference Cards</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              A standardized summary of each medium's key specs, strengths, weaknesses, and primary uses for quick revision.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {transmissionMedia.map((medium) => (
              <div key={medium.name} className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden flex flex-col">
                <div className="bg-primary/10 px-6 py-4 flex items-center gap-3">
                  <medium.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-base text-foreground">{medium.name}</h4>
                </div>
                <div className="p-6 space-y-5 flex-1">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Key Specs</h5>
                    <ul className="space-y-1.5">
                      {medium.specs.map((s) => (
                        <li key={s.label} className="text-xs text-muted-foreground flex justify-between gap-4">
                          <span className="font-semibold text-foreground shrink-0">{s.label}</span>
                          <span className="text-right">{s.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[10px] uppercase font-bold tracking-wider text-green-600 mb-2">Pros</h5>
                      <ul className="space-y-1.5">
                        {medium.pros.map((p) => (
                          <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-[10px] uppercase font-bold tracking-wider text-destructive mb-2">Cons</h5>
                      <ul className="space-y-1.5">
                        {medium.cons.map((c) => (
                          <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Primary Use Cases</h5>
                    <ul className="space-y-1.5">
                      {medium.useCases.map((u) => (
                        <li key={u} className="text-xs text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c12-l3") {
    // Lesson 3: Wide Area Networks (WAN)
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 3: Wide Area Networks</h2>
          <p className="text-muted-foreground">
            A Wide Area Network (WAN) connects computer systems across broad geographical distances, spanning cities, states, or entire countries.
          </p>
        </div>

        <section className="bg-card rounded-2xl p-8 border shadow-card space-y-4">
          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
            <Network className="w-5 h-5" /> WAN Characteristics
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <li>
              <strong>Broad Span:</strong> Connects separate corporate offices or university branches across thousands of miles.
            </li>
            <li>
              <strong>Telecom Infrastructure:</strong> Relies on public communications providers, fiber optics, undersea cables, and satellites.
            </li>
            <li>
              <strong>Routing:</strong> Uses smart routers and firewalls to bridge packets across diverse systems. The largest WAN in existence is the <strong>Internet</strong>.
            </li>
          </ul>
        </section>

        {/* Core WAN concepts */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Core WAN Concepts</h3>
          {wanConcepts.map((concept) => (
            <div key={concept.title} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <concept.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xl">{concept.title}</h4>
              </div>
              {concept.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              ))}
              {concept.subItems && (
                <div className="grid md:grid-cols-3 gap-4">
                  {concept.subItems.map((item) => (
                    <div key={item.name} className="bg-muted/40 rounded-xl p-5 border border-border/30 space-y-2 flex flex-col">
                      <h5 className="font-bold text-sm text-foreground">{item.name}</h5>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                      <p className="text-[11px] font-semibold text-primary leading-relaxed">{item.verdict}</p>
                    </div>
                  ))}
                </div>
              )}
              {concept.closing && (
                <p className="text-sm text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-4 italic">
                  {concept.closing}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Network hardware & security short notes */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">Network Hardware & Security — Short Notes</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Quick-reference notes on the devices that build and protect LAN/WAN architectures.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {networkDevices.map((device) => (
              <div key={device.name} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                      <device.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base">{device.name}</h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap">
                    {device.layer}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Core function:</strong> {device.func}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Typical use:</strong> {device.useCase}
                </p>
                <div>
                  <h5 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1.5">Key capabilities</h5>
                  <ul className="space-y-1">
                    {device.capabilities.map((cap) => (
                      <li key={cap} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How the internet works: five-layer TCP/IP model */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">How the Internet Works: The Five-Layer TCP/IP Model</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Internet communication is organized as a stack of five layers. When you send data, each layer
              adds its own header and hands the result down; at the receiver the process runs in reverse.
              This separation lets each layer evolve independently — new apps, new cables, same internet.
            </p>
          </div>

          <div className="space-y-4">
            {tcpipLayers.map((layer) => (
              <div key={layer.num} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-lg shrink-0">
                    {layer.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{layer.name}</h4>
                    <p className="text-[11px] font-semibold text-primary">Key protocols: {layer.protocols}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Responsibilities:</strong> {layer.responsibilities}
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Role in transmission:</strong> {layer.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/40 rounded-2xl p-6 border border-border/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Route className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base">Internet Protocol (IP)</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                IP is the network-layer protocol that gives every device an address and routes packets
                toward their destination across any number of intermediate networks. It is "best effort" —
                it does not guarantee delivery, order, or error-free arrival; higher layers handle that.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong className="text-foreground">IPv4:</strong> 32-bit addresses written as four decimal numbers (e.g., 192.168.1.10) — about 4.3 billion addresses, now essentially exhausted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong className="text-foreground">IPv6:</strong> 128-bit addresses written in hexadecimal (e.g., 2001:db8::1) — an effectively unlimited supply designed to replace IPv4.</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/40 rounded-2xl p-6 border border-border/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base">Transmission Control Protocol (TCP)</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                TCP is the transport-layer protocol that turns IP's unreliable packet delivery into a
                reliable, connection-oriented byte stream between two applications. It opens a connection
                with a three-way handshake before any data flows.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span><strong className="text-foreground">Error checking:</strong> checksums detect corrupted segments; receivers acknowledge what arrived intact.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span><strong className="text-foreground">Retransmission:</strong> segments that are lost or unacknowledged are automatically sent again.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span><strong className="text-foreground">Flow & congestion control:</strong> sending speed adapts to what the receiver and the network can handle, preventing overload.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c12-l4") {
    // Lesson 4: Introduction to the Internet
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Introduction to the Internet</h2>
          <p className="text-muted-foreground">
            The Internet is a global network of billions of computers connected via standard TCP/IP protocols, providing an open highway for data.
          </p>
        </div>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-primary text-base flex items-center gap-2">
              <Globe className="w-5 h-5" /> What is the Internet?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Originated from the US military's ARPANET in 1969, the internet is not owned by any single entity. Instead, it is an interconnected federation of public and private networks communicating via open, standard IP addresses.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-primary text-base flex items-center gap-2">
              <Server className="w-5 h-5" /> ISP & IP Addresses
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Users connect to the internet via **Internet Service Providers (ISPs)**. Every device on the internet is assigned a unique identifier called an **IP Address** (either 32-bit IPv4 or 128-bit IPv6) so data packets can route correctly.
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c12-l5") {
    // Lesson 5: Internet Services and Protocols
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 5: Internet Services and Protocols</h2>
          <p className="text-muted-foreground">
            The internet facilitates many services through standardized application-level protocols.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {internetServices.map((service, index) => (
            <div key={service.name} className="bg-card rounded-xl p-5 border shadow-sm">
              <h4 className="font-bold text-sm mb-2 text-primary">{service.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* Protocols */}
        <section className="bg-muted/40 rounded-2xl p-8 border border-border/50">
          <h3 className="text-xl font-bold mb-4">Core Internet Protocols</h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="bg-card p-5 rounded-xl border border-border/30">
              <h4 className="font-bold text-primary mb-2">TCP/IP</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transmission Control Protocol / Internet Protocol. Handshakes establish virtual sessions, break messages into packets, and routing handles delivery.
              </p>
            </div>
            <div className="bg-card p-5 rounded-xl border border-border/30">
              <h4 className="font-bold text-primary mb-2">HTTP / HTTPS</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                HyperText Transfer Protocol. Used to request and deliver web documents. HTTPS encrypts transmissions using TLS/SSL.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c12-l6") {
    // Lesson 6: Intranet and Extranet
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 6: Intranet and Extranet</h2>
          <p className="text-muted-foreground">
            Understand how organizations structure private sub-networks to control information access, and how network security manages threats.
          </p>
        </div>

        {/* Intranet vs Extranet vs Internet Table */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Internet vs. Intranet vs. Extranet</h3>
          <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <th className="py-3 px-4 font-bold text-foreground w-[150px] text-sm text-left">Feature</th>
                  <th className="py-3 px-4 font-bold text-primary text-sm text-left">Internet</th>
                  <th className="py-3 px-4 font-bold text-secondary text-sm text-left">Intranet</th>
                  <th className="py-3 px-4 font-bold text-accent text-sm text-left">Extranet</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {netComparison.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/10">
                    <TableCell className="font-semibold text-muted-foreground text-xs">{row.feature}</TableCell>
                    <TableCell className="text-xs leading-relaxed">{row.internet}</TableCell>
                    <TableCell className="text-xs leading-relaxed">{row.intranet}</TableCell>
                    <TableCell className="text-xs leading-relaxed">{row.extranet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Network Security & Viruses */}
        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-destructive">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            Network Security & Computer Viruses
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Connecting systems exposes them to security risks. A **computer virus** is a malicious software program designed to interfere with system operations, corrupt files, or spread across networks.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {virusTypes.map((v) => (
              <div key={v.name} className="bg-muted/40 p-4 rounded-xl border border-border/30 space-y-1">
                <h4 className="font-bold text-sm text-destructive">{v.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
