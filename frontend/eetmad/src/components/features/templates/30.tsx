import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bell,
  Bookmark,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  FileText,
  Filter,
  Globe,
  Layers,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Palette,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

function ModernBiddingPlatform() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'جميع المشاريع', icon: Layers, count: 248 },
    { id: 'tech', name: 'تقنية المعلومات', icon: Code, count: 89 },
    { id: 'design', name: 'التصميم والإبداع', icon: Palette, count: 67 },
    { id: 'marketing', name: 'التسويق والإعلان', icon: Megaphone, count: 54 },
    { id: 'business', name: 'استشارات الأعمال', icon: Briefcase, count: 38 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة',
      category: 'tech',
      budget: '75,000 - 120,000',
      bids: 24,
      timeLeft: '3 أيام',
      client: 'وزارة التجارة',
      verified: true,
      description:
        'نبحث عن فريق محترف لتطوير منصة تجارة إلكترونية حديثة تدعم البائعين المحليين مع نظام دفع آمن وإدارة متكاملة للمخزون',
      skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
      rating: 4.9,
      location: 'الرياض',
      type: 'مشروع كامل',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية شاملة لمبادرة وطنية',
      category: 'design',
      budget: '45,000 - 80,000',
      bids: 18,
      timeLeft: '5 أيام',
      client: 'هيئة الثقافة',
      verified: true,
      description:
        'تصميم هوية بصرية متكاملة لمبادرة ثقافية وطنية تشمل الشعار، الألوان، الخطوط، ودليل الاستخدام الشامل',
      skills: ['Branding', 'Adobe Illustrator', 'UI/UX'],
      rating: 4.8,
      location: 'جدة',
      type: 'تصميم',
    },
    {
      id: 3,
      title: 'حملة تسويقية رقمية متكاملة لمنتج وطني',
      category: 'marketing',
      budget: '90,000 - 150,000',
      bids: 31,
      timeLeft: '2 يوم',
      client: 'الهيئة العامة للاستثمار',
      verified: true,
      description:
        'تطوير وتنفيذ استراتيجية تسويقية رقمية شاملة عبر جميع القنوات الاجتماعية والإعلانات المدفوعة',
      skills: ['Social Media', 'Google Ads', 'Content Strategy'],
      rating: 5.0,
      location: 'الدمام',
      type: 'حملة تسويقية',
    },
    {
      id: 4,
      title: 'استشارات إدارية لتطوير الأداء المؤسسي',
      category: 'business',
      budget: '60,000 - 100,000',
      bids: 15,
      timeLeft: '7 أيام',
      client: 'وزارة الموارد البشرية',
      verified: true,
      description:
        'تقديم استشارات إدارية متخصصة لتطوير الهيكل التنظيمي وتحسين الأداء الإداري والتشغيلي',
      skills: ['Management', 'Strategy', 'HR'],
      rating: 4.7,
      location: 'الرياض',
      type: 'استشارات',
    },
    {
      id: 5,
      title: 'إنتاج فيديوهات توعوية احترافية',
      category: 'design',
      budget: '55,000 - 95,000',
      bids: 22,
      timeLeft: '4 أيام',
      client: 'وزارة الصحة',
      verified: true,
      description: 'إنتاج سلسلة من الفيديوهات التوعوية عالية الجودة لحملة صحية وطنية شاملة',
      skills: ['Video Production', 'Animation', 'After Effects'],
      rating: 4.9,
      location: 'مكة المكرمة',
      type: 'إنتاج محتوى',
    },
    {
      id: 6,
      title: 'تطوير تطبيق موبايل للخدمات الحكومية',
      category: 'tech',
      budget: '110,000 - 180,000',
      bids: 28,
      timeLeft: '6 أيام',
      client: 'وزارة الاتصالات',
      verified: true,
      description:
        'بناء تطبيق موبايل متطور لتقديم الخدمات الحكومية الإلكترونية بواجهة عصرية وتجربة مستخدم سلسة',
      skills: ['React Native', 'Flutter', 'API Integration'],
      rating: 5.0,
      location: 'الرياض',
      type: 'تطبيق موبايل',
    },
  ];

  const stats = [
    { label: 'مشاريع نشطة', value: '248', icon: Layers, color: '#A27B5C' },
    { label: 'عروض مقدمة', value: '1,847', icon: TrendingUp, color: '#3F4E4F' },
    { label: 'جهات حكومية', value: '67', icon: Shield, color: '#4A7C59' },
    { label: 'قيمة المشاريع', value: '45M', icon: DollarSign, color: '#A27B5C' },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-neutral-100"
      style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-slate-800 shadow-lg backdrop-blur-md"
        style={{ backgroundColor: 'rgba(44, 54, 57, 0.95)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
              >
                <Award className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">منصة المنافسات</h1>
                <p className="text-xs" style={{ color: '#DCD7C9' }}>
                  الفرص الحكومية المتميزة
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {['الرئيسية', 'المشاريع', 'الجهات', 'كيف يعمل', 'الدعم'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-base font-medium transition-colors hover:text-white"
                  style={{ color: '#DCD7C9' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden items-center gap-4 lg:flex">
              <motion.button
                className="relative rounded-xl p-3 transition-all"
                style={{ backgroundColor: 'rgba(220, 215, 201, 0.1)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5" style={{ color: '#DCD7C9' }} />
                <span
                  className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#A27B5C' }}
                ></span>
              </motion.button>

              <motion.button
                className="rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(162, 123, 92, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  حسابي
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-3 lg:hidden"
              style={{ backgroundColor: 'rgba(220, 215, 201, 0.1)' }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t lg:hidden"
              style={{ borderColor: 'rgba(220, 215, 201, 0.2)', backgroundColor: '#2C3639' }}
            >
              <div className="space-y-4 px-4 py-6">
                {['الرئيسية', 'المشاريع', 'الجهات', 'كيف يعمل', 'الدعم'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block rounded-xl px-4 py-3 font-medium transition-all"
                    style={{ color: '#DCD7C9', backgroundColor: 'rgba(220, 215, 201, 0.05)' }}
                  >
                    {item}
                  </a>
                ))}
                <button
                  className="w-full rounded-xl px-6 py-3 font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                >
                  حسابي
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #2C3639 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{ backgroundColor: '#F0ECE1' }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#A27B5C' }} />
                <span className="text-sm font-semibold" style={{ color: '#2C3639' }}>
                  منصة المنافسات الحكومية الرسمية
                </span>
              </div>

              <h1
                className="mb-6 text-4xl leading-tight font-bold lg:text-5xl xl:text-6xl"
                style={{ color: '#2C3639' }}
              >
                فرص حكومية استثنائية في انتظارك
              </h1>

              <p className="mb-8 text-lg leading-relaxed lg:text-xl" style={{ color: '#3F4E4F' }}>
                اكتشف مئات المشاريع الحكومية المتميزة، قدم عروضك الاحترافية، واحصل على فرص نمو
                حقيقية لأعمالك
              </p>

              {/* Search Bar */}
              <div className="mb-8 flex gap-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
                    style={{ color: '#5C6D6E' }}
                  />
                  <input
                    type="text"
                    placeholder="ابحث عن مشاريع، خدمات، أو جهات حكومية..."
                    className="h-14 w-full rounded-xl border-2 pr-12 pl-6 text-base transition-all outline-none"
                    style={{
                      borderColor: '#C2BBA7',
                      backgroundColor: '#FFFFFF',
                      color: '#2C3639',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#A27B5C')}
                    onBlur={(e) => (e.target.style.borderColor = '#C2BBA7')}
                  />
                </div>
                <motion.button
                  className="flex h-14 items-center gap-2 rounded-xl px-8 font-semibold text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  بحث
                  <Search className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: '#F0ECE1' }}
                  >
                    <stat.icon className="mx-auto mb-2 h-8 w-8" style={{ color: stat.color }} />
                    <div className="mb-1 text-2xl font-bold" style={{ color: '#2C3639' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: '#5C6D6E' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{ backgroundColor: '#DCD7C9' }}
              >
                <div className="aspect-square p-12">
                  <div
                    className="flex h-full w-full items-center justify-center rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, #3F4E4F 0%, #2C3639 100%)' }}
                  >
                    <div className="text-center">
                      <Award className="mx-auto mb-6 h-32 w-32" style={{ color: '#A27B5C' }} />
                      <div className="space-y-4">
                        {[
                          { icon: CheckCircle, text: 'مشاريع موثوقة 100%' },
                          { icon: Shield, text: 'دفع آمن ومضمون' },
                          { icon: TrendingUp, text: 'فرص نمو متميزة' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-center gap-3">
                            <item.icon className="h-6 w-6" style={{ color: '#A27B5C' }} />
                            <span className="text-lg font-semibold" style={{ color: '#DCD7C9' }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 -right-6 w-48 rounded-xl p-4 shadow-xl"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#F0ECE1' }}
                    >
                      <DollarSign className="h-5 w-5" style={{ color: '#A27B5C' }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: '#5C6D6E' }}>
                        إجمالي المشاريع
                      </div>
                      <div className="text-lg font-bold" style={{ color: '#2C3639' }}>
                        45M ر.س
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 -left-6 w-48 rounded-xl p-4 shadow-xl"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#E8F0EB' }}
                    >
                      <Users className="h-5 w-5" style={{ color: '#4A7C59' }} />
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: '#5C6D6E' }}>
                        مقدمو خدمات
                      </div>
                      <div className="text-lg font-bold" style={{ color: '#2C3639' }}>
                        1,847+
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16" style={{ backgroundColor: '#F0ECE1' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold" style={{ color: '#2C3639' }}>
                تصفح حسب التخصص
              </h2>
              <p className="text-lg" style={{ color: '#3F4E4F' }}>
                اختر المجال المناسب لخبراتك
              </p>
            </div>
            <button
              className="hidden items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all md:flex"
              style={{ backgroundColor: '#FFFFFF', color: '#A27B5C' }}
            >
              عرض الكل
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl p-6 text-right transition-all ${
                  selectedCategory === category.id ? 'shadow-xl' : 'shadow-md hover:shadow-lg'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#A27B5C' : '#FFFFFF',
                  borderWidth: '2px',
                  borderColor: selectedCategory === category.id ? '#8B6849' : 'transparent',
                }}
              >
                <category.icon
                  className="mb-4 h-10 w-10"
                  style={{ color: selectedCategory === category.id ? '#FFFFFF' : '#A27B5C' }}
                />
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: selectedCategory === category.id ? '#FFFFFF' : '#2C3639' }}
                >
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: selectedCategory === category.id ? '#FFFFFF' : '#A27B5C' }}
                  >
                    {category.count}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: selectedCategory === category.id ? 'rgba(255,255,255,0.8)' : '#5C6D6E',
                    }}
                  >
                    مشروع
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold" style={{ color: '#2C3639' }}>
                المشاريع المميزة
              </h2>
              <p className="text-lg" style={{ color: '#3F4E4F' }}>
                أفضل الفرص المتاحة الآن
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="hidden items-center gap-2 rounded-xl px-4 py-3 transition-all md:flex"
                style={{ backgroundColor: '#F0ECE1', color: '#3F4E4F' }}
              >
                <Filter className="h-5 w-5" />
                تصفية
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                style={{ borderWidth: '2px', borderColor: '#A27B5C' }}
              >
                {/* Project Header */}
                <div className="border-b p-6" style={{ borderColor: '#E6E1D5' }}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: '#F0ECE1' }}
                      >
                        {project.category === 'tech' && (
                          <Code className="h-6 w-6" style={{ color: '#A27B5C' }} />
                        )}
                        {project.category === 'design' && (
                          <Palette className="h-6 w-6" style={{ color: '#A27B5C' }} />
                        )}
                        {project.category === 'marketing' && (
                          <Megaphone className="h-6 w-6" style={{ color: '#A27B5C' }} />
                        )}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#2C3639' }}>
                            {project.client}
                          </span>
                          {project.verified && (
                            <BadgeCheck className="h-4 w-4" style={{ color: '#4A7C59' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" style={{ color: '#A27B5C' }} />
                          <span className="text-sm font-semibold" style={{ color: '#A27B5C' }}>
                            {project.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rounded-lg px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: '#F5EFE6', color: '#B8894D' }}
                    >
                      {project.type}
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl leading-snug font-bold" style={{ color: '#2C3639' }}>
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: '#3F4E4F' }}>
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: '#DCD7C9', color: '#2C3639' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span
                        className="rounded-lg px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: '#A27B5C', color: '#FFFFFF' }}
                      >
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Footer */}
                <div className="p-6" style={{ backgroundColor: '#F0ECE1' }}>
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="mb-1 text-xs" style={{ color: '#5C6D6E' }}>
                        الميزانية
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#2C3639' }}>
                        {project.budget} ر.س
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs" style={{ color: '#5C6D6E' }}>
                        العروض
                      </div>
                      <div
                        className="flex items-center gap-1 text-sm font-bold"
                        style={{ color: '#A27B5C' }}
                      >
                        <TrendingUp className="h-4 w-4" />
                        {project.bids}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs" style={{ color: '#5C6D6E' }}>
                        الوقت المتبقي
                      </div>
                      <div
                        className="flex items-center gap-1 text-sm font-bold"
                        style={{ color: '#B85C5C' }}
                      >
                        <Clock className="h-4 w-4" />
                        {project.timeLeft}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-md"
                    style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                  >
                    عرض التفاصيل
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-xl px-10 py-4 font-semibold text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3F4E4F 0%, #2F3B3C 100%)' }}
            >
              تصفح جميع المشاريع
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: '#F0ECE1' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold" style={{ color: '#2C3639' }}>
              كيف تعمل المنصة؟
            </h2>
            <p className="text-xl" style={{ color: '#3F4E4F' }}>
              أربع خطوات بسيطة للحصول على مشروعك القادم
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '1',
                icon: Search,
                title: 'تصفح المشاريع',
                desc: 'اختر من بين مئات المشاريع الحكومية المتاحة',
              },
              {
                step: '2',
                icon: FileText,
                title: 'قدم عرضك',
                desc: 'أرسل مقترحك الاحترافي مع التفاصيل الكاملة',
              },
              {
                step: '3',
                icon: MessageCircle,
                title: 'التفاوض',
                desc: 'تواصل مع الجهة الحكومية وناقش التفاصيل',
              },
              {
                step: '4',
                icon: CheckCircle,
                title: 'ابدأ العمل',
                desc: 'احصل على المشروع وابدأ التنفيذ فوراً',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative mb-6 inline-block">
                  <div
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                  >
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <div
                    className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold shadow-lg"
                    style={{ backgroundColor: '#3F4E4F', color: '#FFFFFF' }}
                  >
                    {item.step}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: '#2C3639' }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#3F4E4F' }}>
                  {item.desc}
                </p>

                {index < 3 && (
                  <div className="absolute top-12 left-full hidden w-full lg:block">
                    <ChevronRight className="-ml-4 h-8 w-8" style={{ color: '#C2BBA7' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20" style={{ backgroundColor: '#2C3639' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: 'rgba(220, 215, 201, 0.1)' }}
              >
                <stat.icon className="mx-auto mb-4 h-12 w-12" style={{ color: stat.color }} />
                <div className="mb-2 text-5xl font-bold" style={{ color: '#DCD7C9' }}>
                  {stat.value}
                </div>
                <div className="text-lg" style={{ color: '#C9A88A' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 text-center shadow-2xl lg:p-16"
            style={{ background: 'linear-gradient(135deg, #3F4E4F 0%, #2C3639 100%)' }}
          >
            <div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg"
              style={{ backgroundColor: '#A27B5C' }}
            >
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white">جاهز للبدء؟</h2>
            <p className="mb-8 text-xl leading-relaxed" style={{ color: '#DCD7C9' }}>
              انضم إلى آلاف المحترفين والشركات الذين يحصلون على مشاريع حكومية مميزة يومياً
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl px-10 py-4 text-lg font-bold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)',
                  color: '#FFFFFF',
                }}
              >
                ابدأ الآن مجاناً
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 px-10 py-4 text-lg font-bold"
                style={{ borderColor: '#DCD7C9', color: '#DCD7C9', backgroundColor: 'transparent' }}
              >
                اعرف المزيد
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#2C3639' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                >
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">منصة المنافسات</h3>
              </div>
              <p className="mb-6 text-base leading-relaxed" style={{ color: '#C9A88A' }}>
                المنصة الرسمية للمنافسات الحكومية في المملكة العربية السعودية
              </p>
              <div className="flex gap-3">
                {[Globe, MessageCircle, Send].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(162, 123, 92, 0.2)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: '#A27B5C' }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: 'روابط سريعة',
                links: ['المشاريع', 'الجهات الحكومية', 'كيف يعمل', 'الأسئلة الشائعة'],
              },
              {
                title: 'الخدمات',
                links: ['تقديم العروض', 'إدارة المشاريع', 'الدفع الآمن', 'الدعم الفني'],
              },
              {
                title: 'تواصل معنا',
                links: [
                  'support@platform.sa',
                  '+966 11 234 5678',
                  'الرياض، المملكة',
                  'الأحد - الخميس',
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-bold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="transition-colors hover:text-white"
                        style={{ color: '#C9A88A' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
            style={{ borderColor: 'rgba(220, 215, 201, 0.2)' }}
          >
            <p style={{ color: '#C9A88A' }}>© 2025 منصة المنافسات. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6">
              {['سياسة الخصوصية', 'الشروط والأحكام', 'ملفات تعريف الارتباط'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="transition-colors hover:text-white"
                  style={{ color: '#C9A88A' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(44, 54, 57, 0.9)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b p-6"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E6E1D5' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: '#F0ECE1' }}
                  >
                    <Briefcase className="h-6 w-6" style={{ color: '#A27B5C' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#2C3639' }}>
                      تفاصيل المشروع
                    </h3>
                    <p className="text-sm" style={{ color: '#5C6D6E' }}>
                      رقم المرجع: #{selectedProject.id}2025
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                  style={{ backgroundColor: '#F0ECE1' }}
                >
                  <X className="h-5 w-5" style={{ color: '#2C3639' }} />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold" style={{ color: '#2C3639' }}>
                        {selectedProject.client}
                      </span>
                      {selectedProject.verified && (
                        <BadgeCheck className="h-5 w-5" style={{ color: '#4A7C59' }} />
                      )}
                    </div>
                    <span
                      className="rounded-lg px-3 py-1 text-sm font-semibold"
                      style={{ backgroundColor: '#F5EFE6', color: '#B8894D' }}
                    >
                      {selectedProject.type}
                    </span>
                  </div>

                  <h2 className="mb-4 text-3xl font-bold" style={{ color: '#2C3639' }}>
                    {selectedProject.title}
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed" style={{ color: '#3F4E4F' }}>
                    {selectedProject.description}
                  </p>

                  <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl p-4" style={{ backgroundColor: '#F0ECE1' }}>
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-5 w-5" style={{ color: '#A27B5C' }} />
                        <span className="text-sm" style={{ color: '#5C6D6E' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-xl font-bold" style={{ color: '#2C3639' }}>
                        {selectedProject.budget} ر.س
                      </div>
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: '#E8F0EB' }}>
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5" style={{ color: '#4A7C59' }} />
                        <span className="text-sm" style={{ color: '#5C6D6E' }}>
                          العروض
                        </span>
                      </div>
                      <div className="text-xl font-bold" style={{ color: '#2C3639' }}>
                        {selectedProject.bids} عرض
                      </div>
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: '#F5E8E8' }}>
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5" style={{ color: '#B85C5C' }} />
                        <span className="text-sm" style={{ color: '#5C6D6E' }}>
                          الوقت المتبقي
                        </span>
                      </div>
                      <div className="text-xl font-bold" style={{ color: '#2C3639' }}>
                        {selectedProject.timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-lg font-bold" style={{ color: '#2C3639' }}>
                      المهارات المطلوبة
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg px-4 py-2 font-medium"
                          style={{ backgroundColor: '#DCD7C9', color: '#2C3639' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div
                      className="flex items-center gap-3 rounded-xl p-4"
                      style={{ backgroundColor: '#F0ECE1' }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: '#A27B5C' }} />
                      <div>
                        <div className="text-sm" style={{ color: '#5C6D6E' }}>
                          الموقع
                        </div>
                        <div className="font-semibold" style={{ color: '#2C3639' }}>
                          {selectedProject.location}
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-3 rounded-xl p-4"
                      style={{ backgroundColor: '#F0ECE1' }}
                    >
                      <Star className="h-5 w-5 fill-current" style={{ color: '#A27B5C' }} />
                      <div>
                        <div className="text-sm" style={{ color: '#5C6D6E' }}>
                          التقييم
                        </div>
                        <div className="font-semibold" style={{ color: '#2C3639' }}>
                          {selectedProject.rating}/5.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8B6849 100%)' }}
                  >
                    <Send className="h-5 w-5" />
                    قدم عرضك الآن
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 font-bold"
                    style={{
                      borderColor: '#A27B5C',
                      color: '#A27B5C',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Bookmark className="h-5 w-5" />
                    حفظ
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModernBiddingPlatform;
