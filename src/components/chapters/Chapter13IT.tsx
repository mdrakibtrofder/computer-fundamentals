import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingCart, Smartphone, Building2, Users, Shield, Brain, Wifi, Laptop, Atom, Leaf, Fingerprint, Check, X } from "lucide-react";

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

const futureTrends = [
  {
    title: "Artificial Intelligence & Machine Learning",
    icon: Brain,
    opportunities: [
      "Employment is being reshaped: routine cognitive work is automated while new roles emerge in AI development, oversight, and data work — the net effect is a large-scale shift in required skills.",
      "Healthcare access widens as AI assists diagnosis from medical images, triages patients in underserved regions, and accelerates drug discovery.",
      "Public services improve through intelligent processing of applications, chat-based citizen support, and data-driven planning of transport, utilities, and emergency response.",
    ],
    risks: [
      "Algorithmic bias: models trained on skewed historical data can systematically disadvantage groups in hiring, lending, policing, and healthcare — demanding transparency, audits, and human oversight of consequential decisions.",
    ],
  },
  {
    title: "IoT & Smart City Infrastructure",
    icon: Wifi,
    opportunities: [
      "Billions of connected sensors let cities manage resources in real time: adaptive traffic signals reduce congestion, smart meters balance electricity and water demand, and connected bins optimize waste collection.",
      "Environmental monitoring (air quality, flooding, noise) becomes continuous and fine-grained, enabling faster, targeted responses.",
    ],
    risks: [
      "Ubiquitous data collection creates serious privacy risks: movement patterns, energy usage, and public-camera feeds can profile individuals. Weakly secured devices also widen the attack surface for cybercriminals, making data governance and device security essential.",
    ],
  },
  {
    title: "Remote Work & Digital Education",
    icon: Laptop,
    opportunities: [
      "Collaboration platforms, cloud workspaces, and videoconferencing decouple work from location, letting employers reach talent anywhere and workers escape geographic job limits.",
      "Digital education tools — online courses, virtual classrooms, AI tutors — bridge access gaps for learners far from universities or quality schools.",
    ],
    risks: [
      "Digital equity remains the central challenge: reliable broadband, capable devices, and digital literacy are unevenly distributed, so the same tools that bridge distance can deepen disadvantage for unconnected communities and low-income households.",
    ],
  },
  {
    title: "Quantum Computing",
    icon: Atom,
    opportunities: [
      "Quantum machines promise to simulate molecules directly, transforming pharmaceutical discovery and materials science, and to solve optimization problems in logistics and finance beyond classical reach.",
    ],
    risks: [
      "Large-scale quantum computers could break today's public-key cryptography, threatening banking, communications, and state secrets — driving urgent 'post-quantum' encryption standards and raising policy questions about who controls this capability first.",
    ],
  },
  {
    title: "IT-Enabled Climate Action",
    icon: Leaf,
    opportunities: [
      "Smart grids balance renewable generation with demand in real time, cutting waste and enabling higher solar/wind penetration.",
      "Satellite and sensor networks track carbon emissions, deforestation, and methane leaks with verifiable precision, supporting accountability in climate commitments.",
    ],
    risks: [
      "IT's own footprint is growing fast: data centres and AI training consume large and rising amounts of electricity and water, so efficiency gains and clean-powered computing are needed for the sector's benefits to outweigh its costs.",
    ],
  },
  {
    title: "Digital Identity, Media & Trust",
    icon: Fingerprint,
    opportunities: [
      "Digital identity systems (such as national e-ID programs) give unbanked populations access to accounts, payments, credit, and government benefits — a major driver of financial inclusion.",
    ],
    risks: [
      "The same systems can enable pervasive surveillance if misused, and exclusion for those who cannot enroll.",
      "AI-generated content and social-media amplification make misinformation cheaper and more convincing, straining public trust — pushing development of content provenance standards, verification tools, and media literacy.",
    ],
  },
];

const ecommerceBenefits = [
  { text: "24/7 global market access — shops never close and a seller in one country can reach buyers in another instantly.", who: "Consumers · Businesses" },
  { text: "Reduced operational overhead compared to brick-and-mortar stores: no retail rent, smaller staff, centralized warehousing.", who: "Businesses" },
  { text: "Personalized shopping experiences — recommendation engines and purchase history tailor offers to each customer.", who: "Consumers · Businesses" },
  { text: "Streamlined supply chain management with real-time inventory, automated ordering, and direct-to-consumer fulfilment.", who: "Businesses · Economies" },
  { text: "Increased price transparency — buyers compare prices across many sellers in seconds, pressuring fair pricing.", who: "Consumers" },
  { text: "Access to niche products unavailable locally, connecting specialist sellers with dispersed global demand.", who: "Consumers" },
];

const ecommerceDrawbacks = [
  { text: "No in-person product inspection — items can't be touched or tried before purchase, driving much higher return rates.", who: "Consumers · Businesses" },
  { text: "Cybersecurity risks including payment fraud, phishing, and data breaches exposing customers' personal and card data.", who: "Consumers · Businesses" },
  { text: "Environmental impact from increased packaging waste and carbon emissions of last-mile delivery.", who: "Society" },
  { text: "Counterfeit goods proliferate on open marketplaces, harming buyers and legitimate brands alike.", who: "Consumers · Businesses" },
  { text: "Erosion of local small business competitiveness as commerce concentrates in large online platforms.", who: "Economies" },
  { text: "Reliance on digital infrastructure excludes populations without internet access, devices, or digital payment means.", who: "Society" },
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

        {/* Future influence of IT */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">The Future Influence of Information Technology in Society</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Emerging technologies will reshape how societies work, learn, govern, and care for themselves.
              Each brings genuine opportunities alongside risks that policy and design must manage.
            </p>
          </div>

          {futureTrends.map((trend) => (
            <div key={trend.title} className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <trend.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">{trend.title}</h4>
              </div>
              <div>
                <h5 className="text-[10px] uppercase font-bold tracking-wider text-green-600 mb-2">Opportunities & Impact</h5>
                <ul className="space-y-2">
                  {trend.opportunities.map((o, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] uppercase font-bold tracking-wider text-destructive mb-2">Risks & Challenges</h5>
                <ul className="space-y-2">
                  {trend.risks.map((r, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
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

        {/* Benefits and drawbacks */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold">Benefits and Drawbacks of E-Commerce</h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              E-commerce reshapes trade for three groups at once — consumers, businesses, and whole
              economies. Each point below is tagged with who it affects most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
              <div className="bg-green-600/10 px-6 py-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-base">Benefits</h4>
              </div>
              <ul className="p-6 space-y-4">
                {ecommerceBenefits.map((b, i) => (
                  <li key={i} className="space-y-1">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <span>{b.text}</span>
                    </p>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-600/80 ml-5">{b.who}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
              <div className="bg-destructive/10 px-6 py-4 flex items-center gap-3">
                <X className="w-5 h-5 text-destructive" />
                <h4 className="font-bold text-base">Drawbacks</h4>
              </div>
              <ul className="p-6 space-y-4">
                {ecommerceDrawbacks.map((d, i) => (
                  <li key={i} className="space-y-1">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                      <span>{d.text}</span>
                    </p>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-destructive/80 ml-5">{d.who}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
