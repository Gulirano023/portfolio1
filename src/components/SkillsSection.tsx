import { motion } from "framer-motion";
import { Code2, Palette, Layout, Globe, FileCode, GitBranch, Figma, Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 120 }
  }
};

const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">{t.skillsLabel}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          {t.skillsTitle}
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.03 }}
            className="glass-card p-5 group cursor-default"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <skill.icon size={18} className="text-primary" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground">{skill.name}</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-xs text-muted-foreground mt-2 text-right"
            >
              {skill.level}%
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
