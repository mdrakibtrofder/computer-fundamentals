import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings, ArrowRightLeft, Zap, AlertTriangle, Scale, Shield, Database, Cpu, HardDrive } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const systemSoftwareGroups = [
  { name: "Operating systems", icon: Settings },
  { name: "Language translators", icon: ArrowRightLeft },
  { name: "Utility programs", icon: Zap },
];

const machineLanguageDisadvantages = [
  "The program must be written in machine language (i.e., with 1s and 0s).",
  "Entering a machine language program is a tedious and error-prone process.",
  "Error detection and correction is extremely complex and time-consuming.",
  "Programs written in machine language for a specific machine are hardware-dependent and cannot be used on another type of CPU architecture."
];

const comparisonData = [
  {
    feature: "Program Preparation",
    compiler: "Compiler prepares an object program from the entire source program before execution.",
    interpreter: "Interpreter translates and immediately executes each instruction of the source program step-by-step."
  },
  {
    feature: "Debugging",
    compiler: "Debugging is complex as errors are shown all at once after compiling.",
    interpreter: "Easier for debugging since it stops executing immediately when an error is encountered."
  },
  {
    feature: "Execution Time",
    compiler: "Much lower execution time (compiled binaries run directly on hardware).",
    interpreter: "Higher execution time (needs translation overhead at runtime)."
  },
  {
    feature: "Development Effort",
    compiler: "Requires higher program development effort and time.",
    interpreter: "Requires less program development effort and time."
  }
];

const osFunctions = [
  {
    title: "Process Management",
    desc: "Schedules, creates, and terminates processes. Manages synchronization and communication between active programs.",
    icon: Cpu
  },
  {
    title: "Memory Management",
    desc: "Tracks primary memory allocation, transferring data between RAM and virtual disk swap space during execution.",
    icon: Database
  },
  {
    title: "File Management",
    desc: "Manages file folders, directories, storage block mappings, and file read/write permissions.",
    icon: HardDrive
  },
  {
    title: "Security & Access",
    desc: "Protects system resources against unauthorized modification and handles user login authentication.",
    icon: Shield
  }
];

const osTypes = [
  {
    name: "Batch Operating System",
    desc: "Groups jobs together and processes them in batches without direct user interaction (e.g., payroll processing)."
  },
  {
    name: "Time-Sharing / Multitasking",
    desc: "Rapidly switches between jobs so users can interact with multiple active programs simultaneously (e.g., Windows, macOS)."
  },
  {
    name: "Real-Time OS (RTOS)",
    desc: "Guarantees processing of critical events within strict milliseconds (e.g., autopilot systems, pacemaker control)."
  },
  {
    name: "Distributed OS",
    desc: "Manages a cluster of physical machines, representing them as a single cohesive unit to the user."
  }
];

export function Chapter9SystemSoftware({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c9-l1") {
    // Lesson 1: System Software
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: System Software</h2>
          <p className="text-muted-foreground">
            Systems software refers to programs that assist users in generating, debugging, testing, modifying, and executing application programs.
          </p>
        </div>

        {/* Groups of System Software */}
        <div className="grid sm:grid-cols-3 gap-6">
          {systemSoftwareGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50 flex flex-col items-center gap-4 text-center hover:bg-secondary/5 transition-colors"
            >
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <group.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm">{group.name}</h4>
            </motion.div>
          ))}
        </div>

        {/* Language Translators Detailed */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Language Translators</h3>
          
          {/* Machine Language Card */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">0️⃣1️⃣</span>
              <h4 className="font-bold text-lg text-primary">Machine Language</h4>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Machine language is written in binary words comprising of 1s and 0s. The CPU executes commands directly in machine language.
            </p>
            <div className="bg-destructive/5 rounded-xl p-5 border border-destructive/10">
              <h5 className="font-bold text-xs text-destructive mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Disadvantages:
              </h5>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {machineLanguageDisadvantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assembler Card */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">⚙️</span>
              <h4 className="font-bold text-lg text-primary">Assembler</h4>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Programming in assembly language is easier than programming in machine language. The programmer writes mnemonic source code for instructions, and the assembler translates it into binary machine language. The programmer retains total control of the hardware operations.
            </p>
          </div>

          {/* Compiler and Interpreter Card */}
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🔄</span>
              <h4 className="font-bold text-lg text-primary">Compiler and Interpreter</h4>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                A <strong>Compiler</strong> is a program that translates programs written in high-level languages into machine language. The compiler compiles the entire source code into an object program executable file.
              </p>
              <p>
                An <strong>Interpreter</strong> does not prepare an executable object program. It translates and immediately executes each instruction of the source program line-by-line, providing interactive debugging features.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Scale className="w-3.5 h-3.5" /> Comparison
            </div>
            <h3 className="text-2xl font-bold">Compiler vs. Interpreter</h3>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="w-[180px] font-bold text-foreground">Feature</TableHead>
                  <TableHead className="font-bold text-primary">Compiler</TableHead>
                  <TableHead className="font-bold text-secondary">Interpreter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/10">
                    <TableCell className="font-semibold text-muted-foreground text-xs">{row.feature}</TableCell>
                    <TableCell className="text-xs leading-relaxed">{row.compiler}</TableCell>
                    <TableCell className="text-xs leading-relaxed">{row.interpreter}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c9-l2") {
    // Lesson 2: Introduction to Operating Systems
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: Introduction to Operating Systems</h2>
          <p className="text-muted-foreground">
            An Operating System (OS) is the primary system software that controls and coordinates all hardware and software resources, acting as the interface between the user and the machine.
          </p>
        </div>

        {/* Functions of OS */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Core Functions of an Operating System</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {osFunctions.map((func) => (
              <div key={func.title} className="bg-card rounded-2xl p-6 border shadow-sm flex gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary h-fit">
                  <func.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">{func.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{func.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Types of OS */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Common Types of Operating Systems</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {osTypes.map((type) => (
              <div key={type.name} className="bg-card rounded-xl p-6 border shadow-card border-l-4 border-secondary">
                <h4 className="font-bold text-base mb-2 text-foreground">{type.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
