import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Brain, Calculator, Settings, Clock, Layers, Zap, ArrowRight, Workflow } from "lucide-react";

const functions = [
  "The processor first fetches an instruction from the main memory.",
  "The instruction is then decoded to determine what action is required to be done.",
  "Based on the instruction, the processor fetches, if required, data from main memory or the I/O module.",
  "The instruction is then executed, which may require performing arithmetic or logical operations on data.",
  "In addition to execution, the CPU also supervises and controls I/O devices. If there is an interrupt, the CPU transfers control to an interrupt handling program.",
  "Finally, the results of an execution may require transfer of data to memory or the I/O Module."
];

const architectures = [
  {
    id: "sisd",
    title: "SISD (Single Instruction Single Data Stream)",
    description: "Conventional computers where one CPU performs one instruction at a time. Represents serial architecture. Example: Simple microwave oven controller.",
    icon: ArrowRight,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "simd",
    title: "SIMD (Single Instruction Multiple Data Stream)",
    description: "Same instruction is executed simultaneously by several processors. Throughput can be N times more. Examples: pipelined vector and array processors.",
    icon: Layers,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    id: "misd",
    title: "MISD (Multiple Instruction Single Data Stream)",
    description: "Several instructions operate on a data item simultaneously. Useful in specialized applications like robot vision.",
    icon: Workflow,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "mimd",
    title: "MIMD (Multiple Instruction Multiple Data Stream)",
    description: "Multiple processors execute different instructions on different data simultaneously. Used in distributed systems and parallel computing clusters.",
    icon: Cpu,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  }
];

export function Chapter6Microprocessor({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c6-l1") {
    // Lesson 1: Introduction to Microprocessors
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Introduction to Microprocessors</h2>
          <p className="text-muted-foreground">
            The microprocessor is a tiny silicon chip that functions as the CPU of a microcomputer, acting as the primary control center.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">What is a Microprocessor?</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Every computer system has a unit whose primary purpose is to process data. This unit is the control center of the entire computer. It accepts data from input devices, processes data, and sends results to output devices under control of a stored program.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              This tiny chip of silicon determines the speed and power of the entire computer by handling most of the processing. It is referred to as the <strong>microprocessor</strong> in microcomputers and the <strong>CPU</strong> in large mainframe systems.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Functions of Microprocessors</h3>
            </div>
            <ul className="space-y-3">
              {functions.map((func, index) => (
                <li key={index} className="flex items-start gap-3 text-xs text-muted-foreground">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Machine Cycle */}
        <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 border border-primary/10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">The Machine Cycle</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A machine cycle is the basic operation performed by a Central Processing Unit (CPU) to execute a single machine-level instruction. Intervals are controlled by an internal electronic clock that emits millions of pulses every second (measured in <strong>MHz</strong>). A fixed number of clock pulses determines the <strong>machine cycle</strong>. During one cycle, the computer can perform one machine operation.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c6-l2") {
    // Lesson 2: ALU and Control
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: ALU and Control</h2>
          <p className="text-muted-foreground">
            The core logic execution engine of the microprocessor consists of the Arithmetic Logic Unit (ALU) and the Control Unit working in tandem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Calculator className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Arithmetic Logic Unit (ALU)</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              The data processing unit of the microprocessor. Its functions include:
            </p>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="bg-card p-4 rounded-xl shadow-sm border border-border/40">
                <h4 className="font-semibold text-accent mb-1">Arithmetic Operations</h4>
                <p className="text-xs text-muted-foreground">Addition, subtraction, multiplication, and division.</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-sm border border-border/40">
                <h4 className="font-semibold text-accent mb-1">Logical Operations</h4>
                <p className="text-xs text-muted-foreground">OR, AND, NOT, XOR, etc.</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-sm border border-border/40">
                <h4 className="font-semibold text-accent mb-1">Decision Making</h4>
                <p className="text-xs text-muted-foreground">Comparing data items and branch sequencing.</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Control Unit</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The control unit performs the computer's traffic control. It coordinates and controls the operations of the central processing unit, much like the human brain coordinates the body.
            </p>
            <div className="space-y-4 text-xs text-muted-foreground">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-3.5 h-3.5 text-primary" />
                </div>
                <p>Does not process or store data; instead, it <strong>initiates and controls</strong> these operations.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-3.5 h-3.5 text-primary" />
                </div>
                <p>Communicates with <strong>input devices</strong> to begin data transfer into memory.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-3.5 h-3.5 text-primary" />
                </div>
                <p>Communicates with <strong>output devices</strong> to begin transfer of results from memory.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lessonId === "c6-l4") {
    // Lesson 4: Parallel Processing
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Parallel Processing</h2>
          <p className="text-muted-foreground font-medium">
            Parallel processing involves executing multiple operations concurrently to accelerate computing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {architectures.map((arch) => (
            <div key={arch.id} className="bg-card rounded-2xl p-6 border shadow-card flex gap-4 hover:shadow-card-hover transition-all">
              <div className={`p-3 rounded-xl ${arch.bg} ${arch.color} h-fit`}>
                <arch.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">{arch.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{arch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
