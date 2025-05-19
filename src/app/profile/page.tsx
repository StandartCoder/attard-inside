'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Mail, AtSign, Edit } from 'lucide-react';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import Image from 'next/image';
import type { Session } from 'next-auth';

export default function ProfilePage() {
  const { data: session } = useSession() as { data: Session | null };
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  
  // Extract user info - fallback to name if firstName/lastName not available
  const firstName = session?.user?.firstName || (session?.user?.name ? session?.user?.name.split(' ')[0] : '') || '';
  const lastName = session?.user?.lastName || (session?.user?.name && session?.user?.name.split(' ').length > 1 ? session?.user?.name.split(' ')[1] : '');
  const fullName = session?.user?.firstName && session?.user?.lastName 
    ? `${session.user.firstName} ${session.user.lastName}` 
    : session?.user?.name || 'User';
  const initials = `${firstName.charAt(0)}${lastName ? `.${lastName.charAt(0)}` : ''}`;
  const username = session?.user?.username || session?.user?.email?.split('@')[0] || 'user';
  const email = session?.user?.email || '';
  
  return (
    <DashboardLayout title="Profile">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className={`h-24 w-24 rounded-full ${colors.bg} flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700`}>
              {session?.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={fullName} 
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className={`text-3xl font-semibold text-white`}>
                  {initials}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{fullName}</h2>
              <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                <AtSign className="w-4 h-4 mr-1" />
                <span>{username}</span>
              </div>
              <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-1" />
                <span>{email}</span>
              </div>
            </div>
            
            <button
              className={`${colors.bg} hover:${colors.hover} text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all ml-auto self-end sm:self-start`}
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  {firstName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  {lastName}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                {email}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                @{username}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}