import { motion } from "framer-motion";
import { Lightbulb, Eye, Rocket, Heart } from "lucide-react";

const strengths = [
  { icon: Lightbulb, title: "Creativity", desc: "Bringing fresh ideas and unique visual solutions to every project I work on." },
  { icon: Rocket, title: "Fast Learner", desc: "Quickly adapting to new technologies and frameworks with enthusiasm and curiosity." },
  { icon: Eye, title: "Attention to Detail", desc: "Pixel-perfect designs with a focus on quality, consistency, and user experience." },
  { icon: Heart, title: "Passionate & Responsible", desc: "Dedicated to delivering results with care, meeting deadlines, and exceeding expectations." },
];

const AboutSection = () => (
  <section id="about" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">About Me</p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
        Passionate about design<br className="hidden md:block" /> & technology.
      </h2>
      <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12">
        Hello! I'm <span className="text-foreground font-medium">Gulirano Jumanazarova</span> — a passionate
        and ambitious developer who enjoys creating modern, user-friendly, and visually
        appealing digital products. I'm dedicated to continuous learning and love
        exploring the intersection of technology and design to build experiences
        that truly resonate with users.
      </p>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {strengths.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card p-6 hover-lift group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <item.icon size={20} className="text-primary" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default AboutSection;
