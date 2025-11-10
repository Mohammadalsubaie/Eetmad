'use client';

import { motion } from 'framer-motion';
import {
ArrowRight,
Award,
BadgeCheck,
Building2,
Clock,
Code,
Compass,
Crown,
DollarSign,
Eye,
Facebook,
FileText,
Instagram,
Layers,
Linkedin,
MapPin,
Menu,
Palette,
Rocket,
Search,
Send,
Shield,
Smartphone,
Star,
TrendingUp,
Twitter,
Users,
Video,
Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function FuturisticFreelancePlatform() {
const [scrollY, setScrollY] = useState(0);
const [activeFilter, setActiveFilter] = useState('all');
const [searchFocused, setSearchFocused] = useState(false);
const [hoveredProject, setHoveredProject] = useState(null);

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const categories = [
{ id: 1, name: 'تطوير الويب', icon: <Code />, count: 4892, trend: '+18%', color: '#1B3C53' },
{
id: 2,
name: 'التصميم الجرافيكي',
icon: <Palette />,
count: 3421,
trend: '+24%',
color: '#456882',
},
{
id: 3,
name: 'كتابة المحتوى',
icon: <FileText />,
count: 2134,
trend: '+15%',
color: '#D2C1B6',
},
{
id: 4,
name: 'التسويق الرقمي',
icon: <TrendingUp />,
count: 3876,
trend: '+32%',
color: '#1B3C53',
},
{
id: 5,
name: 'تطوير التطبيقات',
icon: <Smartphone />,
count: 2945,
trend: '+28%',
color: '#456882',
},
{ id: 6, name: 'إنتاج الفيديو', icon: <Video />, count: 1687, trend: '+19%', color: '#D2C1B6' },
];

const projects = [
{
id: 1,
title: 'تصميم وتطوير منصة تعليمية تفاعلية متقدمة',
client: 'EduTech Innovations',
badge: 'PREMIUM',
category: 'تطوير الويب',
description:
'نحتاج فريق متكامل لتصميم وتطوير منصة تعليمية حديثة تدعم الفصول الافتراضية، الاختبارات التفاعلية، وتتبع تقدم الطلاب بشكل لحظي',
budget: { min: 95000, max: 150000 },
type: 'Fixed Price',
duration: '12-16 أسبوع',
skills: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'AWS', 'UI/UX'],
applicants: 47,
views: 1243,
timeAgo: '2 ساعة',
urgency: 'high',
verified: true,
location: 'السعودية',
clientRating: 4.9,
clientProjects: 28,
},
{
id: 2,
title: 'حملة تسويقية شاملة عبر منصات التواصل الاجتماعي',
client: 'Digital Growth Co.',
badge: 'FEATURED',
category: 'التسويق الرقمي',
description:
'مطلوب خبير تسويق رقمي لإدارة حملات إعلانية متعددة على Instagram, Facebook, TikTok مع إنتاج محتوى إبداعي وتحليل مستمر للبيانات',
budget: { min: 35000, max: 60000 },
type: 'Monthly',
duration: '3-6 أشهر',
skills: ['Social Media', 'Content Creation', 'Analytics', 'Ads Manager', 'Copywriting'],
applicants: 89,
views: 2156,
timeAgo: '4 ساعات',
urgency: 'medium',
verified: true,
location: 'الإمارات',
clientRating: 5.0,
clientProjects: 45,
},
{
id: 3,
title: 'تصميم هوية بصرية متكاملة لشركة ناشئة في التقنية',
client: 'TechStart Ventures',
badge: 'NEW',
category: 'التصميم الجرافيكي',
description:
'نبحث عن مصمم محترف لإنشاء هوية بصرية كاملة تشمل: الشعار، الألوان، الخطوط، دليل الهوية، تصاميم وسائل التواصل، وقوالب العروض التقديمية',
budget: { min: 28000, max: 45000 },
type: 'Fixed Price',
duration: '4-6 أسابيع',
skills: ['Adobe Illustrator', 'Brand Identity', 'Typography', 'Color Theory', 'Style Guide'],
applicants: 62,
views: 987,
timeAgo: '1 يوم',
urgency: 'low',
verified: false,
location: 'قطر',
clientRating: 4.7,
clientProjects: 12,
},
{
id: 4,
title: 'كتابة محتوى تقني متخصص وتحسين SEO',
client: 'Content Masters',
badge: 'URGENT',
category: 'كتابة المحتوى',
description:
'مطلوب كاتب محتوى تقني لإنتاج مقالات متخصصة في الذكاء الاصطناعي والتقنيات الحديثة، مع تحسين SEO ودراسات حالة شاملة',
budget: { min: 18000, max: 32000 },
type: 'Monthly',
duration: '2-4 أشهر',
skills: ['Technical Writing', 'SEO', 'Research', 'WordPress', 'Analytics'],
applicants: 124,
views: 1876,
timeAgo: '6 ساعات',
urgency: 'high',
verified: true,
location: 'مصر',
clientRating: 4.8,
clientProjects: 34,
},
{
id: 5,
title: 'تطوير تطبيق جوال iOS & Android للتجارة الإلكترونية',
client: 'E-Commerce Plus',
badge: 'PREMIUM',
category: 'تطوير التطبيقات',
description:
'نحتاج مطورين محترفين لبناء تطبيق جوال متكامل للتجارة الإلكترونية مع نظام دفع آمن، تتبع الطلبات، وإشعارات فورية',
budget: { min: 120000, max: 180000 },
type: 'Fixed Price',
duration: '16-20 أسبوع',
skills: ['React Native', 'Flutter', 'Firebase', 'Payment Gateway', 'REST API'],
applicants: 38,
views: 1534,
timeAgo: '5 ساعات',
urgency: 'medium',
verified: true,
location: 'الكويت',
clientRating: 5.0,
clientProjects: 19,
},
{
id: 6,
title: 'إنتاج محتوى فيديو احترافي لحملة إعلانية',
client: 'Creative Studios ME',
badge: 'FEATURED',
category: 'إنتاج الفيديو',
description:
'مطلوب مخرج ومصور محترف لإنتاج سلسلة من الفيديوهات الترويجية القصيرة بجودة سينمائية لحملة إعلانية رقمية',
budget: { min: 42000, max: 75000 },
type: 'Fixed Price',
duration: '6-8 أسابيع',
skills: [
'Video Production',
'After Effects',
'Color Grading',
'Motion Graphics',
'Cinematography',
],
applicants: 56,
views: 1122,
timeAgo: '3 ساعات',
urgency: 'medium',
verified: true,
location: 'الأردن',
clientRating: 4.9,
clientProjects: 23,
},
];

const talents = [
{
id: 1,
name: 'أحمد الشريف',
role: 'Senior Full Stack Developer',
tagline: 'بناء حلول تقنية مبتكرة وقابلة للتوسع',
avatar: '🚀',
rating: 5.0,
reviews: 342,
hourlyRate: 750,
completed: 287,
skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
available: true,
verified: true,
topRated: true,
location: 'الرياض',
responseTime: '30 دقيقة',
successRate: 98,
languages: ['العربية', 'English'],
},
{
id: 2,
name: 'نورا المنصوري',
role: 'Creative UI/UX Designer',
tagline: 'تصميم تجارب مستخدم لا تُنسى',
avatar: '🎨',
rating: 5.0,
reviews: 289,
hourlyRate: 620,
completed: 234,
skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
available: true,
verified: true,
topRated: true,
location: 'دبي',
responseTime: '45 دقيقة',
successRate: 99,
languages: ['العربية', 'English', 'Français'],
},
{
id: 3,
name: 'خالد العتيبي',
role: 'Digital Marketing Strategist',
tagline: 'استراتيجيات نمو مدروسة ونتائج حقيقية',
avatar: '📊',
rating: 4.9,
reviews: 412,
hourlyRate: 580,
completed: 378,
skills: ['SEO/SEM', 'Google Analytics', 'Social Media', 'Growth Hacking', 'Email Marketing'],
available: false,
verified: true,
topRated: true,
location: 'جدة',
responseTime: '1 ساعة',
successRate: 97,
languages: ['العربية', 'English'],
},
{
id: 4,
name: 'سارة الحمادي',
role: 'Content Writer & Copywriter',
tagline: 'كلمات تحكي قصصًا وتحقق أهدافًا',
avatar: '✍️',
rating: 4.8,
reviews: 267,
hourlyRate: 450,
completed: 198,
skills: ['Copywriting', 'SEO Writing', 'Content Strategy', 'Storytelling', 'Arabic Content'],
available: true,
verified: true,
topRated: false,
location: 'الدوحة',
responseTime: '2 ساعة',
successRate: 96,
languages: ['العربية', 'English'],
},
];

const stats = [
{
value: '125K+',
label: 'مشروع نشط',
icon: <Layers />,
gradient: 'from-[#1B3C53] to-[#456882]',
},
{
value: '68K+',
label: 'محترف موثوق',
icon: <Users />,
gradient: 'from-[#456882] to-[#1B3C53]',
},
{
value: '₪12.5B',
label: 'إجمالي المدفوعات',
icon: <TrendingUp />,
gradient: 'from-[#1B3C53] to-[#456882]',
},
{
value: '99.7%',
label: 'معدل الرضا',
icon: <Star />,
gradient: 'from-[#456882] to-[#1B3C53]',
},
];

return (
<div className="min-h-screen bg-[#F9F3EF]">

<motion.nav
initial={{ y: -100 }}
animate={{ y: 0 }}
className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? 'bg-white/80 shadow-xl backdrop-blur-2xl' : 'bg-transparent'
        }`} >
<div className="mx-auto max-w-7xl px-6 lg:px-8">
<div className="flex h-20 items-center justify-between">

<div className="group flex cursor-pointer items-center gap-4">
<div className="relative">
<div className="absolute inset-0 transform rounded-2xl bg-gradient-to-br from-[#1B3C53] to-[#456882] transition-transform duration-700 group-hover:rotate-180"></div>
<div className="relative flex h-12 w-12 items-center justify-center">
<Compass className="relative z-10 h-6 w-6 text-white" strokeWidth={2.5} />
</div>
</div>
<div>
<h1 className="bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-2xl font-black tracking-tight text-transparent">
HORIZON
</h1>
<p className="text-xs font-bold tracking-widest text-[#456882]">WORK SPACE</p>
</div>
</div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {['استكشف', 'المواهب', 'المشاريع', 'الشركات', 'الموارد'].map((item, i) => (
                <button
                  key={i}
                  className="group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold text-[#1B3C53] transition-all hover:bg-[#F9F3EF]"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] opacity-0 transition-opacity group-hover:opacity-10"></div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden rounded-xl px-6 py-2.5 font-bold text-[#1B3C53] transition-all hover:bg-[#F9F3EF] lg:block">
                تسجيل الدخول
              </button>
              <button className="rounded-xl bg-gradient-to-r from-[#1B3C53] to-[#456882] px-6 py-2.5 font-bold text-white transition-all hover:shadow-xl">
                ابدأ مجانًا
              </button>
              <button className="rounded-xl p-2.5 text-[#1B3C53] hover:bg-[#F9F3EF] lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero - Glassmorphism Style */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#1B3C53] to-[#456882] opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#456882] to-[#D2C1B6] opacity-5 blur-3xl"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFCM0M1MyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#D2C1B6] bg-white/60 px-5 py-2.5 shadow-lg backdrop-blur-xl"
              >
                <div className="flex -space-x-3">
                  {['🎯', '💡', '🚀', '⚡'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#1B3C53] to-[#456882] shadow-lg"
                    >
                      <span className="text-xs">{emoji}</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1B3C53]">+75,000 محترف نشط</span>
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 text-6xl leading-[1.1] font-black lg:text-7xl"
              >
                <span className="bg-gradient-to-r from-[#1B3C53] via-[#456882] to-[#1B3C53] bg-clip-text text-transparent">
                  منصة العمل
                </span>
                <br />
                <span className="text-[#456882]">الحر الذكية</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-10 max-w-xl text-xl leading-relaxed text-[#1B3C53]/70"
              >
                اكتشف مستقبل العمل عن بُعد. نربط أفضل المواهب بأهم الفرص في العالم العربي بذكاء
                وكفاءة
              </motion.p>

              {/* Advanced Search */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="group relative"
              >
                <div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1B3C53] to-[#456882] opacity-0 blur transition-all duration-500 group-hover:opacity-20`}
                ></div>

                <div className="relative rounded-2xl border border-[#D2C1B6] bg-white/80 p-2 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center gap-3 px-4">
                      <Search
                        className={`h-5 w-5 transition-colors ${searchFocused ? 'text-[#1B3C53]' : 'text-[#456882]'}`}
                      />
                      <input
                        type="text"
                        placeholder="ابحث عن مهارات، مشاريع، أو خدمات..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full bg-transparent font-semibold text-[#1B3C53] placeholder-[#456882]/60 outline-none"
                      />
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1B3C53] to-[#456882] px-8 py-3 font-bold text-white transition-all hover:shadow-lg">
                      بحث
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#456882]">شائع:</span>
                  {['React Developer', 'UI/UX Design', 'Content Writing', 'SEO'].map((tag, i) => (
                    <button
                      key={i}
                      className="rounded-full border border-[#D2C1B6] bg-white/60 px-4 py-1.5 text-sm font-bold text-[#1B3C53] backdrop-blur-xl transition-all hover:bg-gradient-to-r hover:from-[#1B3C53] hover:to-[#456882] hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 grid grid-cols-3 gap-4 border-t border-[#D2C1B6] pt-12"
              >
                {[
                  { icon: <Shield />, text: 'دفع آمن 100%', color: 'from-[#1B3C53] to-[#456882]' },
                  { icon: <Zap />, text: 'استجابة سريعة', color: 'from-[#456882] to-[#1B3C53]' },
                  { icon: <Award />, text: 'جودة مضمونة', color: 'from-[#1B3C53] to-[#456882]' },
                ].map((feature, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div
                      className={`h-14 w-14 bg-gradient-to-br ${feature.color} mx-auto mb-3 flex items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110`}
                    >
                      {React.cloneElement(feature.icon, {
                        className: 'w-6 h-6 text-white',
                        strokeWidth: 2.5,
                      })}
                    </div>
                    <p className="text-center text-sm font-bold text-[#1B3C53]">{feature.text}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative hidden h-[700px] lg:block"
            >
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 transform"
              >
                <div className="relative">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1B3C53] via-[#456882] to-[#1B3C53] opacity-30 blur-xl"></div>

                  <div className="relative rounded-3xl border border-[#D2C1B6] bg-white/70 p-8 shadow-2xl backdrop-blur-2xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B3C53] to-[#456882]">
                          <Code className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h3 className="font-black text-[#1B3C53]">مشروع متميز</h3>
                          <p className="text-xs font-semibold text-[#456882]">منذ 3 ساعات</p>
                        </div>
                      </div>
                      <div className="rounded-full bg-gradient-to-r from-[#1B3C53] to-[#456882] px-3 py-1.5 text-xs font-black text-white uppercase">
                        HOT
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="mb-3 text-xl leading-tight font-black text-[#1B3C53]">
                      تطوير تطبيق جوال متقدم
                    </h4>

                    <p className="mb-6 text-sm leading-relaxed text-[#456882]">
                      نبحث عن مطور React Native محترف لبناء تطبيق تجارة إلكترونية...
                    </p>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {['React Native', 'Firebase', 'TypeScript'].map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-[#F9F3EF] px-3 py-1.5 text-xs font-bold text-[#1B3C53]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-[#F9F3EF] p-4">
                      <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-[#1B3C53]">85K</p>
                        <p className="text-xs font-semibold text-[#456882]">الميزانية</p>
                      </div>
                      <div className="border-x border-[#D2C1B6] text-center">
                        <p className="mb-1 text-2xl font-black text-[#456882]">12</p>
                        <p className="text-xs font-semibold text-[#456882]">أسبوع</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-1 text-2xl font-black text-[#1B3C53]">34</p>
                        <p className="text-xs font-semibold text-[#456882]">عرض</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1B3C53] to-[#456882] py-3.5 font-bold text-white transition-all hover:shadow-xl">
                      عرض التفاصيل
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Floating Mini Cards */}
              {[
                {
                  top: '5%',
                  right: '5%',
                  rotation: '-12deg',
                  delay: 1.2,
                  icon: <Palette />,
                  text: 'تصميم',
                  color: 'from-[#456882] to-[#D2C1B6]',
                },
                {
                  top: '60%',
                  right: '0%',
                  rotation: '8deg',
                  delay: 1.4,
                  icon: <FileText />,
                  text: 'كتابة',
                  color: 'from-[#1B3C53] to-[#456882]',
                },
                {
                  top: '25%',
                  left: '0%',
                  rotation: '15deg',
                  delay: 1.6,
                  icon: <TrendingUp />,
                  text: 'تسويق',
                  color: 'from-[#456882] to-[#1B3C53]',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: card.rotation,
                    y: [0, -15, 0],
                  }}
                  transition={{
                    delay: card.delay,
                    y: {
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="absolute"
                  style={{ top: card.top, right: card.right, left: card.left }}
                >
                  <div
                    className={`h-32 w-32 bg-gradient-to-br ${card.color} cursor-pointer rounded-2xl p-4 shadow-2xl transition-transform hover:scale-110`}
                  >
                    <div className="flex h-full flex-col">
                      {React.cloneElement(card.icon, {
                        className: 'w-8 h-8 text-white mb-auto',
                        strokeWidth: 2.5,
                      })}
                      <div>
                        <p className="text-lg font-black text-white">{card.text}</p>
                        <p className="text-xs font-semibold text-white/80">+2.5K مشروع</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats - Gradient Cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3C53] to-[#456882] py-20">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-2xl bg-white/20 blur transition-all group-hover:bg-white/30"></div>

                <div className="relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all hover:border-white/40">
                  <div
                    className={`h-14 w-14 bg-gradient-to-br ${stat.gradient} mb-4 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110`}
                  >
                    {React.cloneElement(stat.icon, {
                      className: 'w-7 h-7 text-white',
                      strokeWidth: 2.5,
                    })}
                  </div>
                  <div className="mb-2 text-5xl font-black text-white">{stat.value}</div>
                  <div className="text-sm font-bold tracking-wider text-white/80 uppercase">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Modern Grid */}
      <section className="bg-[#F9F3EF] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-block rounded-full bg-gradient-to-r from-[#1B3C53] to-[#456882] px-6 py-3"
            >
              <span className="text-sm font-black tracking-wider text-white uppercase">
                التصنيفات
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-5xl font-black text-transparent lg:text-6xl"
            >
              استكشف التخصصات
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-xl text-[#456882]"
            >
              اختر المجال المناسب وابدأ رحلتك نحو النجاح
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1B3C53] to-[#456882] opacity-0 blur transition-all duration-500 group-hover:opacity-20"></div>

                <div className="relative rounded-2xl border border-[#D2C1B6] bg-white/70 p-8 backdrop-blur-xl transition-all group-hover:border-transparent">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B3C53] to-[#456882] shadow-lg transition-transform group-hover:scale-110">
                    {React.cloneElement(cat.icon, {
                      className: 'w-8 h-8 text-white',
                      strokeWidth: 2.5,
                    })}
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-2xl font-black text-[#1B3C53]">{cat.name}</h3>

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-3xl font-black text-transparent">
                        {cat.count.toLocaleString()}
                      </p>
                      <p className="text-sm font-semibold text-[#456882]">مشروع متاح</p>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1.5 font-bold text-green-700">
                      <TrendingUp className="h-4 w-4" />
                      {cat.trend}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#F9F3EF]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#1B3C53] to-[#456882]"
                    />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 font-bold text-[#1B3C53] transition-all group-hover:gap-4">
                    <span>استكشف الآن</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Premium Layout */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-[#456882] to-[#1B3C53] px-6 py-3"
              >
                <span className="text-sm font-black tracking-wider text-white uppercase">
                  المشاريع
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-5xl font-black text-transparent lg:text-6xl"
              >
                فرص متميزة اليوم
              </motion.h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 rounded-xl bg-[#F9F3EF] p-2">
              {['all', 'premium', 'urgent', 'featured'].map((filter, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-6 py-2.5 font-bold transition-all ${
                    activeFilter === filter || i === 0
                      ? 'bg-white text-[#1B3C53] shadow-lg'
                      : 'text-[#456882] hover:text-[#1B3C53]'
                  }`}
                >
                  {filter === 'all'
                    ? 'الكل'
                    : filter === 'premium'
                      ? 'مميزة'
                      : filter === 'urgent'
                        ? 'عاجلة'
                        : 'مختارة'}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div
                  className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1B3C53] to-[#456882] opacity-0 blur transition-all duration-500 group-hover:opacity-10`}
                ></div>

                <div className="relative overflow-hidden rounded-3xl border border-[#D2C1B6] bg-[#F9F3EF] transition-all group-hover:border-transparent">
                  {/* Header */}
                  <div className="border-b border-[#D2C1B6] bg-white/50 p-8 pb-6 backdrop-blur-xl">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B3C53] to-[#456882] shadow-lg">
                          <Building2 className="h-7 w-7 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="text-lg font-black text-[#1B3C53]">{project.client}</h4>
                            {project.verified && (
                              <BadgeCheck className="h-5 w-5 text-[#456882]" fill="#456882" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm font-semibold">
                            <div className="flex items-center gap-1 text-[#456882]">
                              <MapPin className="h-4 w-4" />
                              {project.location}
                            </div>
                            <div className="flex items-center gap-1 text-[#456882]">
                              <Star className="h-4 w-4 fill-[#456882]" />
                              {project.clientRating}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`rounded-full px-4 py-1.5 text-xs font-black uppercase ${
                          project.badge === 'PREMIUM'
                            ? 'bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white'
                            : project.badge === 'URGENT'
                              ? 'bg-red-500 text-white'
                              : project.badge === 'FEATURED'
                                ? 'bg-gradient-to-r from-[#456882] to-[#D2C1B6] text-white'
                                : 'bg-green-500 text-white'
                        }`}
                      >
                        {project.badge}
                      </div>
                    </div>

                    <h3 className="mb-3 text-2xl leading-tight font-black text-[#1B3C53]">
                      {project.title}
                    </h3>

                    <div className="inline-block rounded-lg bg-[#456882]/10 px-4 py-2 text-sm font-bold text-[#456882]">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 pt-6">
                    <p className="mb-6 leading-relaxed text-[#1B3C53]/70">{project.description}</p>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[#D2C1B6] bg-white px-4 py-2 text-sm font-bold text-[#1B3C53]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-sm">
                      <div className="text-center">
                        <DollarSign
                          className="mx-auto mb-2 h-5 w-5 text-[#1B3C53]"
                          strokeWidth={2.5}
                        />
                        <p className="mb-1 text-xl font-black text-[#1B3C53]">
                          {project.budget.min.toLocaleString()}
                        </p>
                        <p className="text-xs font-semibold text-[#456882]">ر.س</p>
                      </div>

                      <div className="border-x border-[#D2C1B6] text-center">
                        <Clock className="mx-auto mb-2 h-5 w-5 text-[#456882]" strokeWidth={2.5} />
                        <p className="mb-1 text-sm font-black text-[#456882]">{project.duration}</p>
                        <p className="text-xs font-semibold text-[#456882]">المدة</p>
                      </div>

                      <div className="text-center">
                        <Users className="mx-auto mb-2 h-5 w-5 text-[#1B3C53]" strokeWidth={2.5} />
                        <p className="mb-1 text-xl font-black text-[#1B3C53]">
                          {project.applicants}
                        </p>
                        <p className="text-xs font-semibold text-[#456882]">متقدم</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#D2C1B6] pt-6">
                      <div className="flex items-center gap-6 text-sm font-semibold">
                        <div className="flex items-center gap-2 text-[#456882]">
                          <Eye className="h-4 w-4" />
                          {project.views.toLocaleString()}
                        </div>
                        <span className="text-[#456882]">منذ {project.timeAgo}</span>
                      </div>

                      <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1B3C53] to-[#456882] px-8 py-3 font-bold text-white transition-all group-hover:gap-3 hover:shadow-xl">
                        قدّم الآن
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talents - Card Stack */}
      <section className="bg-[#F9F3EF] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-block rounded-full bg-gradient-to-r from-[#1B3C53] to-[#456882] px-6 py-3"
            >
              <span className="text-sm font-black tracking-wider text-white uppercase">
                المحترفون
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-5xl font-black text-transparent lg:text-6xl"
            >
              أفضل المواهب
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1B3C53] to-[#456882] opacity-0 blur transition-all group-hover:opacity-20"></div>

                <div className="relative rounded-3xl border border-[#D2C1B6] bg-white/70 p-8 backdrop-blur-xl transition-all group-hover:border-transparent">
                  {/* Top Badge */}
                  {talent.topRated && (
                    <div className="absolute top-6 right-6 z-10">
                      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1B3C53] to-[#456882] px-3 py-1.5 text-xs font-black text-white uppercase">
                        <Crown className="h-4 w-4" />
                        TOP
                      </div>
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B3C53] to-[#456882] text-5xl shadow-xl transition-transform group-hover:scale-110">
                      {talent.avatar}
                    </div>

                    {talent.verified && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                        <div className="rounded-full bg-white p-2 shadow-lg">
                          <BadgeCheck className="h-6 w-6 text-[#456882]" fill="#456882" />
                        </div>
                      </div>
                    )}

                    {/* Availability */}
                    <div className="absolute top-0 right-0">
                      <div
                        className={`h-4 w-4 rounded-full border-2 border-white shadow-lg ${
                          talent.available ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-black text-[#1B3C53]">{talent.name}</h3>
                    <p className="mb-2 bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-sm font-bold text-transparent">
                      {talent.role}
                    </p>
                    <p className="mb-6 text-xs text-[#456882] italic">"{talent.tagline}"</p>

                    {/* Rating */}
                    <div className="mb-6 flex items-center justify-center gap-2 border-b border-[#D2C1B6] pb-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#456882] text-[#456882]" />
                        ))}
                      </div>
                      <span className="text-lg font-black text-[#1B3C53]">{talent.rating}</span>
                      <span className="text-sm font-semibold text-[#456882]">
                        ({talent.reviews})
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-[#1B3C53]/10 to-[#456882]/10 p-4">
                        <p className="mb-1 text-3xl font-black text-[#1B3C53]">
                          {talent.completed}
                        </p>
                        <p className="text-xs font-bold text-[#456882] uppercase">مشروع</p>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-[#456882]/10 to-[#D2C1B6]/10 p-4">
                        <p className="mb-1 text-3xl font-black text-[#456882]">
                          {talent.hourlyRate}
                        </p>
                        <p className="text-xs font-bold text-[#456882] uppercase">ر.س/ساعة</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6 flex flex-wrap justify-center gap-2">
                      {talent.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-[#F9F3EF] px-3 py-1.5 text-xs font-bold text-[#1B3C53]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1B3C53] to-[#456882] py-3 font-bold text-white transition-all hover:shadow-xl">
                        عرض الملف
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button className="w-full rounded-xl border-2 border-[#D2C1B6] bg-white py-3 font-bold text-[#1B3C53] transition-all hover:border-[#1B3C53]">
                        تواصل
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B3C53] via-[#456882] to-[#1B3C53] py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl delay-1000"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl"
          >
            <Rocket className="h-16 w-16 text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-6xl leading-tight font-black text-white lg:text-7xl"
          >
            هل أنت جاهز للانطلاق؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-white/90"
          >
            انضم إلى آلاف المحترفين والشركات الذين يحققون أهدافهم معنا كل يوم
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <button className="rounded-xl bg-white px-12 py-5 text-lg font-black text-[#1B3C53] shadow-2xl transition-all hover:bg-[#F9F3EF]">
              ابدأ كمحترف
            </button>

            <button className="rounded-xl border-2 border-white bg-transparent px-12 py-5 text-lg font-black text-white transition-all hover:bg-white hover:text-[#1B3C53]">
              انشر مشروعك
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Clean & Modern */}
      <footer className="border-t border-[#D2C1B6] bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1B3C53] to-[#456882]"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <Compass className="relative z-10 h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h3 className="bg-gradient-to-r from-[#1B3C53] to-[#456882] bg-clip-text text-2xl font-black text-transparent">
                    HORIZON
                  </h3>
                  <p className="text-xs font-bold tracking-widest text-[#456882]">WORK SPACE</p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-[#456882]">
                منصة العمل الحر الذكية التي تربط المواهب بالفرص في العالم العربي
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F9F3EF] text-[#1B3C53] transition-all hover:bg-gradient-to-br hover:from-[#1B3C53] hover:to-[#456882] hover:text-white"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'المنصة', links: ['عن Horizon', 'المدونة', 'الوظائف', 'الأخبار'] },
              { title: 'الخدمات', links: ['للمحترفين', 'للشركات', 'الباقات', 'API'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل', 'الشروط', 'الخصوصية'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-5 text-base font-black tracking-wide text-[#1B3C53] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm font-semibold text-[#456882] transition-colors hover:text-[#1B3C53]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-[#D2C1B6] pt-8 md:flex-row">
            <p className="text-sm font-semibold text-[#456882]">
              © 2025 HORIZON. All rights reserved.
            </p>

            <div className="flex gap-8">
              <a href="#" className="text-sm font-semibold text-[#456882] hover:text-[#1B3C53]">
                Privacy
              </a>
              <a href="#" className="text-sm font-semibold text-[#456882] hover:text-[#1B3C53]">
                Terms
              </a>
              <a href="#" className="text-sm font-semibold text-[#456882] hover:text-[#1B3C53]">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>

);
}

export default FuturisticFreelancePlatform;
