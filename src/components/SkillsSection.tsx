import { motion } from "framer-motion";

const skills = [
  { name: "HTML & CSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 92 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 82 },
  { name: "Tailwind CSS", level: 93 },
  { name: "Figma", level: 75 },
  { name: "PostgreSQL", level: 78 },
  { name: "Git", level: 88 },
  { name: "Docker", level: 70 },
  { name: "REST APIs", level: 90 },
];

const SkillsSection = () => (
  <section id="skills" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Skills</p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
        My toolbox.
      </h2>
    </motion.div>

    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <span className="text-xs text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
