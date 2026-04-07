import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

const certificates = [
  {
    title: "Introduction to Generative AI",
    provider: "Google Cloud (Coursera)",
    date: "19 January 2026",
    link: "https://coursera.org/share/5aebfc0425f5363b16ea9ebe2100d8bc",
  },
];

const CertificatesSection = () => {
  return (
    <section id="certificates" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
          Sertifikatlar
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          Sertifikatlarim va yutuqlarim
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          IT sohasida 3-4 ta sertifikatga egaman. Quyida asosiy sertifikatlarimdan biri keltirilgan.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {certificates.map((item) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.15)" }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-primary" />
              <p className="text-sm text-primary font-medium">Tasdiqlangan sertifikat</p>
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.provider}</p>
            <p className="text-sm text-muted-foreground mb-4">Sana: {item.date}</p>

            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
            >
              <BadgeCheck size={16} />
              Sertifikatni ko'rish
              <ExternalLink size={15} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
