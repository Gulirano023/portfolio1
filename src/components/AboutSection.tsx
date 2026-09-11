import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          {t.aboutLabel}
        </motion.p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 whitespace-pre-line">
          {t.aboutTitle}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12"
        >
          {t.aboutIntro}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap size={20} className="text-primary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">{t.aboutEduTitle}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t.aboutEduDesc}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t.aboutSkillsTitle}</h3>
        <div className="flex flex-wrap gap-2">
          {["IT Fundamentals", "Kiberxavfsizlik", "Generative AI", "Google Cloud", "Portfolio Development", "Problem Solving"].map((skill) => (
            <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;