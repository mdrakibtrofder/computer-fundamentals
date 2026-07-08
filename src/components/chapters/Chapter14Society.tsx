import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Monitor, Zap, Shield, AlertTriangle, Heart, Building2, GraduationCap } from "lucide-react";

const impacts = [
  {
    area: "Education",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    points: [
      "E-learning platforms and online courses.",
      "Digital libraries and educational resources.",
      "Interactive learning tools and simulations.",
      "Distance education and virtual classrooms."
    ]
  },
  {
    area: "Business",
    icon: Building2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    points: [
      "Automation of business processes.",
      "E-commerce and online transactions.",
      "Digital marketing and customer relationship management.",
      "Remote work and virtual collaboration."
    ]
  },
  {
    area: "Healthcare",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-500/10",
    points: [
      "Electronic health records and medical databases.",
      "Telemedicine and remote consultations.",
      "Medical imaging and diagnostics.",
      "Drug discovery and research."
    ]
  },
  {
    area: "Communication",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    points: [
      "Instant messaging and video conferencing.",
      "Social networking and global connections.",
      "Email and digital correspondence.",
      "Real-time collaboration tools."
    ]
  }
];

const challenges = [
  {
    title: "Privacy and Security",
    icon: Shield,
    desc: "Protecting personal data from unauthorized access and cyber threats."
  },
  {
    title: "Digital Divide",
    icon: Monitor,
    desc: "The gap between those who have access to technology and those who don't."
  },
  {
    title: "Job Displacement",
    icon: Zap,
    desc: "Automation replacing human workers in various industries."
  },
  {
    title: "Health Issues",
    icon: AlertTriangle,
    desc: "Eye strain, repetitive stress injuries, and sedentary lifestyles."
  }
];

export function Chapter14Society({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c14-l1") {
    // Lesson 1: Impact of Computers on Society
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: Impact of Computers on Society</h2>
          <p className="text-muted-foreground">
            Explore how modern computing has reshaped social structures, productivity, and the challenges it introduces.
          </p>
        </div>

        {/* Areas of Impact */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Positive Impacts Across Key Sectors</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {impacts.map((imp) => (
              <div
                key={imp.area}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-border/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${imp.bg} ${imp.color}`}>
                    <imp.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg">{imp.area}</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground list-inside list-disc">
                  {imp.points.map((p, idx) => (
                    <li key={idx} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-destructive">Modern Challenges & Issues</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {challenges.map((c) => (
              <div
                key={c.title}
                className="bg-card rounded-2xl p-5 border shadow-sm flex gap-4 border-l-4 border-destructive/40"
              >
                <div className="p-3 bg-destructive/10 text-destructive h-fit rounded-lg">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return null;
}
