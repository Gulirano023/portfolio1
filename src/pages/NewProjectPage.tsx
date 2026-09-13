import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, FolderOpen } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockChallenges } from '@/data/mockData';
import type { Project } from '@/data/types';

export default function NewProjectPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, addProject, submitProject } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', challengeId: '', githubUrl: '', liveDemoUrl: '', technologies: '' });
  const [submitted, setSubmitted] = useState(false);
  const activeChallenges = mockChallenges.filter(c => state.activeChallenges.includes(c.id));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.auth.user) return;
    const newProject: Project = {
      id: `p${Date.now()}`, userId: state.auth.user.id, name: form.name, description: form.description,
      challengeId: form.challengeId || null, githubUrl: form.githubUrl, liveDemoUrl: form.liveDemoUrl,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean), screenshot: '',
      status: 'submitted', score: null, skillsDemonstrated: {}, submittedAt: new Date().toISOString().split('T')[0], completedAt: null,
    };
    addProject(newProject);
    const mockScore = Math.floor(Math.random() * 20) + 75;
    const mockSkills: Record<string, number> = {};
    newProject.technologies.forEach(t => { mockSkills[t] = Math.floor(Math.random() * 20) + 75; });
    submitProject(newProject.id, mockScore, mockSkills);
    setSubmitted(true);
  };

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><ArrowLeft size={14} /> {t('np.back')}</Link>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111111] border border-white/5 rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-4"><Send size={24} className="text-green-400" /></div>
            <h2 className="text-xl font-bold text-white mb-2">{t('np.successTitle')}</h2>
            <p className="text-sm text-gray-400 mb-6">{t('np.successDesc')}</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/projects" className="px-5 py-2.5 rounded-lg bg-[#151515] border border-white/10 text-sm text-white hover:bg-white/5 transition-colors">{t('np.viewProjects')}</Link>
              <Link to="/dashboard" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">{t('np.goDashboard')}</Link>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center"><FolderOpen size={18} className="text-[#D4AF37]" /></div>
                <div><h1 className="text-lg font-bold text-white">{t('np.title')}</h1><p className="text-xs text-gray-400">{t('np.subtitle')}</p></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div><label htmlFor="proj-name" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.nameLabel')}</label><input id="proj-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder={t('np.namePlaceholder')} required className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all" /></div>
                <div><label htmlFor="proj-desc" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.descLabel')}</label><textarea id="proj-desc" name="description" value={form.description} onChange={handleChange} placeholder={t('np.descPlaceholder')} required rows={3} className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none" /></div>
                <div><label htmlFor="proj-challenge" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.relatedChallenge')}</label><select id="proj-challenge" name="challengeId" value={form.challengeId} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none"><option value="">{t('common.none')}</option>{activeChallenges.map(c => (<option key={c.id} value={c.id}>{c.title}</option>))}</select></div>
                <div><label htmlFor="proj-tech" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.technologies')}</label><input id="proj-tech" name="technologies" type="text" value={form.technologies} onChange={handleChange} placeholder="React, Tailwind CSS, TypeScript" required className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label htmlFor="proj-github" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.githubUrl')}</label><input id="proj-github" name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all" /></div>
                  <div><label htmlFor="proj-demo" className="block text-sm font-medium text-gray-300 mb-1.5">{t('np.liveDemoUrl')}</label><input id="proj-demo" name="liveDemoUrl" type="url" value={form.liveDemoUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all" /></div>
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity"><Send size={14} /> {t('np.submit')}</button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
