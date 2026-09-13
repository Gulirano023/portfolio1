import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, Target, Zap, Trophy, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockChallenges, difficultyColors, statusColors } from '@/data/mockData';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useApp();
  const { t, tDifficulty, tStatus } = useLanguage();
  const user = state.auth.user;
  const userProjects = state.projects.filter(p => p.userId === user?.id);
  const completedProjects = userProjects.filter(p => p.status === 'completed');
  const activeChallenge = state.activeChallenges[0];
  const currentChallenge = activeChallenge ? mockChallenges.find(c => c.id === activeChallenge) : null;

  const stats = [
    { icon: FolderOpen, key: 'dash.totalProjects', value: userProjects.length, color: 'text-white' },
    { icon: Target, key: 'dash.completedChallenges', value: completedProjects.length, color: 'text-white' },
    { icon: Zap, key: 'dash.skillScore', value: Math.round(state.skillScores.reduce((a, s) => a + s.score, 0) / state.skillScores.length), color: 'text-[#D4AF37]' },
    { icon: Trophy, key: 'dash.points', value: user?.points || 0, color: 'text-[#D4AF37]' },
  ];

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.key} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.05 }} className="bg-[#111111] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center"><stat.icon size={18} className="text-[#D4AF37]" /></div>
                <span className="text-xs text-gray-500">{t(stat.key)}</span>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div {...fadeUp} className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">{t('dash.currentChallenge')}</h2>
                <Link to="/challenges" className="text-xs text-[#D4AF37] hover:text-[#E5C75A] transition-colors flex items-center gap-1">{t('dash.browse')} <ChevronRight size={12} /></Link>
              </div>
              {currentChallenge ? (
                <div className="bg-[#151515] border border-white/5 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{currentChallenge.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[currentChallenge.difficulty]}`}>{tDifficulty(currentChallenge.difficulty)}</span>
                        <span className="text-xs text-gray-500">{currentChallenge.technology.join(' / ')}</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-[#D4AF37]">65%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-4"><div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] rounded-full" style={{ width: '65%' }} /></div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {currentChallenge.estimatedTime}</span>
                    <span>{currentChallenge.points} {t('common.points')}</span>
                  </div>
                  <Link to={`/challenges/${currentChallenge.id}`} className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">{t('dash.continueChallenge')} <ArrowRight size={14} /></Link>
                </div>
              ) : (
                <div className="bg-[#151515] border border-white/5 rounded-xl p-8 text-center">
                  <Target size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-4">{t('dash.noActiveChallenge')}</p>
                  <Link to="/challenges" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">{t('dash.browseChallenges')} <ArrowRight size={14} /></Link>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">{t('dash.skills')}</h2>
              <Link to="/profile" className="text-xs text-[#D4AF37] hover:text-[#E5C75A] transition-colors flex items-center gap-1">{t('common.viewAll')} <ChevronRight size={12} /></Link>
            </div>
            <div className="space-y-4">
              {state.skillScores.slice(0, 5).map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-1.5"><span className="text-sm text-gray-300">{skill.skill}</span><span className="text-xs text-[#D4AF37] font-medium">{skill.score}/100</span></div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] rounded-full" style={{ width: `${skill.score}%` }} /></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">{t('dash.recentProjects')}</h2>
            <Link to="/projects" className="text-xs text-[#D4AF37] hover:text-[#E5C75A] transition-colors flex items-center gap-1">{t('common.viewAll')} <ChevronRight size={12} /></Link>
          </div>
          {userProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProjects.slice(0, 3).map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} className="bg-[#151515] border border-white/5 rounded-xl p-5 hover:border-[#D4AF37]/20 transition-all group">
                  <div className="w-full h-32 bg-gradient-to-br from-[#1a1a1a] to-[#111111] rounded-lg mb-4 flex items-center justify-center"><FolderOpen size={24} className="text-gray-600" /></div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-2 mt-2"><span className="text-xs text-gray-500">{project.technologies.join(' / ')}</span></div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>{tStatus(project.status)}</span>
                    {project.score && <span className="text-xs font-semibold text-[#D4AF37]">{project.score}/100</span>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen size={32} className="text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-4">{t('dash.noProjects')}</p>
              <Link to="/challenges" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">{t('dash.exploreChallenges')} <ArrowRight size={14} /></Link>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
