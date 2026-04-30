import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Settings, FileCode, Cpu, Terminal, BookOpen, CheckCircle2, Copy, Check, Globe, AlertTriangle, Zap, ArrowRightLeft, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* ═══════════════════════════════════════════
   Definitions Data
   ═══════════════════════════════════════════ */

const softwareActivities = [
  {
    name: "Application programs",
    desc: "An application program performs a specific, well-defined task for a particular application.",
    icon: Terminal,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    name: "Systems programs",
    desc: "System programs are the programs that help run and manage the computer system, not the ones used for everyday tasks. They are usually provided by the computer manufacturer as part of the system.",
    icon: Settings,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    name: "Documentation",
    desc: "Documentation includes everything put down on paper, such as a statement of the problems, flowcharting and coding.",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

const softwareClassifications = [
  {
    name: "System Software",
    desc: "Consists of programs which facilitate the use of the computer by performing standard tasks as in various languages to a form acceptable to hardware.",
    icon: Layers,
    color: "bg-primary",
  },
  {
    name: "Application Software",
    desc: "Developed by the users themselves using suitable programming languages like C, C++, Java, and Python to perform specific tasks.",
    icon: FileCode,
    color: "bg-secondary",
  },
];

const appTypes = [
  {
    name: "Horizontal Applications",
    desc: "General-purpose software designed to perform common tasks across various industries and business types.",
    examples: ["Microsoft Word", "Google Chrome", "Adobe Photoshop", "Microsoft Excel", "Slack"]
  },
  {
    name: "Vertical Applications",
    desc: "Specialized software tailored to meet the unique needs of a specific industry or niche market.",
    examples: ["Electronic Health Records (EHR)", "AutoCAD for Engineering", "Hospital Management Systems", "Point of Sale (POS) for Retail", "Aviation Navigation Systems"]
  }
];

const licenseTypes = [
  { 
    name: "Commercial Software", 
    desc: "Software developed for sale, often requiring a license fee.", 
    icon: "💰" 
  },
  { 
    name: "Shareware", 
    desc: "Try-before-buy software with limited features or time.", 
    icon: "⏱️" 
  },
  { 
    name: "Freeware", 
    desc: "Free to use software, though creator retains copyright.", 
    icon: "🆓" 
  },
];

const programmingGenerations = [
  { 
    gen: "1GL", 
    name: "First Generation", 
    desc: "Machine languages (based on 0 and 1).", 
    icon: "🔢" 
  },
  { 
    gen: "2GL", 
    name: "Second Generation", 
    desc: "Assembly languages (based on special code but difficult to understand by human).", 
    icon: "🛠️" 
  },
  { 
    gen: "3GL", 
    name: "Third Generation", 
    desc: "High level languages, procedural languages (similar to English language, example- C,C++,Java, Python).", 
    icon: "📝" 
  },
  { 
    gen: "4GL", 
    name: "Fourth Generation", 
    desc: "Nonprocedural languages. (example: SQL).", 
    icon: "⚡" 
  },
];

const languageDetails = [
  {
    id: "c-cpp",
    name: "C and C++",
    icon: Cpu,
    desc: "C allows a programmer to write code with low-level access to the hardware but with high-level structured programming concept. C++ incorporates object oriented features and provides flexibility.",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Department of English\\n");\n    printf("Bangladesh Army University of Science and Technology, Saidpur\\n");\n    return 0;\n}`,
    lang: "c"
  },
  {
    id: "java",
    name: "Java",
    icon: Terminal,
    desc: "An object oriented programming language, similar to C++ but simpler, secure and platform independent. Designed for real-time, interactive, Web-based applications.",
    code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Department of English");\n        System.out.println("Bangladesh Army University of Science and Technology, Saidpur");\n    }\n}`,
    lang: "java"
  },
  {
    id: "html",
    name: "HTML",
    icon: Globe,
    desc: "HyperText Markup Language creates hypertext documents. It embeds control codes in text that designate titles, headings, graphics, and hyperlinks.",
    code: `<!DOCTYPE html>\n<html>\n<body>\n    <h1>Department of English</h1>\n    <p>Bangladesh Army University of Science and Technology, Saidpur</p>\n</body>\n</html>`,
    lang: "html"
  }
];

const systemSoftwareGroups = [
  { name: "Operating systems", icon: Settings },
  { name: "Language translators", icon: ArrowRightLeft },
  { name: "Utility programs", icon: Zap },
];

const machineLanguageDisadvantages = [
  "The program must be written in machine language (ie., with Is and 0s)",
  "Entering machine language program is a tedious process",
  "Error detection and correction is tedious and consumes much time",
  "Programs writen in machine language for a specific machine cannot be used for another type of machine."
];

const comparisonData = [
  {
    feature: "Program Preparation",
    compiler: "Compiler prepares an object program from source program",
    interpreter: "Interpreter translates and immediately executes each instruction of the source program"
  },
  {
    feature: "Debugging",
    compiler: "Debugging is complex and time consuming",
    interpreter: "It is a debugging tool and is useful during program development stage"
  },
  {
    feature: "Execution Time",
    compiler: "Lower execution time",
    interpreter: "Higher execution time"
  },
  {
    feature: "Development Effort",
    compiler: "Requires higher program development effort and time",
    interpreter: "Requires less program development effort and time"
  }
];

/* ═══════════════════════════════════════════
   Simplified Syntax Highlighter
   ═══════════════════════════════════════════ */

function SyntaxHighlighter({ code, lang }: { code: string; lang: string }) {
  const highlightCode = (line: string, language: string) => {
    if (language === "c" || language === "java") {
      return line
        .replace(/(\/\/.*)/g, '<span class="text-zinc-500 italic">$1</span>') // Comments
        .replace(/(".*?")/g, '<span class="text-emerald-600 font-medium">$1</span>') // Strings
        .replace(/\b(int|return|public|class|static|void|String|if|else|for|while|include)\b/g, '<span class="text-purple-600 font-semibold">$1</span>') // Keywords
        .replace(/\b(printf|System|out|println|main)\b/g, '<span class="text-blue-600 font-medium">$1</span>'); // Functions/Classes
    }
    
    if (language === "html") {
      return line
        .replace(/(<!--.*?-->)/g, '<span class="text-zinc-500 italic">$1</span>') // Comments
        .replace(/(&lt;!DOCTYPE.*?&gt;)/gi, '<span class="text-orange-600 font-bold">$1</span>') // Doctype
        .replace(/(&lt;\/?[a-z0-9]+\b)/gi, '<span class="text-pink-600 font-semibold">$1</span>') // Tag Start
        .replace(/(&gt;)/g, '<span class="text-pink-600 font-semibold">$1</span>') // Tag End
        .replace(/(\b[a-z-]+(?==))/gi, '<span class="text-amber-600 italic">$1</span>') // Attributes
        .replace(/(".*?")/g, '<span class="text-emerald-600 font-medium">$1</span>'); // Attribute Values
    }
    
    return line;
  };

  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const highlightedLines = escapedCode.split("\n").map(line => highlightCode(line, lang));

  return (
    <pre className="text-sm sm:text-base font-mono leading-relaxed whitespace-pre overflow-x-auto">
      {highlightedLines.map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line || " " }} />
      ))}
    </pre>
  );
}

