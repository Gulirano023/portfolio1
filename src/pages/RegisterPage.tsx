import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';

const skillOptions = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Git & GitHub'];

export default function RegisterPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '', username: '', email: '', password: '', confirmPassword: '', age: '', mainSkill: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useApp();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError(t('auth.err.passwordMismatch'));
      return;
    }
    if (form.password.length < 6) {
      setError(t('auth.err.passwordShort'));
      return;
    }
    if (!form.mainSkill) {
      setError(t('auth.err.mainSkillRequired'));
      return;
    }
    if (!form.username || !/^[a-zA-Z0-9_]{3,40}$/.test(form.username)) {
      setError(t('auth.err.usernameInvalid'));
      return;
    }

    setLoading(true);
    const success = await register(form.name, form.username, form.email, form.password, parseInt(form.age) || 15, form.mainSkill);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('auth.err.exists'));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl text-white mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#E5C75A] flex items-center justify-center">
              <Zap size={20} className="text-black" />
            </div>
            TeenSkill
          </Link>
          <h1 className="text-2xl font-bold text-white">{t('auth.register.title')}</h1>
          <p className="text-gray-400 mt-2 text-sm">{t('auth.register.subtitle')}</p>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rano"
                  required
                  className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.username')}</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="rano"
                  required
                  className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.email')}</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.password')}</label>
                <div className="relative">
                  <input
                    id="reg-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.confirmPassword')}</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.age')}</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="13"
                  max="18"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="16"
                  required
                  className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="mainSkill" className="block text-sm font-medium text-gray-300 mb-1.5">{t('auth.mainSkill')}</label>
                <select
                  id="mainSkill"
                  name="mainSkill"
                  value={form.mainSkill}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none"
                >
                  <option value="">{t('auth.select')}</option>
                  {skillOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? t('auth.creating') : t('auth.createBtn')} <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="text-[#D4AF37] hover:text-[#E5C75A] font-medium transition-colors">
              {t('auth.signInShort')}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
