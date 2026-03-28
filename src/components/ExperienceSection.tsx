import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2022 – Present",
    description: "Leading the frontend team, building scalable React applications, and mentoring junior developers.",
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 – 2022",
    description: "Built and maintained multiple web products from scratch, handling both frontend and backend.",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    period: "2019 – 2020",
    description: "Delivered custom websites and web apps for small businesses and startups across various industries.",
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Experience</p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
        Where I've worked.
      </h2>
    </motion.div>

    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-12 md:pl-16"
          >
            {/* Dot */}
            <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

            <p className="text-xs font-medium text-primary mb-1">{exp.period}</p>
            <h3 className="font-heading text-lg font-semibold text-foreground">{exp.role}</h3>
            <p className="text-sm font-medium text-muted-foreground mb-2">{exp.company}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
