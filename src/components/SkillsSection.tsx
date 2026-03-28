import { motion } from "framer-motion";
import { Code2, Palette, Layout, Globe, FileCode, GitBranch, Figma, Terminal } from "lucide-react";

const skills = [
  { name: "HTML", icon: FileCode, level: 92 },
  { name: "CSS", icon: Palette, level: 90 },
  { name: "JavaScript", icon: Code2, level: 85 },
  { name: "React", icon: Globe, level: 80 },
  { name: "Tailwind CSS", icon: Layout, level: 88 },
  { name: "Git & GitHub", icon: GitBranch, level: 82 },
  { name: "Figma", icon: Figma, level: 75 },
  { name: "Terminal / CLI", icon: Terminal, level: 70 },
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

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="glass-card p-5 hover-lift group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <skill.icon size={18} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">{skill.name}</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">{skill.level}%</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
