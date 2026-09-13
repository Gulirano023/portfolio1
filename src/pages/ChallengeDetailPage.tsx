import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Award, CheckCircle, Code, Target, ExternalLink, Calendar, Star } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockChallenges, difficultyColors } from '@/data/mockData';

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, startChallenge } = useApp();
  const { t, tDifficulty } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const challenge = mockChallenges.find(c => c.id === id);
  const isStarted = state.activeChallenges.includes(id || '');

  if (!challenge) {
    return (
      <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
        <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="p-6 text-center py-20"><p className="text-gray-400">{t('cd.notFound')}</p><Link to="/challenges" className="text-[#D4AF37] text-sm mt-2 inline-block">{t('cd.back')}</Link></div>
      </DashboardLayout>
    );
  }

  const handleStart = () => {
    if (!state.auth.isAuthenticated) { navigate('/login'); return; }
    startChallenge(challenge.id);
  };

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <Link to="/challenges" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><ArrowLeft size={14} /> {t('cd.back')}</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${difficultyColors[challenge.difficulty]}`}>{tDifficulty(challenge.difficulty)}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {challenge.estimatedTime}</span>
              <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={12} /> {challenge.participants} {t('cd.participants')}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{challenge.title}</h1>
            <p className="text-sm text-gray-400 leading-relaxed">{challenge.description}</p>
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-2 text-sm"><Award size={16} className="text-[#D4AF37]" /><span className="text-[#D4AF37] font-semibold">{challenge.points} points</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-400"><Code size={14} />{challenge.technology.join(' / ')}</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-[#D4AF37]" /> {t('cd.requirements')}</h2>
              <ul className="space-y-2.5">{challenge.requirements.map((req, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-[#D4AF37] mt-0.5">→</span> {req}</li>))}</ul>
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Target size={16} className="text-[#D4AF37]" /> {t('cd.skillsToPractice')}</h2>
              <div className="flex flex-wrap gap-2">{challenge.skillsToPractice.map((skill, i) => (<span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">{skill}</span>))}</div>
              <h3 className="text-sm font-semibold text-white mt-6 mb-3 flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> {t('cd.deliverables')}</h3>
              <ul className="space-y-2">{challenge.deliverables.map((d, i) => (<li key={i} className="flex items-center gap-2 text-sm text-gray-400"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> {d}</li>))}</ul>
            </div>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {challenge.deadline && <div className="flex items-center gap-2 text-sm text-gray-400 mb-2"><Calendar size={14} />{t('cd.deadline')}: {new Date(challenge.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>}
                <div className="flex items-center gap-2 text-sm"><Award size={14} className="text-[#D4AF37]" /><span className="text-[#D4AF37] font-semibold">+{challenge.points} points</span></div>
              </div>
              {isStarted ? (
                <Link to="/projects/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity"><ExternalLink size={14} /> {t('cd.submitProject')}</Link>
              ) : (
                <button onClick={handleStart} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity"><Target size={14} /> {t('cd.startChallenge')}</button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
