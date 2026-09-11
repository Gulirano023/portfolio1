import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const EMAIL = "jumanazarovagulirano62@gmail.com";
const GITHUB_URL = "https://github.com/jumanazarovagulirano62";
const INSTAGRAM_URL = "https://instagram.com/jmnzrva.r";
const TELEGRAM_URL = "https://t.me/Jmnzrvam23";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: t.fillAll, variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("contact failed");
      }

      toast({ title: t.messageSent, description: t.messageSentDesc });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: t.messageFailed,
        description: t.messageFailedDesc,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: Github, href: GITHUB_URL, label: "GitHub" },
    { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
    { icon: MessageCircle, href: TELEGRAM_URL, label: "Telegram" },
  ];

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">{t.contactLabel}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
          {t.contactTitle}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="space-y-4"
        >
          {[
            { placeholder: t.yourName, key: "name" as const, type: "text", max: 100 },
            { placeholder: t.yourEmail, key: "email" as const, type: "email", max: 255 },
          ].map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="rounded-xl bg-secondary border-0 font-body focus:ring-2 focus:ring-primary/30 transition-shadow"
                maxLength={field.max}
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
          >
            <Textarea
              placeholder={t.yourMessage}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl bg-secondary border-0 resize-none font-body focus:ring-2 focus:ring-primary/30 transition-shadow"
              maxLength={1000}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" size="lg" className="rounded-full px-8 font-body" disabled={sending}>
              <Send size={16} className="mr-2" /> {sending ? t.sending : t.sendMessage}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="flex flex-col justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 15px 30px -10px hsl(var(--primary) / 0.1)" }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">{t.contactMeTitle}</h3>
            <div className="grid gap-3 text-muted-foreground">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors break-all">
                <Mail size={16} className="text-primary" />
                {EMAIL}
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <Github size={16} className="text-primary" />
                github.com/jumanazarovagulirano62
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <Instagram size={16} className="text-primary" />
                @jmnzrva.r
              </a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <MessageCircle size={16} className="text-primary" />
                @Jmnzrvam23
              </a>
            </div>
          </motion.div>

          <p className="text-sm text-muted-foreground mb-3">{t.findMe}</p>
          <div className="flex gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <s.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
