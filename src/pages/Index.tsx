import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Chapter1Introduction } from "@/components/chapters/Chapter1Introduction";
import { Chapter2 } from "@/components/chapters/Chapter2";
import { Chapter3DigitalCircuits } from "@/components/chapters/Chapter3DigitalCircuits";
import { Chapter4Microcomputer } from "@/components/chapters/Chapter4Microcomputer";
import { Chapter5IODevices } from "@/components/chapters/Chapter5IODevices";
import { Chapter6Microprocessor } from "@/components/chapters/Chapter6Microprocessor";
import { Chapter7Memory } from "@/components/chapters/Chapter7Memory";
import { Chapter8Software } from "@/components/chapters/Chapter8Software";
import { Chapter9SystemSoftware } from "@/components/chapters/Chapter9SystemSoftware";
import { Chapter12Networks } from "@/components/chapters/Chapter12Networks";
import { Chapter13IT } from "@/components/chapters/Chapter13IT";
import { Chapter14Society } from "@/components/chapters/Chapter14Society";
import { TrackingDemo } from "@/components/TrackingDemo";
import { Footer } from "@/components/Footer";
import { flatLessons, FlatLesson } from "@/lib/courseData";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { pushToDataLayer } from "@/lib/gtm-datalayer";

const Index = () => {
  // Load current lesson from localStorage or default to first
  const [currentLessonId, setCurrentLessonId] = useState<string>(() => {
    return localStorage.getItem("cf-current-lesson-id") || "c1-l1";
  });

  // Load completed lessons from localStorage
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem("cf-completed-lessons");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("cf-current-lesson-id", currentLessonId);
    // Push page view change to data layer
    const activeLesson = flatLessons.find(l => l.id === currentLessonId);
    if (activeLesson) {
      pushToDataLayer("page_view", {
        lesson_id: activeLesson.id,
        lesson_title: activeLesson.title,
        chapter_id: activeLesson.chapterId,
        chapter_title: activeLesson.chapterTitle
      });
    }
  }, [currentLessonId]);

  useEffect(() => {
    localStorage.setItem("cf-completed-lessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  const activeLessonIndex = flatLessons.findIndex((l) => l.id === currentLessonId);
  const activeLesson: FlatLesson | undefined = flatLessons[activeLessonIndex];

  const handleSelectLesson = (id: string) => {
    setCurrentLessonId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < flatLessons.length - 1) {
      handleSelectLesson(flatLessons[activeLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      handleSelectLesson(flatLessons[activeLessonIndex - 1].id);
    }
  };

  const toggleCompleted = () => {
    setCompletedLessons((prev) => {
      const updated = {
        ...prev,
        [currentLessonId]: !prev[currentLessonId],
      };
      // Track completion
      if (updated[currentLessonId]) {
        pushToDataLayer("lesson_complete", {
          lesson_id: currentLessonId,
          lesson_title: activeLesson?.title
        });
      }
      return updated;
    });
  };

  // Dynamically render the active chapter component
  const renderActiveLessonContent = () => {
    if (!activeLesson) return null;

    switch (activeLesson.chapterId) {
      case "chapter-1":
        return <Chapter1Introduction lessonId={currentLessonId} />;
      case "chapter-2":
        return <Chapter2 lessonId={currentLessonId} />;
      case "chapter-3":
        return <Chapter3DigitalCircuits lessonId={currentLessonId} />;
      case "chapter-4":
        return <Chapter4Microcomputer lessonId={currentLessonId} />;
      case "chapter-5":
        return <Chapter5IODevices lessonId={currentLessonId} />;
      case "chapter-6":
        return <Chapter6Microprocessor lessonId={currentLessonId} />;
      case "chapter-7":
        return <Chapter7Memory lessonId={currentLessonId} />;
      case "chapter-8":
        return <Chapter8Software lessonId={currentLessonId} />;
      case "chapter-9":
        return <Chapter9SystemSoftware lessonId={currentLessonId} />;
      case "chapter-12":
        return <Chapter12Networks lessonId={currentLessonId} />;
      case "chapter-13":
        return <Chapter13IT lessonId={currentLessonId} />;
      case "chapter-14":
        return <Chapter14Society lessonId={currentLessonId} />;
      default:
        return <div className="p-8 text-center text-muted-foreground">Select a lesson to begin.</div>;
    }
  };

  const isCompleted = completedLessons[currentLessonId];

  return (
    <div className="min-h-screen bg-background lg:pl-72 flex flex-col justify-between">
      <Navigation
        currentLessonId={currentLessonId}
        onSelectLesson={handleSelectLesson}
        completedLessons={completedLessons}
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-8">
        {/* Render Hero Section only on first lesson of first chapter */}
        {currentLessonId === "c1-l1" && (
          <div className="mb-8">
            <HeroSection />
          </div>
        )}

        {/* Dynamic lesson viewer */}
        <div className="bg-card/40 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-border/50 shadow-sm min-h-[500px]">
          {renderActiveLessonContent()}

          {/* Lesson Action Bar & Navigation */}
          <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={isCompleted ? "default" : "outline"}
                className={`gap-2 h-10 font-semibold transition-all ${
                  isCompleted ? "bg-green-600 hover:bg-green-700 text-white" : ""
                }`}
                onClick={toggleCompleted}
              >
                <CheckCircle2 className={`h-4 w-4 ${isCompleted ? "text-white" : "text-muted-foreground"}`} />
                <span>{isCompleted ? "Lesson Completed" : "Mark as Completed"}</span>
              </Button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                onClick={handlePrevLesson}
                disabled={activeLessonIndex === 0}
                className="gap-1.5 h-10 w-28"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextLesson}
                disabled={activeLessonIndex === flatLessons.length - 1}
                className="gap-1.5 h-10 w-28 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-none"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Collapsible GTM Developer Playground */}
        <div className="mt-12 max-w-5xl mx-auto py-8">
          <details className="group bg-slate-950/20 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer select-none font-bold text-sm text-slate-300 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-blue-400" />
                Performance Data Layer Console
              </span>
              <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 border-t border-white/5 bg-slate-950/10">
              <TrackingDemo />
            </div>
          </details>
        </div>
      </main>

      <div className="lg:pl-0 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
