'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Mail, AtSign, Edit, User, BadgeCheck, KeyRound, Calendar, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { getPermission, type PermissionLevel } from '@/lib/permissions';
import Image from 'next/image';
import type { Session } from 'next-auth';
import { Button } from "@/components/ui/button";
import { Modal } from '@/components/ui/Modal';
import { Tooltip } from '@/components/ui/Tooltip';

const funFacts = [
  "Did you know? The first email was sent in 1971!",
  "Pro tip: A strong password keeps your data safe.",
  "You can customize your dashboard theme in Settings!",
  "Your insights are always private and secure.",
  "Stay curious. Stay inspired. Stay ahead!"
];

export default function ProfilePage() {
  const { data: session } = useSession() as { data: Session | null };
  const { accentColor } = useThemeStore();
  const colors = accentColors[accentColor];
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editFirstName, setEditFirstName] = useState(session?.user?.firstName || '');
  const [editLastName, setEditLastName] = useState(session?.user?.lastName || '');
  const [editUsername, setEditUsername] = useState(session?.user?.username || '');
  const [editEmail, setEditEmail] = useState(session?.user?.email || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Extract user info - fallback to name if firstName/lastName not available
  const firstName = session?.user?.firstName || (session?.user?.name ? session?.user?.name.split(' ')[0] : '') || '';
  const lastName = session?.user?.lastName || (session?.user?.name && session?.user?.name.split(' ').length > 1 ? session?.user?.name.split(' ')[1] : '');
  const fullName = session?.user?.firstName && session?.user?.lastName 
    ? `${session.user.firstName} ${session.user.lastName}` 
    : session?.user?.name || 'User';
  const initials = `${firstName.charAt(0)}${lastName ? `.${lastName.charAt(0)}` : ''}`;
  const username = session?.user?.username || session?.user?.email?.split('@')[0] || 'user';
  const email = session?.user?.email || '';

  // Permission info
  const permissionLevel = (session?.user?.permission ?? 1) as PermissionLevel;
  const permission = getPermission(permissionLevel) ?? { label: 'Unknown', desc: 'No permission level set.' };

  // Save profile info (simulate)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await new Promise(res => setTimeout(res, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setShowEdit(false);
  };

  // Password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setPasswordLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    setPasswordLoading(false);
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 2000);
    setShowPassword(false);
  };

  useEffect(() => {
    if (showEdit) {
      setEditFirstName(session?.user?.firstName || (session?.user?.name ? session?.user?.name.split(' ')[0] : '') || '');
      setEditLastName(session?.user?.lastName || (session?.user?.name && session?.user?.name.split(' ').length > 1 ? session?.user?.name.split(' ')[1] : ''));
      setEditUsername(session?.user?.username || session?.user?.email?.split('@')[0] || 'user');
      setEditEmail(session?.user?.email || '');
    } else {
      setEditFirstName('');
      setEditLastName('');
      setEditUsername('');
      setEditEmail('');
    }
  }, [showEdit]);

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-3xl mx-auto space-y-8 px-2 sm:px-6 md:px-10 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
            <div className={`h-20 w-20 sm:h-24 sm:w-24 rounded-full ${colors.bg} flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700 mx-auto md:mx-0`}>
              {session?.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={fullName} 
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className={`text-2xl sm:text-3xl font-semibold text-white`}>
                  {initials}
                </span>
              )}
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                {fullName}
                <CheckCircle className="w-5 h-5 text-green-500" />
              </h2>
              <div className="flex items-center justify-center md:justify-start mt-1 text-gray-500 dark:text-gray-400 gap-2 text-sm sm:text-base">
                <AtSign className="w-4 h-4" />
                <span>{username}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-1 text-gray-500 dark:text-gray-400 gap-2 text-sm sm:text-base">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
              <div className="flex justify-center md:justify-start">
                <Tooltip content={permission.desc}>
                  <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} text-white cursor-pointer transition hover:brightness-110`}>
                    {permission.label}
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end md:ml-auto md:self-start">
              <button
                className={`${colors.bg} hover:${colors.hover} text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all focus:ring-2 focus:ring-offset-2 focus:${colors.focus} w-full md:w-auto`}
                onClick={() => setShowEdit(true)}
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                className={`border ${colors.border} text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:${colors.focus} w-full md:w-auto`}
                onClick={() => setShowPassword(true)}
              >
                <KeyRound className="w-4 h-4" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-base sm:text-lg">
                  {firstName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-base sm:text-lg">
                  {lastName}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
              <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-base sm:text-lg">
                {email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
              <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-base sm:text-lg">
                @{username}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Modal */}
        <Modal
          open={showEdit}
          onClose={() => setShowEdit(false)}
          title={<span>Edit Profile</span>}
          actions={
            <>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-profile-form"
                className={`${colors.bg} hover:${colors.hover} text-white px-4 py-2 rounded-lg transition focus:ring-2 focus:ring-offset-2 focus:${colors.focus}`}
                disabled={saving}
              >
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
              </button>
            </>
          }
        >
          <form id="edit-profile-form" onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={editFirstName}
                onChange={e => setEditFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={editLastName}
                onChange={e => setEditLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={editUsername}
                onChange={e => setEditUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                required
                type="email"
              />
            </div>
          </form>
        </Modal>

        {/* Change Password Modal */}
        <Modal
          open={showPassword}
          onClose={() => setShowPassword(false)}
          title={<span>Change Password</span>}
          actions={
            <>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                onClick={() => setShowPassword(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="change-password-form"
                className={`${colors.bg} hover:${colors.hover} text-white px-4 py-2 rounded-lg transition focus:ring-2 focus:ring-offset-2 focus:${colors.focus}`}
                disabled={passwordLoading}
              >
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </button>
            </>
          }
        >
          <form id="change-password-form" onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Password</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">New Password</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Confirm New Password</label>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {passwordError && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                <XCircle className="w-4 h-4" /> {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
                <CheckCircle className="w-4 h-4" /> Password changed successfully!
              </div>
            )}
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}