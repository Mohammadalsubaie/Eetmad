'use client';

import { motion } from 'framer-motion';
import {
BadgeCheck,
Bookmark,
Briefcase,
Building2,
CheckCircle,
ChevronLeft,
Clock,
Code,
Crown,
DollarSign,
Eye,
Facebook,
Feather,
Grid,
Instagram,
Linkedin,
LogIn,
MapPin,
Menu,
MessageCircle,
Palette,
Search,
Send,
Shield,
Star,
TrendingUp,
Twitter,
User,
Users,
X,
Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ProfessionalFreelancePlatform() {
const [scrollY, setScrollY] = useState(0);
const [activeCategory, setActiveCategory] = useState('all');
const [hoveredProject, setHoveredProject] = useState(null);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeFilter, setActiveFilter] = useState('trending');

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const categories = [
{ id: 'all', name: 'جميع المجالات', icon: <Grid />, count: 4523, color: '#5D866C' },
{ id: 'design', name: 'التصميم والفنون', icon: <Palette />, count: 892, color: '#C2A68C' },
{ id: 'dev', name: 'البرمجة والتطوير', icon: <Code />, count: 1247, color: '#5D866C' },
{ id: 'writing', name: 'الكتابة والترجمة', icon: <Feather />, count: 654, color: '#C2A68C' },
{
id: 'marketing',
name: 'التسويق والإعلان',
icon: <TrendingUp />,
count: 743,
color: '#5D866C',
},
{
id: 'business',
name: 'الأعمال والاستشارات',
icon: <Briefcase />,
count: 421,
color: '#C2A68C',
},
];

const projects = [
{
id: 1,
title: 'تصميم موقع إلكتروني فاخر لفندق بوتيك',
client: 'مجموعة الضيافة الراقية',
avatar: '🏨',
category: 'التصميم والفنون',
description:
'نبحث عن مصمم UI/UX متميز لتطوير موقع إلكتروني يعكس الفخامة والأناقة، مع تجربة مستخدم سلسة وتصميم بصري يأسر الزوار',
budget: { amount: 45000, type: 'ثابت', currency: 'ر.س' },
duration: '6-8 أسابيع',
skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping', 'Animation'],
proposals: 23,
views: 456,
saved: 89,
level: 'خبير',
timeAgo: 'منذ ساعتين',
featured: true,
urgent: false,
verified: true,
rating: 4.9,
location: 'دبي، الإمارات',
},
{
id: 2,
title: 'تطوير تطبيق جوال للتجارة الإلكترونية',
client: 'شركة التسوق الذكي',
avatar: '🛍️',
category: 'البرمجة والتطوير',
description:
'مطلوب مطور React Native محترف لبناء تطبيق تسوق متكامل مع واجهة عصرية، نظام دفع آمن، وتتبع الطلبات في الوقت الفعلي',
budget: { amount: 85000, type: 'ثابت', currency: 'ر.س' },
duration: '3-4 أشهر',
skills: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe'],
proposals: 41,
views: 892,
saved: 234,
level: 'خبير',
timeAgo: 'منذ 4 ساعات',
featured: true,
urgent: true,
verified: true,
rating: 5.0,
location: 'الرياض، السعودية',
},
{
id: 3,
title: 'كتابة محتوى تسويقي إبداعي لعلامة تجارية',
client: 'وكالة العلامات الناشئة',
avatar: '✍️',
category: 'الكتابة والترجمة',
description:
'نحتاج كاتب محتوى مبدع لصياغة قصة العلامة التجارية، محتوى السوشيال ميديا، ومقالات SEO بأسلوب جذاب يلامس المشاعر',
budget: { amount: 18000, type: 'شهري', currency: 'ر.س' },
duration: '3 أشهر',
skills: ['Copywriting', 'SEO', 'Storytelling', 'Social Media', 'Arabic'],
proposals: 67,
views: 567,
saved: 145,
level: 'متقدم',
timeAgo: 'منذ يوم',
featured: false,
urgent: false,
verified: true,
rating: 4.8,
location: 'جدة، السعودية',
},
{
id: 4,
title: 'إدارة حملات إعلانية متعددة القنوات',
client: 'مركز التسويق الرقمي',
avatar: '📊',
category: 'التسويق والإعلان',
description:
'مطلوب خبير تسويق رقمي لتخطيط وتنفيذ استراتيجية إعلانية شاملة عبر Google Ads، Facebook، Instagram مع تحليل بيانات دقيق',
budget: { amount: 32000, type: 'شهري', currency: 'ر.س' },
duration: '2-3 أشهر',
skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'A/B Testing', 'Strategy'],
proposals: 38,
views: 723,
saved: 198,
level: 'خبير',
timeAgo: 'منذ 5 ساعات',
featured: false,
urgent: false,
verified: true,
rating: 4.7,
location: 'الدوحة، قطر',
},
{
id: 5,
title: 'استشارات استراتيجية لتطوير الأعمال',
client: 'مؤسسة النمو المستدام',
avatar: '💼',
category: 'الأعمال والاستشارات',
description:
'نبحث عن مستشار أعمال متمرس لوضع خطة نمو استراتيجية، تحليل السوق، وتطوير نموذج العمل لشركة ناشئة في مجال التكنولوجيا',
budget: { amount: 55000, type: 'ثابت', currency: 'ر.س' },
duration: '4-6 أسابيع',
skills: ['Business Strategy', 'Market Analysis', 'Planning', 'Consulting'],
proposals: 29,
views: 445,
saved: 112,
level: 'خبير',
timeAgo: 'منذ 3 ساعات',
featured: true,
urgent: false,
verified: true,
rating: 5.0,
location: 'أبوظبي، الإمارات',
},
{
id: 6,
title: 'إنشاء هوية بصرية متكاملة لمقهى راقي',
client: 'كافيه الأصالة',
avatar: '☕',
category: 'التصميم والفنون',
description:
'مطلوب مصمم جرافيك مبدع لتطوير هوية بصرية كاملة تشمل الشعار، الألوان، الخطوط، القوالب، والمطبوعات بأسلوب فني راقي',
budget: { amount: 28000, type: 'ثابت', currency: 'ر.س' },
duration: '4-5 أسابيع',
skills: ['Brand Identity', 'Illustrator', 'Photoshop', 'Typography', 'Print'],
proposals: 52,
views: 634,
saved: 167,
level: 'متقدم',
timeAgo: 'منذ 6 ساعات',
featured: false,
urgent: true,
verified: false,
rating: 4.6,
location: 'بيروت، لبنان',
},
];

