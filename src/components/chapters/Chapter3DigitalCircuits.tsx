import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, HelpCircle, ArrowRight, RefreshCcw, Table } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Logic Gate Simulator Config
interface GateDef {
  name: string;
  expression: string;
  description: string;
  func: (a: boolean, b: boolean) => boolean;
  truthTable: { a: boolean; b: boolean; out: boolean }[];
}

const GATES: Record<string, GateDef> = {
  AND: {
    name: "AND Gate",
    expression: "Y = A • B",
    description: "Outputs 1 (HIGH) only if all inputs are 1.",
    func: (a, b) => a && b,
    truthTable: [
      { a: false, b: false, out: false },
      { a: false, b: true, out: false },
      { a: true, b: false, out: false },
      { a: true, b: true, out: true },
    ],
  },
  OR: {
    name: "OR Gate",
    expression: "Y = A + B",
    description: "Outputs 1 (HIGH) if at least one input is 1.",
    func: (a, b) => a || b,
    truthTable: [
      { a: false, b: false, out: false },
      { a: false, b: true, out: true },
      { a: true, b: false, out: true },
      { a: true, b: true, out: true },
    ],
  },
  NOT: {
    name: "NOT Gate (Inverter)",
    expression: "Y = A'",
    description: "Inverts the input. Input B is ignored.",
    func: (a, _b) => !a,
    truthTable: [
      { a: false, b: false, out: true },
      { a: true, b: false, out: false },
    ],
  },
  NAND: {
    name: "NAND Gate",
    expression: "Y = (A • B)'",
    description: "Outputs 0 only if all inputs are 1. Opposite of AND.",
    func: (a, b) => !(a && b),
    truthTable: [
      { a: false, b: false, out: true },
      { a: false, b: true, out: true },
      { a: true, b: false, out: true },
      { a: true, b: true, out: false },
    ],
  },
  NOR: {
    name: "NOR Gate",
    expression: "Y = (A + B)'",
    description: "Outputs 1 only if all inputs are 0. Opposite of OR.",
    func: (a, b) => !(a || b),
    truthTable: [
      { a: false, b: false, out: true },
      { a: false, b: true, out: false },
      { a: true, b: false, out: false },
      { a: true, b: true, out: false },
    ],
  },
  XOR: {
    name: "XOR Gate (Exclusive OR)",
    expression: "Y = A ⊕ B",
    description: "Outputs 1 if inputs are different.",
    func: (a, b) => a !== b,
    truthTable: [
      { a: false, b: false, out: false },
      { a: false, b: true, out: true },
      { a: true, b: false, out: true },
      { a: true, b: true, out: false },
    ],
  },
  XNOR: {
    name: "XNOR Gate (Exclusive NOR)",
    expression: "Y = (A ⊕ B)'",
    description: "Outputs 1 if inputs are identical.",
    func: (a, b) => a === b,
    truthTable: [
      { a: false, b: false, out: true },
      { a: false, b: true, out: false },
      { a: true, b: false, out: false },
      { a: true, b: true, out: true },
    ],
  },
};

