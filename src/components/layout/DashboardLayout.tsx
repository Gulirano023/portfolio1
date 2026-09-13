import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Target, FolderOpen, Trophy, Award,
  User, Settings, Zap, ChevronLeft, ChevronRight, X, LogOut,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  { icon: LayoutDashboard, key: 'nav.dashboard', href: '/dashboard' },
  { icon: Target, key: 'nav.challenges', href: '/challenges' },
  { icon: FolderOpen, key: 'nav.projects', href: '/projects' },
  { icon: Trophy, key: 'nav.leaderboard', href: '/leaderboard' },
  { icon: Award, key: 'nav.certificates', href: '/certificates' },
  { icon: User, key: 'nav.profile', href: '/profile' },
  { icon: Settings, key: 'nav.settings', href: '/settings' },
] as const;

interface DashboardLayoutProps {
  children: React.ReactNode;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function DashboardLayout({ children, mobileMenuOpen, setMobileMenuOpen }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, logout } = useApp();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#080808]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-full bg-[#0a0a0a] border-r border-white/5 z-40 transition-all duration-300 ${
          collapsed ? 'w-[68px]' : 'w-[240px]'
        }`}
      >
        <div className={`h-16 flex items-center border-b border-white/5 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-black" />
              </div>
              TeenSkill
            </Link>
          )}
          {collapsed && (
            <Link to="/dashboard" className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </Link>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? t(item.key) : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{t(item.key)}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span>{t('nav.logout')}</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full mt-2 p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[260px] bg-[#0a0a0a] border-r border-white/5 flex flex-col">
            <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
              <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg text-white" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center">
                  <Zap size={16} className="text-black" />
                </div>
                TeenSkill
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{t(item.key)}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
              >
                <LogOut size={18} />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? 'lg:ml-[68px]' : 'lg:ml-[240px]'}`}>
        {children}
      </main>
    </div>
  );
}