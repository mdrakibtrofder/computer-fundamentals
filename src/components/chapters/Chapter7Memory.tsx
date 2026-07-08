import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HardDrive, Database, Layers, Disc, Save } from "lucide-react";
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
];

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

        {/* Memory Hierarchy */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Memory Storage Hierarchy</h3>
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
