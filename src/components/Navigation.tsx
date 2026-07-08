import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, BookOpen, ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chapters, Chapter, Lesson } from "@/lib/courseData";

interface NavigationProps {
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  completedLessons: Record<string, boolean>;
}

export function Navigation({
  currentLessonId,
  onSelectLesson,
  completedLessons,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Keep track of expanded chapters in the sidebar
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Find the active chapter and auto-expand it on load
  useEffect(() => {
    const activeChapter = chapters.find((ch) =>
      ch.lessons.some((l) => l.id === currentLessonId)
    );
    if (activeChapter) {
      setExpandedChapters((prev) => ({
        ...prev,
        [activeChapter.id]: true,
      }));
    }
  }, [currentLessonId]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Calculate overall course progress
  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const renderNavContent = () => (
    <div className="flex h-full flex-col px-4 py-6">
      {/* Brand logo */}
      <a href="#" className="flex items-center gap-3 group px-2">
        <div className="rounded-xl bg-primary p-2.5 text-primary-foreground shadow-glow transition-shadow group-hover:shadow-card">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-bold tracking-tight">CSE 2109</p>
          <p className="text-xs text-muted-foreground">Computer Fundamentals</p>
        </div>
      </a>

      {/* Progress Bar */}
      <div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            Course Progress
          </span>
          <span className="text-primary">{progressPercent}%</span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
          {completedCount} of {totalLessons} lessons completed.
        </p>
      </div>

      {/* Chapter & Lesson Accordion List */}
      <nav className="mt-6 flex-1 space-y-1 overflow-y-auto pr-1">
        {chapters.map((ch) => {
          const isExpanded = expandedChapters[ch.id];
          const hasActiveLesson = ch.lessons.some((l) => l.id === currentLessonId);

          return (
            <div key={ch.id} className="space-y-1">
              {/* Chapter Title Trigger */}
              <button
                onClick={() => toggleChapter(ch.id)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-bold transition-all ${
                  hasActiveLesson
                    ? "bg-primary/5 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 pr-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-primary">
                    {ch.number}
                  </span>
                  <span className="truncate">{ch.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {/* Lessons Sub-menu */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden pl-3 border-l border-border/60 ml-5 space-y-0.5"
                  >
                    {ch.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLessonId;
                      const isCompleted = completedLessons[lesson.id];

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            onSelectLesson(lesson.id);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <span className="text-[10px] opacity-70">L{lesson.number}:</span>
                            {lesson.title}
                          </span>
                          {isCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="h-3 w-3 text-muted-foreground/35 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 lg:hidden ${
          scrolled ? "glass-card shadow-card border-border" : "bg-background/80 backdrop-blur-xl border-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">CSE 2109</span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            className="h-9 w-9"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.header>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/70 bg-background/90 backdrop-blur-xl lg:flex lg:flex-col"
      >
        {renderNavContent()}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
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
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-xs flex-col border-r border-border bg-background shadow-2xl lg:hidden"
            >
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="h-8 w-8"
                >
                  <X className="h-4.5 w-4.5" />
                </Button>
              </div>
              {renderNavContent()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
