import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme, accentColors } from '@/lib/theme';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  description,
}: StatsCardProps) {
  const { accentColor, theme } = useTheme();
  const colors = accentColors[accentColor];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 shadow-md border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${colors.light} dark:${colors.dark}`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
      </div>
      
      <div className="flex items-baseline mb-1">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {change && (
          <span className={`ml-2 text-sm font-medium ${change.isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {change.isPositive ? '+' : ''}{change.value}%
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
      
      <div 
        className={`absolute bottom-0 left-0 h-1 ${colors.bg}`} 
        style={{ width: '40%' }}
      />
    </motion.div>
  );
} 