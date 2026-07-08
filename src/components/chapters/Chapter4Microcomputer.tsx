import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, CircuitBoard, MemoryStick, Zap, Layers, ArrowRight, Settings } from "lucide-react";
import { DeviceCard } from "../DeviceCard";
import { InteractiveVisualization } from "../InteractiveVisualization";

import cpuImage from "@/assets/devices/cpu.png";
import ramImage from "@/assets/devices/ram.png";
import motherboardImage from "@/assets/devices/motherboard.png";
import psuImage from "@/assets/devices/psu.png";
import busSystemImage from "@/assets/bus-system.png";

const hardwareComponents = [
  {
    name: "CPU (Central Processing Unit)",
    image: cpuImage,
    shortDescription: "The brain of the computer that executes instructions and processes data.",
    howItWorks: "Fetches instructions from memory, decodes them, and executes operations using ALU and control unit. Modern CPUs use pipelining and multiple cores for parallel processing.",
    functionalities: [
      "Arithmetic & Logic Operations",
      "Instruction Execution",
      "Process Scheduling",
      "Cache Management",
    ],
    icon: Cpu,
  },
  {
    name: "RAM (Random Access Memory)",
    image: ramImage,
    shortDescription: "Volatile primary memory for temporary data storage during program execution.",
    howItWorks: "Stores data in capacitors (DRAM) or flip-flops (SRAM). CPU accesses any location directly without sequential reading. Data is lost when power is off.",
    functionalities: [
      "Fast Data Access",
      "Program Loading",
      "Working Memory",
      "Virtual Memory Support",
    ],
    icon: MemoryStick,
  },
  {
    name: "Motherboard",
    image: motherboardImage,
    shortDescription: "Main circuit board connecting all computer components together.",
    howItWorks: "Provides electrical connections through buses and power distribution. Contains chipset that controls data flow between CPU, memory, and peripherals.",
    functionalities: [
      "Component Integration",
      "Power Distribution",
      "BIOS/UEFI Hosting",
      "Expansion Slots",
    ],
    icon: CircuitBoard,
  },
  {
    name: "Power Supply Unit (PSU)",
    image: psuImage,
    shortDescription: "Converts AC power from outlet to regulated DC power for components.",
    howItWorks: "Uses transformers and rectifiers to convert 120V/240V AC to stable DC voltages (3.3V, 5V, 12V). Modern PSUs use switching regulators for efficiency.",
    functionalities: [
      "Voltage Regulation",
      "Power Protection",
      "Efficiency Rating (80+)",
      "Modular Cabling",
    ],
    icon: Zap,
  },
];

const registers = [
  { name: "Accumulator (AC)", purpose: "Stores intermediate arithmetic/logic results" },
  { name: "Program Counter (PC)", purpose: "Holds address of next instruction to execute" },
  { name: "Instruction Register (IR)", purpose: "Contains the current instruction being decoded" },
  { name: "Memory Address Register (MAR)", purpose: "Holds memory address for read/write operations" },
  { name: "Memory Data Register (MDR)", purpose: "Contains data to be written or read from memory" },
  { name: "Stack Pointer (SP)", purpose: "Points to top of the stack in memory" },
];

const busTypes = [
  {
    name: "Data Bus",
    color: "bg-primary",
    description: "Carries actual data between components. Width determines how much data can transfer at once (8, 16, 32, 64 bits).",
    direction: "Bidirectional",
  },
  {
    name: "Address Bus",
    color: "bg-secondary",
    description: "Carries memory addresses from CPU to memory. Width determines addressable memory space.",
    direction: "Unidirectional (CPU → Memory)",
  },
  {
    name: "Control Bus",
    color: "bg-accent",
    description: "Carries control signals like read/write, interrupt requests, clock signals.",
    direction: "Bidirectional",
  },
];

