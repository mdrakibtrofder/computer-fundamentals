import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Settings, FileCode, Cpu, Terminal, BookOpen, CheckCircle2, Copy, Check, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const softwareActivities = [
  {
    name: "Application programs",
    desc: "Performs specific, well-defined tasks for particular applications like accounting, word processing, or gaming.",
    icon: Terminal,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    name: "Systems programs",
    desc: "Software that manages computer hardware and system resources, usually pre-installed by the manufacturer.",
    icon: Settings,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    name: "Documentation",
    desc: "Non-executable materials including problem statements, flowcharts, user manuals, and source code explanations.",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

const softwareClassifications = [
  {
    name: "System Software",
    desc: "Software that helps users interact with the hardware by handling background tasks, translating code, and managing system operations.",
    icon: Layers,
    color: "bg-primary",
  },
  {
    name: "Application Software",
    desc: "Programs developed by users or professionals to perform specific tasks. Common languages used include C, C++, Java, and Python.",
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
  { name: "Commercial Software", desc: "Software developed for sale, often requiring a license fee and offering full support.", icon: "💰" },
  { name: "Shareware", desc: "Software distributed for free on a trial basis, with full features requiring payment after a period.", icon: "⏱️" },
  { name: "Freeware", desc: "Software available for use at no cost, though the source code remains copyrighted and restricted.", icon: "🆓" },
];

const programmingGenerations = [
  { gen: "1GL", name: "First Generation", desc: "Machine languages based on binary (0 and 1) that the computer understands directly.", icon: "🔢" },
  { gen: "2GL", name: "Second Generation", desc: "Assembly languages using mnemonic codes, making it easier than binary but still hard for humans.", icon: "🛠️" },
  { gen: "3GL", name: "Third Generation", desc: "High-level procedural languages like C, C++, Java, and Python that use English-like syntax.", icon: "📝" },
  { gen: "4GL", name: "Fourth Generation", desc: "Non-procedural languages focusing on what to do rather than how, such as SQL for database queries.", icon: "⚡" },
];

const languageDetails = [
  {
    id: "c-cpp",
    name: "C and C++",
    icon: Cpu,
    desc: "C offers low-level hardware access with high-level structured programming. C++ adds object-oriented features, providing high performance and flexibility.",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Department of English\\n");\n    printf("Bangladesh Army University of Science and Technology, Saidpur\\n");\n    return 0;\n}`,
    lang: "c"
  },
  {
    id: "java",
    name: "Java",
    icon: Terminal,
    desc: "A secure, platform-independent object-oriented language designed for web-based network applications. Java code can run on any operating system.",
    code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Department of English");\n        System.out.println("Bangladesh Army University of Science and Technology, Saidpur");\n    }\n}`,
    lang: "java"
  },
  {
    id: "html",
    name: "HTML",
    icon: Globe,
    desc: "HTML stands for HyperText Markup Language. It is used to create and structure web pages by using simple tags to define headings, links, and other content.",
    code: `<!DOCTYPE html>\n<html>\n<body>\n    <h1>Department of English</h1>\n    <p>Bangladesh Army University of Science and Technology, Saidpur</p>\n</body>\n</html>`,
    lang: "html"
  }
];

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
                      <Badge key={ex} variant="secondary" className="bg-muted text-xs font-normal">
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
                        <pre className="rounded-2xl bg-zinc-950 p-6 overflow-x-auto border border-zinc-800 shadow-2xl">
                          <code className="text-sm sm:text-base font-mono text-zinc-300 leading-relaxed">
                            {lang.code}
                          </code>
                        </pre>
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
      </div>
    </section>
  );
}
