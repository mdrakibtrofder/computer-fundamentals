import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HardDrive, Database, Layers, Disc, Save, Cpu, Brain, Server, Clock, Gauge } from "lucide-react";
import { DeviceCard } from "./DeviceCard";

import hddImage from "@/assets/devices/hdd.png";
import ssdImage from "@/assets/devices/ssd.png";
import usbDriveImage from "@/assets/devices/usb-drive.png";
import romImage from "@/assets/devices/rom.jpg";
import ramImage from "@/assets/devices/ram.png";
import cacheImage from "@/assets/devices/cache.png";
import floppyImage from "@/assets/devices/floppy.jpg";
import opticalDiscImage from "@/assets/devices/optical-disc.png";
import magneticTapeImage from "@/assets/devices/magnetic-tape.png";

const storageDevices = [
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
  // {
  //   name: "Solid State Drive (SSD)",
  //   image: ssdImage,
  //   shortDescription: "Flash-based storage with no moving parts for faster, more reliable performance.",
  //   howItWorks: "Uses NAND flash memory cells that trap electrons in floating gates. Controller manages wear leveling and garbage collection. No mechanical parts mean faster access times.",
  //   functionalities: [
  //     "Fast Read/Write",
  //     "Low Latency",
  //     "Shock Resistant",
  //     "Silent Operation",
  //   ],
  //   icon: HardDrive,
  // },
  // {
  //   name: "USB Flash Drive",
  //   image: usbDriveImage,
  //   shortDescription: "Portable flash memory storage device for file transfer between computers.",
  //   howItWorks: "Contains NAND flash memory and USB controller. Plug-and-play connection provides power and data transfer. File system allows reading/writing like a hard drive.",
  //   functionalities: [
  //     "Portable Storage",
  //     "Quick File Transfer",
  //     "Bootable Media",
  //     "Cross-platform",
  //   ],
  //   icon: Database,
  // },
  // {
  //   name: "Optical Disc (CD/DVD/Blu-ray)",
  //   image: opticalDiscImage,
  //   shortDescription: "Removable media using laser technology to read/write data on reflective surface.",
  //   howItWorks: "Laser reads pits and lands on disc surface. Light reflection differences create binary patterns. CD uses 780nm laser, DVD 650nm, Blu-ray 405nm for higher density.",
  //   functionalities: [
  //     "Media Distribution",
  //     "Data Archival",
  //     "Movie Playback",
  //     "Software Installation",
  //   ],
  //   icon: Disc,
  // },
  // {
  //   name: "Magnetic Tape",
  //   image: magneticTapeImage,
  //   shortDescription: "Sequential access storage medium for long-term archival and backup purposes.",
  //   howItWorks: "Magnetic tape winds between reels. Read/write head magnetizes tape surface in patterns. Sequential access means reading data in order from start to end.",
  //   functionalities: [
  //     "Backup Storage",
  //     "Archival Storage",
  //     "High Capacity",
  //     "Low Cost per GB",
  //   ],
  //   icon: Save,
  // },
];

const storageHierarchy = [
  { level: "Registers", speed: "< 1 ns", size: "< 1 KB", cost: "$$$$$" },
  { level: "Build in Cache", speed: "~0.5-1 ns", size: "32-64 KB", cost: "$$$$" },
  { level: "External Cache", speed: "~3-5 ns", size: "256 KB - 1 MB", cost: "$$$" },
  { level: "Primary Memory (RAM)", speed: "~50-100 ns", size: "4-64 GB", cost: "$$" },
  { level: "Secondary Memory", speed: "~50-100 μs", size: "256 GB - 4 TB", cost: "$" },
];