export function Chapter4Microcomputer({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c4-l1") {
    // Lesson 1: Microcomputer Basics
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Microcomputer Basics</h2>
          <p className="text-muted-foreground">
            A microcomputer is a complete computer on a small scale, designed for use by one person at a time. It contains a single microprocessor chip as its Central Processing Unit (CPU).
          </p>
        </div>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <h3 className="text-xl font-bold text-primary mb-3">Key Features of a Microcomputer</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Microprocessor CPU:</strong> Built around a single silicon chip containing the entire CPU.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Affordable and Personal:</strong> Designed for personal computing, business applications, and education.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Compact Size:</strong> Fits easily on desktops or in pockets (laptops, smartphones).</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span><strong>Standard Architecture:</strong> Connects CPU, Memory (RAM/ROM), and I/O devices via a standardized bus.</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-3">Types of Microcomputers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Microcomputers have evolved into many form factors to fit modern lifestyles:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>Desktops:</strong> Powerful stationary systems for offices and homes.</li>
                <li><strong>Laptops/Notebooks:</strong> Portable computers with integrated screens and keyboards.</li>
                <li><strong>Tablets/Smartphones:</strong> Highly integrated touch-screen hand-held microcomputers.</li>
                <li><strong>Embedded Microcomputers:</strong> Dedicated chips inside appliances, cars, and industrial tools.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c4-l2") {
    // Lesson 2: Organisation of a Microcomputer
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: Organisation of a Microcomputer</h2>
          <p className="text-muted-foreground text-base">
            The internal organization of a microcomputer involves the connection of the CPU, memory, and peripheral controllers via a system bus.
          </p>
        </div>

        {/* 3D Schematic Interactive Panel */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-primary">Interactive Component Schematic</h3>
          <p className="text-sm text-muted-foreground">
            Hover or click on the hotspots of the computer schematic below to examine the hardware relationships.
          </p>
          <div className="bg-card rounded-2xl p-6 border shadow-md">
            <InteractiveVisualization />
          </div>
        </section>

        {/* Bus System */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10">
              <Layers className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold">Computer Bus Organization</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                The computer bus is a communication system that transfers data between components inside a computer. 
                It is like a highway system connecting the CPU, memory, and I/O devices. The bus width determines 
                how much data can flow through the system.
              </p>

              <div className="space-y-4">
                {busTypes.map((bus) => (
                  <div key={bus.name} className="flex gap-4 items-start">
                    <div className={`w-4 h-4 rounded-full ${bus.color} mt-1 shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-sm">{bus.name}</h4>
                      <p className="text-xs text-muted-foreground">{bus.description}</p>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{bus.direction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border shadow-sm">
              <img
                src={busSystemImage}
                alt="Computer Bus System Architecture"
                className="w-full h-auto rounded-xl"
              />
              <p className="text-center text-xs text-muted-foreground mt-4">
                System architecture diagram showing CPU, Memory, and I/O connected via Bus
              </p>
            </div>
          </div>
        </section>

        {/* Registers */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Internal CPU Registers</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registers.map((reg) => (
              <div
                key={reg.name}
                className="bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover border border-border/50 transition-all"
              >
                <h4 className="font-mono font-bold text-primary mb-1 text-base">{reg.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{reg.purpose}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c4-l4") {
    // Lesson 4: Working Principal of a Microcomputer
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Working Principal of a Microcomputer</h2>
          <p className="text-muted-foreground">
            A microcomputer functions by constantly fetching, decoding, and executing machine-level instructions in a cyclic process.
          </p>
        </div>

        {/* Fetch-Decode-Execute */}
        <section className="bg-card rounded-2xl p-8 border border-border shadow-card space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '6s' }} />
            The Fetch-Decode-Execute Cycle
          </h3>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Every instruction executed by a computer is processed through the <strong>Machine Cycle</strong> (or Instruction Cycle), consisting of:
            </p>
            <ol className="list-decimal list-inside space-y-3 font-semibold text-foreground">
              <li>
                <span className="text-primary font-bold">1. Fetch:</span> The CPU retrieves the instruction code from the memory address specified by the Program Counter (PC).
              </li>
              <li>
                <span className="text-primary font-bold">2. Decode:</span> The control unit interprets the fetched instruction and directs which logic paths/components must activate.
              </li>
              <li>
                <span className="text-primary font-bold">3. Execute:</span> The ALU performs any arithmetic/logic operations, and registers are updated.
              </li>
              <li>
                <span className="text-primary font-bold">4. Store:</span> The results are written back to main memory or loaded into the accumulator.
              </li>
            </ol>
          </div>
        </section>

        {/* Processor Speed */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">Understanding Processor Speed</h3>
          <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            CPU speed is measured in <strong>Hertz (Hz)</strong> - execution cycles per second. Modern processors operate 
            in <strong>GHz (gigahertz - billions of cycles/second)</strong>. The actual throughput is influenced by clock rate, architectural efficiency, 
            cache sizes, core count, and instruction word sizes (e.g. 64-bit systems).
          </p>
        </section>
      </div>
    );
  }

  if (lessonId === "c4-l5") {
    // Lesson 5: Motherboard and Adapter
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 5: Motherboard and Adapter</h2>
          <p className="text-muted-foreground">
            The motherboard is the physical foundation of the microcomputer, hosting essential sockets, chipsets, and bus tracks to integrate adapters and expansions.
          </p>
        </div>

        {/* Motherboard Components grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareComponents.map((component) => (
            <DeviceCard
              key={component.name}
              {...component}
            />
          ))}
        </div>

        {/* Chipsets and Expansion slots */}
        <section className="bg-card rounded-2xl p-6 border shadow-sm space-y-4">
          <h3 className="text-xl font-bold">Motherboard Chipset & Adapter Cards</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The **chipset** coordinates flow between memory, CPU, and peripheral drives. 
            **Adapter cards** (or expansion cards like graphics cards, sound cards, and network interface cards) plug directly into motherboard expansion slots (PCIe) to provide specialized features beyond the on-board processor capabilities.
          </p>
        </section>
      </div>
    );
  }

  return null;
}
