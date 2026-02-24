"use client";

import { Package, FileText, Users, TrendingUp, Plus, BarChart3, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    label: 'Total Products',
    value: '24',
    change: '+3',
    trend: 'this month',
    icon: Package,
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Blog Posts',
    value: '6',
    change: '+2',
    trend: 'this month',
    icon: FileText,
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    label: 'Total Users',
    value: '156',
    change: '+12',
    trend: 'this week',
    icon: Users,
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
  {
    label: 'WhatsApp Orders',
    value: '48',
    change: '+8',
    trend: 'today',
    icon: TrendingUp,
    gradient: 'from-amber-500/20 to-amber-500/5',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
];

const quickActions = [
  { label: 'Add Product', href: '/admin/products/new', icon: Package },
  { label: 'New Blog Post', href: '/admin/blog/new', icon: FileText },
  { label: 'Manage Users', href: '/admin/users', icon: Users },
  { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3 },
];

const recentActivity = [
  { title: 'New product added', subtitle: 'Rose Whisper Bouquet', time: '2h ago', icon: Package },
  { title: 'Blog post published', subtitle: 'Wedding Flower Trends 2026', time: '4h ago', icon: FileText },
  { title: 'New user registered', subtitle: 'john@example.com', time: '5h ago', icon: Users },
  { title: 'WhatsApp order received', subtitle: 'Order #1234', time: '6h ago', icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Stats Cards - Top Row */}
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              col-span-12 sm:col-span-6 lg:col-span-3
              bg-white border border-neutral-200 rounded-2xl p-5
              hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300
              group cursor-default
            `}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-neutral-900 font-mono tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
            </div>
            <p className="text-xs text-neutral-400 mt-3">{stat.trend}</p>
          </div>
        ))}

        {/* Recent Activity - Left Side */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-neutral-900">Recent Activity</h2>
            <Link href="/admin/activity" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <item.icon className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{item.title}</p>
                  <p className="text-xs text-neutral-500 truncate">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Right Side */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-neutral-900 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center justify-center gap-3 p-5 bg-neutral-50 hover:bg-neutral-100 border border-transparent hover:border-neutral-200 rounded-xl transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                  <action.icon className="w-5 h-5 text-neutral-600" />
                </div>
                <span className="text-xs font-medium text-neutral-700 text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row - Additional Cards */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-linear-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Orders Today</span>
          </div>
          <p className="text-4xl font-bold font-mono">8</p>
          <p className="text-sm text-neutral-400 mt-2">+33% from yesterday</p>
          <div className="mt-6 flex gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-white/20 rounded-full"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {['Rose Whisper', 'Tulip Serenity', 'Sunflower Joy'].map((product, i) => (
              <div key={product} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs font-medium text-neutral-500">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-neutral-700">{product}</span>
                <span className="text-xs text-neutral-400">{12 - i * 3} orders</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-base font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-white/80 mb-4">
            Check out our documentation or contact support for assistance.
          </p>
          <Link
            href="/admin/help"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            View Docs
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

