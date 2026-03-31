import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Portfolio Website",
    description: "A sleek personal portfolio showcasing my work, skills, and journey as a developer. Fully responsive with dark mode and smooth animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    demo: "#",
    github: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with city search, 5-day forecast, and dynamic backgrounds based on conditions.",
    tech: ["JavaScript", "OpenWeather API", "CSS"],
    demo: "#",
    github: "#",
  },
  {
    title: "Task Tracker",
    description: "A clean and intuitive to-do list app with task categories, completion tracking, and local storage persistence.",
    tech: ["React", "CSS Modules", "LocalStorage"],
    demo: "#",
    github: "#",
  },
  {
    title: "Landing Page Collection",
    description: "A series of modern, responsive landing pages for fictional brands — focusing on layout, typography, and visual hierarchy.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    github: "#",
  },
  {
    title: "Quiz App",
    description: "An interactive quiz game with multiple categories, score tracking, and timed questions for a fun learning experience.",
    tech: ["React", "Trivia API", "Tailwind CSS"],
    demo: "#",
    github: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, type: "spring" as const, stiffness: 80 }
  }
};

const ProjectsSection = () => (
  <section id="projects" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Projects</p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
        Selected work.
      </h2>
    </motion.div>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid md:grid-cols-2 gap-6"
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: "0 25px 50px -15px hsl(var(--primary) / 0.12)" }}
          className={`glass-card p-6 group cursor-default ${i === 0 ? "md:col-span-2" : ""}`}
          style={{ perspective: "1000px" }}
        >
          <div className="flex flex-col h-full">
            <motion.h3
              className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
              layout
            >
              {project.title}
            </motion.h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="sm" className="rounded-full font-body border-primary/30 hover:bg-primary/5">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-1.5" /> Live Demo
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="ghost" size="sm" className="rounded-full font-body hover:text-primary">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} className="mr-1.5" /> Code
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default ProjectsSection;
