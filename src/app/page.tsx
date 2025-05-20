'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Building2, Users, BarChart3, Package, Workflow, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';
import type { Session } from 'next-auth';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredPermission: number;
  description: string;
  color: string;
  stats?: {
    value: string | number;
    label: string;
    change?: {
      value: number;
      isPositive: boolean;
    };
  };
}

const navigation: NavItem[] = [
  {
    name: 'Companies',
    href: '/companies',
    icon: Building2,
    requiredPermission: 1,
    description: 'Manage and view company insights',
    color: 'from-blue-500 to-blue-600',
    stats: {
      value: '12',
      label: 'Active Companies',
      change: { value: 2, isPositive: true }
    }
  },
  {
    name: 'Overall Insights',
    href: '/insights',
    icon: BarChart3,
    requiredPermission: 5,
    description: 'View combined analytics and reports',
    color: 'from-purple-500 to-purple-600',
    stats: {
      value: '84%',
      label: 'Performance',
      change: { value: 12, isPositive: true }
    }
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    requiredPermission: 1,
    description: 'Track and manage product inventory',
    color: 'from-green-500 to-green-600',
    stats: {
      value: '278',
      label: 'Active Products',
      change: { value: 3, isPositive: false }
    }
  },
  {
    name: 'Logistics',
    href: '/logistics',
    icon: Workflow,
    requiredPermission: 2,
    description: 'Monitor deliveries and operations',
    color: 'from-orange-500 to-orange-600',
    stats: {
      value: '94',
      label: 'Deliveries',
      change: { value: 7, isPositive: true }
    }
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    requiredPermission: 2,
    description: 'Access and manage important documents',
    color: 'from-red-500 to-red-600',
    stats: {
      value: '156',
      label: 'Total Documents',
      change: { value: 5, isPositive: true }
    }
  },
  {
    name: 'User Management',
    href: '/users',
    icon: Users,
    requiredPermission: 6,
    description: 'Manage system users and permissions',
    color: 'from-indigo-500 to-indigo-600',
    stats: {
      value: '24',
      label: 'Active Users',
      change: { value: 1, isPositive: true }
    }
  }
];

export default function DashboardPage() {
  const { data: session, status } = useSession() as { 
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  const [isNavigating, setIsNavigating] = useState(false);

  // Extract user info from session
  const firstName = session?.user?.firstName || (session?.user?.name ? session?.user?.name.split(' ')[0] : '') || '';
  const userPermission = session?.user?.permission || 1;

  const handleNavigation = (href: string, requiredPermission: number) => {
    if (userPermission < requiredPermission) {
      return;
    }
    setIsNavigating(true);
    router.push(href);
  };

  return (
    <DashboardLayout>
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {isNavigating ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 border-4 ${colors.border} border-t-transparent rounded-full animate-spin`}
                />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800 shadow-lg">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[size:40px_40px] dark:bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)]" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative px-8 py-6 sm:px-10 sm:py-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                          >
                            Welcome back, {firstName}! 👋
                          </motion.h2>
                          <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {/* Rotating inspirational/tip message */}
                            {[
                              "Success is not the key to happiness. Happiness is the key to success.",
                              "Every great business starts with a great vision.",
                              "Your data tells a story. Make today a chapter worth reading.",
                              "Small steps every day lead to big results.",
                              "Stay curious. Stay inspired. Stay ahead."
                            ][Math.floor((Date.now() / 1000 / 60) % 5)]}
                          </motion.p>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="flex items-center gap-4"
                        >
                          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className={`w-2 h-2 rounded-full ${colors.bg} animate-pulse`} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date().toLocaleDateString('en-US', { 
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className={`w-2 h-2 rounded-full ${colors.bg} animate-pulse`} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date().toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {navigation.map((item, index) => {
                    const hasPermission = userPermission >= item.requiredPermission;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`relative group ${!hasPermission ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => handleNavigation(item.href, item.requiredPermission)}
                      >
                        <div className={`h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200
                          ${hasPermission 
                            ? 'hover:shadow-xl hover:scale-[1.02]' 
                            : 'opacity-50 blur-[0.5px]'}`}
                        >
                          <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} bg-opacity-10`}>
                                <item.icon className={`h-6 w-6 ${item.color.split(' ')[1]}`} />
                              </div>
                              {!hasPermission && (
                                <Lock className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {item.description}
                            </p>
                            {item.stats && (
                              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div>
                                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {item.stats.value}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.stats.label}
                                  </p>
                                </div>
                                {item.stats.change && (
                                  <div className={`flex items-center text-sm font-medium ${
                                    item.stats.change.isPositive 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {item.stats.change.isPositive ? '+' : '-'}
                                    {Math.abs(item.stats.change.value)}%
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