export function Chapter3DigitalCircuits({ lessonId }: { lessonId: string }) {
  // Gate Simulator State
  const [selectedGate, setSelectedGate] = useState<string>("AND");
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);

  const activeGate = GATES[selectedGate];
  const simOutput = activeGate.func(inputA, inputB);

  if (lessonId === "c3-l1") {
    // Lesson 1: Logic Functions and Logic gates
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Logic Functions and Logic Gates</h2>
          <p className="text-muted-foreground">
            Logic gates are the fundamental building blocks of digital systems. They implement basic Boolean functions by manipulating electrical high/low voltages (representing binary 1 and 0).
          </p>
        </div>

        {/* Logic Gate Interactive Simulator */}
        <section className="bg-card rounded-2xl p-8 border border-border/60 shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h3 className="text-xl font-bold">Interactive Logic Gate Simulator</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Gate Selectors */}
            <div className="lg:col-span-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Select Gate</p>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {Object.keys(GATES).map((gName) => (
                  <Button
                    key={gName}
                    variant={selectedGate === gName ? "default" : "outline"}
                    className="justify-start font-bold h-10 w-24 lg:w-full"
                    onClick={() => {
                      setSelectedGate(gName);
                      if (gName === "NOT") setInputB(false);
                    }}
                  >
                    {gName}
                  </Button>
                ))}
              </div>
            </div>

            {/* Circuit Simulator Pane */}
            <div className="lg:col-span-5 bg-muted/40 rounded-xl p-6 flex flex-col justify-between border border-border/40">
              <div className="text-center">
                <Badge className="mb-2">{activeGate.name}</Badge>
                <p className="text-lg font-mono font-bold text-primary">{activeGate.expression}</p>
                <p className="text-xs text-muted-foreground mt-1 px-4">{activeGate.description}</p>
              </div>

              {/* Graphical representation */}
              <div className="flex items-center justify-center gap-6 my-8 font-mono">
                {/* Inputs */}
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Input A</span>
                    <button
                      onClick={() => setInputA(!inputA)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                        inputA ? "bg-green-500" : "bg-zinc-600"
                      }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                          inputA ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-bold ${inputA ? "text-green-500" : "text-muted-foreground"}`}>
                      {inputA ? "1 (HIGH)" : "0 (LOW)"}
                    </span>
                  </div>

                  {selectedGate !== "NOT" && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">Input B</span>
                      <button
                        onClick={() => setInputB(!inputB)}
                        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                          inputB ? "bg-green-500" : "bg-zinc-600"
                        }`}
                      >
                        <div
                          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                            inputB ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className={`text-xs font-bold ${inputB ? "text-green-500" : "text-muted-foreground"}`}>
                        {inputB ? "1 (HIGH)" : "0 (LOW)"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-muted-foreground text-2xl font-light">→</div>

                {/* Gate Symbol */}
                <div className="px-6 py-4 rounded-xl bg-card border border-border shadow-sm font-bold text-xl flex items-center justify-center min-w-[70px] min-h-[50px] relative overflow-hidden">
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-tr ${simOutput ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500"}`} />
                  {selectedGate}
                </div>

                <div className="text-muted-foreground text-2xl font-light">→</div>

                {/* Output */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-muted-foreground">Output Y</span>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 shadow-sm transition-all duration-300 ${
                      simOutput
                        ? "bg-green-500/10 border-green-500 text-green-500 shadow-glow"
                        : "bg-red-500/10 border-red-500/30 text-red-500/70"
                    }`}
                  >
                    {simOutput ? "1" : "0"}
                  </div>
                  <span className="text-[10px] font-bold mt-1 text-muted-foreground">
                    {simOutput ? "HIGH" : "LOW"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground border-t pt-4 border-border/40">
                <span>Tip: Click inputs to toggle values!</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5"
                  onClick={() => {
                    setInputA(false);
                    setInputB(false);
                  }}
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Reset
                </Button>
              </div>
            </div>

            {/* Truth Table */}
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5" /> Truth Table
              </p>
              <div className="bg-card rounded-xl border overflow-hidden">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="bg-muted text-muted-foreground border-b text-xs text-center">
                      <th className="py-2.5 px-3">Input A</th>
                      {selectedGate !== "NOT" && <th className="py-2.5 px-3">Input B</th>}
                      <th className="py-2.5 px-3 text-primary">Output Y</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeGate.truthTable.map((row, idx) => {
                      const isCurrentState =
                        row.a === inputA && (selectedGate === "NOT" || row.b === inputB);
                      return (
                        <tr
                          key={idx}
                          className={`text-center border-b last:border-b-0 transition-colors ${
                            isCurrentState ? "bg-primary/10 font-bold text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          <td className="py-2 px-3">{row.a ? "1" : "0"}</td>
                          {selectedGate !== "NOT" && <td className="py-2 px-3">{row.b ? "1" : "0"}</td>}
                          <td className={`py-2 px-3 ${isCurrentState ? "text-primary" : ""}`}>
                            {row.out ? "1" : "0"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Universal Gates */}
        <section className="bg-card rounded-2xl p-8 shadow-card border border-border/40">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-primary" />
            Universal Gates: NAND & NOR
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            NAND and NOR gates are known as <strong>universal gates</strong> because any of the basic Boolean logic functions (AND, OR, NOT) can be constructed using only combinations of NAND or NOR gates. This makes them highly preferred in chip manufacturing due to standardization.
          </p>
        </section>
      </div>
    );
  }

  if (lessonId === "c3-l2") {
    // Lesson 2: Boolean Algebra and Logic Simplification
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 2: Boolean Algebra and Logic Simplification</h2>
          <p className="text-muted-foreground">
            Boolean algebra deals with logic variables that can have only two values (True/1 and False/0). Simplification of logic functions allows digital circuits to use fewer gates, reducing cost, power consumption, and propagation delay.
          </p>
        </div>

        {/* Basic Laws */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Zap className="w-5 h-5" /> Fundamental Laws of Boolean Algebra
            </h3>
            <ul className="space-y-2.5 text-sm font-mono text-muted-foreground">
              <li className="flex justify-between border-b pb-1">
                <span>Identity Law</span>
                <span>A + 0 = A &nbsp;|&nbsp; A • 1 = A</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Null Law</span>
                <span>A + 1 = 1 &nbsp;|&nbsp; A • 0 = 0</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Idempotent Law</span>
                <span>A + A = A &nbsp;|&nbsp; A • A = A</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Complement Law</span>
                <span>A + A' = 1 &nbsp;|&nbsp; A • A' = 0</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Commutative Law</span>
                <span>A + B = B + A &nbsp;|&nbsp; A•B = B•A</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Double Negation</span>
                <span>(A')' = A</span>
              </li>
            </ul>
          </div>

          {/* De Morgan's Theorem */}
          <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Zap className="w-5 h-5" /> De Morgan's Theorems
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              De Morgan's theorems describe the mathematical relationships used to simplify negations of product and sum terms.
            </p>
            <div className="space-y-3 font-mono">
              <div className="bg-muted p-4 rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground uppercase mb-1">Theorem 1 (Complement of Sum)</p>
                <p className="text-base font-bold text-secondary">(A + B)' = A' • B'</p>
                <p className="text-[10px] text-muted-foreground mt-1">"The complement of a sum is equal to the product of complements."</p>
              </div>
              <div className="bg-muted p-4 rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground uppercase mb-1">Theorem 2 (Complement of Product)</p>
                <p className="text-base font-bold text-secondary">(A • B)' = A' + B'</p>
                <p className="text-[10px] text-muted-foreground mt-1">"The complement of a product is equal to the sum of complements."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Karnaugh Map (K-Map) */}
        <section className="bg-card rounded-2xl p-8 border border-border shadow-card space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            Karnaugh Map (K-Map) Simplification
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            A <strong>Karnaugh Map (K-Map)</strong> is a graphical representation used to simplify Boolean expressions without having to use algebraic laws. It organizes truth table outputs into a grid where cells are arranged according to <strong>Gray Code</strong> (only one bit changes between adjacent cells). Grouping adjacent cells containing 1s (in groups of 1, 2, 4, 8, etc.) allows variables that change state to be eliminated.
          </p>
        </section>
      </div>
    );
  }

  if (lessonId === "c3-l4") {
    // Lesson 4: Latches and Flipflops
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Latches and Flip-flops</h2>
          <p className="text-muted-foreground">
            Latches and Flip-flops are bistable multivibrators — circuits that have two stable states (0 and 1) and can store 1 bit of memory. They form the foundation of sequential circuits.
          </p>
        </div>

        {/* Difference Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="p-5 bg-muted border-b">
            <h3 className="font-bold text-lg">Latch vs. Flip-flop</h3>
          </div>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b font-semibold text-muted-foreground text-xs uppercase">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 text-primary">Latch</th>
                <th className="py-3 px-4 text-secondary">Flip-flop</th>
              </tr>
            </thead>
            <tbody className="divide-y text-muted-foreground font-medium">
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-4 font-bold text-foreground">Trigger Mechanism</td>
                <td className="py-3 px-4">Level-triggered (active whenever clock/enable signal is HIGH)</td>
                <td className="py-3 px-4">Edge-triggered (active only during clock signal transitions: rising or falling edge)</td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-4 font-bold text-foreground">Clock Requirement</td>
                <td className="py-3 px-4">Does not strictly require clock (can use enable)</td>
                <td className="py-3 px-4">Strictly operates on clock signals</td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-4 font-bold text-foreground">Speed</td>
                <td className="py-3 px-4">Very fast (un-clocked, direct response)</td>
                <td className="py-3 px-4">Relatively slower (waits for clock edge)</td>
              </tr>
              <tr className="hover:bg-muted/10">
                <td className="py-3 px-4 font-bold text-foreground">Design Safety</td>
                <td className="py-3 px-4">Susceptible to race conditions (unsafe in synchronous circuits)</td>
                <td className="py-3 px-4">Safe, predictable output (standard for synchronous systems)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Types of Flip-flops */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-lg text-primary">SR Flip-flop</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on Set (S) and Reset (R) states. S=1, R=0 sets output Q to 1. S=0, R=1 resets Q to 0. S=1, R=1 is an <strong>invalid/forbidden state</strong> that causes race condition.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-lg text-primary">JK Flip-flop</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Similar to SR flip-flop, but sets J (Set) and K (Reset). Crucially, the J=1, K=1 input is allowed: it <strong>toggles</strong> the previous state, resolving the invalid state problem.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-lg text-primary">D Flip-flop (Data/Delay)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Has a single data input (D). The output Q simply copies input D at the active clock edge. Excellent for storing temporary registers or delaying data propagation.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
            <h4 className="font-bold text-lg text-primary">T Flip-flop (Toggle)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Has a single toggle input (T). If T=1, the output toggles (inverts) on each active clock edge. If T=0, it holds its state. Primarily used in counters and frequency dividers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (lessonId === "c3-l5") {
    // Lesson 5: Shift Registers and Counters
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 5: Shift Registers and Counters</h2>
          <p className="text-muted-foreground">
            Shift registers and counters are key storage and timing components built by chaining multiple flip-flops together.
          </p>
        </div>

        {/* Shift Registers */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            Shift Registers
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            A <strong>shift register</strong> is a group of flip-flops connected in series, used to store binary data and shift it from one flip-flop to another at each clock cycle.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: "SISO", label: "Serial-In Serial-Out", desc: "Data is loaded bit-by-bit and read out bit-by-bit. Minimal pin count." },
              { type: "SIPO", label: "Serial-In Parallel-Out", desc: "Data is loaded sequentially, but read out simultaneously. Great for conversion." },
              { type: "PISO", label: "Parallel-In Serial-Out", desc: "Data is loaded simultaneously, then shifted out sequentially." },
              { type: "PIPO", label: "Parallel-In Parallel-Out", desc: "Data is loaded simultaneously and read out simultaneously. Fastest transfer." },
            ].map((reg) => (
              <div key={reg.type} className="bg-card rounded-xl p-5 border border-border/50 flex flex-col justify-between shadow-sm">
                <div>
                  <Badge variant="secondary" className="mb-2 text-primary font-bold">{reg.type}</Badge>
                  <h4 className="font-bold text-sm mb-1">{reg.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Counters */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Zap className="w-6 h-6 text-secondary" />
            Binary Counters
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            A <strong>counter</strong> is a register that goes through a predetermined sequence of states on application of clock pulses.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
              <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                Asynchronous (Ripple) Counter
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In an asynchronous counter, only the first flip-flop is clocked directly. The subsequent flip-flops are clocked by the outputs of the preceding ones.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside pl-1">
                <li>Simple design, requires fewer connections</li>
                <li>Propagation delay accumulates ("ripple effect")</li>
                <li>Limited speed, unsafe at high clock frequencies</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-6 border shadow-sm space-y-3">
              <h4 className="font-bold text-lg text-secondary flex items-center gap-2">
                Synchronous Counter
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In a synchronous counter, all flip-flops are clocked simultaneously by the same master clock signal.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside pl-1">
                <li>More complex logic gates needed for triggering</li>
                <li>No accumulated propagation delay</li>
                <li>Capable of very high-speed operations</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
