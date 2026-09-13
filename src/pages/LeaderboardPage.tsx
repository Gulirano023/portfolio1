import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, FolderOpen, Target, Star, RefreshCw } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchLeaderboard, type ServerLeaderboardEntry } from '@/lib/api';

const timeFilters = ['Weekly', 'Monthly', 'All Time'];
const altAchievementKeys = ['lb.rec.topBuilder', 'lb.rec.mostImproved', 'lb.rec.mostProjects', 'lb.rec.challengeMaster', 'lb.rec.longestStreak'] as const;
const altAchievementDescKeys = ['lb.rec.topBuilderDesc', 'lb.rec.mostImprovedDesc', 'lb.rec.mostProjectsDesc', 'lb.rec.challengeMasterDesc', 'lb.rec.longestStreakDesc'] as const;
const altAchievementIcons = [Trophy, Flame, FolderOpen, Target, Star];
const altAchievementUsers = ['ethanp', 'emmad', 'sarawills', 'marcusj', 'lunarod'];

export default function LeaderboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [entries, setEntries] = useState<ServerLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  const load = useCallback(() => {
    setLoading(true);
    setError(false);
    fetchLeaderboard()
      .then(setEntries)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const podium = [1, 0, 2].map(rank => entries[rank]).filter(entry => Boolean(entry));
  const heights = ['h-28', 'h-24', 'h-20'];
  const medals = ['🏆', '🥈', '🥉'];

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 space-y-6">
        <div><h2 className="text-xl font-bold text-white">{t('lb.title')}</h2><p className="text-sm text-gray-400 mt-1">{t('lb.subtitle')}</p></div>
        <div className="flex items-center gap-2">{timeFilters.map(f => (<button key={f} onClick={() => setTimeFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${timeFilter === f ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : 'bg-[#111111] text-gray-400 border border-white/5 hover:text-white'}`}>{f === 'Weekly' ? t('lb.weekly') : f === 'Monthly' ? t('lb.monthly') : t('lb.allTime')}</button>))}</div>

        {loading ? (
          <div className="text-center text-sm text-gray-400 py-12">{t('lb.loading')}</div>
        ) : error ? (
          <div className="bg-[#111111] border border-white/5 rounded-xl p-8 flex flex-col items-center gap-3">
            <div className="text-sm text-gray-300">{t('lb.error')}</div>
            <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 transition-all"><RefreshCw size={14} />{t('lb.retry')}</button>
          </div>
        ) : (
          <div className="min-h-[300px]">
            {podium.length > 0 && (
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                {podium.map((entry, i) => (
                  <motion.div key={entry.userId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
                    <div className="text-2xl mb-2">{medals[i]}</div>
                    <div className={`w-12 h-12 rounded-full ${i === 1 ? 'bg-gradient-to-br from-[#D4AF37] to-[#E5C75A]' : 'bg-[#D4AF37]/20'} flex items-center justify-center text-sm font-bold overflow-hidden ${i === 1 ? 'text-black' : 'text-[#D4AF37]'}`}>
                      {entry.avatar ? <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" /> : entry.username[0].toUpperCase()}
                    </div>
                    <div className="text-xs font-semibold text-white mt-2">{entry.username}</div>
                    <div className="text-xs text-[#D4AF37] font-medium">{entry.points.toLocaleString()} pts</div>
                    <div className={`w-full ${heights[i]} bg-[#111111] border border-white/5 rounded-t-lg mt-2 flex items-center justify-center`}><span className="text-lg font-bold text-gray-600">#{entries.indexOf(entry) + 1}</span></div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden mt-6">
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 text-xs text-gray-500 font-medium border-b border-white/5"><span>{t('lb.rank')}</span><span>{t('lb.user')}</span><span>{t('lb.level')}</span><span>{t('lb.projects')}</span><span className="text-right">{t('lb.points')}</span></div>
              {entries.length === 0 && <div className="text-center text-sm text-gray-500 py-10">{t('lb.empty')}</div>}
              {entries.map((entry, i) => (
                <motion.div key={entry.userId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <span className={`text-sm font-bold w-8 ${i < 3 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>#{i + 1}</span>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center text-xs font-bold text-[#D4AF37] flex-shrink-0 overflow-hidden">
                      {entry.avatar ? <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" /> : entry.username[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-white truncate">{entry.username}</span>
                  </div>
                  <span className="text-xs text-gray-400">Lv {entry.level}</span>
                  <span className="text-xs text-gray-400">{entry.projects}</span>
                  <span className="text-sm font-bold text-[#D4AF37] text-right">{entry.points.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">{t('lb.recognitions')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {altAchievementKeys.map((key, i) => {
              const Icon = altAchievementIcons[i];
              return (
                <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-[#111111] border border-white/5 rounded-xl p-4 flex items-center gap-3 hover:border-[#D4AF37]/10 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-[#D4AF37]" /></div>
                  <div className="min-w-0"><div className="text-xs font-semibold text-white">{t(key)}</div><div className="text-xs text-[#D4AF37]">{altAchievementUsers[i]}</div><div className="text-xs text-gray-500 truncate">{t(altAchievementDescKeys[i])}</div></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}