import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Network, Wifi, Server, Shield, Wrench, AlertTriangle, Cloud, HardDrive, Share2 } from "lucide-react";
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
