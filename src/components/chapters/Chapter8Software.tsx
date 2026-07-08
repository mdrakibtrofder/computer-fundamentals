import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Settings, FileCode, Terminal, BookOpen, CheckCircle2, Copy, Check, Globe, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/* ────── Data ────── */

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

/* ────── Simplified Syntax Highlighter ────── */

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
    <pre className="text-xs sm:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
      {highlightedLines.map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line || " " }} />
      ))}
    </pre>
  );
}

/* ────── Main Component ────── */

export function Chapter8Software({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (lessonId === "c8-l1") {
    // Lesson 1: Introduction and Classification
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Introduction and Classification</h2>
          <p className="text-muted-foreground font-medium italic">
            "Without software, a computer is simply a mass of electronic components."
          </p>
        </div>

        {/* Software Activities */}
        <div className="grid md:grid-cols-3 gap-6">
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
              <p className="text-xs text-muted-foreground leading-relaxed">{activity.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Classifications */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Classification of Software</h3>
            <div className="space-y-4">
              {softwareClassifications.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-sm border border-border/50 flex gap-4"
                >
                  <div className={`p-3 rounded-lg bg-primary/10 h-fit text-primary`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Application Categories</h3>
            <div className="grid gap-4">
              {appTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-sm border border-border/50"
                >
                  <h4 className="font-semibold text-primary mb-2 text-base">{type.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex) => (
                      <Badge key={ex} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-[10px] font-normal">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Licensing */}
        <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
          <h3 className="text-2xl font-bold mb-8 text-center">Software Licensing Models</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {licenseTypes.map((type) => (
              <div key={type.name} className="bg-card rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{type.icon}</span>
                <h4 className="font-bold mb-2 text-sm">{type.name}</h4>
                <p className="text-xs text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (lessonId === "c8-l3") {
    // Lesson 3: Programming Languages
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 3: Programming Languages</h2>
          <p className="text-muted-foreground">
            A program is a set of instructions written in a computer language. The process of writing these instructions is called programming.
          </p>
        </div>

        {/* Generations */}
        <div className="grid lg:grid-cols-4 gap-4">
          {programmingGenerations.map((gen, index) => (
            <motion.div
              key={gen.gen}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border/50 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{gen.icon}</span>
                <Badge variant="outline" className="text-primary border-primary/20">
                  {gen.gen}
                </Badge>
              </div>
              <h4 className="font-bold mb-2 group-hover:text-primary transition-colors text-sm">{gen.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{gen.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code Examples */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Language Overviews & Examples</h3>
          <Tabs defaultValue="c-cpp" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {languageDetails.map((lang) => (
                <TabsTrigger key={lang.id} value={lang.id} className="gap-2">
                  <lang.icon className="w-4 h-4" />
                  <span>{lang.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {languageDetails.map((lang) => (
              <TabsContent key={lang.id} value={lang.id} className="space-y-6">
                <Card className="border shadow-card bg-card/60 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <lang.icon className="w-5 h-5 text-primary" />
                      {lang.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {lang.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                      <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground px-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        <span>Output: Prints department and university name as requested.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    );
  }

  return null;
}
