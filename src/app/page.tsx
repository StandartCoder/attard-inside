'use client';

import { Workflow, BarChart3, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatsCard } from '@/components/stats-card';

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Analytics"
          value="84%"
          change={{ value: 12, isPositive: true }}
          icon={BarChart3}
          description="Performance growth over last quarter"
        />
        
        <StatsCard
          title="Inventory"
          value="278"
          change={{ value: 3, isPositive: false }}
          icon={Package}
          description="Active products in stock"
        />
        
        <StatsCard
          title="Logistics"
          value="94"
          change={{ value: 7, isPositive: true }}
          icon={Workflow}
          description="Deliveries completed this week"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Welcome to A&Co Insight Hub</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This dashboard provides you with a comprehensive view of your business&apos;s key metrics and performance indicators.
          You can monitor analytics, inventory levels, and logistics operations all in one place.
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
