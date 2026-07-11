import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Monitor, Zap, Shield, AlertTriangle, Heart, Building2, GraduationCap, Briefcase, MessageCircle, Globe, Check, X } from "lucide-react";

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

const transformations = [
  {
    area: "Work",
    icon: Briefcase,
    positives: [
      "Automation removed repetitive drudgery and multiplied productivity across every industry.",
      "Remote and hybrid work decoupled jobs from geography, opening global labour markets.",
      "Entirely new professions emerged — software engineering, data science, digital design.",
    ],
    negatives: [
      "Routine manufacturing and clerical jobs were displaced, demanding continual reskilling.",
      "Always-connected work blurs the boundary between office and home, feeding burnout.",
      "Gig platforms create flexible but often precarious employment without traditional protections.",
    ],
  },
  {
    area: "Communication",
    icon: MessageCircle,
    positives: [
      "Messages, calls, and video reach anyone on Earth instantly and nearly free.",
      "Families and diasporas separated by continents maintain daily contact.",
      "Movements and communities organize at speeds impossible in the print era.",
    ],
    negatives: [
      "Misinformation spreads as quickly as truth, amplified by engagement-driven algorithms.",
      "Online anonymity enables harassment and abuse at scale.",
      "Constant notifications fragment attention and erode deep conversation.",
    ],
  },
  {
    area: "Healthcare",
    icon: Heart,
    positives: [
      "Electronic health records, medical imaging, and computer-assisted diagnosis improved accuracy and continuity of care.",
      "Telemedicine brings specialists to rural and mobility-limited patients.",
      "Computational research accelerated vaccine and drug development dramatically.",
    ],
    negatives: [
      "Health data breaches expose the most sensitive personal information.",
      "Screen-centred lifestyles contribute to sedentary illness, eye strain, and sleep problems.",
      "Unequal access to digital health services can worsen existing care disparities.",
    ],
  },
  {
    area: "Education",
    icon: GraduationCap,
    positives: [
      "The world's knowledge is searchable from a pocket device; online courses open universities to everyone.",
      "Interactive simulations and adaptive software personalize learning pace and style.",
      "Distance education sustained schooling through crises like the COVID-19 pandemic.",
    ],
    negatives: [
      "Students without devices or broadband fall behind — the classroom digital divide.",
      "Copy-paste convenience and AI tools challenge academic integrity and deep learning.",
      "Screen-based learning struggles to replicate the social development of physical classrooms.",
    ],
  },
  {
    area: "Social Interaction",
    icon: Users,
    positives: [
      "Social networks help people find communities of shared interest and identity, however niche.",
      "Online platforms give marginalized voices reach that traditional media denied them.",
      "Shared games, media, and virtual spaces create new forms of friendship and belonging.",
    ],
    negatives: [
      "Heavy social media use correlates with anxiety, loneliness, and comparison-driven low self-esteem.",
      "Algorithmic feeds sort society into echo chambers that harden polarization.",
      "Face-to-face social skills and local community ties weaken as interaction moves online.",
    ],
  },
];

const longTermShifts = [
  {
    title: "The Digital Divide",
    icon: Monitor,
    desc: "Computing's benefits are distributed unevenly. Income, geography, age, and education determine who has fast internet, capable devices, and the skills to use them — and who does not. As essential services (banking, government forms, job applications, schooling) move online, exclusion from technology increasingly means exclusion from society itself. Narrowing this divide — through infrastructure, affordability, and digital literacy — has become a matter of basic equity.",
  },
  {
    title: "Globalization of Culture",
    icon: Globe,
    desc: "Computers and networks turned culture into a global stream: the same films, music, memes, and platforms circulate everywhere simultaneously. This cross-pollination enriches societies and gives creators worldwide audiences, but it also concentrates cultural influence in a few global platforms and can crowd out local languages, media, and traditions. Societies now negotiate between global connection and preservation of local identity.",
  },
  {
    title: "Personal Privacy",
    icon: Shield,
    desc: "Life conducted through computers leaves a permanent, searchable trail — purchases, locations, messages, health data, browsing habits. Corporations mine this trail to predict and influence behaviour; governments can surveil at population scale; criminals exploit breaches. The very concept of a private life has been renegotiated within a single generation, driving new legal frameworks (like GDPR) and a growing demand for privacy-preserving technology.",
  },
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

        {/* In-depth transformations */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">How Computers Transformed Society — Both Ways</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Widespread computer adoption did not simply add convenience; it restructured how humans work,
              talk, heal, learn, and relate. Every transformation carries gains and costs together.
            </p>
          </div>

          <div className="space-y-6">
            {transformations.map((t) => (
              <div key={t.area} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg">{t.area}</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-green-600 mb-2">Positive Transformations</h5>
                    <ul className="space-y-2">
                      {t.positives.map((p, i) => (
                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider text-destructive mb-2">Negative Transformations</h5>
                    <ul className="space-y-2">
                      {t.negatives.map((n, i) => (
                        <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Long-term shifts */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">Long-Term Societal Shifts</h3>
          <div className="space-y-6">
            {longTermShifts.map((shift) => (
              <div key={shift.title} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card flex gap-5">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary h-fit shrink-0">
                  <shift.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-2">{shift.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{shift.desc}</p>
                </div>
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
