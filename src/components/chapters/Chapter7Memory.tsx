import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HardDrive, Database, Layers, Disc, Save, Cpu, Zap, Coins, MapPin, Repeat, MoveRight, MemoryStick, Archive } from "lucide-react";
import { DeviceCard } from "../DeviceCard";

import hddImage from "@/assets/devices/hdd.png";
import ssdImage from "@/assets/devices/ssd.png";
import usbDriveImage from "@/assets/devices/usb-drive.png";
import romImage from "@/assets/devices/rom.jpg";
import ramImage from "@/assets/devices/ram.png";
import cacheImage from "@/assets/devices/cache.png";
import floppyImage from "@/assets/devices/floppy.jpg";
import opticalDiscImage from "@/assets/devices/optical-disc.png";
import magneticTapeImage from "@/assets/devices/magnetic-tape.png";

const mainMemoryDevices = [
  {
    name: "ROM (Read-Only Memory)",
    image: romImage,
    shortDescription: "Non-volatile memory that retains data permanently, storing firmware and BIOS.",
    howItWorks: "Data is written during manufacturing (mask ROM) or one-time programming (PROM). EPROM can be erased with UV light, EEPROM electrically. Retains data without power.",
    functionalities: [
      "BIOS Storage",
      "Firmware Storage",
      "Boot Instructions",
      "Permanent Programs",
    ],
    icon: Database,
  },
  {
    name: "RAM (Random Access Memory)",
    image: ramImage,
    shortDescription: "Volatile primary memory for temporary data storage during program execution.",
    howItWorks: "DRAM stores data in capacitors that need constant refresh. SRAM uses flip-flops for faster, stable storage. CPU accesses any location directly without sequential reading.",
    functionalities: [
      "Fast Data Access",
      "Program Loading",
      "Working Memory",
      "Virtual Memory Support",
    ],
    icon: Layers,
  },
  {
    name: "Cache Memory",
    image: cacheImage,
    shortDescription: "Ultra-fast SRAM between CPU and main memory to reduce access latency.",
    howItWorks: "Stores frequently accessed data and instructions. L1 cache is fastest (in CPU), L2 is larger, L3 is shared. Uses locality of reference principle for hit/miss optimization.",
    functionalities: [
      "Speed Bridging",
      "Instruction Caching",
      "Data Prefetching",
      "Multi-level Hierarchy",
    ],
    icon: Layers,
  },
];

