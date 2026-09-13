import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-7xl font-extrabold text-white mb-4">404</div>
        <p className="text-gray-400 mb-8">{t('nf.text')}</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E5C75A] text-black font-semibold text-sm hover:opacity-90 transition-opacity">
          <Home size={16} /> {t('nf.goHome')}
        </Link>
      </motion.div>
    </div>
  );
}