const talents = [
{
id: 1,
name: 'سارة المنصوري',
title: 'مصممة UI/UX - متخصصة في تجربة المستخدم',
avatar: '👩‍🎨',
bio: 'شغوفة بتصميم تجارب رقمية استثنائية تجمع بين الجمال والوظيفة',
rating: 5.0,
reviews: 198,
hourlyRate: 420,
projects: 156,
successRate: 99,
skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Design Systems'],
portfolio: ['🎨', '🖼️', '💎', '✨'],
availability: 'متاح',
responseTime: '< 30 دقيقة',
location: 'دبي، الإمارات',
verified: true,
topRated: true,
languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
},
{
id: 2,
name: 'أحمد الزهراني',
title: 'مطور Full Stack - خبير في React & Node.js',
avatar: '👨‍💻',
bio: 'أحول الأفكار الإبداعية إلى حلول تقنية متطورة وقابلة للتوسع',
rating: 4.9,
reviews: 247,
hourlyRate: 480,
projects: 189,
successRate: 98,
skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
portfolio: ['⚡', '🚀', '💻', '🔧'],
availability: 'متاح خلال أسبوع',
responseTime: '< 1 ساعة',
location: 'الرياض، السعودية',
verified: true,
topRated: true,
languages: ['العربية', 'الإنجليزية'],
},
{
id: 3,
name: 'ليلى الحسيني',
title: 'كاتبة محتوى إبداعي - متخصصة في رواية القصص',
avatar: '✍️',
bio: 'أنسج الكلمات لتحكي قصصاً تلامس القلوب وتبني العلامات التجارية',
rating: 5.0,
reviews: 167,
hourlyRate: 350,
projects: 143,
successRate: 100,
skills: ['Copywriting', 'SEO', 'Storytelling', 'Content Strategy', 'Arabic'],
portfolio: ['📝', '📖', '✨', '💫'],
availability: 'مشغول',
responseTime: '< 2 ساعة',
location: 'الدوحة، قطر',
verified: true,
topRated: false,
languages: ['العربية', 'الإنجليزية'],
},
{
id: 4,
name: 'محمد العمري',
title: 'خبير تسويق رقمي - SEO & SEM Specialist',
avatar: '📊',
bio: 'أساعد الشركات على النمو من خلال استراتيجيات تسويق رقمي مدروسة',
rating: 4.8,
reviews: 223,
hourlyRate: 450,
projects: 201,
successRate: 97,
skills: ['SEO', 'Google Ads', 'Analytics', 'Social Media', 'Strategy'],
portfolio: ['📈', '💰', '🎯', '🔍'],
availability: 'متاح',
responseTime: '< 45 دقيقة',
location: 'جدة، السعودية',
verified: true,
topRated: true,
languages: ['العربية', 'الإنجليزية', 'التركية'],
},
];

