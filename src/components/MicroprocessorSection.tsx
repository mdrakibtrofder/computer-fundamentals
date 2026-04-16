import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu,
  Brain,
  Calculator,
  Settings,
  Clock,
  Layers,
  Zap,
  ArrowRight,
  Workflow
} from "lucide-react";

export function MicroprocessorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      title: "SISD (Single Instruction Single Data Stream)",
      description: "Conventional computers where one CPU performs one instruction at a time. Represents serial architecture.",
      icon: ArrowRight,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "SIMD (Single Instruction Multiple Data Stream)",
      description: "Same instruction is executed simultaneously by several processors. Throughput can be N times more. Examples: pipelined vector and array processors.",
      icon: Layers,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "MISD (Multiple Instruction Single Data Stream)",
      description: "Several instructions operate on a data item simultaneously. Useful in specialized applications like robot vision.",
      icon: Workflow,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  return (
    <section id="microprocessor" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section H</span>
          <h2 className="heading-2 mt-2 mb-4">Microprocessor</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The control center of the entire computer system, often called the heart and brain of the computer.
          </p>
        </motion.div>

        {/* Definition & Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-primary"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Microprocessor Definition</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every computer system has a unit whose primary purpose is to process data. This unit is the control center of the entire computer system. It accepts data from input devices, processes data, and sends results to output devices under control of a stored program.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This tiny chip of silicon determines the speed and power of the entire computer by handling most of the processing. It is referred to as the <strong>microprocessor</strong> in microcomputers and the <strong>CPU</strong> in large systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-secondary/10">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Functions of Microprocessors</h3>
            </div>
            <ul className="space-y-3">
              {functions.map((func, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ALU & Control Unit */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/50 rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/10">
                <Calculator className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Arithmetic/Logic Unit (ALU)</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              The data processing unit of the microprocessor. Its functions include:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-accent mb-1">Arithmetic Operations</h4>
                <p className="text-sm text-muted-foreground">Addition, subtraction, multiplication, and division.</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-accent mb-1">Logical Operations</h4>
                <p className="text-sm text-muted-foreground">OR, AND, NOT, etc.</p>
              </div>
              <div className="bg-card p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-accent mb-1">Decision Making</h4>
                <p className="text-sm text-muted-foreground">Comparing data items and determining the flow of execution.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-muted/50 rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Control Unit</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The control unit performs the computer's traffic control. It coordinates and controls the operations of the central processing unit, much like the human brain coordinates the body.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Does not process or store data; instead, it <strong>initiates and controls</strong> these operations.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Communicates with <strong>input devices</strong> to begin data transfer into memory.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Communicates with <strong>output devices</strong> to begin transfer of results from memory.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Machine Cycle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 mb-16 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">The Machine Cycle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Intervals are controlled by an internal electronic clock that emits millions of pulses every second (measured in <strong>MHz</strong>). A fixed number of clock pulses determines the <strong>machine cycle</strong>. During one cycle, the computer can perform one machine operation. The number of operations to execute a single instruction varies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Multiprocessing */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Layers className="w-6 h-6 text-secondary" />
              </div>
              Introduction to Multiprocessing
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              <strong>Parallel processing (PP)</strong> is processing an algorithm simultaneously by several processors.
              <strong>Distributed processing</strong> is processing multiple algorithms simultaneously by several processors.
              Both are known as multiprocessing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {architectures.map((arch, index) => (
              <motion.div
                key={arch.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border border-border"
              >
                <div className={`p-3 rounded-xl ${arch.bg} w-fit mb-4`}>
                  <arch.icon className={`w-6 h-6 ${arch.color}`} />
                </div>
                <h4 className="font-bold mb-3">{arch.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {arch.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Homogeneous vs Heterogeneous */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <h4 className="font-bold text-lg mb-2">Homogeneous Systems</h4>
            <p className="text-sm text-muted-foreground">In conventional parallel systems, all processing elements (PEs) are identical.</p>
          </div>
          <div className="p-6 rounded-2xl bg-muted/30 border border-border">
            <h4 className="font-bold text-lg mb-2">Heterogeneous Systems</h4>
            <p className="text-sm text-muted-foreground">Mixed PE-based architectures comprising a variety of PEs to handle various computational demands.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
