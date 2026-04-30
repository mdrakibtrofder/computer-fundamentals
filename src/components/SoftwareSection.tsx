import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Settings, FileCode, Cpu, Terminal, BookOpen, CheckCircle2, Copy, Check, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

/* ═══════════════════════════════════════════
   Simplified Syntax Highlighter
   ═══════════════════════════════════════════ */

function SyntaxHighlighter({ code, lang }: { code: string; lang: string }) {
  const highlightCode = (line: string, language: string) => {
    if (language === "c" || language === "java") {
      return line
        .replace(/(\/\/.*)/g, '<span class="text-zinc-500 italic">$1</span>') // Comments
        .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>') // Strings
        .replace(/\b(int|return|public|class|static|void|String|if|else|for|while|include)\b/g, '<span class="text-purple-400 font-semibold">$1</span>') // Keywords
        .replace(/\b(printf|System|out|println|main)\b/g, '<span class="text-blue-400">$1</span>'); // Functions/Classes
    }
    
    if (language === "html") {
      return line
        .replace(/(<!--.*?-->)/g, '<span class="text-zinc-500 italic">$1</span>') // Comments
        .replace(/(&lt;!DOCTYPE.*?&gt;)/gi, '<span class="text-orange-400 font-bold">$1</span>') // Doctype
        .replace(/(&lt;\/?[a-z0-9]+\b)/gi, '<span class="text-pink-500 font-semibold">$1</span>') // Tag Start
        .replace(/(&gt;)/g, '<span class="text-pink-500 font-semibold">$1</span>') // Tag End
        .replace(/(\b[a-z-]+(?==))/gi, '<span class="text-yellow-400 italic">$1</span>') // Attributes
        .replace(/(".*?")/g, '<span class="text-emerald-400 font-medium">$1</span>'); // Attribute Values
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
        <div className="mb-16">
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
                        <div className="rounded-2xl bg-zinc-950 p-6 overflow-x-auto border border-zinc-800 shadow-2xl">
                          <SyntaxHighlighter code={lang.code} lang={lang.lang} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