const stats = [
{ label: 'مشروع مكتمل', value: '52,341', icon: <CheckCircle />, growth: '+28%' },
{ label: 'محترف نشط', value: '15,678', icon: <Users />, growth: '+15%' },
{ label: 'مليار ريال', value: '4.2', icon: <DollarSign />, growth: '+42%' },
{ label: 'معدل الرضا', value: '98.5%', icon: <Star />, growth: '+2%' },
];

const testimonials = [
{
id: 1,
text: 'منصة استثنائية ساعدتني في العثور على أفضل المواهب لمشروعي. الجودة والاحترافية لا مثيل لهما.',
author: 'فيصل الشمري',
role: 'مدير تنفيذي',
company: 'شركة الابتكار الرقمي',
avatar: '👨‍💼',
rating: 5,
},
{
id: 2,
text: 'كمحترف مستقل، وجدت هنا بيئة مثالية للعمل مع عملاء محترمين ومشاريع ملهمة تطور مهاراتي.',
author: 'نورة المطيري',
role: 'مصممة جرافيك',
company: 'عمل حر',
avatar: '👩‍🎨',
rating: 5,
},
{
id: 3,
text: 'الأمان في الدفع والشفافية في التعامل جعلتني أثق تماماً في المنصة. أنصح بها بشدة لأي صاحب مشروع.',
author: 'خالد الدوسري',
role: 'رائد أعمال',
company: 'مؤسسة النمو',
avatar: '🚀',
rating: 5,
},
];

