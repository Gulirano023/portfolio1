import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Globe, LogOut, User, Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, dispatch, logout } = useApp();
  const { t, setLang } = useLanguage();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: state.auth.user?.name || '',
    username: state.auth.user?.username || '',
    bio: state.auth.user?.bio || '',
  });

  const [notifications, setNotifications] = useState(state.settings.notifications);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
    dispatch({ type: 'UPDATE_SETTINGS', payload: { notifications } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DashboardLayout mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}>
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">{t('settings.title')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('settings.subtitle')}</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Moon size={14} className="text-[#D4AF37]" /> {t('settings.appearance')}</h3>
          <div className="flex gap-3">
            {(['dark', 'light'] as const).map(theme => (
              <button
                key={theme}
                onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { theme } })}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-all ${
                  state.settings.theme === theme
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                    : 'bg-[#151515] text-gray-400 border-white/5 hover:text-white'
                }`}
              >
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                {theme === 'dark' ? t('settings.themeDark') : t('settings.themeLight')}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><User size={14} className="text-[#D4AF37]" /> {t('settings.profile')}</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="block text-sm text-gray-400 mb-1.5">{t('settings.name')}</label>
              <input id="settings-name" type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
            </div>
            <div>
              <label htmlFor="settings-username" className="block text-sm text-gray-400 mb-1.5">{t('settings.username')}</label>
              <input id="settings-username" type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
            </div>
            <div>
              <label htmlFor="settings-bio" className="block text-sm text-gray-400 mb-1.5">{t('settings.bio')}</label>
              <textarea id="settings-bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Bell size={14} className="text-[#D4AF37]" /> {t('settings.notifications')}</h3>
          <div className="space-y-3">
            {([
              { key: 'challengeReminders' as const, label: t('settings.notif.challenge') },
              { key: 'feedbackNotifications' as const, label: t('settings.notif.feedback') },
              { key: 'achievementNotifications' as const, label: t('settings.notif.achievement') },
            ]).map(item => (
              <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm text-gray-300">{item.label}</span>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${notifications[item.key] ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
                  role="switch"
                  aria-checked={notifications[item.key]}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: notifications[item.key] ? '22px' : '2px' }}
                  />
                </button>
              </label>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Globe size={14} className="text-[#D4AF37]" /> {t('settings.language')}</h3>
          <div className="flex gap-3">
            {([
              { code: 'en' as const, label: 'English' },
              { code: 'uz' as const, label: "O'zbek" },
              { code: 'ru' as const, label: 'Русский' },
            ]).map(lang => (
              <button
                key={lang.code}
                onClick={() => setLang(lang.code)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  state.settings.language === lang.code
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                    : 'bg-[#151515] text-gray-400 border-white/5 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">
            <Save size={14} /> {saved ? t('settings.saved') : t('settings.save')}
          </button>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium hover:bg-red-500/20 transition-colors">
            <LogOut size={14} /> {t('settings.logout')}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}