const secondaryMemoryDevices = [
  {
    name: "Floppy Disk",
    image: floppyImage,
    shortDescription: "Legacy magnetic storage medium consisting of a thin, flexible disk inside a protective plastic shell.",
    howItWorks: "A flexible mylar disk coated with magnetic material spins inside its housing. An electromagnetic read/write head makes physical contact with the surface through an access window to store data in concentric tracks and sectors.",
    functionalities: [
      "Portable Data Transfer",
      "Write-Protection (Slide Tab)",
      "Direct Access Storage",
      "Bootable Media Support",
    ],
    icon: Save,
  },
  {
    name: "Hard Disk Drive (HDD)",
    image: hddImage,
    shortDescription: "Magnetic storage device with spinning platters for large capacity data storage.",
    howItWorks: "Read/write heads float on air cushion above rotating platters. Magnetic fields align particles on disk surface to represent binary data. Platters spin at 5400-7200 RPM.",
    functionalities: [
      "High Capacity (TB)",
      "Non-volatile Storage",
      "Sequential Access",
      "Cost-effective",
    ],
    icon: HardDrive,
  },
  {
    name: "Solid State Drive (SSD)",
    image: ssdImage,
    shortDescription: "Flash-based storage with no moving parts for faster, more reliable performance.",
    howItWorks: "Uses NAND flash memory cells that trap electrons in floating gates. Controller manages wear leveling and garbage collection. No mechanical parts mean faster access times.",
    functionalities: [
      "Fast Read/Write",
      "Low Latency",
      "Shock Resistant",
      "Silent Operation",
    ],
    icon: HardDrive,
  },
  {
    name: "USB Flash Drive",
    image: usbDriveImage,
    shortDescription: "Portable flash memory storage device for file transfer between computers.",
    howItWorks: "Contains NAND flash memory and USB controller. Plug-and-play connection provides power and data transfer. File system allows reading/writing like a hard drive.",
    functionalities: [
      "Portable Storage",
      "Quick File Transfer",
      "Bootable Media",
      "Cross-platform",
    ],
    icon: Database,
  },
  {
    name: "Optical Disc (CD/DVD/Blu-ray)",
    image: opticalDiscImage,
    shortDescription: "Removable media using laser technology to read/write data on reflective surface.",
    howItWorks: "Laser reads pits and lands on disc surface. Light reflection differences create binary patterns. CD uses 780nm laser, DVD 650nm, Blu-ray 405nm for higher density.",
    functionalities: [
      "Media Distribution",
      "Data Archival",
      "Movie Playback",
      "Software Installation",
    ],
    icon: Disc,
  },
  {
    name: "Magnetic Tape",
    image: magneticTapeImage,
    shortDescription: "Sequential access storage medium for long-term archival and backup purposes.",
    howItWorks: "Magnetic tape winds between reels. Read/write head magnetizes tape surface in patterns. Sequential access means reading data in order from start to end.",
    functionalities: [
      "Backup Storage",
      "Archival Storage",
      "High Capacity",
      "Low Cost per GB",
    ],
    icon: Save,
  },
];

const storageHierarchy = [
  { level: "Registers", speed: "< 1 ns", size: "< 1 KB", cost: "$$$$$" },
  { level: "Built-in Cache", speed: "~0.5-1 ns", size: "32-64 KB", cost: "$$$$" },
  { level: "External Cache", speed: "~3-5 ns", size: "256 KB - 1 MB", cost: "$$$" },
  { level: "Primary Memory (RAM)", speed: "~50-100 ns", size: "4-64 GB", cost: "$$" },
  { level: "Secondary Memory", speed: "~50-100 μs", size: "256 GB - 4 TB", cost: "$" },
  { level: "Tertiary Storage", speed: "seconds - minutes", size: "TB - PB", cost: "¢" },
];

const hierarchyLayers = [
  {
    name: "Registers",
    icon: Cpu,
    proximity: "Inside the CPU core itself — zero distance from the execution units.",
    capacity: "Smallest of all: a few dozen registers, typically well under 1 KB in total.",
    speed: "Fastest possible: less than 1 nanosecond, read/written within a single CPU clock cycle.",
    cost: "Highest cost per bit — built from dedicated flip-flop circuitry on the processor die.",
    role: "Hold the operands, addresses, and intermediate results the CPU is working on at this exact instant. Every instruction the processor executes reads from or writes to registers.",
  },
  {
    name: "Cache Memory (L1 / L2 / L3)",
    icon: Zap,
    proximity: "On the CPU chip (built-in L1/L2) or immediately beside it (external/shared L3).",
    capacity: "Small: tens of KB for L1, hundreds of KB to a few MB for L2, up to tens of MB for L3.",
    speed: "~0.5-1 ns for built-in L1 cache; ~3-5 ns for larger external/shared cache levels.",
    cost: "Very expensive per bit — made of static RAM (SRAM), which needs ~6 transistors per bit.",
    role: "Keeps copies of the instructions and data the CPU is most likely to need next, so the processor rarely has to wait for the much slower main memory.",
  },
  {
    name: "Main Memory (RAM)",
    icon: MemoryStick,
    proximity: "On the motherboard, connected to the CPU through the memory bus — close, but off-chip.",
    capacity: "Moderate: typically 4-64 GB in personal computers, more in servers.",
    speed: "~50-100 ns — roughly 100× slower than registers, but vastly faster than disks.",
    cost: "Moderate cost per bit — dynamic RAM (DRAM) stores each bit in a single tiny capacitor.",
    role: "The computer's working area: holds the operating system, running programs, and their data. Volatile — everything is lost when power is switched off.",
  },
  {
    name: "Secondary Storage (SSD / HDD)",
    icon: HardDrive,
    proximity: "Separate device connected over an I/O interface (SATA, NVMe) — far from the CPU.",
    capacity: "Large: 256 GB to several TB per drive.",
    speed: "~50-100 μs for SSDs and several milliseconds for hard disks — thousands to millions of times slower than registers.",
    cost: "Cheap per bit — flash cells or magnetic platters store data very densely.",
    role: "Permanent, non-volatile home of the OS, applications, and user files. Data must be loaded into RAM before the CPU can work on it.",
  },
  {
    name: "Tertiary Storage (Tape / Archives)",
    icon: Archive,
    proximity: "Farthest from the CPU — often removable media, robotic tape libraries, or remote cloud archives.",
    capacity: "Enormous: terabytes per tape cartridge, petabytes across archive libraries.",
    speed: "Slowest: seconds to minutes, since media may need to be mounted and read sequentially.",
    cost: "Lowest cost per bit of any layer — ideal for data touched rarely, if ever.",
    role: "Long-term backup and archival: regulatory records, disaster-recovery copies, and cold data that must be kept but is almost never read.",
  },
];

