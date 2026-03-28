import { motion } from "framer-motion";
import { Lightbulb, Users, Zap } from "lucide-react";

const strengths = [
  { icon: Zap, title: "Problem Solving", desc: "I thrive on breaking complex challenges into elegant solutions." },
  { icon: Lightbulb, title: "Creativity", desc: "Blending aesthetics with functionality to craft memorable experiences." },
  { icon: Users, title: "Teamwork", desc: "Collaborating effectively to deliver impactful results together." },
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
        Crafting digital experiences<br className="hidden md:block" /> with purpose.
      </h2>
      <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-12">
        I'm a passionate Full Stack Developer with over 4 years of experience building
        web applications. I specialize in React, TypeScript, and modern web technologies.
        My goal is to create products that are not only visually stunning but also
        intuitive and accessible for everyone.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-6">
      {strengths.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card p-6 hover-lift"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
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