return (
<div className="min-h-screen bg-[#F5F5F0]">

<motion.nav
initial={{ y: -100 }}
animate={{ y: 0 }}
className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? 'border-b border-[#E6D8C3] bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`} >
<div className="mx-auto max-w-[1600px] px-8 lg:px-12">
<div className="flex h-20 items-center justify-between">

<div className="flex cursor-pointer items-center gap-4">
<div className="flex h-12 w-12 items-center justify-center bg-[#5D866C]">
<Building2 className="h-6 w-6 text-white" strokeWidth={2.5} />
</div>
<div>
<h1 className="text-xl font-bold tracking-tight text-[#5D866C]">منصة المحترفين</h1>
<p className="text-xs font-medium tracking-wider text-[#C2A68C]">
PROFESSIONAL PLATFORM
</p>
</div>
</div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {['اكتشف المشاريع', 'ابحث عن مواهب', 'كيف نعمل', 'الأسعار', 'الموارد'].map(
                (item, index) => (
                  <button
                    key={index}
                    className="px-5 py-2.5 text-sm font-semibold text-[#5D866C] transition-all hover:bg-[#F5F5F0] hover:text-[#C2A68C]"
                  >
                    {item}
                  </button>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden items-center gap-2 border border-transparent px-6 py-2.5 font-semibold text-[#5D866C] transition-all hover:border-[#E6D8C3] hover:bg-[#F5F5F0] lg:flex">
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </button>

              <button className="bg-[#5D866C] px-7 py-2.5 font-semibold text-white transition-all hover:bg-[#C2A68C]">
                ابدأ الآن
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 text-[#5D866C] transition-all hover:bg-[#F5F5F0] lg:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Professional */}
      <section className="relative bg-white px-8 pt-40 pb-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-3 border border-[#E6D8C3] bg-[#F5F5F0] px-5 py-2.5"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#5D866C] text-[#5D866C]" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#5D866C]">
                  موثوق من أكثر من 50,000 محترف
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-6xl leading-tight font-bold text-[#5D866C] lg:text-7xl"
              >
                منصة احترافية
                <br />
                <span className="text-[#C2A68C]">للمشاريع والمواهب</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-10 max-w-xl text-xl leading-relaxed font-medium text-[#5D866C]"
              >
                نربط الشركات والمؤسسات مع أفضل المحترفين المستقلين في العالم العربي لتحقيق نتائج
                استثنائية
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="border-2 border-[#E6D8C3] bg-[#F5F5F0] p-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <Search className="h-5 w-5 text-[#5D866C]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، خدمات، أو محترفين..."
                      className="w-full bg-transparent font-semibold text-[#5D866C] placeholder-[#C2A68C] outline-none"
                    />
                  </div>
                  <button className="bg-[#5D866C] px-10 py-3.5 font-bold text-white transition-all hover:bg-[#C2A68C]">
                    بحث
                  </button>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-12 grid grid-cols-3 gap-8 border-t-2 border-[#E6D8C3] pt-12"
              >
                {[
                  { icon: <Shield />, text: 'دفع آمن ومضمون' },
                  { icon: <CheckCircle />, text: 'جودة معتمدة' },
                  { icon: <Zap />, text: 'دعم متواصل' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-[#5D866C]">
                      {React.cloneElement(item.icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <span className="block text-sm font-bold text-[#5D866C]">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`border-2 border-[#E6D8C3] bg-white p-8 ${
                      index % 2 === 0 ? 'mt-0' : 'mt-12'
                    } transition-all hover:border-[#5D866C]`}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center bg-[#5D866C]">
                        {React.cloneElement(stat.icon, {
                          className: 'w-6 h-6 text-white',
                          strokeWidth: 2.5,
                        })}
                      </div>
                      <span className="border border-[#E6D8C3] bg-[#F5F5F0] px-3 py-1.5 text-xs font-bold text-[#5D866C]">
                        {stat.growth}
                      </span>
                    </div>
                    <div className="mb-2 text-4xl font-bold text-[#5D866C]">{stat.value}</div>
                    <div className="text-sm font-bold tracking-wide text-[#C2A68C] uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[#F5F5F0] px-8 py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-bold tracking-widest text-[#C2A68C] uppercase"
            >
              المجالات
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-bold text-[#5D866C]"
            >
              استكشف التخصصات المتاحة
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 bg-[#5D866C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`group border-2 bg-white p-8 text-right transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#5D866C] shadow-lg'
                    : 'border-[#E6D8C3] hover:border-[#C2A68C]'
                }`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#5D866C] transition-all group-hover:bg-[#C2A68C]">
                  {React.cloneElement(cat.icon, {
                    className: 'w-7 h-7 text-white',
                    strokeWidth: 2.5,
                  })}
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#5D866C]">{cat.name}</h3>

                <div className="flex items-center justify-between border-t-2 border-[#E6D8C3] pt-4">
                  <span className="text-sm font-bold text-[#C2A68C] uppercase">
                    المشاريع المتاحة
                  </span>
                  <span className="text-2xl font-bold text-[#5D866C]">{cat.count}</span>
                </div>

                <div className="mt-5 flex items-center gap-2 font-bold text-[#5D866C] transition-all group-hover:gap-3">
                  <span className="text-sm">عرض التفاصيل</span>
                  <ChevronLeft className="h-4 w-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 text-xs font-bold tracking-widest text-[#C2A68C] uppercase"
              >
                الفرص المتاحة
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-bold text-[#5D866C]"
              >
                المشاريع المتميزة
              </motion.h2>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              {['trending', 'recent', 'featured'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`border-2 px-6 py-2.5 font-bold transition-all ${
                    activeFilter === filter
                      ? 'border-[#5D866C] bg-[#5D866C] text-white'
                      : 'border-[#E6D8C3] bg-white text-[#5D866C] hover:border-[#5D866C]'
                  }`}
                >
                  {filter === 'trending' && 'الأكثر طلباً'}
                  {filter === 'recent' && 'الأحدث'}
                  {filter === 'featured' && 'المميزة'}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group border-2 border-[#E6D8C3] bg-[#F5F5F0] transition-all hover:border-[#5D866C] hover:shadow-xl"
              >
                {/* Project Header */}
                <div className="border-b-2 border-[#E6D8C3] bg-white p-8 pb-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{project.avatar}</div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[#5D866C]">{project.client}</h4>
                          {project.verified && <BadgeCheck className="h-5 w-5 text-[#5D866C]" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#C2A68C]">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {project.urgent && (
                      <span className="bg-[#5D866C] px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
                        عاجل
                      </span>
                    )}
                  </div>

                  <h3 className="mb-4 text-2xl leading-tight font-bold text-[#5D866C]">
                    {project.title}
                  </h3>

                  <span className="inline-block border border-[#E6D8C3] bg-[#F5F5F0] px-4 py-2 text-sm font-bold text-[#5D866C]">
                    {project.category}
                  </span>
                </div>

                {/* Project Body */}
                <div className="p-8 pt-6">
                  <p className="mb-6 leading-relaxed font-medium text-[#5D866C]">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="border border-[#E6D8C3] bg-white px-4 py-2 text-sm font-bold text-[#5D866C]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta */}
                  <div className="mb-6 grid grid-cols-3 gap-4 border-2 border-[#E6D8C3] bg-white p-6">
                    <div className="text-center">
                      <DollarSign
                        className="mx-auto mb-2 h-5 w-5 text-[#5D866C]"
                        strokeWidth={2.5}
                      />
                      <p className="mb-1 text-xs font-bold text-[#5D866C] uppercase">الميزانية</p>
                      <p className="text-lg font-bold text-[#5D866C]">
                        {project.budget.amount.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#C2A68C]">
                        {project.budget.type}
                      </p>
                    </div>

                    <div className="border-x-2 border-[#E6D8C3] text-center">
                      <Clock className="mx-auto mb-2 h-5 w-5 text-[#5D866C]" strokeWidth={2.5} />
                      <p className="mb-1 text-xs font-bold text-[#5D866C] uppercase">المدة</p>
                      <p className="text-lg font-bold text-[#5D866C]">{project.duration}</p>
                    </div>

                    <div className="text-center">
                      <Users className="mx-auto mb-2 h-5 w-5 text-[#5D866C]" strokeWidth={2.5} />
                      <p className="mb-1 text-xs font-bold text-[#5D866C] uppercase">العروض</p>
                      <p className="text-lg font-bold text-[#5D866C]">{project.proposals}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t-2 border-[#E6D8C3] pt-6">
                    <div className="flex items-center gap-6 text-sm font-semibold text-[#5D866C]">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {project.views}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        {project.saved}
                      </div>
                      <span className="text-[#C2A68C]">{project.timeAgo}</span>
                    </div>

                    <button className="flex items-center gap-2 bg-[#5D866C] px-8 py-3 font-bold text-white transition-all hover:bg-[#C2A68C]">
                      تقديم عرض
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="border-2 border-[#5D866C] bg-white px-16 py-4 text-lg font-bold text-[#5D866C] transition-all hover:bg-[#5D866C] hover:text-white">
              عرض المزيد من المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section className="bg-[#F5F5F0] px-8 py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-bold tracking-widest text-[#C2A68C] uppercase"
            >
              المحترفون المتميزون
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-bold text-[#5D866C]"
            >
              نخبة المواهب العربية
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 bg-[#5D866C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative border-2 border-[#E6D8C3] bg-white p-8 transition-all hover:border-[#5D866C] hover:shadow-xl"
              >
                {/* Top Rated Badge */}
                {talent.topRated && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-1.5 bg-[#5D866C] px-3 py-1.5 text-xs font-bold text-white uppercase">
                      <Crown className="h-3 w-3" />
                      TOP
                    </div>
                  </div>
                )}

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center bg-[#5D866C] text-4xl">
                    {talent.avatar}
                  </div>

                  {talent.verified && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                      <div className="border-2 border-[#5D866C] bg-white p-2">
                        <BadgeCheck className="h-5 w-5 text-[#5D866C]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-bold text-[#5D866C]">{talent.name}</h3>
                  <p className="mb-4 text-sm leading-snug font-semibold text-[#C2A68C]">
                    {talent.title}
                  </p>

                  <p className="mb-6 text-sm leading-relaxed text-[#5D866C]">{talent.bio}</p>

                  {/* Rating */}
                  <div className="mb-6 flex items-center justify-center gap-2 border-b-2 border-[#E6D8C3] pb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#5D866C] text-[#5D866C]" />
                      ))}
                    </div>
                    <span className="text-base font-bold text-[#5D866C]">{talent.rating}</span>
                    <span className="text-sm font-semibold text-[#C2A68C]">({talent.reviews})</span>
                  </div>

                  {/* Location */}
                  <p className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-[#5D866C]">
                    <MapPin className="h-4 w-4" />
                    {talent.location}
                  </p>

                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="border border-[#E6D8C3] bg-[#F5F5F0] p-4">
                      <p className="mb-1 text-2xl font-bold text-[#5D866C]">{talent.projects}</p>
                      <p className="text-xs font-bold text-[#C2A68C] uppercase">مشروع</p>
                    </div>
                    <div className="border border-[#E6D8C3] bg-[#F5F5F0] p-4">
                      <p className="mb-1 text-2xl font-bold text-[#C2A68C]">
                        {talent.successRate}%
                      </p>
                      <p className="text-xs font-bold text-[#5D866C] uppercase">نجاح</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6 border border-[#E6D8C3] bg-[#F5F5F0] p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 ${
                          talent.availability === 'متاح' ? 'bg-green-600' : 'bg-orange-600'
                        }`}
                      />
                      <span className="text-sm font-bold text-[#5D866C]">
                        {talent.availability}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#C2A68C]">{talent.responseTime}</p>
                  </div>

                  {/* Rate */}
                  <div className="mb-6 border-2 border-[#E6D8C3] bg-[#F5F5F0] p-5">
                    <p className="mb-1 text-xs font-bold text-[#5D866C] uppercase">معدل الساعة</p>
                    <p className="text-3xl font-bold text-[#5D866C]">{talent.hourlyRate} ر.س</p>
                  </div>

                  {/* CTA */}
                  <div className="space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 bg-[#5D866C] py-3 font-bold text-white transition-all hover:bg-[#C2A68C]">
                      <User className="h-4 w-4" />
                      عرض الملف الشخصي
                    </button>
                    <button className="flex w-full items-center justify-center gap-2 border-2 border-[#5D866C] bg-white py-3 font-bold text-[#5D866C] transition-all hover:bg-[#5D866C] hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                      إرسال رسالة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-bold tracking-widest text-[#C2A68C] uppercase"
            >
              آراء العملاء
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-bold text-[#5D866C]"
            >
              ماذا يقول عملاؤنا
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-1 w-24 bg-[#5D866C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="border-2 border-[#E6D8C3] bg-[#F5F5F0] p-8 transition-all hover:border-[#5D866C]"
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#5D866C] text-[#5D866C]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-8 text-lg leading-relaxed font-medium text-[#5D866C]">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t-2 border-[#E6D8C3] pt-6">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#5D866C] text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5D866C]">{testimonial.author}</h4>
                    <p className="text-sm font-semibold text-[#C2A68C]">{testimonial.role}</p>
                    <p className="text-xs font-medium text-[#5D866C]">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#5D866C] px-8 py-28">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 flex h-24 w-24 items-center justify-center bg-[#C2A68C]"
          >
            <Briefcase className="h-12 w-12 text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-6xl leading-tight font-bold text-white"
          >
            ابدأ مشروعك الآن
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12 text-2xl leading-relaxed font-medium text-white"
          >
            انضم إلى آلاف الشركات والمحترفين الذين يحققون نجاحهم معنا
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center gap-5 sm:flex-row"
          >
            <button className="bg-white px-12 py-4 text-lg font-bold text-[#5D866C] transition-all hover:bg-[#F5F5F0]">
              انضم كمحترف
            </button>

            <button className="border-2 border-white bg-transparent px-12 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-[#5D866C]">
              نشر مشروع
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5D866C] px-8 pt-20 pb-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-white">
                  <Building2 className="h-6 w-6 text-[#5D866C]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">منصة المحترفين</h3>
                  <p className="text-xs font-semibold tracking-wider text-[#E6D8C3]">
                    PROFESSIONAL PLATFORM
                  </p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed font-medium text-[#E6D8C3]">
                نربط أفضل المواهب في العالم العربي بأهم الفرص لتحقيق النجاح المشترك
              </p>

              <div className="flex gap-3">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center bg-[#C2A68C] text-white transition-all hover:bg-white hover:text-[#5D866C]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'المنصة', links: ['عن المنصة', 'كيف نعمل', 'المدونة', 'الوظائف'] },
              { title: 'الخدمات', links: ['للشركات', 'للمحترفين', 'الأسعار', 'التطبيق'] },
              { title: 'الدعم', links: ['المساعدة', 'اتصل بنا', 'الشروط', 'الخصوصية'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-5 text-base font-bold tracking-wide text-white uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="font-semibold text-[#E6D8C3] transition-colors hover:text-white"
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
          <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-[#C2A68C] pt-8 md:flex-row">
            <p className="font-semibold text-[#E6D8C3]">
              © 2025 منصة المحترفين. جميع الحقوق محفوظة.
            </p>

            <div className="flex gap-6">
              <a href="#" className="font-semibold text-[#E6D8C3] hover:text-white">
                الخصوصية
              </a>
              <a href="#" className="font-semibold text-[#E6D8C3] hover:text-white">
                الشروط
              </a>
              <a href="#" className="font-semibold text-[#E6D8C3] hover:text-white">
                الاستخدام
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>

);
}

export default ProfessionalFreelancePlatform;