const hierarchyPrinciples = [
  {
    title: "Temporal Locality",
    icon: Repeat,
    desc: "Data used once is very likely to be used again soon (loop counters, hot functions). The hierarchy exploits this by keeping recently used items in the fast upper levels.",
  },
  {
    title: "Spatial Locality",
    icon: MoveRight,
    desc: "Programs tend to access data stored near data they just accessed (array elements, sequential instructions). Memory is therefore moved upward in blocks, not single bytes, so neighbours arrive 'for free'.",
  },
  {
    title: "Staging of Data",
    icon: Layers,
    desc: "Each level acts as a cache for the level below it. On a 'hit' the CPU is served at that level's speed; on a 'miss' a block is fetched from the slower level below and kept for future use.",
  },
  {
    title: "Virtual Memory",
    icon: Database,
    desc: "The OS extends RAM onto secondary storage by swapping inactive pages to disk, letting programs use more memory than physically installed — the hierarchy at work between RAM and disk.",
  },
];

function MemoryHierarchyFigure() {
  return (
    <figure className="bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 max-w-3xl mx-auto">
      <svg
        viewBox="0 0 680 430"
        role="img"
        aria-label="Memory hierarchy diagram: registers and built-in cache inside the microprocessor, then external cache, main memory, and secondary memory. Closeness to the processor, speed, and cost per bit increase upward; capacity and access time increase downward."
        className="w-full h-auto"
      >
        <defs>
          <marker id="mh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {/* Microprocessor container */}
        <rect x="200" y="16" width="280" height="140" rx="10" strokeWidth="1.5" className="fill-primary/5 stroke-primary" />
        <text x="340" y="40" textAnchor="middle" fontSize="14" fontWeight="700" className="fill-primary">Microprocessor</text>
        <rect x="250" y="54" width="180" height="36" rx="6" strokeWidth="1.25" className="fill-background stroke-foreground/50" />
        <text x="340" y="77" textAnchor="middle" fontSize="12" className="fill-foreground">Register</text>
        <rect x="250" y="102" width="180" height="36" rx="6" strokeWidth="1.25" className="fill-background stroke-foreground/50" />
        <text x="340" y="125" textAnchor="middle" fontSize="12" className="fill-foreground">Built-in cache / RAM</text>

        {/* Levels below the processor */}
        <line x1="340" y1="156" x2="340" y2="186" strokeWidth="1.5" markerStart="url(#mh-arrow)" markerEnd="url(#mh-arrow)" className="stroke-muted-foreground" />
        <rect x="200" y="186" width="280" height="46" rx="8" strokeWidth="1.25" className="fill-card stroke-foreground/50" />
        <text x="340" y="214" textAnchor="middle" fontSize="12" className="fill-foreground">External cache</text>

        <line x1="340" y1="232" x2="340" y2="262" strokeWidth="1.5" markerStart="url(#mh-arrow)" markerEnd="url(#mh-arrow)" className="stroke-muted-foreground" />
        <rect x="200" y="262" width="280" height="46" rx="8" strokeWidth="1.25" className="fill-card stroke-foreground/50" />
        <text x="340" y="290" textAnchor="middle" fontSize="12" className="fill-foreground">Main memory</text>

        <line x1="340" y1="308" x2="340" y2="338" strokeWidth="1.5" markerStart="url(#mh-arrow)" markerEnd="url(#mh-arrow)" className="stroke-muted-foreground" />
        <rect x="200" y="338" width="280" height="46" rx="8" strokeWidth="1.25" className="fill-card stroke-foreground/50" />
        <text x="340" y="366" textAnchor="middle" fontSize="12" className="fill-foreground">Secondary memory</text>

        {/* Left axis: increases upward */}
        <line x1="130" y1="384" x2="130" y2="24" strokeWidth="1.5" markerEnd="url(#mh-arrow)" className="stroke-muted-foreground" />
        <text transform="rotate(-90 100 204)" x="100" y="204" textAnchor="middle" fontSize="12" className="fill-muted-foreground">
          Closeness to processor · Speed · Cost per bit
        </text>

        {/* Right axis: increases downward */}
        <line x1="550" y1="24" x2="550" y2="384" strokeWidth="1.5" markerEnd="url(#mh-arrow)" className="stroke-muted-foreground" />
        <text transform="rotate(90 582 204)" x="582" y="204" textAnchor="middle" fontSize="12" className="fill-muted-foreground">
          Capacity · Access time
        </text>

        <text x="340" y="420" textAnchor="middle" fontSize="12" fontStyle="italic" className="fill-muted-foreground">
          Figure 7.2: Memory hierarchy
        </text>
      </svg>
      <figcaption className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
        Moving up the hierarchy, memory gets faster, closer to the processor, and more expensive per bit;
        moving down, capacity and access time grow while cost per bit falls.
      </figcaption>
    </figure>
  );
}

