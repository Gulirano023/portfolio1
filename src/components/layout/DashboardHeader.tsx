import { Menu, Bell } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { state } = useApp();
  const { t } = useLanguage();
  const username = state.auth.user?.name?.split(' ')[0] || 'there';

  return (
    <header className="sticky top-0 z-30 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={t('header.openMenu')}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-white">
            {t('header.welcome', { name: username })}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors" aria-label={t('header.notifications')}>
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center text-sm font-bold text-black">
            {state.auth.user?.name?.[0] || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}