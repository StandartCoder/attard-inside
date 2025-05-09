'use client';

import { motion } from 'framer-motion';
import { useTheme as useThemeStore, accentColors, type AccentColor, type Theme } from '@/lib/theme';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useState } from 'react';

export default function SettingsPage() {
  const { theme, accentColor, setTheme, setAccentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);
  const [selectedAccent, setSelectedAccent] = useState<AccentColor>(accentColor);

  const themeOptions: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  const accentOptions: { value: AccentColor; color: string; label: string }[] = [
    { value: 'indigo', color: 'bg-indigo-500', label: 'Indigo' },
    { value: 'blue', color: 'bg-blue-500', label: 'Blue' },
    { value: 'purple', color: 'bg-purple-500', label: 'Purple' },
    { value: 'pink', color: 'bg-pink-500', label: 'Pink' },
    { value: 'rose', color: 'bg-rose-500', label: 'Rose' },
    { value: 'orange', color: 'bg-orange-500', label: 'Orange' },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setSelectedAccent(newAccent);
    setAccentColor(newAccent);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Appearance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedTheme === option.value
                        ? `${colors.border} ${colors.bg}/10 dark:${colors.bg}/20`
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } transition-all`}
                  >
                    <span className={`text-sm font-medium ${selectedTheme === option.value ? colors.text : 'text-gray-700 dark:text-gray-300'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {accentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAccentChange(option.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                      selectedAccent === option.value
                        ? `${accentColors[option.value].border} ${accentColors[option.value].bg}/10 dark:${accentColors[option.value].bg}/20`
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    } transition-all`}
                  >
                    <div className={`w-6 h-6 rounded-full ${option.color}`}></div>
                    <span className={`text-xs font-medium ${selectedAccent === option.value ? accentColors[option.value].text : 'text-gray-700 dark:text-gray-300'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
          <p className="text-gray-600 dark:text-gray-400">
            A&Co Insight Hub provides a central location for your business analytics and data management.
            Customize your experience with the settings above.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Version 1.0.0
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 