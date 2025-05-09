'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';

export default function NotFound() {
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-grow items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-md w-full px-8 py-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`text-8xl font-bold ${colors.text} mb-6`}>404</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We couldn't find the page you're looking for.
            </p>
            <Link
              href="/"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${colors.bg} hover:${colors.hover} focus:outline-none focus:ring-2 focus:${colors.focus} focus:ring-offset-2 transition-all`}
            >
              Back to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 