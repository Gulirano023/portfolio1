import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { Footer } from '@/components/layout/Footer';
import { mockChallenges, mockLeaderboard } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowRight,
  Target,
  Wrench,
  MessageSquare,
  Award,
  Trophy,
  Users,
  Clock,
  Zap,
  ChevronRight,
  Star,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function HeroSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ts-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ts-gold/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ts-gold/10 border border-ts-gold/20 text-ts-gold text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            {t('landing.learnIntro')}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            {t('landing.heroTitle1')}{' '}
            <span className="text-gradient">{t('landing.heroTitle2')}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-ts-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('landing.heroSub')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/register')} className="btn-primary text-base px-8 py-3.5 flex items-center gap-2">
              {t('landing.startBuilding')} <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#challenges" className="btn-secondary text-base px-8 py-3.5">
              {t('landing.exploreChallenges')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20"
        >
          <div className="glass-card p-1 max-w-4xl mx-auto">
            <div className="bg-ts-bg rounded-xl border border-white/[0.04] p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                  <p className="text-2xl font-bold text-ts-gold">82</p>
                  <p className="text-xs text-ts-muted mt-1">{t('landing.stat.skillScore')}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-ts-muted mt-1">{t('landing.stat.activeChallenges')}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-xs text-ts-muted mt-1">{t('landing.stat.projects')}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                  <p className="text-2xl font-bold text-ts-gold">12</p>
                  <p className="text-xs text-ts-muted mt-1">{t('landing.stat.achievements')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-ts-gold/5 border border-ts-gold/10">
                <div className="w-10 h-10 rounded-lg bg-ts-gold/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-ts-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{t('landing.currentProgressTitle')}</p>
                  <p className="text-xs text-ts-muted">{t('landing.currentProgressTech')}</p>
                </div>
                <span className="text-sm font-bold text-ts-gold">65%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { t } = useLanguage();
  const steps = [
    { num: '01', titleKey: 'landing.how.learn-title', descKey: 'landing.how.learn-desc', icon: Star },
    { num: '02', titleKey: 'landing.how.challenge-title', descKey: 'landing.how.challenge-desc', icon: Target },
    { num: '03', titleKey: 'landing.how.build-title', descKey: 'landing.how.build-desc', icon: Wrench },
    { num: '04', titleKey: 'landing.how.feedback-title', descKey: 'landing.how.feedback-desc', icon: MessageSquare },
    { num: '05', titleKey: 'landing.how.prove-title', descKey: 'landing.how.prove-desc', icon: Award },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium text-ts-gold uppercase tracking-widest mb-3">{t('landing.how.tag')}</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            {t('landing.how.subtitle')}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <motion.div key={step.num} variants={fadeUp} className="glass-card p-6 text-center card-hover relative">
                <div className="w-12 h-12 rounded-xl bg-ts-gold/10 flex items-center justify-center mx-auto mb-4">
                  <StepIcon className="w-6 h-6 text-ts-gold" />
                </div>
                <p className="text-xs font-bold text-ts-gold mb-2">{step.num}</p>
                <h3 className="text-base font-semibold text-white mb-2">{t(step.titleKey)}</h3>
                <p className="text-sm text-ts-muted leading-relaxed">{t(step.descKey)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ChallengesSection() {
  const challenges = mockChallenges.slice(0, 5);
  const { t, tDifficulty } = useLanguage();

  return (
    <section id="challenges" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium text-ts-gold uppercase tracking-widest mb-3">{t('landing.popular.tag')}</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            {t('landing.popular.subtitle')}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {challenges.map((ch) => (
            <motion.div key={ch.id} variants={fadeUp} className="glass-card overflow-hidden card-hover group">
              <div className="h-40 overflow-hidden relative">
                <img src={ch.image} alt={ch.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ts-card to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge variant={ch.difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced'}>
                    {tDifficulty(ch.difficulty)}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-white mb-2">{ch.title}</h3>
                <p className="text-sm text-ts-muted mb-4 line-clamp-2">{ch.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ch.technology.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-xs text-ts-gray">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-ts-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ch.estimatedTime}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{ch.participants.toLocaleString()}</span>
                  <span className="text-ts-gold font-semibold">{ch.points} pts</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/register" className="btn-secondary inline-flex items-center gap-2 text-sm">
            {t('landing.viewAllChallenges')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LeaderboardPreview() {
  const { t } = useLanguage();

  return (
    <section id="leaderboard" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium text-ts-gold uppercase tracking-widest mb-3">{t('lb.title')}</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            {t('landing.leaderboard.subtitle')}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="glass-card overflow-hidden"
        >
          {mockLeaderboard.slice(0, 5).map((entry, i) => (
            <motion.div
              key={entry.userId}
              variants={fadeUp}
              className={`flex items-center gap-4 px-6 py-4 ${
                i < 4 ? 'border-b border-white/[0.04]' : ''
              }`}
            >
              <span className={`text-lg font-bold w-8 text-center ${i === 0 ? 'text-ts-gold' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-600' : 'text-ts-muted'}`}>
                {i + 1}
              </span>
              <img src={entry.avatar} alt={entry.username} className="w-10 h-10 rounded-full bg-ts-card border border-white/[0.08]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">@{entry.username}</p>
                <p className="text-xs text-ts-muted">{t('lb.level')} {entry.level} • {entry.projects} {t('lb.projects')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-ts-gold">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-ts-muted">{t('lb.points')}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass-card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ts-gold/5 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('landing.cta.title')}
            </h2>
            <p className="text-ts-gray text-lg mb-8 max-w-xl mx-auto">
              {t('landing.cta.sub')}
            </p>
            <button onClick={() => navigate('/register')} className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
              {t('landing.startBuilding')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ts-bg">
      <LandingNavbar />
      <HeroSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <HowItWorksSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <ChallengesSection />
      <div className="section-divider max-w-6xl mx-auto" />
      <LeaderboardPreview />
      <div className="section-divider max-w-6xl mx-auto" />
      <CTASection />
      <Footer />
    </div>
  );
}