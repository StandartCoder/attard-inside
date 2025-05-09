'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
            <div className="flex justify-center mb-6">
              <AlertCircle className={`w-20 h-20 ${colors.text}`} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We apologize for the inconvenience. Please try again or return to the dashboard.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={reset}
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white ${colors.bg} hover:${colors.hover} focus:outline-none focus:ring-2 focus:${colors.focus} focus:ring-offset-2 transition-all`}
              >
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2 transition-all"
              >
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 