export function MemorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="memory-organization" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section H</span>
          <h2 className="heading-2 mt-2 mb-4">Memory Organization</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Primary and secondary memory systems in modern computers
          </p>
        </motion.div>

        {/* Memory Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-muted/30 rounded-xl p-6 md:p-8">
            <h3 className="heading-3 mb-4">What is Memory?</h3>
            <p className="text-muted-foreground mb-6">
              Memory is the electronic holding place for instructions and data that can be accessed by the computer. 
              It allows the CPU to store and retrieve information quickly for immediate processing. Memory is measured 
              in bytes and is essential for any computer operation, from simple calculations to complex multitasking.
            </p>

            <h4 className="font-semibold mb-3">Classification of Computer Memory</h4>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-card rounded-lg p-4 border">
                <h5 className="font-semibold text-primary mb-2">Internal Processor Memory</h5>
                <p className="text-sm text-muted-foreground">
                  Located inside the CPU - includes registers (fastest, smallest) and cache memory (L1, L2, L3). 
                  Provides ultra-fast data access for CPU operations with nanosecond latency.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <h5 className="font-semibold text-primary mb-2">Main Memory</h5>
                <p className="text-sm text-muted-foreground">
                  Primary memory including RAM and ROM. RAM is volatile (loses data without power) for temporary data 
                  storage; ROM is non-volatile for permanent firmware storage.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <h5 className="font-semibold text-primary mb-2">Secondary Memory</h5>
                <p className="text-sm text-muted-foreground">
                  Non-volatile storage devices for permanent data: HDD, SSD, floppy disk, USB drives, 
                  optical discs. Provides long-term data retention with larger capacities.
                </p>
              </div>
            </div>

            <h4 className="font-semibold mb-3">Comparison of Primary Memory and Secondary Memory</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Characteristics</th>
                    <th className="text-left p-2">Primary Memory</th>
                    <th className="text-left p-2">Secondary Memory</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Location with respect to the CPU</td>
                    <td className="p-2">Inside/Outside and directly accessible by the CPU.</td>
                    <td className="p-2">Outside the CPU and not directly accessible by the CPU.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Cost</td>
                    <td className="p-2">Most Expensive.</td>
                    <td className="p-2">Less expensive than primary storage.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Capacity</td>
                    <td className="p-2">Lower capacity as compared to secondary memory.</td>
                    <td className="p-2">Higher capacity as compared to primary memory.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Average Access Time</td>
                    <td className="p-2">Primary memory average access time is in billions of a second.</td>
                    <td className="p-2">Secondary memory average access time is in millons of a second.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Medium of storing information</td>
                    <td className="p-2">Semiconductor chips</td>
                    <td className="p-2">Magnetic Tape, Magnetic Disk, Optical Disk</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Access Type</td>
                    <td className="p-2">Primary memory's access type is Random access</td>
                    <td className="p-2">Secondary memory's access type is Sequential/Direct access</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Primary Memory (ROM, RAM, Cache) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="heading-3 mb-6 text-center">Primary Memory</h3>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
            Fast, volatile memory directly accessed by the CPU for immediate data processing
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {storageDevices.slice(0, 3).map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Secondary Memory (Floppy Disk, HDD) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="heading-3 mb-6 text-center">Secondary Memory</h3>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
            Non-volatile storage for permanent data retention and long-term storage
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
            {storageDevices.slice(3, 5).map((device, index) => (
              <DeviceCard key={device.name} {...device} delay={index * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Storage Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-8 text-center">Storage Hierarchy</h3>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2">
              {storageHierarchy.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                  className="relative"
                  style={{
                    marginLeft: `${index * 1.5}%`,
                    marginRight: `${index * 1.5}%`,
                  }}
                >
                  <div
                    className="flex items-center justify-between p-4 rounded-lg transition-colors"
                    style={{
                      background: `linear-gradient(90deg, hsl(217, 91%, ${60 - index * 6}%) 0%, hsl(174, 62%, ${55 - index * 5}%) 100%)`,
                    }}
                  >
                    <span className="font-semibold text-white">{level.level}</span>
                    <div className="flex gap-4 text-sm text-white/90">
                      <span>⚡ {level.speed}</span>
                      <span>📦 {level.size}</span>
                      <span>💰 {level.cost}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              ⬆️ Faster, Smaller, More Expensive | ⬇️ Slower, Larger, Less Expensive
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
