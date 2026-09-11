import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const GITHUB_URL = "https://github.com/jumanazarovagulirano62";
const DEHQON_DEMO = "https://dehqon-loyiha1-w6u4.vercel.app/";

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

const ProjectsSection = () => {
  const { t } = useLanguage();

  const featured = {
    title: "dehqon.ai",
    badge: t.featured,
    description: t.projDehqonDesc,
    tech: ["React", "Tailwind CSS", "Generative AI"],
    demo: DEHQON_DEMO,
    github: GITHUB_URL,
  };

  const projects = [
    { title: t.proj1Title, description: t.proj1Desc, tech: ["React", "Tailwind CSS", "Framer Motion"], demo: "https://jumanazarova.uz/", github: GITHUB_URL },
    { title: t.proj2Title, description: t.proj2Desc, tech: ["JavaScript", "OpenWeather API", "CSS"], demo: null, github: GITHUB_URL },
    { title: t.proj3Title, description: t.proj3Desc, tech: ["React", "CSS Modules", "LocalStorage"], demo: null, github: GITHUB_URL },
    { title: t.proj4Title, description: t.proj4Desc, tech: ["HTML", "CSS", "JavaScript"], demo: null, github: GITHUB_URL },
    { title: t.proj5Title, description: t.proj5Desc, tech: ["React", "Trivia API", "Tailwind CSS"], demo: null, github: GITHUB_URL },
  ];

  const renderTech = (tech: string[], startDelay = 0) => (
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((techName, ti) => (
        <motion.span
          key={techName}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: startDelay + ti * 0.05 }}
          whileHover={{ scale: 1.1 }}
          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
        >
          {techName}
        </motion.span>
      ))}
    </div>
  );

  const renderActions = (
    demo: string | null,
    github: string,
  ) => (
    <div className="flex gap-3">
      {demo && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild variant="outline" size="sm" className="rounded-full font-body border-primary/30 hover:bg-primary/5">
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} className="mr-1.5" /> {t.liveDemo}
            </a>
          </Button>
        </motion.div>
      )}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild variant={demo ? "ghost" : "default"} size="sm" className="rounded-full font-body hover:text-primary">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Github size={14} className="mr-1.5" /> {t.code}
          </a>
        </Button>
      </motion.div>
    </div>
  );

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="section-label">{t.projectsLabel}</p>
        <h2 className="section-heading">{t.projectsTitle}</h2>
      </motion.div>

      {/* Featured project */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-6"
      >
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -8, boxShadow: "0 25px 50px -15px hsl(var(--primary) / 0.18)" }}
          className="glass-card p-8 group cursor-default border-primary/30 gold-glow"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wide">
                <Sparkles size={12} />
                {featured.badge}
              </span>
            </div>
            <motion.h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {featured.title}
            </motion.h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 flex-1">
              {featured.description}
            </p>
            {renderTech(featured.tech, 0.15)}
            {renderActions(featured.demo, featured.github)}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -15px hsl(var(--primary) / 0.12)" }}
            className="glass-card p-6 group cursor-default"
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
              {renderTech(project.tech)}
              {renderActions(project.demo, project.github)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;