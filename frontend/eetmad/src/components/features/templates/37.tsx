import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  DollarSign,
  Eye,
  Filter,
  Grid3x3,
  Layers,
  MapPin,
  Megaphone,
  Menu,
  Palette,
  Search,
  Share2,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

function WarmElegantPlatform() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedItems, setSavedItems] = useState(new Set([2, 4]));
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'جميع المنافسات', icon: Grid3x3, count: 156 },
    { id: 'tech', name: 'التقنية والبرمجة', icon: Code, count: 48 },
    { id: 'design', name: 'التصميم والإبداع', icon: Palette, count: 34 },
    { id: 'business', name: 'الاستشارات', icon: Briefcase, count: 41 },
    { id: 'marketing', name: 'التسويق', icon: Megaphone, count: 33 },
  ];

  const projects = [
    {
      id: 1,
      title: 'بناء منظومة إدارة المشاريع الحكومية المتكاملة',
      organization: 'وزارة التخطيط والتنمية',
      category: 'tech',
      budget: { min: '3.5M', max: '6.2M', currency: 'ر.س' },
      deadline: '18 يوم',
      bids: 87,
      views: 4521,
      rating: 4.8,
      verified: true,
      urgent: false,
      location: 'الرياض',
      postedDate: 'منذ 4 أيام',
      tags: ['Cloud Solutions', 'System Architecture', 'API Development', 'DevOps'],
      description:
        'تطوير نظام شامل لإدارة وتتبع المشاريع الحكومية بكفاءة عالية مع تكامل كامل مع الأنظمة الحالية',
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمبادرة وطنية كبرى',
      organization: 'هيئة تطوير المدن الاقتصادية',
      category: 'design',
      budget: { min: '950K', max: '1.8M', currency: 'ر.س' },
      deadline: '12 يوم',
      bids: 124,
      views: 6832,
      rating: 4.9,
      verified: true,
      urgent: true,
      location: 'جدة',
      postedDate: 'منذ 2 يوم',
      tags: ['Brand Identity', 'Visual Design', 'Motion Graphics', 'Print Design'],
      description: 'إنشاء هوية بصرية شاملة ومميزة تعكس رؤية المبادرة وتطلعاتها المستقبلية',
    },
    {
      id: 3,
      title: 'استراتيجية تحول رقمي شاملة للقطاع الصحي',
      organization: 'وزارة الصحة',
      category: 'business',
      budget: { min: '4.2M', max: '7.5M', currency: 'ر.س' },
      deadline: '25 يوم',
      bids: 56,
      views: 3147,
      rating: 4.7,
      verified: true,
      urgent: false,
      location: 'الرياض',
      postedDate: 'منذ 6 أيام',
      tags: ['Digital Strategy', 'Healthcare Tech', 'Change Management', 'Training'],
      description: 'وضع خارطة طريق تفصيلية للتحول الرقمي في القطاع الصحي مع خطط تنفيذية واضحة',
    },
    {
      id: 4,
      title: 'حملة تسويقية رقمية متعددة القنوات',
      organization: 'الهيئة العامة للسياحة',
      category: 'marketing',
      budget: { min: '2.8M', max: '4.9M', currency: 'ر.س' },
      deadline: '8 أيام',
      bids: 198,
      views: 9241,
      rating: 5.0,
      verified: true,
      urgent: true,
      location: 'الرياض',
      postedDate: 'منذ يوم واحد',
      tags: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics'],
      description: 'تخطيط وتنفيذ حملة تسويقية شاملة عبر كافة المنصات الرقمية والتقليدية',
    },
    {
      id: 5,
      title: 'نظام ذكاء اصطناعي لتحليل البيانات الضخمة',
      organization: 'مركز المعلومات الوطني',
      category: 'tech',
      budget: { min: '5.5M', max: '9.2M', currency: 'ر.س' },
      deadline: '30 يوم',
      bids: 43,
      views: 2876,
      rating: 4.6,
      verified: true,
      urgent: false,
      location: 'الرياض',
      postedDate: 'منذ 5 أيام',
      tags: ['AI/ML', 'Big Data', 'Analytics', 'Data Science'],
      description: 'بناء نظام متقدم للذكاء الاصطناعي لتحليل البيانات الضخمة واستخراج الرؤى',
    },
    {
      id: 6,
      title: 'تطوير تطبيق الخدمات الذكية للمواطنين',
      organization: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'tech',
      budget: { min: '2.1M', max: '3.6M', currency: 'ر.س' },
      deadline: '20 يوم',
      bids: 112,
      views: 5643,
      rating: 4.8,
      verified: true,
      urgent: false,
      location: 'الرياض',
      postedDate: 'منذ 3 أيام',
      tags: ['Mobile Development', 'UX/UI', 'Backend', 'Security'],
      description: 'تطوير تطبيق متكامل يوفر خدمات حكومية ذكية للمواطنين بتجربة استخدام سلسة',
    },
  ];

  const stats = [
    { label: 'المنافسات المتاحة', value: '156', icon: Layers, trend: '+24' },
    { label: 'إجمالي القيمة', value: '18.7B ر.س', icon: DollarSign, trend: '+12%' },
    { label: 'الجهات الحكومية', value: '89', icon: Building2, trend: '+7' },
    { label: 'معدل النجاح', value: '94%', icon: TrendingUp, trend: '+3%' },
  ];

  const toggleSave = (id) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#FFFFFF', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
    >
      {/* Elegant Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(44, 54, 57, 0.98)', borderColor: 'rgba(63, 78, 79, 0.3)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)' }}
                  >
                    <Shield className="h-7 w-7" style={{ color: '#FFFFFF' }} />
                  </div>
                  <div
                    className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2"
                    style={{ backgroundColor: '#7C9D96', borderColor: '#2C3639' }}
                  ></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: '#DCD7C9' }}>
                    المنصة الوطنية
                  </h1>
                  <p className="text-xs font-semibold" style={{ color: '#A27B5C' }}>
                    للمنافسات الحكومية الموحدة
                  </p>
                </div>
              </motion.div>

              <nav className="hidden items-center gap-2 lg:flex">
                {['الرئيسية', 'المنافسات', 'الجهات', 'الموارد', 'التواصل'].map((item, idx) => (
                  <button
                    key={item}
                    className="rounded-lg px-4 py-2.5 text-sm font-semibold transition-all"
                    style={{
                      color: idx === 0 ? '#A27B5C' : '#DCD7C9',
                      backgroundColor: idx === 0 ? 'rgba(162, 123, 92, 0.15)' : 'transparent',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative rounded-lg p-2.5 transition-all"
                style={{ backgroundColor: 'rgba(162, 123, 92, 0.15)' }}
              >
                <Bell className="h-5 w-5" style={{ color: '#DCD7C9' }} />
                <span
                  className="absolute top-2 right-2 h-2 w-2 animate-pulse rounded-full"
                  style={{ backgroundColor: '#D4A574' }}
                ></span>
              </button>

              <button
                className="flex items-center gap-2.5 rounded-lg px-5 py-2.5 font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)',
                  color: '#FFFFFF',
                }}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">حسابي</span>
              </button>

              <button
                className="rounded-lg p-2.5 lg:hidden"
                style={{ backgroundColor: 'rgba(162, 123, 92, 0.15)' }}
              >
                <Menu className="h-5 w-5" style={{ color: '#DCD7C9' }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Warm Elegant Hero */}
      <section
        className="relative overflow-hidden border-b py-24"
        style={{ backgroundColor: '#2C3639', borderColor: 'rgba(162, 123, 92, 0.2)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-1/3 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#A27B5C' }}
          ></div>
          <div
            className="absolute right-1/3 bottom-0 h-96 w-96 rounded-full blur-3xl"
            style={{ background: '#3F4E4F' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: 'rgba(162, 123, 92, 0.2)',
                  border: '1px solid rgba(162, 123, 92, 0.3)',
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#A27B5C' }} />
                <span className="text-sm font-bold" style={{ color: '#A27B5C' }}>
                  منصة متطورة وموثوقة
                </span>
              </div>

              <h1
                className="mb-6 text-5xl leading-tight font-bold lg:text-6xl"
                style={{ color: '#DCD7C9' }}
              >
                بوابتك إلى عالم
                <br />
                <span style={{ color: '#A27B5C' }}>المنافسات الحكومية</span>
              </h1>

              <p
                className="mb-10 text-xl leading-relaxed"
                style={{ color: 'rgba(220, 215, 201, 0.85)' }}
              >
                منصة وطنية شاملة تربط الجهات الحكومية بأفضل مقدمي الخدمات والحلول الاحترافية
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  className="flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)',
                    color: '#FFFFFF',
                  }}
                >
                  <span>ابدأ الآن</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  className="rounded-xl border-2 px-8 py-4 text-lg font-bold transition-all"
                  style={{
                    borderColor: 'rgba(162, 123, 92, 0.5)',
                    color: '#DCD7C9',
                    backgroundColor: 'rgba(162, 123, 92, 0.1)',
                  }}
                >
                  اعرف المزيد
                </button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border p-6 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(63, 78, 79, 0.4)',
                  borderColor: 'rgba(162, 123, 92, 0.2)',
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'rgba(162, 123, 92, 0.25)' }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: '#A27B5C' }} />
                  </div>
                  <span
                    className="rounded-lg px-2.5 py-1 text-sm font-bold"
                    style={{ backgroundColor: 'rgba(124, 157, 150, 0.25)', color: '#7C9D96' }}
                  >
                    {stat.trend}
                  </span>
                </div>
                <div className="mb-2 text-3xl font-bold" style={{ color: '#DCD7C9' }}>
                  {stat.value}
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(220, 215, 201, 0.7)' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant Search */}
      <section className="py-12" style={{ backgroundColor: '#DCD7C9' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute top-1/2 right-6 h-5 w-5 -translate-y-1/2"
                style={{ color: '#3F4E4F' }}
              />
              <input
                type="text"
                placeholder="ابحث عن المنافسات، الجهات الحكومية، أو التخصصات..."
                className="h-16 w-full rounded-full pr-16 pl-6 text-base font-semibold transition-all outline-none"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#2C3639',
                  border: '2px solid transparent',
                }}
                onFocus={(e) => (e.target.style.border = '2px solid #A27B5C')}
                onBlur={(e) => (e.target.style.border = '2px solid transparent')}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2.5 rounded-full border-2 px-6 py-4 font-bold transition-all"
                style={{
                  borderColor: '#3F4E4F',
                  color: '#2C3639',
                  backgroundColor: showFilters ? 'rgba(162, 123, 92, 0.1)' : '#FFFFFF',
                }}
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">فلترة</span>
              </button>
              <button
                className="rounded-full px-8 py-4 font-bold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)',
                  color: '#FFFFFF',
                }}
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="border-b py-8"
        style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(63, 78, 79, 0.1)' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2.5 rounded-xl border-2 px-6 py-3 font-semibold whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#A27B5C' : '#FFFFFF',
                  borderColor: activeCategory === cat.id ? '#A27B5C' : 'rgba(63, 78, 79, 0.2)',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#2C3639',
                }}
              >
                <cat.icon className="h-5 w-5" />
                <span>{cat.name}</span>
                <span
                  className="rounded-lg px-2.5 py-0.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      activeCategory === cat.id ? 'rgba(255, 255, 255, 0.25)' : '#DCD7C9',
                    color: activeCategory === cat.id ? '#FFFFFF' : '#2C3639',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-4xl font-bold" style={{ color: '#2C3639' }}>
                المنافسات المتاحة
              </h2>
              <p className="text-lg font-semibold" style={{ color: '#3F4E4F' }}>
                {filteredProjects.length} منافسة متاحة حالياً
              </p>
            </div>

            <select
              className="rounded-xl border-2 px-5 py-3 font-semibold transition-all outline-none"
              style={{
                borderColor: 'rgba(63, 78, 79, 0.2)',
                color: '#2C3639',
                backgroundColor: '#FFFFFF',
              }}
            >
              <option>الأحدث</option>
              <option>الأعلى ميزانية</option>
              <option>الأقرب موعداً</option>
              <option>الأكثر مشاهدة</option>
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="cursor-pointer overflow-hidden rounded-2xl transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: project.urgent ? '2px solid #C85C5C' : '2px solid rgba(63, 78, 79, 0.1)',
                  boxShadow: '0 2px 8px rgba(44, 54, 57, 0.08)',
                }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex flex-1 items-center gap-4">
                      <div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: 'linear-gradient(135deg, #2C3639 0%, #3F4E4F 100%)' }}
                      >
                        <Building2 className="h-7 w-7" style={{ color: '#DCD7C9' }} />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-base font-bold" style={{ color: '#2C3639' }}>
                            {project.organization}
                          </span>
                          {project.verified && (
                            <CheckCircle2 className="h-5 w-5" style={{ color: '#7C9D96' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" style={{ color: '#3F4E4F' }} />
                          <span style={{ color: '#3F4E4F' }}>{project.location}</span>
                          <span style={{ color: '#DCD7C9' }}>•</span>
                          <span style={{ color: '#3F4E4F' }}>{project.postedDate}</span>
                        </div>
                      </div>
                    </div>

                    {project.urgent && (
                      <div
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                        style={{ backgroundColor: '#C85C5C', color: '#FFFFFF' }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        عاجل
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl leading-snug font-bold" style={{ color: '#2C3639' }}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mb-5 line-clamp-2 text-base leading-relaxed"
                    style={{ color: '#3F4E4F' }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg px-3 py-1.5 text-sm font-semibold"
                        style={{
                          backgroundColor: 'rgba(162, 123, 92, 0.1)',
                          color: '#A27B5C',
                          border: '1px solid rgba(162, 123, 92, 0.2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div
                    className="mb-6 grid grid-cols-4 gap-4 rounded-xl p-5"
                    style={{ backgroundColor: '#DCD7C9' }}
                  >
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" style={{ color: '#A27B5C' }} />
                        <span className="text-xs font-semibold" style={{ color: '#3F4E4F' }}>
                          الميزانية
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#2C3639' }}>
                        {project.budget.min} - {project.budget.max}
                      </div>
                      <div className="text-xs" style={{ color: '#3F4E4F' }}>
                        {project.budget.currency}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Users className="h-4 w-4" style={{ color: '#A27B5C' }} />
                        <span className="text-xs font-semibold" style={{ color: '#3F4E4F' }}>
                          العروض
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#2C3639' }}>
                        {project.bids}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Eye className="h-4 w-4" style={{ color: '#A27B5C' }} />
                        <span className="text-xs font-semibold" style={{ color: '#3F4E4F' }}>
                          المشاهدات
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#2C3639' }}>
                        {project.views}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <Clock className="h-4 w-4" style={{ color: '#C85C5C' }} />
                        <span className="text-xs font-semibold" style={{ color: '#3F4E4F' }}>
                          الموعد
                        </span>
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#2C3639' }}>
                        {project.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 rounded-xl py-3.5 font-bold transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)',
                        color: '#FFFFFF',
                      }}
                    >
                      تقديم عرض
                    </button>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{
                        borderColor: savedItems.has(project.id)
                          ? '#A27B5C'
                          : 'rgba(63, 78, 79, 0.2)',
                        backgroundColor: savedItems.has(project.id)
                          ? 'rgba(162, 123, 92, 0.1)'
                          : '#FFFFFF',
                      }}
                    >
                      <Bookmark
                        className="h-5 w-5"
                        style={{ color: savedItems.has(project.id) ? '#A27B5C' : '#3F4E4F' }}
                        fill={savedItems.has(project.id) ? '#A27B5C' : 'none'}
                      />
                    </button>
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all"
                      style={{ borderColor: 'rgba(63, 78, 79, 0.2)', backgroundColor: '#FFFFFF' }}
                    >
                      <Share2 className="h-5 w-5" style={{ color: '#3F4E4F' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center gap-3 rounded-xl border-2 px-10 py-4 font-bold transition-all"
              style={{ backgroundColor: '#FFFFFF', color: '#A27B5C', borderColor: '#A27B5C' }}
            >
              عرض المزيد
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Warm CTA */}
      <section className="relative overflow-hidden py-24" style={{ backgroundColor: '#2C3639' }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: '#A27B5C' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)' }}
          >
            <Target className="h-10 w-10" style={{ color: '#FFFFFF' }} />
          </div>
          <h2 className="mb-6 text-5xl font-bold" style={{ color: '#DCD7C9' }}>
            انضم لمنصتنا اليوم
          </h2>
          <p
            className="mb-10 text-2xl leading-relaxed"
            style={{ color: 'rgba(220, 215, 201, 0.85)' }}
          >
            كن جزءاً من أكبر منظومة وطنية للمنافسات الحكومية
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              className="rounded-xl px-10 py-4 text-xl font-bold transition-all"
              style={{
                background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)',
                color: '#FFFFFF',
              }}
            >
              سجل الآن
            </button>
            <button
              className="rounded-xl border-2 px-10 py-4 text-xl font-bold transition-all"
              style={{
                borderColor: 'rgba(162, 123, 92, 0.5)',
                color: '#DCD7C9',
                backgroundColor: 'rgba(162, 123, 92, 0.1)',
              }}
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="pt-20 pb-10" style={{ backgroundColor: '#3F4E4F' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #A27B5C 0%, #8F6A4D 100%)' }}
                >
                  <Shield className="h-6 w-6" style={{ color: '#FFFFFF' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#DCD7C9' }}>
                  المنصة الوطنية
                </h3>
              </div>
              <p className="mb-6 leading-relaxed" style={{ color: 'rgba(220, 215, 201, 0.7)' }}>
                بوابتك الرسمية للمنافسات الحكومية في المملكة العربية السعودية
              </p>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المنافسات', 'الجهات', 'الموارد', 'الأسئلة'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
              { title: 'معلومات', links: ['من نحن', 'الأمان', 'التقارير', 'الوظائف'] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="mb-6 text-lg font-bold" style={{ color: '#DCD7C9' }}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="transition-all"
                        style={{ color: 'rgba(220, 215, 201, 0.7)' }}
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
            style={{ borderColor: 'rgba(162, 123, 92, 0.2)' }}
          >
            <p style={{ color: 'rgba(220, 215, 201, 0.7)' }}>
              © 2025 المنصة الوطنية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              <a href="#" style={{ color: 'rgba(220, 215, 201, 0.7)' }}>
                الشروط
              </a>
              <a href="#" style={{ color: 'rgba(220, 215, 201, 0.7)' }}>
                الخصوصية
              </a>
              <a href="#" style={{ color: 'rgba(220, 215, 201, 0.7)' }}>
                الأمان
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WarmElegantPlatform;
