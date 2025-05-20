'use client';

import { motion } from 'framer-motion';
import { useTheme as useThemeStore, accentColors, type AccentColor, type Theme } from '@/lib/theme';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useState } from 'react';
import { ThemeSwitcher } from "@/components/theme-switcher";
import { User, Sparkles, Lightbulb, Heart, Code, Zap, Sun, Moon, Monitor, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { theme, accentColor, setTheme, setAccentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);
  const [selectedAccent, setSelectedAccent] = useState<AccentColor>(accentColor);

  const themeOptions: { value: Theme; label: string; icon: React.ElementType }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
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
      <div className="max-w-4xl mx-auto space-y-12 px-2 sm:px-6 md:px-10 py-4 sm:py-6">
        {/* Theme Switcher Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/60 dark:from-gray-900/80 dark:to-gray-800/60 mx-0 sm:mx-4 p-4 sm:p-8 md:p-10 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-start md:gap-8 mb-6 md:mb-10 text-center md:text-left">
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start md:justify-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white md:text-left">Appearance</h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 md:text-left">Customize the look and feel</p>
            </div>
          </div>
          <div className="space-y-8 px-0 md:px-1">
            <div className="px-0 md:px-2 lg:px-4">
              {/* Theme Selection */}
              <div>
                <h3 className="text-base md:text-md font-medium text-gray-700 dark:text-gray-300 mb-4 md:mb-6 md:text-left">Theme Mode</h3>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:justify-start">
                  {themeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleThemeChange(option.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative group p-3 md:p-4 rounded-xl border transition-all duration-200 ${
                        selectedTheme === option.value
                          ? `${colors.border} ${colors.bg}/10 dark:${colors.bg}/20 shadow-lg`
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                        <div className={`p-2 md:p-3 rounded-lg ${
                          selectedTheme === option.value
                            ? `${colors.bg} text-white`
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          <option.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs md:text-sm font-medium ${
                          selectedTheme === option.value
                            ? colors.text
                            : 'text-gray-700 dark:text-gray-300'
                        } md:text-left`}>
                          {option.label}
                        </span>
                      </div>
                      {selectedTheme === option.value && (
                        <motion.div
                          layoutId="activeTheme"
                          className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent"
                          style={{
                            boxShadow: `0 0 0 3px ${colors.border.replace('border-', '').replace('-500', '')}33`,
                            borderColor: colors.border,
                            transition: 'box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), border-color 0.35s cubic-bezier(0.4,0,0.2,1)'
                          }}
                          transition={{ type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.35 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Accent Color Selection */}
              <div>
                <h3 className="text-base md:text-md font-medium text-gray-700 dark:text-gray-300 mb-4 md:mb-6 md:text-left">Accent Color</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 mb-2 md:justify-start">
                  {accentOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAccentChange(option.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative p-3 md:p-4 rounded-xl border transition-all duration-200 ${
                        selectedAccent === option.value
                          ? `${accentColors[option.value].border} ${accentColors[option.value].bg}/10 dark:${accentColors[option.value].bg}/20 shadow-lg`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex flex-col items-center md:items-start gap-2 md:gap-4">
                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full ${option.color} shadow-lg transform transition-transform duration-200 group-hover:scale-110`} />
                        <span className={`text-xs md:text-sm font-medium ${
                          selectedAccent === option.value
                            ? accentColors[option.value].text
                            : 'text-gray-700 dark:text-gray-300'
                        } md:text-left`}>
                          {option.label}
                        </span>
                      </div>
                      {selectedAccent === option.value && (
                        <motion.div
                          layoutId="activeAccent"
                          className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent"
                          style={{
                            boxShadow: `0 0 0 3px ${accentColors[option.value].border.replace('border-', '').replace('-500', '')}33`,
                            borderColor: accentColors[option.value].border,
                            transition: 'box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), border-color 0.35s cubic-bezier(0.4,0,0.2,1)'
                          }}
                          transition={{ type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.35 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Space between sections */}
        <div className="h-8 sm:h-16"></div>
        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl bg-gradient-to-br from-gray-50/80 to-gray-100/60 dark:from-gray-900/80 dark:to-gray-800/60 mx-0 sm:mx-4 p-4 sm:p-8 md:p-10 overflow-hidden"
        >
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8 mb-6 md:mb-10 text-center md:text-left">
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto md:mx-0">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start md:justify-center">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white md:text-left">About</h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 md:text-left">Version 1.0.0</p>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 md:gap-8">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Sparkles className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2 md:text-left">Overview</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 md:text-left">
                      A modern analytics platform designed to help businesses make data-driven decisions through intuitive visualizations and powerful insights.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 md:gap-8">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Lightbulb className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2 md:text-left">Features</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 md:text-left">
                      Advanced analytics, real-time data processing, and customizable dashboards built with modern technology for optimal performance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3 md:gap-8">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 md:mb-2 md:text-left">Feedback</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 md:text-left">
                      Have feedback? We're all ears! 🎧 Check out our 
                      <a 
                        href="https://github.com/StandartCoder/attard-inside"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${accentColors[selectedAccent].text} hover:underline transition-colors font-medium ml-1 mr-1`}
                      >
                        GitHub repository
                      </a>
                      to explore the codebase and contribute your ideas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 mt-4 text-base text-gray-500 dark:text-gray-400">
                <Heart className={`w-5 h-5 animate-pulse ${accentColors[selectedAccent].text}`} />
                <a 
                  href="https://github.com/StandartCoder/attard-inside" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors group text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Made by interns & contributors
                </a>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Zap className="w-4 h-4" />
              <span>Powered by modern technology</span>
            </div>
          </div>
          <div className="h-16 md:h-24"></div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 