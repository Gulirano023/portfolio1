import { motion } from "framer-motion";
import { Lightbulb, Eye, Rocket, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 100 }
  }
};

const AboutSection = () => {
  const { t } = useLanguage();

  const strengths = [
    { icon: Lightbulb, title: t.strengthCreativity, desc: t.strengthCreativityDesc },
    { icon: Rocket, title: t.strengthFastLearner, desc: t.strengthFastLearnerDesc },
    { icon: Eye, title: t.strengthDetail, desc: t.strengthDetailDesc },
    { icon: Heart, title: t.strengthPassion, desc: t.strengthPassionDesc },
  ];

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
          className="text-sm font-medium tracking-widest uppercase text-primary mb-2"
        >
          {t.aboutLabel}
        </motion.p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 whitespace-pre-line">
          {t.aboutTitle}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12"
        >
          {t.aboutDesc}
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {strengths.map((item) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.15)" }}
            className="glass-card p-6 group cursor-default"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
            >
              <item.icon size={20} className="text-primary" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutSection;
