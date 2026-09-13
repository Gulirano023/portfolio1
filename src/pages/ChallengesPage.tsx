import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Code, Users, Clock, Filter } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockChallenges, difficultyColors } from '@/data/mockData';

const filters = ['All', 'HTML/CSS', 'JavaScript', 'React', 'Python', 'Beginner', 'Intermediate', 'Advanced'];

export default function ChallengesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { t, tDifficulty } = useLanguage();

  const filtered = mockChallenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Beginner' || activeFilter === 'Intermediate' || activeFilter === 'Advanced') return c.difficulty === activeFilter;
    return c.technology.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 space-y-6">
        <div><h2 className="text-xl font-bold text-white">{t('challenges.title')}</h2><p className="text-sm text-gray-400 mt-1">{t('challenges.subtitle')}</p></div>
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('challenges.searchPlaceholder')} className="w-full pl-9 pr-4 py-2.5 bg-[#111111] border border-white/5 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <Filter size={14} className="text-gray-500 flex-shrink-0" />
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeFilter === f ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : 'bg-[#111111] text-gray-400 border border-white/5 hover:text-white'}`}>{f === 'All' ? t('challenges.filterAll') : f === 'Beginner' || f === 'Intermediate' || f === 'Advanced' ? tDifficulty(f) : f}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((challenge, i) => (
            <motion.div key={challenge.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <Link to={`/challenges/${challenge.id}`} className="block bg-[#111111] border border-white/5 rounded-xl p-5 hover:border-[#D4AF37]/20 transition-all duration-300 group h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${difficultyColors[challenge.difficulty]}`}>{tDifficulty(challenge.difficulty)}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {challenge.estimatedTime}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{challenge.title}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{challenge.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Code size={11} /> {challenge.technology.join(' / ')}</span>
                  <div className="flex items-center gap-3"><span className="text-[#D4AF37] font-semibold">{challenge.points} pts</span><span className="flex items-center gap-1"><Users size={11} /> {challenge.participants}</span></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-16"><Filter size={32} className="text-gray-600 mx-auto mb-3" /><p className="text-sm text-gray-400">{t('challenges.noResults')}</p></div>}
      </div>
    </DashboardLayout>
  );
}
