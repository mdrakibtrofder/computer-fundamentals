import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Settings, ArrowRightLeft, Zap, AlertTriangle, Scale, Shield, Database, Cpu, HardDrive, Timer, Handshake, Monitor, Smartphone, KeyRound, Lock, Users, Share2, Layers, Save, RefreshCw, Server, Cloud } from "lucide-react";
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

const multitaskingModes = [
  {
    name: "Preemptive Multitasking",
    icon: Timer,
    desc: "The operating system stays in control: a hardware timer interrupts the running process when its time slice expires, and the scheduler forcibly switches the CPU to the next process. A misbehaving program cannot freeze the system, because it can always be preempted.",
    usedBy: "Used by all modern systems: Windows, macOS, Linux, Android, iOS.",
  },
  {
    name: "Cooperative Multitasking",
    icon: Handshake,
    desc: "Each program must voluntarily yield the CPU so others can run. The OS cannot interrupt a task — if one program enters an infinite loop or refuses to yield, the whole system hangs.",
    usedBy: "Used by early systems: Windows 3.x, classic Mac OS (pre-OS X).",
  },
];

const multitaskingExamples = [
  {
    name: "Desktop",
    icon: Monitor,
    desc: "You stream music, download a file, and type a document at once. The OS gives each program brief turns on the CPU cores; switches happen thousands of times a second, so everything appears simultaneous.",
  },
  {
    name: "Mobile",
    icon: Smartphone,
    desc: "A navigation app gives directions while a call is active and messages arrive in the background. Android and iOS additionally suspend or restrict background apps to save battery — multitasking constrained by power budgets.",
  },
];

const resourceAllocationMechanisms = [
  { title: "Memory Protection", desc: "Each process gets its own virtual address space; hardware blocks reads or writes to another process's memory." },
  { title: "Mutual Exclusion (Locks & Semaphores)", desc: "Only one process at a time may enter a critical section that touches a shared resource, preventing corrupted data." },
  { title: "Priority Scheduling", desc: "The scheduler weighs process priorities so interactive tasks stay responsive while background jobs still make progress." },
  { title: "Deadlock Handling", desc: "The OS orders or limits resource requests (and can detect cycles) so processes don't wait on each other forever." },
  { title: "I/O Queuing & Spooling", desc: "Requests for devices like disks and printers are queued and served in order, so concurrent processes never garble a shared device." },
];

const multiUserFeatures = [
  {
    title: "User Authentication",
    icon: KeyRound,
    desc: "Before any resource is granted, the OS verifies identity — passwords, smart cards, SSH keys, or biometrics — and associates every subsequent process with that verified user account.",
  },
  {
    title: "Permission-Based Access",
    icon: Lock,
    desc: "Every file, device, and service carries an access-control list or owner/group/other permissions (e.g., Unix read/write/execute bits). The OS checks these on every access, so users only touch what they are entitled to.",
  },
  {
    title: "User Isolation",
    icon: Shield,
    desc: "Each user's processes, memory, and files are walled off from other users. One user cannot read another's private data, kill their processes, or exhaust the machine — quotas and per-user limits keep resources fairly shared.",
  },
];

const multiUserExamples = [
  { name: "Mainframe Systems", icon: Database, desc: "IBM z/OS and UNIX time-sharing systems have served hundreds of terminal users on one machine since the 1960s-70s." },
  { name: "Server Operating Systems", icon: Server, desc: "A single Linux or Windows Server host supports many simultaneous SSH/remote-desktop sessions, each with its own account, home directory, and permissions." },
  { name: "Cloud Platforms", icon: Cloud, desc: "AWS, Azure, and Google Cloud extend the model to millions of tenants, using virtualization and strict isolation so customers safely share the same physical hardware." },
];

