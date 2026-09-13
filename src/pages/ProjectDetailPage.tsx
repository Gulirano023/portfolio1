import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { statusColors, mockAIFeedback } from '@/data/mockData';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const { t, tStatus } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const project = state.projects.find(p => p.id === id);

  if (!project) {
    return (
      <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
        <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="p-6 text-center py-20"><p className="text-gray-400">{t('pd.notFound')}</p><Link to="/projects" className="text-[#D4AF37] text-sm mt-2 inline-block">{t('pd.back')}</Link></div>
      </DashboardLayout>
    );
  }

  const showFeedback = project.status === 'completed' && project.score;

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><ArrowLeft size={14} /> {t('pd.back')}</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div><h1 className="text-xl font-bold text-white">{project.name}</h1><p className="text-sm text-gray-400 mt-2">{project.description}</p></div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${statusColors[project.status]}`}>{tStatus(project.status)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">{project.technologies.map(t => (<span key={t} className="text-xs px-3 py-1 rounded-lg bg-white/5 text-gray-300">{t}</span>))}</div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"><Github size={14} /> {t('pd.githubRepo')}</a>}
              {project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"><ExternalLink size={14} /> {t('common.liveDemo')}</a>}
            </div>
            {project.score && <div className="mt-5 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg"><div className="text-sm text-gray-400">{t('pd.score')}</div><div className="text-3xl font-bold text-[#D4AF37]">{project.score}<span className="text-lg text-gray-500">/100</span></div></div>}
          </div>

          {Object.keys(project.skillsDemonstrated).length > 0 && (
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4">{t('pd.skillsDemonstrated')}</h2>
              <div className="space-y-3">
                {Object.entries(project.skillsDemonstrated).map(([skill, score]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-1"><span className="text-sm text-gray-300">{skill}</span><span className="text-sm text-[#D4AF37] font-medium">{score}</span></div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] rounded-full" style={{ width: `${score}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showFeedback && (
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4">{t('pd.aiReview')}</h2>
              <div className="mb-5"><div className="text-sm text-gray-400">{t('pd.score')}</div><div className="text-3xl font-bold text-[#D4AF37]">{mockAIFeedback.score}<span className="text-lg text-gray-500">/100</span></div></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2"><CheckCircle size={14} /> {t('pd.strengths')}</h3>
                  <ul className="space-y-2">{mockAIFeedback.strengths.map((s, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-green-400 mt-0.5">✓</span> {s}</li>))}</ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2"><AlertTriangle size={14} /> {t('pd.improvements')}</h3>
                  <ul className="space-y-2">{mockAIFeedback.improvements.map((s, i) => (<li key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-yellow-400 mt-0.5">•</span> {s}</li>))}</ul>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-white/5">
                <h3 className="text-sm font-semibold text-white mb-3">{t('pd.skillEvaluation')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(mockAIFeedback.skillEvaluation).map(([skill, score]) => (
                    <div key={skill} className="bg-[#151515] rounded-lg p-3 border border-white/5"><div className="text-xs text-gray-500">{skill}</div><div className="text-lg font-bold text-[#D4AF37]">{score}</div></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
