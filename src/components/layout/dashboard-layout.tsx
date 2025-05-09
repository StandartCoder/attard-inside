'use client';

import { ReactNode, Fragment } from 'react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title = 'Dashboard' }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract user info - fallback to name if firstName/lastName not available
  const firstName = session?.user?.firstName || (session?.user?.name ? session?.user?.name.split(' ')[0] : '') || '';
  const lastName = session?.user?.lastName || (session?.user?.name && session?.user?.name.split(' ').length > 1 ? session?.user?.name.split(' ')[1] : '');
  const fullName = session?.user?.firstName && session?.user?.lastName 
    ? `${session.user.firstName} ${session.user.lastName}` 
    : session?.user?.name || '';
  
  const nameParts = fullName.split(' ');
  
  // Generate initials from all parts of the name
  const initials = nameParts
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
  
  // Format display name as "FirstName L."
  const displayName = firstName + (lastName ? ` ${lastName.charAt(0)}.` : '');
  
  // Use username from new schema if available, otherwise extract from email
  const username = session?.user?.username || session?.user?.email?.split('@')[0] || 'user';

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`w-16 h-16 border-4 ${colors.border} border-t-transparent rounded-full animate-spin`}
        />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.replace('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="flex items-center gap-x-3">
                  <Logo size={32} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:flex items-center gap-2"
                  >
                    <span className={`text-xl font-semibold bg-gradient-to-r ${colors.light} dark:${colors.dark} bg-clip-text text-transparent`}>
                      A&Co Insight Hub
                    </span>
                    <span className="text-gray-400 mx-1">&gt;</span>
                    <span className="text-lg text-gray-700 dark:text-gray-300">{title}</span>
                  </motion.div>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher hideAccent />
              <div className="hidden md:block">
                <HeadlessMenu as="div" className="relative inline-block text-left">
                  <HeadlessMenu.Button className="flex items-center gap-2 rounded-xl bg-white/20 dark:bg-gray-800/60 px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-md hover:bg-white/30 dark:hover:bg-gray-700/80 transition-all border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full ${colors.bg} flex items-center justify-center overflow-hidden`}>
                        <span className={`text-xs font-medium text-white`}>
                          {initials}
                        </span>
                      </div>
                      <span>{displayName}</span>
                      <svg
                        className="h-4 w-4 opacity-70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </HeadlessMenu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white dark:bg-gray-900 py-2 shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {fullName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          @{username}
                        </p>
                      </div>
                      
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link 
                            href="/profile"
                            className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${
                              active ? 'bg-gray-100 dark:bg-gray-800' : ''
                            } text-gray-700 dark:text-gray-300`}
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                      
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link 
                            href="/settings"
                            className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm ${
                              active ? 'bg-gray-100 dark:bg-gray-800' : ''
                            } text-gray-700 dark:text-gray-300`}
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={`flex items-center gap-2 w-full px-4 py-2 text-left text-sm transition-all duration-200 
                                ${active 
                                  ? `${colors.bg} text-white hover:shadow-md` 
                                  : `${colors.text} hover:bg-gray-50 dark:hover:bg-gray-800/70`}`}
                            >
                              <LogOut className="w-4 h-4" />
                              Sign out
                            </button>
                          )}
                        </HeadlessMenu.Item>
                      </div>
                    </HeadlessMenu.Items>
                  </Transition>
                </HeadlessMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.div 
            className="bg-white dark:bg-gray-900 h-auto w-full border-b border-gray-200 dark:border-gray-800 p-4"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <span className={`text-sm font-medium text-white`}>
                      {initials}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {fullName}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      @{username}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500"
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="flex flex-col pt-4 pb-2 space-y-1 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href="/"
                  className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:${colors.light} dark:hover:${colors.dark} hover:${colors.text}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:${colors.light} dark:hover:${colors.dark} hover:${colors.text}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:${colors.light} dark:hover:${colors.dark} hover:${colors.text}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className={`flex items-center gap-2 mt-auto transition-all duration-200 
                  ${colors.text} hover:${colors.bg} hover:text-white border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-md`}
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {title}
            </motion.h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
} 