import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Introduction", href: "#introduction" },
  { label: "Number Systems", href: "#number-systems" },
  { label: "Binary Arithmetic", href: "#binary-arithmetic" },
  { label: "Codes & Organization", href: "#codes" },
  { label: "Hardware", href: "#hardware" },
  { label: "I/O Devices", href: "#io-devices" },
  { label: "Microprocessor", href: "#microprocessor" },
  { label: "Memory Organization", href: "#memory-organization" },
  { label: "Software", href: "#software" },
  { label: "Networks", href: "#networks" },
  { label: "Visualization", href: "#visualization" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 lg:hidden ${
          scrolled ? "glass-card shadow-card border-border" : "bg-background/80 backdrop-blur-xl border-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground group-hover:shadow-glow transition-shadow">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">CSE 2109</span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.header>

      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/70 bg-background/90 backdrop-blur-xl lg:flex lg:flex-col"
      >
        <div className="flex h-full flex-col px-6 py-8">
          <a href="#" className="flex items-center gap-3 group">
            <div className="rounded-xl bg-primary p-3 text-primary-foreground shadow-glow transition-shadow group-hover:shadow-card">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold">CSE 2109</p>
              <p className="text-sm text-muted-foreground">Computer Fundamentals</p>
            </div>
          </a>

          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              Course Outline
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Jump between topics and move through the course from fundamentals to hands-on visualization.
            </p>
          </div>

          <nav className="mt-8 flex-1 space-y-2 overflow-y-auto pr-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {index + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-xs flex-col border-r border-border bg-background p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">CSE 2109</p>
                    <p className="text-xs text-muted-foreground">Computer Fundamentals</p>
                  </div>
                </a>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="mt-8 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