export function Chapter7Memory({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c7-l1") {
    // Lesson 1: Memory Basics
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Memory Basics</h2>
          <p className="text-muted-foreground">
            Memory is the electronic storage holding place for instructions and data that the CPU can access rapidly.
          </p>
        </div>

        {/* Classification */}
        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
          <h3 className="text-xl font-bold mb-4">Classification of Computer Memory</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/40 p-5 rounded-xl border border-border/30">
              <h5 className="font-semibold text-primary mb-2 text-sm">Internal Processor Memory</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Located inside the CPU - includes registers (fastest, smallest) and cache memory (L1, L2, L3). 
                Provides ultra-fast data access for CPU operations with nanosecond latency.
              </p>
            </div>
            <div className="bg-muted/40 p-5 rounded-xl border border-border/30">
              <h5 className="font-semibold text-primary mb-2 text-sm">Main Memory</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Primary memory including RAM and ROM. RAM is volatile (loses data without power) for temporary data 
                storage; ROM is non-volatile for permanent firmware storage.
              </p>
            </div>
            <div className="bg-muted/40 p-5 rounded-xl border border-border/30">
              <h5 className="font-semibold text-primary mb-2 text-sm">Secondary Memory</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Non-volatile storage devices for permanent data: HDD, SSD, floppy disk, USB drives, 
                optical discs. Provides long-term data retention with larger capacities.
              </p>
            </div>
          </div>
        </section>

        {/* Memory Hierarchies */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Memory Hierarchies</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed">
            A variety of factors should be considered to explore the hierarchy of memories. The major
            components are: nature of connection between memory and processor, cost per bit, access time,
            and storage capacity. Figure 7.2 shows these factors in hierarchical form — cost per bit
            increases with fall of access time and increasing closeness to the CPU (microprocessor).
          </p>
          <MemoryHierarchyFigure />
        </section>

        {/* Layer-by-layer breakdown */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">The Hierarchy, Layer by Layer</h3>
          <div className="space-y-6">
            {hierarchyLayers.map((layer, index) => (
              <div key={layer.name} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <layer.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Level {index + 1}</span>
                    <h4 className="font-bold text-lg text-foreground">{layer.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{layer.role}</p>
                <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="bg-muted/40 p-3 rounded-lg border border-border/30 flex items-start gap-2">
                    <Database className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Capacity:</strong> {layer.capacity}</span>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg border border-border/30 flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Access speed:</strong> {layer.speed}</span>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg border border-border/30 flex items-start gap-2">
                    <Coins className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Cost per bit:</strong> {layer.cost}</span>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg border border-border/30 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Proximity to CPU:</strong> {layer.proximity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why the hierarchy works */}
        <section className="bg-card rounded-2xl p-8 border border-border/50 shadow-card space-y-6">
          <h3 className="text-xl font-bold">Why the Hierarchy Makes Computers Fast</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No single memory technology is simultaneously fast, large, and cheap — fast memory is expensive
            and small, cheap memory is slow and large. The hierarchy resolves this trade-off: a small amount
            of very fast memory sits near the CPU, backed by progressively larger and slower layers. Because
            programs do not access memory randomly, the small fast layers can serve the vast majority of
            requests, so the system <em>feels</em> almost as fast as its fastest layer while offering the
            capacity and price of its slowest.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {hierarchyPrinciples.map((p) => (
              <div key={p.title} className="bg-muted/40 p-5 rounded-xl border border-border/30 flex gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary h-fit">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-foreground mb-1">{p.title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The operating system and applications depend on this structure directly: the OS scheduler keeps
            hot process data cache-resident, the file system caches recently read disk blocks in RAM, and
            the virtual memory manager pages inactive data down to secondary storage. When a program is
            "optimized for cache" or a computer "runs faster with more RAM", it is the memory hierarchy —
            fewer trips to the slow lower levels — that delivers the speed-up.
          </p>
        </section>

        {/* Summary table */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Memory Storage Hierarchy at a Glance</h3>
          <div className="bg-card rounded-2xl border border-border/60 shadow-card overflow-hidden max-w-3xl mx-auto">
            <table className="w-full text-left text-sm border-collapse font-mono">
              <thead>
                <tr className="bg-muted text-muted-foreground border-b text-xs font-semibold uppercase">
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Access Speed</th>
                  <th className="py-3 px-4">Typical Size</th>
                  <th className="py-3 px-4 text-right">Cost/Bit</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                {storageHierarchy.map((row) => (
                  <tr key={row.level} className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-bold text-foreground">{row.level}</td>
                    <td className="py-3 px-4">{row.speed}</td>
                    <td className="py-3 px-4">{row.size}</td>
                    <td className="py-3 px-4 text-right font-bold text-primary">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c7-l2") {
    // Lesson 2: Main Memory
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: Main Memory</h2>
          <p className="text-muted-foreground">
            Explore main memory systems including volatile working memory (RAM), permanent non-volatile memory (ROM), and ultra-fast cache bridging structures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainMemoryDevices.map((device) => (
            <DeviceCard
              key={device.name}
              {...device}
            />
          ))}
        </div>
      </div>
    );
  }

  if (lessonId === "c7-l3") {
    // Lesson 3: Secondary Memory
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 3: Secondary Memory</h2>
          <p className="text-muted-foreground">
            Examine secondary storage units designed for persistent, high-capacity, and long-term data retention.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryMemoryDevices.map((device) => (
            <DeviceCard
              key={device.name}
              {...device}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
