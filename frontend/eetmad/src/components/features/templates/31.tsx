import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
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
  Megaphone,
  Menu,
  MessageCircle,
  Palette,
  Search,
  Send,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

function NaturalBiddingPlatform() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'الكل', icon: Layers, count: 248, color: '#578E7E' },
    { id: 'tech', name: 'تقنية', icon: Code, count: 89, color: '#6B9AA8' },
    { id: 'design', name: 'تصميم', icon: Palette, count: 67, color: '#D4A574' },
    { id: 'marketing', name: 'تسويق', icon: Megaphone, count: 54, color: '#5A9B84' },
    { id: 'business', name: 'استشارات', icon: Briefcase, count: 38, color: '#578E7E' },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة تجارة إلكترونية متكاملة للبائعين المحليين',
      category: 'tech',
      budget: '75,000 - 120,000',
      bids: 24,
      timeLeft: '3 أيام',
      client: 'وزارة التجارة',
      verified: true,
      urgent: true,
      description:
        'مشروع استراتيجي لبناء منصة تجارة إلكترونية حديثة تدعم البائعين المحليين مع نظام دفع آمن متعدد وإدارة متكاملة للمخزون والشحن',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      rating: 4.9,
      location: 'الرياض',
      type: 'مشروع كامل',
      views: 342,
      saved: 28,
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية شاملة لمبادرة ثقافية وطنية',
      category: 'design',
      budget: '45,000 - 80,000',
      bids: 18,
      timeLeft: '5 أيام',
      client: 'هيئة الثقافة',
      verified: true,
      urgent: false,
      description:
        'تصميم هوية بصرية متكاملة ومميزة لمبادرة ثقافية وطنية تشمل الشعار، نظام الألوان، الخطوط، ودليل الاستخدام الشامل',
      skills: ['Branding', 'Illustrator', 'UI/UX'],
      rating: 4.8,
      location: 'جدة',
      type: 'تصميم',
      views: 256,
      saved: 19,
    },
    {
      id: 3,
      title: 'استراتيجية تسويقية رقمية متكاملة لمنتج وطني',
      category: 'marketing',
      budget: '90,000 - 150,000',
      bids: 31,
      timeLeft: '2 يوم',
      client: 'هيئة الاستثمار',
      verified: true,
      urgent: true,
      description:
        'تطوير وتنفيذ استراتيجية تسويقية رقمية شاملة عبر جميع القنوات الاجتماعية والإعلانات المدفوعة مع تحليل متقدم للأداء',
      skills: ['Social Media', 'Google Ads', 'Analytics'],
      rating: 5.0,
      location: 'الدمام',
      type: 'حملة',
      views: 487,
      saved: 42,
    },
    {
      id: 4,
      title: 'استشارات إدارية لتطوير الأداء المؤسسي الشامل',
      category: 'business',
      budget: '60,000 - 100,000',
      bids: 15,
      timeLeft: '7 أيام',
      client: 'وزارة الموارد',
      verified: true,
      urgent: false,
      description:
        'تقديم استشارات إدارية متخصصة لتطوير الهيكل التنظيمي وتحسين الأداء الإداري والتشغيلي مع خطة تنفيذية واضحة',
      skills: ['Management', 'Strategy', 'KPIs'],
      rating: 4.7,
      location: 'الرياض',
      type: 'استشارات',
      views: 198,
      saved: 14,
    },
    {
      id: 5,
      title: 'إنتاج محتوى مرئي احترافي لحملة توعوية وطنية',
      category: 'design',
      budget: '55,000 - 95,000',
      bids: 22,
      timeLeft: '4 أيام',
      client: 'وزارة الصحة',
      verified: true,
      urgent: false,
      description:
        'إنتاج سلسلة من الفيديوهات التوعوية عالية الجودة والإبداع لحملة صحية وطنية شاملة بأسلوب حديث وجذاب',
      skills: ['Video', 'Animation', 'After Effects'],
      rating: 4.9,
      location: 'مكة',
      type: 'محتوى',
      views: 312,
      saved: 25,
    },
    {
      id: 6,
      title: 'تطوير تطبيق موبايل للخدمات الحكومية الذكية',
      category: 'tech',
      budget: '110,000 - 180,000',
      bids: 28,
      timeLeft: '6 أيام',
      client: 'وزارة الاتصالات',
      verified: true,
      urgent: false,
      description:
        'بناء تطبيق موبايل متطور لتقديم الخدمات الحكومية الإلكترونية بواجهة عصرية وتجربة مستخدم سلسة وآمنة',
      skills: ['React Native', 'Flutter', 'API'],
      rating: 5.0,
      location: 'الرياض',
      type: 'تطبيق',
      views: 421,
      saved: 37,
    },
  ];

  const stats = [
    { label: 'مشاريع نشطة', value: '248', icon: Layers, trend: '+12%' },
    { label: 'عروض مقدمة', value: '1,847', icon: TrendingUp, trend: '+8%' },
    { label: 'جهات حكومية', value: '67', icon: Shield, trend: '+5%' },
    { label: 'معدل النجاح', value: '94%', icon: Award, trend: '+2%' },
  ];

  const featuredProjects = projects.slice(0, 3);
  const filteredProjects =
    activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#FFFAEC', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-sm backdrop-blur-lg"
        style={{
          backgroundColor: 'rgba(61, 61, 61, 0.98)',
          borderBottom: '1px solid rgba(87, 142, 126, 0.2)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <div
                  className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                  style={{ backgroundColor: '#578E7E' }}
                >
                  <Award className="relative z-10 h-8 w-8 text-white" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                    }}
                  ></div>
                </div>
                <div
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#5A9B84' }}
                >
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">منصة التنافس</h1>
                <p className="text-xs" style={{ color: '#A4C4B8' }}>
                  الفرص الحكومية الاستثنائية
                </p>
              </div>
            </motion.div>

            <nav className="hidden items-center gap-1 lg:flex">
              {['الرئيسية', 'المشاريع', 'الجهات', 'كيف يعمل'].map((item, index) => (
                <motion.button
                  key={item}
                  className="rounded-xl px-5 py-2.5 font-medium transition-all"
                  style={{ color: index === 0 ? '#578E7E' : '#F5ECD5' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(87, 142, 126, 0.1)', color: '#7CAF9E' }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <motion.button
                className="relative rounded-xl p-3 transition-all"
                style={{ backgroundColor: 'rgba(245, 236, 213, 0.1)' }}
                whileHover={{ backgroundColor: 'rgba(87, 142, 126, 0.15)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#F5ECD5' }} />
                <span
                  className="absolute top-2 right-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#5A9B84' }}
                ></span>
              </motion.button>

              <motion.button
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-md"
                style={{ backgroundColor: '#578E7E' }}
                whileHover={{ backgroundColor: '#457365', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <User className="h-5 w-5" />
                حسابي
              </motion.button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-3 lg:hidden"
              style={{ backgroundColor: 'rgba(245, 236, 213, 0.1)' }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" style={{ color: '#F5ECD5' }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: '#F5ECD5' }} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t lg:hidden"
              style={{ borderColor: 'rgba(87, 142, 126, 0.2)', backgroundColor: '#3D3D3D' }}
            >
              <div className="space-y-3 px-4 py-6">
                {['الرئيسية', 'المشاريع', 'الجهات', 'كيف يعمل'].map((item) => (
                  <button
                    key={item}
                    className="block w-full rounded-xl px-4 py-3 text-right font-medium transition-all"
                    style={{ color: '#F5ECD5', backgroundColor: 'rgba(245, 236, 213, 0.05)' }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(87, 142, 126, 0.15), transparent 60%)',
          }}
        ></div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D9B0' }}
              >
                <div
                  className="h-2 w-2 animate-pulse rounded-full"
                  style={{ backgroundColor: '#5A9B84' }}
                ></div>
                <span className="text-sm font-semibold" style={{ color: '#578E7E' }}>
                  248 مشروع نشط الآن
                </span>
              </div>

              <h1
                className="mb-6 text-4xl leading-tight font-bold lg:text-5xl xl:text-6xl"
                style={{ color: '#3D3D3D' }}
              >
                فرص حكومية <span style={{ color: '#578E7E' }}>استثنائية</span> في انتظارك
              </h1>

              <p className="mb-8 text-lg leading-relaxed lg:text-xl" style={{ color: '#6B6B6B' }}>
                انضم لآلاف المحترفين والشركات الذين يحصلون على مشاريع حكومية متميزة. منصة موثوقة،
                آمنة، وشفافة بالكامل.
              </p>

              <div className="relative mb-8">
                <div
                  className="absolute inset-0 rounded-2xl opacity-5"
                  style={{ backgroundColor: '#578E7E' }}
                ></div>
                <div
                  className="relative flex gap-3 rounded-2xl p-2"
                  style={{ backgroundColor: '#FFFFFF', border: '2px solid #578E7E' }}
                >
                  <div className="relative flex-1">
                    <Search
                      className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
                      style={{ color: '#8F8F8F' }}
                    />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات، أو جهات..."
                      className="h-12 w-full rounded-xl pr-12 pl-6 text-base outline-none"
                      style={{ backgroundColor: '#FFFAEC', color: '#3D3D3D' }}
                    />
                  </div>
                  <motion.button
                    className="flex h-12 items-center gap-2 rounded-xl px-8 font-semibold text-white shadow-md"
                    style={{ backgroundColor: '#578E7E' }}
                    whileHover={{ backgroundColor: '#457365', scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    بحث
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="rounded-xl border p-4 text-center shadow-sm"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#F8F0DE' }}
                  >
                    <stat.icon className="mx-auto mb-2 h-8 w-8" style={{ color: '#578E7E' }} />
                    <div className="mb-1 text-2xl font-bold" style={{ color: '#3D3D3D' }}>
                      {stat.value}
                    </div>
                    <div className="mb-1 text-xs" style={{ color: '#8F8F8F' }}>
                      {stat.label}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: '#5A9B84' }}>
                      {stat.trend}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl opacity-5"
                  style={{ backgroundColor: '#578E7E' }}
                ></div>
                <div
                  className="relative rounded-3xl border-2 p-8 shadow-xl"
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#578E7E' }}
                >
                  <div className="mb-6 text-center">
                    <div
                      className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                      style={{ backgroundColor: '#578E7E' }}
                    >
                      <Target className="relative z-10 h-10 w-10 text-white" />
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                        }}
                      ></div>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold" style={{ color: '#3D3D3D' }}>
                      لماذا منصتنا؟
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Shield, title: 'موثوقية 100%', desc: 'جهات حكومية معتمدة' },
                      { icon: Zap, title: 'سرعة في التنفيذ', desc: 'عمليات مبسطة وسريعة' },
                      { icon: CheckCircle, title: 'دفع آمن', desc: 'نظام دفع محمي بالكامل' },
                      { icon: Users, title: 'مجتمع احترافي', desc: 'آلاف المحترفين المعتمدين' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-4 rounded-xl p-4 transition-all"
                        style={{ backgroundColor: '#F5ECD5' }}
                        whileHover={{ backgroundColor: '#EFE3C3', x: -5 }}
                      >
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-sm"
                          style={{ backgroundColor: '#FFFFFF' }}
                        >
                          <item.icon className="h-6 w-6" style={{ color: '#578E7E' }} />
                        </div>
                        <div>
                          <h4 className="mb-1 font-bold" style={{ color: '#3D3D3D' }}>
                            {item.title}
                          </h4>
                          <p className="text-sm" style={{ color: '#6B6B6B' }}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 w-32 rounded-xl p-3 shadow-lg"
                  style={{ backgroundColor: '#578E7E' }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    <div>
                      <div className="text-xs opacity-90">نمو شهري</div>
                      <div className="text-lg font-bold">+18%</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12" style={{ backgroundColor: '#F5ECD5' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold" style={{ color: '#3D3D3D' }}>
              تصفح حسب التخصص
            </h2>
            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              اختر المجال الأنسب لخبراتك ومهاراتك
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl border-2 px-6 py-4 font-semibold shadow-md transition-all ${
                  activeTab === cat.id ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: activeTab === cat.id ? '#578E7E' : '#FFFFFF',
                  borderColor: activeTab === cat.id ? '#457365' : '#E8D9B0',
                  color: activeTab === cat.id ? '#FFFFFF' : '#3D3D3D',
                }}
              >
                <div className="flex items-center gap-3">
                  <cat.icon
                    className="h-6 w-6"
                    style={{ color: activeTab === cat.id ? '#FFFFFF' : cat.color }}
                  />
                  <span>{cat.name}</span>
                  <span
                    className="rounded-lg px-2.5 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: activeTab === cat.id ? 'rgba(255,255,255,0.2)' : '#F5ECD5',
                      color: activeTab === cat.id ? '#FFFFFF' : '#578E7E',
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold" style={{ color: '#3D3D3D' }}>
                المشاريع المميزة
              </h2>
              <p className="text-lg" style={{ color: '#6B6B6B' }}>
                أفضل الفرص المتاحة حالياً
              </p>
            </div>
            <button
              className="hidden items-center gap-2 rounded-xl border-2 px-5 py-3 font-semibold shadow-sm transition-all md:flex"
              style={{ backgroundColor: '#FFFFFF', color: '#578E7E', borderColor: '#578E7E' }}
            >
              <Filter className="h-5 w-5" />
              تصفية متقدمة
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {filteredProjects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer overflow-hidden rounded-2xl border-2 shadow-md transition-all hover:shadow-xl"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E8D9B0' }}
              >
                <div
                  className="relative border-b p-6"
                  style={{
                    borderColor: '#F8F0DE',
                    background: 'linear-gradient(180deg, #FFFAEC 0%, #FFFFFF 100%)',
                  }}
                >
                  {project.urgent && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm"
                      style={{ backgroundColor: '#C96B6B', color: '#FFFFFF' }}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      عاجل
                    </div>
                  )}

                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
                        style={{ backgroundColor: '#F5ECD5' }}
                      >
                        {project.category === 'tech' && (
                          <Code className="h-6 w-6" style={{ color: '#578E7E' }} />
                        )}
                        {project.category === 'design' && (
                          <Palette className="h-6 w-6" style={{ color: '#578E7E' }} />
                        )}
                        {project.category === 'marketing' && (
                          <Megaphone className="h-6 w-6" style={{ color: '#578E7E' }} />
                        )}
                        {project.category === 'business' && (
                          <Briefcase className="h-6 w-6" style={{ color: '#578E7E' }} />
                        )}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#3D3D3D' }}>
                            {project.client}
                          </span>
                          {project.verified && (
                            <BadgeCheck className="h-4 w-4" style={{ color: '#5A9B84' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" style={{ color: '#D4A574' }} />
                          <span className="text-sm font-semibold" style={{ color: '#578E7E' }}>
                            {project.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3
                    className="mb-3 line-clamp-2 text-lg leading-snug font-bold"
                    style={{ color: '#3D3D3D' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="mb-4 line-clamp-2 text-sm leading-relaxed"
                    style={{ color: '#6B6B6B' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: '#F5ECD5', color: '#3D3D3D' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span
                        className="rounded-lg px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: '#578E7E', color: '#FFFFFF' }}
                      >
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6" style={{ backgroundColor: '#FFFAEC' }}>
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" style={{ color: '#578E7E' }} />
                        <span className="text-xs" style={{ color: '#8F8F8F' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#3D3D3D' }}>
                        {project.budget.split('-')[0].trim()} ر.س
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Users className="h-4 w-4" style={{ color: '#6B9AA8' }} />
                        <span className="text-xs" style={{ color: '#8F8F8F' }}>
                          العروض
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#3D3D3D' }}>
                        {project.bids}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Clock className="h-4 w-4" style={{ color: '#C96B6B' }} />
                        <span className="text-xs" style={{ color: '#8F8F8F' }}>
                          المتبقي
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#3D3D3D' }}>
                        {project.timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-md"
                      style={{ backgroundColor: '#578E7E' }}
                    >
                      عرض المشروع
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{ borderColor: '#578E7E', backgroundColor: '#FFFFFF' }}
                    >
                      <Bookmark className="h-5 w-5" style={{ color: '#578E7E' }} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-xl border-2 px-10 py-4 font-bold shadow-lg"
              style={{ backgroundColor: '#FFFFFF', color: '#578E7E', borderColor: '#578E7E' }}
            >
              عرض جميع المشاريع ({filteredProjects.length})
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: '#F5ECD5' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <Sparkles className="h-4 w-4" style={{ color: '#578E7E' }} />
              <span className="text-sm font-semibold" style={{ color: '#578E7E' }}>
                عملية بسيطة وواضحة
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold" style={{ color: '#3D3D3D' }}>
              كيف تحصل على مشروعك؟
            </h2>
            <p className="mx-auto max-w-2xl text-xl" style={{ color: '#6B6B6B' }}>
              أربع خطوات فقط تفصلك عن مشروعك الحكومي القادم
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '01',
                icon: Search,
                title: 'اكتشف المشاريع',
                desc: 'تصفح مئات المشاريع الحكومية المتنوعة واختر المناسب لك',
                color: '#578E7E',
              },
              {
                num: '02',
                icon: FileText,
                title: 'قدم عرضك',
                desc: 'اكتب مقترحاً احترافياً يبرز خبراتك وقدراتك',
                color: '#6B9AA8',
              },
              {
                num: '03',
                icon: MessageCircle,
                title: 'تفاوض وناقش',
                desc: 'تواصل مع الجهة الحكومية وناقش كل التفاصيل',
                color: '#D4A574',
              },
              {
                num: '04',
                icon: CheckCircle,
                title: 'نفذ المشروع',
                desc: 'احصل على الموافقة وابدأ التنفيذ مع ضمان الدفع',
                color: '#5A9B84',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="relative mb-6 inline-block">
                    <div
                      className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="relative z-10 h-12 w-12 text-white" />
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                        }}
                      ></div>
                    </div>
                    <div
                      className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold shadow-md"
                      style={{ backgroundColor: '#3D3D3D', color: '#FFFFFF' }}
                    >
                      {step.num}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold" style={{ color: '#3D3D3D' }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#6B6B6B' }}>
                    {step.desc}
                  </p>
                </div>

                {index < 3 && (
                  <div className="absolute top-12 left-full hidden w-full lg:block">
                    <ArrowRight className="-ml-4 h-8 w-8" style={{ color: '#E8D9B0' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border-2 p-12 text-center shadow-2xl lg:p-16"
            style={{ backgroundColor: '#3D3D3D', borderColor: '#578E7E' }}
          >
            <div
              className="absolute top-0 right-0 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #578E7E, transparent)' }}
            ></div>
            <div
              className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #5A9B84, transparent)' }}
            ></div>

            <div className="relative">
              <div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg"
                style={{ backgroundColor: '#578E7E' }}
              >
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">ابدأ رحلتك الآن</h2>
              <p className="mb-8 text-xl" style={{ color: '#F5ECD5' }}>
                انضم لآلاف المحترفين الذين يحصلون على فرص استثنائية يومياً
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl px-10 py-4 text-lg font-bold shadow-lg"
                  style={{ backgroundColor: '#578E7E', color: '#FFFFFF' }}
                >
                  سجل الآن مجاناً
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border-2 px-10 py-4 text-lg font-bold"
                  style={{
                    borderColor: '#F5ECD5',
                    color: '#F5ECD5',
                    backgroundColor: 'transparent',
                  }}
                >
                  تعرف على المزيد
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#3D3D3D' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
                  style={{ backgroundColor: '#578E7E' }}
                >
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">منصة التنافس</h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: '#F5ECD5' }}>
                المنصة الرسمية للمنافسات الحكومية في المملكة
              </p>
              <div className="flex gap-3">
                {[Globe, MessageCircle, Send].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(87, 142, 126, 0.2)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: '#578E7E' }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'روابط', links: ['المشاريع', 'الجهات', 'كيف يعمل', 'الأسعار'] },
              { title: 'الدعم', links: ['مركز المساعدة', 'الأسئلة', 'تواصل معنا', 'الشروط'] },
              { title: 'معلومات', links: ['من نحن', 'الخصوصية', 'الأمان', 'الوظائف'] },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-bold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="transition-colors hover:text-white"
                        style={{ color: '#A4C4B8' }}
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
            className="border-t pt-8 text-center"
            style={{ borderColor: 'rgba(87, 142, 126, 0.2)' }}
          >
            <p style={{ color: '#A4C4B8' }}>© 2025 منصة التنافس. جميع الحقوق محفوظة</p>
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
            style={{ backgroundColor: 'rgba(61, 61, 61, 0.9)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border-2 shadow-2xl"
              style={{ backgroundColor: '#FFFAEC', borderColor: '#578E7E' }}
            >
              <div
                className="sticky top-0 z-10 flex items-center justify-between border-b p-6"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E8D9B0' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
                    style={{ backgroundColor: '#F5ECD5' }}
                  >
                    <Briefcase className="h-6 w-6" style={{ color: '#578E7E' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: '#3D3D3D' }}>
                      تفاصيل المشروع
                    </h3>
                    <p className="text-sm" style={{ color: '#8F8F8F' }}>
                      #{selectedProject.id}2025
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-all"
                  style={{ backgroundColor: '#F5ECD5' }}
                >
                  <X className="h-5 w-5" style={{ color: '#3D3D3D' }} />
                </button>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-lg font-semibold" style={{ color: '#3D3D3D' }}>
                      {selectedProject.client}
                    </span>
                    <BadgeCheck className="h-5 w-5" style={{ color: '#5A9B84' }} />
                  </div>

                  <h2 className="mb-4 text-3xl font-bold" style={{ color: '#3D3D3D' }}>
                    {selectedProject.title}
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed" style={{ color: '#6B6B6B' }}>
                    {selectedProject.description}
                  </p>

                  <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: DollarSign,
                        label: 'الميزانية',
                        value: selectedProject.budget + ' ر.س',
                        bg: '#E8F3EF',
                      },
                      {
                        icon: Users,
                        label: 'العروض',
                        value: selectedProject.bids + ' عرض',
                        bg: '#EDF3F5',
                      },
                      {
                        icon: Clock,
                        label: 'الوقت',
                        value: selectedProject.timeLeft,
                        bg: '#F9EBEB',
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl p-4" style={{ backgroundColor: item.bg }}>
                        <div className="mb-2 flex items-center gap-2">
                          <item.icon className="h-5 w-5" style={{ color: '#578E7E' }} />
                          <span className="text-sm" style={{ color: '#8F8F8F' }}>
                            {item.label}
                          </span>
                        </div>
                        <div className="text-xl font-bold" style={{ color: '#3D3D3D' }}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-lg font-bold" style={{ color: '#3D3D3D' }}>
                      المهارات المطلوبة
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg px-4 py-2 font-medium"
                          style={{ backgroundColor: '#F5ECD5', color: '#3D3D3D' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 rounded-xl py-4 font-bold text-white shadow-lg"
                    style={{ backgroundColor: '#578E7E' }}
                  >
                    قدم عرضك الآن
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl border-2 px-6 py-4 font-bold"
                    style={{ borderColor: '#578E7E', color: '#578E7E', backgroundColor: '#FFFFFF' }}
                  >
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

export default NaturalBiddingPlatform;
