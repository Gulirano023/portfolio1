import { motion } from "framer-motion";
import { Lightbulb, Eye, Rocket, Heart } from "lucide-react";

const strengths = [
  { icon: Lightbulb, title: "Creativity", desc: "Bringing fresh ideas and unique visual solutions to every project I work on." },
  { icon: Rocket, title: "Fast Learner", desc: "Quickly adapting to new technologies and frameworks with enthusiasm and curiosity." },
  { icon: Eye, title: "Attention to Detail", desc: "Pixel-perfect designs with a focus on quality, consistency, and user experience." },
  { icon: Heart, title: "Passionate & Responsible", desc: "Dedicated to delivering results with care, meeting deadlines, and exceeding expectations." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 100 }
  }
};

const AboutSection = () => (
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
        About Me
      </motion.p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
        Passionate about design<br className="hidden md:block" /> & technology.
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12"
      >
        Hello! I'm <span className="text-foreground font-medium">Gulira'no Jumanazarova</span> — a passionate
        and ambitious developer who enjoys creating modern, user-friendly, and visually
        appealing digital products. I'm dedicated to continuous learning and love
        exploring the intersection of technology and design to build experiences
        that truly resonate with users.
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

export default AboutSection;
