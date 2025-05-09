'use client';

import { useState, useRef, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme as useThemeStore, accentColors } from '@/lib/theme';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const { accentColor } = useThemeStore();
  const colors = accentColors['indigo'];
  const [showPassword, setShowPassword] = useState(false);
  const [revealAnim, setRevealAnim] = useState<'none' | 'fading-in' | 'fading-out'>('none');
  const passwordRef = useRef<HTMLInputElement>(null);

  // Responsive logo size
  const [logoSize, setLogoSize] = useState(72);

  // Update logo size based on screen width
  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setLogoSize(96);
      } else if (window.innerWidth >= 640) { // sm breakpoint
        setLogoSize(84);
      } else {
        setLogoSize(72);
      }
    };

    // Set initial size
    updateLogoSize();

    // Update on resize
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const passwordValue = watch('password');

  const { status } = useSession();
  
  // Handle countdown and redirect after successful login
  useEffect(() => {
    if (successMessage && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        // Update the message with new countdown value
        const destination = callbackUrl === '/' ? 'Dashboard' : 'requested page';
        setSuccessMessage(`Redirecting to ${destination} in ${countdown - 1}s`);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (successMessage && countdown === 0) {
      router.push(callbackUrl);
    }
  }, [successMessage, countdown, router, callbackUrl]);
  
  // Handle redirect if already authenticated
  useEffect(() => {
    // Check if user is authenticated and not in the success state
    if (status === 'authenticated' && !successMessage) {
      // Use a short delay to ensure the session is fully established
      const timer = setTimeout(() => {
        router.replace(callbackUrl);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [status, router, successMessage, callbackUrl]);
  
  // Handle initial success message
  const handleLoginSuccess = () => {
    const destination = callbackUrl === '/' ? 'Dashboard' : 'requested page';
    setSuccessMessage(`Redirecting to ${destination} in ${countdown}s`);
    setIsLoading(false);
  };
  
  // Don't render anything while loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      // Show success message and start countdown instead of immediate redirect
      handleLoginSuccess();
      
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Only render the login form if not authenticated
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full max-w-xl rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/70 dark:bg-gray-900/80 shadow-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14 flex flex-col items-center"
        >
          {/* Logo */}
          <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <Logo size={logoSize} />
            <span className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">A&Co Insight Hub</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1"
          >
            Welcome back to <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">your Insight Hub</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            className="mb-6 text-center text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 font-normal"
          >
            All your business insights, one place.
          </motion.p>
          
          <AnimatePresence mode="wait">
            {successMessage ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full px-2 sm:px-4 my-4 sm:my-6 md:my-8"
              >
                <motion.div 
                  className="w-full flex items-center p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-md"
                  initial={{ x: 0 }}
                  animate={{ 
                    boxShadow: [
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                >
                  <div className="bg-white dark:bg-green-800 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 dark:text-green-300" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm sm:text-base font-medium text-green-800 dark:text-green-300">Login Successful</h3>
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">{successMessage}</p>
                  </div>
                  <div className="ml-2 sm:ml-3 flex-shrink-0 bg-white dark:bg-green-800 rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center border border-green-200 dark:border-green-700">
                    <span className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-300">{countdown}</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 sm:px-4 sm:py-3 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-3 py-2 sm:px-4 sm:py-3 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all pr-12"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/60 dark:bg-gray-800/60 hover:bg-white/90 dark:hover:bg-gray-700/90 border border-gray-200 dark:border-gray-700 shadow transition-all"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-all" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-all" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      key="error-msg"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center mb-2 min-h-[32px] sm:min-h-[40px]"
                    >
                      <div className="w-full max-w-[420px] flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-100 dark:bg-red-900/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 shadow-lg"
                        style={{ minWidth: '100%' }}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">
                          {error === 'Invalid email or password' && 'Invalid email or password. Please try again.'}
                          {error === 'Password is required' && 'Please enter your password.'}
                          {error === 'Password must be at least 6 characters' && 'Password must be at least 6 characters.'}
                          {error !== 'Invalid email or password' && error !== 'Password is required' && error !== 'Password must be at least 6 characters' && error}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`group relative flex w-full justify-center items-center rounded-lg border border-transparent ${colors.bg} px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:${colors.hover} focus:outline-none focus:ring-2 focus:${colors.focus} focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-10 sm:h-12 md:h-14 min-h-[40px] sm:min-h-[48px] md:min-h-[56px]`}
                    style={{ minHeight: 40 }}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span className="font-semibold">Signing in...</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-semibold"
                        >
                          Sign in
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 