export function SoftwareSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="software" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Chapter 8</span>
          <h2 className="heading-2 mt-2 mb-4">Computer Software</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-foreground font-medium">
              Software consists of statements which instruct a computer to perform the required task.
            </p>
            <p className="text-muted-foreground italic">
              "Without software, a computer is simply a mass of electronic components."
            </p>
          </div>
        </motion.div>

        {/* Software Activities */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {softwareActivities.map((activity, index) => (
            <motion.div
              key={activity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${activity.bg} ${activity.color} flex items-center justify-center mb-4`}>
                <activity.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{activity.name}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{activity.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Classification and Types */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Main Classifications */}
          <div className="space-y-6">
            <h3 className="heading-3 mb-6">Classification of Software</h3>
            <div className="space-y-4">
              {softwareClassifications.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-sm border border-border/50 flex gap-4"
                >
                  <div className={`p-3 rounded-lg ${item.color}/10 h-fit`}>
                    <item.icon className={`w-6 h-6 ${item.color === 'bg-primary' ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Horizontal vs Vertical */}
          <div className="space-y-6">
            <h3 className="heading-3 mb-6">Application Categories</h3>
            <div className="grid gap-4">
              {appTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-sm border border-border/50"
                >
                  <h4 className="font-semibold text-primary mb-2">{type.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex) => (
                      <Badge key={ex} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-xs font-normal">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Licensing Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary/5 rounded-3xl p-8 mb-16 border border-primary/10"
        >
          <h3 className="heading-3 mb-8 text-center">Software Licensing Models</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {licenseTypes.map((type) => (
              <div key={type.name} className="bg-card rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{type.icon}</span>
                <h4 className="font-bold mb-2">{type.name}</h4>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lesson 3: Programming Languages */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Lesson 3</span>
            <h2 className="heading-2 mt-2 mb-4">Programming Languages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A program is a set of instructions written in a computer language. The process of writing these instructions is called programming.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-4 mb-12">
            {programmingGenerations.map((gen, index) => (
              <motion.div
                key={gen.gen}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{gen.icon}</span>
                  <Badge variant="outline" className="text-primary border-primary/20">
                    {gen.gen}
                  </Badge>
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{gen.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{gen.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Code Examples Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-8"
          >
            <h3 className="heading-3 text-center">Language Overviews & Examples</h3>
            <Tabs defaultValue="c-cpp" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {languageDetails.map((lang) => (
                  <TabsTrigger key={lang.id} value={lang.id} className="gap-2">
                    <lang.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{lang.name}</span>
                    <span className="sm:hidden">{lang.name.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {languageDetails.map((lang) => (
                <TabsContent key={lang.id} value={lang.id} className="space-y-6">
                  <Card className="border-none shadow-none bg-transparent">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <lang.icon className="w-6 h-6 text-primary" />
                        {lang.name}
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {lang.desc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="relative group">
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 gap-2 bg-background/80 backdrop-blur-sm"
                            onClick={() => copyToClipboard(lang.code, lang.id)}
                          >
                            {copiedId === lang.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-500" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="rounded-2xl bg-muted/40 p-6 overflow-x-auto border border-border shadow-sm">
                          <SyntaxHighlighter code={lang.code} lang={lang.lang} />
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground px-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          <span>Output: Prints department and university name as requested.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>

        {/* Chapter 10 Section */}
        <div className="border-t border-border pt-24 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Chapter 10</span>
            <h2 className="heading-2 mt-2 mb-4">System Software and Operating System</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Systems software refers to programs that assist the users to generate, debug, test, modify application programs, and then to execute them. The system programs can be used by different users and different application programs.
            </p>
          </motion.div>

          {/* Groups of System Software */}
          <div className="grid sm:grid-cols-3 gap-6 mb-20">
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
                <h4 className="font-bold">{group.name}</h4>
              </motion.div>
            ))}
          </div>

          {/* Language Translators Detailed */}
          <div className="space-y-12 mb-20">
            <h3 className="heading-3 text-center mb-10">Language Translators</h3>
            
            {/* Machine Language Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">0️⃣1️⃣</span>
                <h4 className="heading-4 text-primary">Machine language</h4>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The machine language is written in words comprising of Is and Os. Computers execute commands or instructions in machine language.
              </p>
              <div className="bg-destructive/5 rounded-2xl p-6 border border-destructive/10">
                <h5 className="font-bold text-destructive mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Disadvantages:
                </h5>
                <ul className="space-y-3">
                  {machineLanguageDisadvantages.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Assembler Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">⚙️</span>
                <h4 className="heading-4 text-primary">Assembler</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Programming in assembly language is easier than programming in machine language. The programmer is required to write a source code for each instruction in the program and the assembler translates in to machine language. The programmer maintains total control of the computer operation.
              </p>
            </motion.div>

            {/* Compiler and Interpreter Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">🔄</span>
                <h4 className="heading-4 text-primary">Compiler and Interpreter</h4>
              </div>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  A Compiler is a program that translates programs written in high level language into machine language. The compiler generates several machine language instructions for each source statement. An assembler or a compiler produces the object program, which is loaded into the computer memory before execution.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The interpreter does not prepare an object program. It translates and immediately executes each instruction of the source program. Thus an interpretive language is also an interactive language: it enables the user to load one instruction into the computer at a time and have it translated and executed.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Comparison Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 mb-20"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Scale className="w-4 h-4" />
                Comparison
              </div>
              <h3 className="heading-3">Compiler vs Interpreter</h3>
            </div>

            <div className="bg-card rounded-3xl border border-border/50 shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[200px] font-bold text-foreground">Feature</TableHead>
                    <TableHead className="font-bold text-primary">Compiler</TableHead>
                    <TableHead className="font-bold text-secondary">Interpreter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-semibold text-muted-foreground">{row.feature}</TableCell>
                      <TableCell className="leading-relaxed">{row.compiler}</TableCell>
                      <TableCell className="leading-relaxed">{row.interpreter}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
