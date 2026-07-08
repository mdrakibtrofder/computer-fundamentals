import { motion } from "framer-motion";
import { Binary, ArrowRight, Database } from "lucide-react";
import { Chapter2NumberSystems } from "../NumberSystemsSection";
import { BinaryArithmeticSection } from "../BinaryArithmeticSection";

const codes = [
  {
    name: "BCD (Binary Coded Decimal)",
    description: "Represents each decimal digit with 4 binary bits. Example: 9 = 1001",
    example: "47₁₀ = 0100 0111 (BCD)",
  },
  {
    name: "Gray Code",
    description: "Only one bit changes between consecutive values. Used in error correction and rotary encoders.",
    example: "0→1: 000→001, 1→2: 001→011",
  },
  {
    name: "ASCII",
    description: "American Standard Code for Information Interchange. 7-bit encoding for 128 characters.",
    example: "'A' = 65₁₀ = 01000001₂",
  },
  {
    name: "EBCDIC",
    description: "Extended Binary Coded Decimal Interchange Code. 8-bit encoding used by IBM mainframes.",
    example: "'A' = 193₁₀ = 11000001₂",
  },
];

const dataRepresentations = [
  { type: "Integers", desc: "Sign-magnitude, 1's complement, 2's complement" },
  { type: "Floating Point", desc: "IEEE 754 standard (single/double precision)" },
  { type: "Characters", desc: "ASCII, Unicode, UTF-8 encoding" },
  { type: "Images", desc: "Bitmap, vector graphics, compression formats" },
];

export function Chapter2({ lessonId }: { lessonId: string }) {
  if (lessonId === "c2-l1" || lessonId === "c2-l2") {
    return <Chapter2NumberSystems lessonId={lessonId} />;
  }

  if (lessonId === "c2-l3") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 3: Binary Arithmetic</h2>
          <p className="text-muted-foreground">
            Learn and visualize how basic mathematical operations (addition, subtraction, multiplication, division) are performed in binary, along with 1's and 2's complement logic.
          </p>
        </div>
        <BinaryArithmeticSection />
      </div>
    );
  }

  if (lessonId === "c2-l4") {
    // Lesson 4: Data Representation and Codes
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Data Representation and Codes</h2>
          <p className="text-muted-foreground">
            Exploring how text, numbers, and symbols are coded into binary, and how computers represent various data types.
          </p>
        </div>

        {/* Computer Codes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Binary className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Computer Codes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {codes.map((code) => (
              <div
                key={code.name}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <h4 className="font-bold text-lg mb-2 text-primary">{code.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{code.description}</p>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted font-mono text-sm">
                  <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
                  {code.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Representation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Database className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold">Data Representation Types</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataRepresentations.map((item) => (
              <div
                key={item.type}
                className="bg-card rounded-xl p-5 shadow-card text-center border border-border/50"
              >
                <h4 className="font-semibold mb-2 text-base">{item.type}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
