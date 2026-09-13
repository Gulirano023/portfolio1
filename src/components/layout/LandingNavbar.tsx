import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/data/translations';

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state, logout } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navLinks: { href: string; key: TranslationKey }[] = [
    { key: 'nav.challenges', href: '/challenges' },
    { key: 'nav.leaderboard', href: '/leaderboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center">
            <Zap size={18} className="text-black" />
          </div>
          TeenSkill
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {state.auth.isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
              >
                {t('nav.dashboard')}
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
              >
                {t('auth.signIn')}
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                {t('landing.startBuilding')}
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label={t('header.openMenu')}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080808] border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                >
                  {t(link.key)}
                </Link>
              ))}
              <hr className="border-white/5" />
              {state.auth.isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm text-gray-400 hover:text-white py-2">
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}
                    className="text-sm text-gray-400 hover:text-white py-2 text-left"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-gray-400 hover:text-white py-2">
                    {t('auth.signIn')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] px-5 py-2.5 rounded-lg text-center"
                  >
                    {t('landing.startBuilding')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default LandingNavbar;