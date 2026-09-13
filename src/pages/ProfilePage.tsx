import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Award, FolderOpen } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { skillIcons, statusColors } from '@/data/mockData';

export default function ProfilePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useApp();
  const { t, tStatus } = useLanguage();
  const user = state.auth.user;
  const userProjects = state.projects.filter(p => p.userId === user?.id);

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-white/5 rounded-xl p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center text-2xl font-bold text-black">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{user?.name}</h1>
              <p className="text-sm text-gray-400">@{user?.username}</p>
              {user?.bio && <p className="text-sm text-gray-400 mt-1">{user.bio}</p>}
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="text-gray-500">{t('profile.level')} <span className="text-white font-semibold">{user?.level}</span></span>
                <span className="text-gray-500"><span className="text-[#D4AF37] font-semibold">{user?.points}</span> {t('profile.points')}</span>
                <span className="text-gray-500">{userProjects.length} {t('profile.projects')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111111] border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <Target size={16} className="text-[#D4AF37]" /> {t('profile.skills')}
          </h2>
          <div className="space-y-4">
            {state.skillScores.map((skill) => (
              <div key={skill.skill} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-xs font-bold text-[#D4AF37] flex-shrink-0">
                  {skillIcons[skill.skill]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{skill.level}</span>
                      <span className="text-sm font-semibold text-[#D4AF37]">{skill.score}/100</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                    <span>{skill.challengesCompleted} {t('profile.challenges')}</span>
                    <span>{skill.projectsCompleted} {t('profile.projectsCount')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111] border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <FolderOpen size={16} className="text-[#D4AF37]" /> {t('profile.projectsSection')}
          </h2>
          {userProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {userProjects.map(project => (
                <div key={project.id} className="bg-[#151515] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                    {project.score && (
                      <span className="text-sm font-bold text-[#D4AF37]">{project.score}/100</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{t}</span>
                    ))}
                  </div>
                  {Object.keys(project.skillsDemonstrated).length > 0 && (
                    <div className="space-y-1.5">
                      {Object.entries(project.skillsDemonstrated).map(([skill, score]) => (
                        <div key={skill} className="flex items-center gap-2 text-xs">
                          <span className="text-gray-400 w-28 truncate">{skill}</span>
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${score}%` }} />
                          </div>
                          <span className="text-[#D4AF37] w-6 text-right">{score}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border mt-3 ${statusColors[project.status]}`}>
                    {tStatus(project.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">{t('profile.noProjects')}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111111] border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
            <Award size={16} className="text-[#D4AF37]" /> {t('profile.achievements')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {state.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-xl p-4 border text-center transition-all ${
                  ach.unlockedAt
                    ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20'
                    : 'bg-[#151515] border-white/5 opacity-50'
                }`}
              >
                <div className="text-2xl mb-2">{ach.icon}</div>
                <div className="text-xs font-semibold text-white">{ach.title}</div>
                <div className="text-xs text-gray-500 mt-1">{ach.description}</div>
                {ach.unlockedAt && (
                  <div className="text-xs text-[#D4AF37] mt-2">{t('profile.unlocked')}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}