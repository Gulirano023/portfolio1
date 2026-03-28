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

    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`glass-card p-6 hover-lift group ${i === 0 ? "md:col-span-2" : ""}`}
        >
          <div className="flex flex-col h-full">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm" className="rounded-full font-body border-primary/30 hover:bg-primary/5">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} className="mr-1.5" /> Live Demo
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="rounded-full font-body hover:text-primary">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={14} className="mr-1.5" /> Code
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ProjectsSection;
