import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const footerLinks = [
  { titleKey: 'landing.footer.platform', links: [
    { labelKey: 'nav.challenges', href: '/challenges' },
    { labelKey: 'nav.leaderboard', href: '/leaderboard' },
    { labelKey: 'nav.projects', href: '/projects' },
    { labelKey: 'nav.certificates', href: '/certificates' },
  ]},
  { titleKey: 'landing.footer.account', links: [
    { labelKey: 'landing.footer.signIn', href: '/login' },
    { labelKey: 'landing.footer.createAccount', href: '/register' },
    { labelKey: 'nav.profile', href: '/profile' },
    { labelKey: 'nav.settings', href: '/settings' },
  ]},
];

const socials = [
  { icon: Github, label: 'GitHub' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/[0.06] bg-ts-secondary/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ts-gold to-ts-gold-soft flex items-center justify-center">
                <Zap size={16} className="text-black" />
              </div>
              TeenSkill
            </Link>
            <p className="text-sm text-ts-muted leading-relaxed max-w-sm">
              {t('landing.footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-ts-gray hover:text-ts-gold hover:border-ts-gold/30 transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.titleKey}>
              <h4 className="text-sm font-semibold text-white mb-4">{t(group.titleKey)}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-ts-muted hover:text-white transition-colors">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ts-muted">© {new Date().getFullYear()} TeenSkill. {t('landing.footer.socials')}</p>
          <p className="text-xs text-ts-muted">{t('landing.learnIntro')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;