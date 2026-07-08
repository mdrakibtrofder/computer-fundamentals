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
      "E-learning platforms and online courses",
      "Digital libraries and educational resources",
      "Interactive learning tools and simulations",
      "Distance education and virtual classrooms"
    ]
  },
  {
    area: "Business",
    icon: Building2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    points: [
      "Automation of business processes",
      "E-commerce and online transactions",
      "Digital marketing and customer relationship management",
      "Remote work and virtual collaboration"
    ]
  },
  {
    area: "Healthcare",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-500/10",
    points: [
      "Electronic health records and medical databases",
      "Telemedicine and remote consultations",
      "Medical imaging and diagnostics",
      "Drug discovery and research"
    ]
  },
  {
    area: "Communication",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    points: [
      "Instant messaging and video conferencing",
      "Social networking and global connections",
      "Email and digital correspondence",
      "Real-time collaboration tools"
    ]
  }
];

const challenges = [
  {
    title: "Privacy and Security",
    icon: Shield,
    desc: "Protecting personal data from unauthorized access and cyber threats"
  },
  {
    title: "Digital Divide",
    icon: Monitor,
    desc: "The gap between those who have access to technology and those who don't"
  },
  {
    title: "Job Displacement",
    icon: Zap,
    desc: "Automation replacing human workers in various industries"
  },
  {
    title: "Health Issues",
    icon: AlertTriangle,
    desc: "Eye strain, repetitive stress injuries, and sedentary lifestyles"
  }
];

export function ComputersAndSocietySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="society" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Chapter 14</span>
          <h2 className="heading-2 mt-2 mb-4">Computers and Society</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the impact of computers on society and the challenges they bring
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="heading-3 mb-8 text-center">Positive Impacts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.area}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${impact.bg}`}>
                    <impact.icon className={`w-6 h-6 ${impact.color}`} />
                  </div>
                  <h4 className="font-bold text-xl">{impact.area}</h4>
                </div>
                <ul className="space-y-2">
                  {impact.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-8 text-center">Challenges and Concerns</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <challenge.icon className="w-6 h-6 text-destructive" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground">{challenge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
