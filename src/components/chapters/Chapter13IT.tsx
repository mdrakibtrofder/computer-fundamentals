import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, Smartphone, Building2, Users, Shield } from "lucide-react";

const itConcepts = [
  {
    name: "IT Concepts and Applications",
    icon: Globe,
    color: "text-primary",
    bg: "bg-primary/10",
    points: [
      "Information Technology (IT) involves the use of computers, software, networks, and electronic devices to manage and process information.",
      "IT applications are used in various fields including education, healthcare, business, government, and entertainment.",
      "Key IT components include hardware, software, data, networks, and people.",
      "IT enables communication, data storage, automation, and decision-making processes."
    ]
  },
  {
    name: "Electronic Commerce (E-commerce)",
    icon: ShoppingCart,
    color: "text-secondary",
    bg: "bg-secondary/10",
    points: [
      "E-commerce is the buying and selling of goods and services over the internet.",
      "Types of e-commerce: B2C (Business to Consumer), B2B (Business to Business), C2C (Consumer to Consumer).",
      "Examples: Online shopping websites, digital payment systems, online marketplaces.",
      "Benefits: Convenience, global reach, 24/7 availability, cost efficiency."
    ]
  }
];

const ecommerceFeatures = [
  {
    title: "Online Shopping",
    desc: "Browse and purchase products from anywhere.",
    icon: Smartphone
  },
  {
    title: "Digital Payments",
    desc: "Secure online transactions using cards, mobile wallets, etc.",
    icon: Shield
  },
  {
    title: "Supply Chain",
    desc: "End-to-end management of product delivery.",
    icon: Building2
  },
  {
    title: "Customer Support",
    desc: "24/7 assistance through chat, email, or phone.",
    icon: Users
  }
];

export function Chapter13IT({ lessonId }: { lessonId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (lessonId === "c13-l1") {
    // Lesson 1: IT Concepts and Applications
    const concept = itConcepts[0];
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 1: IT Concepts and Applications</h2>
          <p className="text-muted-foreground">
            Understand how information technology operates and is applied in daily life.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${concept.bg}`}>
              <concept.icon className={`w-6 h-6 ${concept.color}`} />
            </div>
            <h3 className="font-bold text-xl">{concept.name}</h3>
          </div>
          <ul className="space-y-4">
            {concept.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    );
  }

  if (lessonId === "c13-l4") {
    // Lesson 4: Electronic Commerce
    const concept = itConcepts[1];
    return (
      <div className="space-y-12" ref={ref}>
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Lesson 4: Electronic Commerce</h2>
          <p className="text-muted-foreground">
            Explore buying, selling, and marketing goods and services over electronic networks like the internet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* E-Commerce Intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${concept.bg}`}>
                <concept.icon className={`w-6 h-6 ${concept.color}`} />
              </div>
              <h3 className="font-bold text-xl">{concept.name}</h3>
            </div>
            <ul className="space-y-4">
              {concept.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg mb-2">Key E-commerce Elements</h4>
            <div className="grid grid-cols-2 gap-4">
              {ecommerceFeatures.map((feat, index) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-4 rounded-xl border shadow-sm space-y-2 text-center"
                >
                  <div className="p-2 bg-secondary/10 text-secondary w-fit mx-auto rounded-lg">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xs text-foreground">{feat.title}</h5>
                  <p className="text-[10px] text-muted-foreground leading-normal">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
