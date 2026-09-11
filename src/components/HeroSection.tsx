import { motion } from "framer-motion";
import { ArrowDown, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const floatingDots = [
  { className: "top-[4%] left-[18%] w-2 h-2 animate-float", delay: 0 },
  { className: "top-[18%] right-[10%] w-3 h-3 animate-float-reverse", delay: 0.6 },
  { className: "bottom-[20%] left-[8%] w-2.5 h-2.5 animate-float-slow", delay: 1.1 },
  { className: "bottom-[6%] right-[24%] w-1.5 h-1.5 animate-float", delay: 1.6 },
  { className: "top-[8%] right-[38%] w-1.5 h-1.5 animate-float-reverse", delay: 2.1 },
  { className: "bottom-[34%] right-[4%] w-2 h-2 animate-float", delay: 2.6 },
];

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse-glow"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse-glow"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-spin-slow" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          {/* Left: name + intro */}
          <motion.div className="text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles size={14} className="text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-primary">{t.heroTag}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 100 }}
              className="font-heading text-foreground leading-tight mb-6"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="block text-primary text-sm md:text-base font-medium uppercase tracking-[0.45em] mb-3"
              >
                {t.heroFamily}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.35, type: "spring", stiffness: 120 }}
                className="gradient-text animate-gradient-shift inline-block text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
              >
                {t.heroGiven}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4"
            >
              {t.heroTagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base text-muted-foreground/80 max-w-lg mb-10"
            >
              {t.heroIntro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="rounded-full px-8 font-body">
                  <a href="#projects">
                    <ArrowDown size={16} className="mr-2" />
                    {t.heroBtn1}
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-body border-primary/30 hover:bg-primary/5">
                  <a href="#contact">
                    <Send size={16} className="mr-2" />
                    {t.heroBtn2}
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: terminal prompt >_ with floating dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 90 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[380px] h-[380px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-primary/10" />
              <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[70px] animate-pulse-glow" />

              {floatingDots.map((dot, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: dot.delay }}
                  className={`absolute ${dot.className} rounded-full bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.55)]`}
                />
              ))}

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative font-code text-primary text-[110px] lg:text-[130px] leading-none select-none"
                style={{ textShadow: "0 0 50px hsl(var(--primary) / 0.4)" }}
              >
                <span>&gt;</span>
                <span className="animate-typing-cursor">_</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;