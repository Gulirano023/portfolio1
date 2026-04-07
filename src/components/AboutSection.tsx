import { motion } from "framer-motion";
import { Lightbulb, Eye, Rocket, Heart, GraduationCap, Award } from "lucide-react";
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
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 whitespace-pre-line">
          Men haqimda
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12"
        >
          Salom. Men Jumanzarova Gulira'no - IT va Kiberxavfsizlik yo'nalishida o'qiyotgan yosh mutaxassisman.
          IT sohasida o'zimni muntazam rivojlantirib boraman va bir nechta sertifikatlarga egaman.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-5 mb-8"
      >
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap size={20} className="text-primary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">Ta'lim va bilim</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Men hozirda Yangiariq tumanidagi 3-son maktabda o'qib kelmoqdaman.
            Shuningdek, 2 yildan beri Al-Xorazmiy vorislari loyihasida IT sohasida bilim olib bormoqdaman.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award size={20} className="text-primary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">Sertifikatlarim va yutuqlarim</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">
            IT bo'yicha 3-4 ta sertifikatim bor. Coursera sertifikatimni quyidagi havola orqali ko'rishingiz mumkin:
          </p>
          <a
            href="https://coursera.org/share/5aebfc0425f5363b16ea9ebe2100d8bc"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4 break-all"
          >
            https://coursera.org/share/5aebfc0425f5363b16ea9ebe2100d8bc
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 mb-8"
      >
        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Ko'nikmalar va texnologiyalar</h3>
        <div className="flex flex-wrap gap-2">
          {["IT Fundamentals", "Kiberxavfsizlik", "Generative AI", "Google Cloud", "Portfolio Development", "Problem Solving"].map((skill) => (
            <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground">
              {skill}
            </span>
          ))}
        </div>
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