const osCharacteristics = [
  {
    title: "Concurrency",
    icon: Cpu,
    desc: "Many activities progress at once — user processes, kernel services, I/O transfers. The OS interleaves and synchronizes them so a slow disk read never idles the whole machine.",
  },
  {
    title: "Resource Sharing",
    icon: Share2,
    desc: "CPU time, memory, storage, and devices are shared among competing programs and users. Fair allocation policies maximize utilization while preventing any one task from starving the rest.",
  },
  {
    title: "Virtualization",
    icon: Layers,
    desc: "The OS presents idealized abstractions of hardware: virtual memory larger than physical RAM, virtual CPUs via time slicing, files instead of raw disk blocks — even entire virtual machines.",
  },
  {
    title: "Persistence",
    icon: Save,
    desc: "Data must outlive processes and power cycles. File systems guarantee that saved information survives crashes and reboots, using journaling and consistency checks to avoid corruption.",
  },
  {
    title: "Security",
    icon: Shield,
    desc: "Authentication, access control, privilege separation (user mode vs. kernel mode), and encryption protect data and the system itself from unauthorized use and malicious software.",
  },
  {
    title: "Fault Tolerance",
    icon: RefreshCw,
    desc: "The system contains failures instead of collapsing: a crashing application is terminated cleanly, bad memory pages are retired, and servers use redundancy (RAID, failover) to keep running.",
  },
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

        {/* Multitasking */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Multitasking</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed">
            Multitasking is the ability of an operating system to run multiple processes seemingly at the
            same time on a limited number of CPUs. The OS divides processor time into tiny <strong>time
            slices</strong> (typically a few milliseconds) and switches the CPU between ready processes so
            rapidly that all of them appear to execute concurrently.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {multitaskingModes.map((mode) => (
              <div key={mode.name} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <mode.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base">{mode.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{mode.desc}</p>
                <p className="text-[11px] font-semibold text-primary">{mode.usedBy}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm space-y-4">
            <h4 className="font-bold text-base">How CPU Time Slicing Works</h4>
            <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
              <li>The scheduler picks a ready process and gives it the CPU for one time slice (quantum).</li>
              <li>A hardware timer interrupt fires when the quantum expires (or the process blocks on I/O earlier).</li>
              <li>The OS performs a <strong>context switch</strong>: it saves the process's registers and state, then restores the state of the next scheduled process.</li>
              <li>The cycle repeats hundreds or thousands of times per second, giving every process regular turns.</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {multitaskingExamples.map((ex) => (
              <div key={ex.name} className="bg-muted/40 rounded-xl p-6 border border-border/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <ex.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm">Multitasking on {ex.name}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ex.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm space-y-4">
            <h4 className="font-bold text-base">Keeping Concurrent Processes from Conflicting</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Running many processes at once only works if they cannot corrupt each other's data or fight
              over devices. The OS enforces this with several resource-allocation mechanisms:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {resourceAllocationMechanisms.map((m) => (
                <li key={m.title} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-xs leading-relaxed"><strong className="text-foreground">{m.title}:</strong> {m.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Multi-user support */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Multi-User Support</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed">
            A multi-user operating system lets several independent users work on the same computer at the
            same time — from local terminals, remote logins, or network sessions — each with their own
            identity, files, and running programs.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {multiUserFeatures.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                  <f.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">{f.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/40 rounded-2xl p-8 border border-border/50 space-y-4">
            <h4 className="font-bold text-base">Examples of Multi-User Systems</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {multiUserExamples.map((ex) => (
                <div key={ex.name} className="bg-card p-5 rounded-xl border border-border/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <ex.icon className="w-4 h-4 text-secondary" />
                    <h5 className="font-bold text-xs text-foreground">{ex.name}</h5>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OS Characteristics */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Defining Characteristics of an Operating System</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed">
            Regardless of type, every serious operating system exhibits a common set of traits. Together
            they are what make a computer dependable and efficient rather than a bare machine.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {osCharacteristics.map((c) => (
              <div key={c.title} className="bg-card rounded-2xl p-6 border border-border/50 shadow-card space-y-3">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary w-fit">
                  <c.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">{c.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
