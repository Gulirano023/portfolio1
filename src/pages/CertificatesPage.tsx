import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Zap } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CertificatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useApp();
  const { t } = useLanguage();
  const userCerts = state.certificates.filter(c => c.userId === state.auth.user?.id);

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xl font-bold text-white">{t('certs.title')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('certs.subtitle')}</p>
        </div>

        {userCerts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-[#D4AF37]/20 transition-all"
              >
                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-6 text-center border-b border-white/5">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3">
                    <Zap size={20} className="text-[#D4AF37]" />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">TeenSkill</div>
                  <h3 className="text-base font-bold text-white">{cert.title}</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-sm text-gray-400">
                    <span className="text-gray-500">{t('certs.awardedTo')}:</span>{' '}
                    <span className="text-white">{state.auth.user?.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-gray-500">{t('certs.completed')}:</span>{' '}
                    <span className="text-white">{new Date(cert.completedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-gray-500">{t('certs.skillScore')}:</span>{' '}
                    <span className="text-[#D4AF37] font-semibold">{cert.skillScore}/100</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-lg bg-[#151515] border border-white/10 text-sm text-white hover:bg-white/5 transition-colors">
                    <Eye size={14} /> {t('certs.view')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111111] border border-white/5 rounded-xl">
            <Award size={40} className="text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">{t('certs.empty')}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}