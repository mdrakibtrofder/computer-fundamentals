import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, Smartphone, Building2, Users, MonitorPlay, Zap, Shield, Database } from "lucide-react";

const itConcepts = [
  {
    name: "IT Concepts and Applications",
    icon: Globe,
    color: "text-primary",
    bg: "bg-primary/10",
    points: [
      "Information Technology (IT) involves the use of computers, software, networks, and electronic devices to manage and process information",
      "IT applications are used in various fields including education, healthcare, business, government, and entertainment",
      "Key IT components include hardware, software, data, networks, and people",
      "IT enables communication, data storage, automation, and decision-making processes"
    ]
  },
  {
    name: "Electronic Commerce (E-commerce)",
    icon: ShoppingCart,
    color: "text-secondary",
    bg: "bg-secondary/10",
    points: [
      "E-commerce is the buying and selling of goods and services over the internet",
      "Types of e-commerce: B2C (Business to Consumer), B2B (Business to Business), C2C (Consumer to Consumer)",
      "Examples: Online shopping websites, digital payment systems, online marketplaces",
      "Benefits: Convenience, global reach, 24/7 availability, cost efficiency"
    ]
  }
];

const ecommerceFeatures = [
  {
    title: "Online Shopping",
    desc: "Browse and purchase products from anywhere",
    icon: Smartphone
  },
  {
    title: "Digital Payments",
    desc: "Secure online transactions using cards, mobile wallets, etc.",
    icon: Shield
  },
  {
    title: "Supply Chain",
    desc: "End-to-end management of product delivery",
    icon: Building2
  },
  {
    title: "Customer Support",
    desc: "24/7 assistance through chat, email, or phone",
    icon: Users
  }
];

export function InformationTechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="it" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Chapter 13</span>
          <h2 className="heading-2 mt-2 mb-4">Information Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding IT concepts, applications, and electronic commerce
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {itConcepts.map((concept, index) => (
            <motion.div
              key={concept.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${concept.bg}`}>
                  <concept.icon className={`w-6 h-6 ${concept.color}`} />
                </div>
                <h3 className="font-bold text-xl">{concept.name}</h3>
              </div>
              <ul className="space-y-3">
                {concept.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="heading-3 mb-8 text-center">E-commerce Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecommerceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="bg-card rounded-xl p-5 shadow-card text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
