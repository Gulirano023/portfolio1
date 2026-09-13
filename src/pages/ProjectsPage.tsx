import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, FolderOpen, ExternalLink, Github, Edit } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { statusColors } from '@/data/mockData';

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useApp();
  const { t, tStatus } = useLanguage();
  const userProjects = state.projects.filter(p => p.userId === state.auth.user?.id);

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-white">{t('projects.title')}</h2><p className="text-sm text-gray-400 mt-1">{t('projects.subtitle')}</p></div>
          <Link to="/projects/new" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity"><Plus size={14} /> {t('projects.addNew')}</Link>
        </div>
        {userProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProjects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-[#D4AF37]/20 transition-all group">
                  <div className="w-full h-36 bg-gradient-to-br from-[#1a1a1a] to-[#111111] flex items-center justify-center"><FolderOpen size={32} className="text-gray-600" /></div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">{project.technologies.map(t => (<span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{t}</span>))}</div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>{tStatus(project.status)}</span>
                      {project.score && <span className="text-sm font-bold text-[#D4AF37]">{project.score}/100</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"><Github size={12} /> {t('common.github')}</a>}
                      {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"><ExternalLink size={12} /> {t('common.liveDemo')}</a>}
                      <Link to={`/projects/${project.id}`} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors ml-auto"><Edit size={12} /> {t('common.view')}</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111111] border border-white/5 rounded-xl">
            <FolderOpen size={40} className="text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400 mb-4">{t('projects.noProjects')}</p>
            <Link to="/projects/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity"><Plus size={14} /> {t('projects.first')}</Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
