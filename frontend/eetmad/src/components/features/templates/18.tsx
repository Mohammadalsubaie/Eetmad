'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Crown,
  Database,
  DollarSign,
  Eye,
  Facebook,
  FileText,
  Headphones,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Twitter,
  Users,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function EliteFreelancePlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const categories = [
    {
      id: 'dev',
      title: 'هندسة البرمجيات',
      icon: <Code />,
      projects: 28547,
      professionals: 12456,
      avgRate: 950,
    },
    {
      id: 'design',
      title: 'التصميم والإبداع',
      icon: <Palette />,
      projects: 19234,
      professionals: 9876,
      avgRate: 780,
    },
    {
      id: 'marketing',
      title: 'التسويق الرقمي',
      icon: <TrendingUp />,
      projects: 16789,
      professionals: 8234,
      avgRate: 820,
    },
    {
      id: 'business',
      title: 'الاستشارات والأعمال',
      icon: <Briefcase />,
      projects: 13456,
      professionals: 6789,
      avgRate: 890,
    },
    {
      id: 'content',
      title: 'المحتوى والكتابة',
      icon: <FileText />,
      projects: 11234,
      professionals: 7456,
      avgRate: 650,
    },
    {
      id: 'data',
      title: 'علم البيانات والذكاء الاصطناعي',
      icon: <Database />,
      projects: 9876,
      professionals: 4567,
      avgRate: 1100,
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'تطوير منصة SaaS متكاملة لإدارة المشاريع المؤسسية',
      company: 'TechVision Solutions',
      logo: '🏢',
      description:
        'نبحث عن فريق تطوير محترف لبناء منصة SaaS متقدمة تشمل لوحات تحكم ديناميكية، إدارة فرق العمل، تتبع المهام بالذكاء الاصطناعي، وتكامل مع أنظمة المؤسسات',
      category: 'هندسة البرمجيات',
      budget: {
        min: 320000,
        max: 580000,
        currency: 'SAR',
      },
      duration: '8-12 شهر',
      level: 'Enterprise',
      type: 'مشروع طويل الأمد',
      location: 'الرياض، السعودية',
      remote: true,
      skills: [
        'React.js',
        'Node.js',
        'PostgreSQL',
        'Redis',
        'Docker',
        'Kubernetes',
        'AWS',
        'TypeScript',
        'GraphQL',
        'Microservices',
      ],
      requirements: [
        'خبرة لا تقل عن 7 سنوات',
        'سجل حافل في مشاريع SaaS',
        'إتقان معماريات النظم الموزعة',
        'شهادات AWS أو Azure',
      ],
      proposals: 23,
      views: 1247,
      posted: 'منذ ساعتين',
      deadline: '15 يناير 2025',
      verified: true,
      featured: true,
      urgent: false,
      rating: 4.9,
      projectsCompleted: 87,
    },
    {
      id: 2,
      title: 'إعادة تصميم كامل لتجربة المستخدم لتطبيق مصرفي',
      company: 'FinanceHub Digital',
      logo: '🏦',
      description:
        'مطلوب فريق تصميم UX/UI عالي المستوى لإعادة تصميم شامل لتطبيق مصرفي يخدم أكثر من مليون مستخدم، مع التركيز على سهولة الاستخدام والأمان',
      category: 'التصميم والإبداع',
      budget: {
        min: 180000,
        max: 290000,
        currency: 'SAR',
      },
      duration: '4-6 أشهر',
      level: 'Expert',
      type: 'عقد محدد المدة',
      location: 'دبي، الإمارات',
      remote: true,
      skills: [
        'Figma',
        'Adobe XD',
        'User Research',
        'Prototyping',
        'Design Systems',
        'Usability Testing',
        'Mobile Design',
        'Accessibility',
      ],
      requirements: [
        'خبرة في القطاع المالي',
        'محفظة أعمال مميزة',
        'إجادة اللغة الإنجليزية',
        'معرفة بمعايير الأمان',
      ],
      proposals: 34,
      views: 2156,
      posted: 'منذ 5 ساعات',
      deadline: '20 يناير 2025',
      verified: true,
      featured: true,
      urgent: true,
      rating: 5.0,
      projectsCompleted: 124,
    },
    {
      id: 3,
      title: 'استراتيجية تسويق رقمي متكاملة لإطلاق منتج تقني جديد',
      company: 'Innovation Labs',
      logo: '🚀',
      description:
        'نحتاج خبير تسويق رقمي لوضع وتنفيذ استراتيجية تسويقية شاملة لإطلاق منتج تقني ثوري في السوق، تشمل جميع القنوات الرقمية',
      category: 'التسويق الرقمي',
      budget: {
        min: 150000,
        max: 240000,
        currency: 'SAR',
      },
      duration: '5-7 أشهر',
      level: 'Advanced',
      type: 'عقد استشاري',
      location: 'جدة، السعودية',
      remote: true,
      skills: [
        'Digital Strategy',
        'Google Ads',
        'Social Media Marketing',
        'SEO/SEM',
        'Content Marketing',
        'Analytics',
        'Marketing Automation',
        'Growth Hacking',
      ],
      requirements: [
        'خبرة في إطلاق منتجات تقنية',
        'سجل نجاح موثق',
        'مهارات تحليلية متقدمة',
        'إبداع في الحملات',
      ],
      proposals: 45,
      views: 1876,
      posted: 'منذ يوم واحد',
      deadline: '25 يناير 2025',
      verified: true,
      featured: false,
      urgent: false,
      rating: 4.8,
      projectsCompleted: 67,
    },
    {
      id: 4,
      title: 'بناء نظام ذكاء اصطناعي للتحليل التنبؤي للأعمال',
      company: 'DataMind Analytics',
      logo: '🤖',
      description:
        'مطلوب مهندس ذكاء اصطناعي متخصص لتطوير نظام تحليل تنبؤي يستخدم ML/AI لتحليل بيانات الأعمال وتقديم رؤى استراتيجية',
      category: 'علم البيانات والذكاء الاصطناعي',
      budget: {
        min: 280000,
        max: 450000,
        currency: 'SAR',
      },
      duration: '6-9 أشهر',
      level: 'Expert',
      type: 'مشروع بحثي',
      location: 'أبوظبي، الإمارات',
      remote: true,
      skills: [
        'Python',
        'TensorFlow',
        'PyTorch',
        'Machine Learning',
        'Deep Learning',
        'NLP',
        'Data Science',
        'Big Data',
        'Apache Spark',
      ],
      requirements: [
        'درجة الماجستير في علوم البيانات',
        'خبرة 5+ سنوات في ML/AI',
        'بحوث منشورة',
        'إجادة الرياضيات المتقدمة',
      ],
      proposals: 18,
      views: 987,
      posted: 'منذ 3 ساعات',
      deadline: '30 يناير 2025',
      verified: true,
      featured: true,
      urgent: true,
      rating: 5.0,
      projectsCompleted: 45,
    },
  ];

  const topExperts = [
    {
      id: 1,
      name: 'د. عمر السليمان',
      title: 'كبير مهندسي الحلول السحابية',
      avatar: '👨‍💻',
      verified: true,
      elite: true,
      rating: 4.98,
      reviews: 347,
      hourlyRate: 1250,
      availability: 'متاح جزئياً',
      location: 'الرياض',
      timezone: 'UTC+3',
      completedProjects: 892,
      totalEarnings: '12.4M',
      successRate: 99.2,
      responseTime: '< 30 دقيقة',
      skills: ['AWS Architecture', 'Kubernetes', 'Terraform', 'Microservices', 'DevOps'],
      languages: ['العربية', 'English'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
      bio: 'مهندس حلول سحابية متخصص مع خبرة 12 سنة في تصميم وبناء أنظمة موزعة قابلة للتوسع',
      achievements: ['قاد 50+ مشروع تحول رقمي', 'مدرب معتمد AWS', 'متحدث في مؤتمرات تقنية دولية'],
    },
    {
      id: 2,
      name: 'لينا الحسن',
      title: 'خبيرة تصميم تجربة المستخدم',
      avatar: '👩‍🎨',
      verified: true,
      elite: true,
      rating: 5.0,
      reviews: 289,
      hourlyRate: 980,
      availability: 'متاح للعمل فوراً',
      location: 'دبي',
      timezone: 'UTC+4',
      completedProjects: 654,
      totalEarnings: '8.9M',
      successRate: 100,
      responseTime: '< 15 دقيقة',
      skills: ['UX Research', 'Figma', 'Design Thinking', 'Prototyping', 'User Testing'],
      languages: ['العربية', 'English', 'Français'],
      certifications: ['Google UX Design', 'Nielsen Norman Group UX'],
      bio: 'مصممة UX حائزة على جوائز مع تركيز على تصميم تجارب مستخدم استثنائية للمنتجات الرقمية',
      achievements: [
        'فازت بجائزة Red Dot Design',
        'أعادت تصميم 100+ منتج رقمي',
        'محاضرة في جامعات رائدة',
      ],
    },
    {
      id: 3,
      name: 'فيصل العتيبي',
      title: 'استراتيجي نمو رقمي',
      avatar: '📊',
      verified: true,
      elite: true,
      rating: 4.96,
      reviews: 234,
      hourlyRate: 890,
      availability: 'متاح للعمل فوراً',
      location: 'الكويت',
      timezone: 'UTC+3',
      completedProjects: 567,
      totalEarnings: '7.2M',
      successRate: 98.5,
      responseTime: '< 1 ساعة',
      skills: [
        'Growth Strategy',
        'Performance Marketing',
        'Analytics',
        'SEO',
        'Conversion Optimization',
      ],
      languages: ['العربية', 'English'],
      certifications: ['Google Analytics', 'Facebook Blueprint'],
      bio: 'خبير نمو رقمي ساعد أكثر من 200 شركة ناشئة في تحقيق نمو مستدام وقابل للقياس',
      achievements: [
        'حقق نمو 500% لـ 30+ شركة',
        'مستشار في شركات تقنية كبرى',
        'مؤلف كتاب عن التسويق الرقمي',
      ],
    },
    {
      id: 4,
      name: 'سارة المنصوري',
      title: 'عالمة بيانات وذكاء اصطناعي',
      avatar: '🔬',
      verified: true,
      elite: true,
      rating: 4.99,
      reviews: 178,
      hourlyRate: 1350,
      availability: 'مشغول حالياً',
      location: 'أبوظبي',
      timezone: 'UTC+4',
      completedProjects: 423,
      totalEarnings: '9.8M',
      successRate: 99.8,
      responseTime: '< 2 ساعة',
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Big Data'],
      languages: ['العربية', 'English'],
      certifications: ['PhD Computer Science', 'TensorFlow Developer'],
      bio: 'عالمة بيانات حاصلة على دكتوراه مع تخصص في التعلم العميق وتطبيقات الذكاء الاصطناعي',
      achievements: [
        '15+ بحث منشور في مجلات علمية',
        'حائزة على جائزة الابتكار في AI',
        'مستشارة تقنية لشركات Fortune 500',
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        'المنصة وفرت لنا الوصول إلى نخبة من المواهب التقنية العالمية. المشروع تم تسليمه قبل الموعد بجودة تفوق التوقعات. استثمار حقيقي في النجاح',
      author: 'م. خالد الراشد',
      position: 'المدير التنفيذي للتقنية',
      company: 'شركة الابتكار التقني - السعودية',
      projectValue: '2.4M SAR',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      quote:
        'كمستقلة، هذه المنصة غيرت مسار حياتي المهنية. المشاريع ذات قيمة عالية، العملاء محترفون، والنظام يحفظ حقوق الجميع. بيئة مثالية للنمو المهني',
      author: 'د. نورة العنزي',
      position: 'مستشارة تصميم UX',
      company: 'مستقلة - الإمارات',
      projectValue: '890K SAR',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      quote:
        'التعاقد مع خبير من المنصة كان أفضل قرار اتخذناه. الاحترافية والخبرة والالتزام كانوا استثنائيين. زاد المشروع من إيراداتنا بنسبة 340%',
      author: 'أحمد المطيري',
      position: 'رئيس مجلس الإدارة',
      company: 'مجموعة النمو الرقمي - الكويت',
      projectValue: '3.1M SAR',
      rating: 5,
      avatar: '🎯',
    },
    {
      quote:
        'منصة احترافية بكل المقاييس. من البحث عن المواهب إلى إدارة المشروع والدفع، كل شيء سلس وآمن. أصبحت شريكنا الأساسي في جميع مشاريعنا',
      author: 'فاطمة الزهراني',
      position: 'مديرة العمليات',
      company: 'شركة التحول الرقمي - السعودية',
      projectValue: '1.8M SAR',
      rating: 5,
      avatar: '💼',
    },
  ];

  const platformStats = [
    {
      value: '280K+',
      label: 'محترف معتمد',
      description: 'تم التحقق من مهاراتهم',
      icon: <Users />,
      growth: '+24% هذا العام',
    },
    {
      value: '5.8B',
      label: 'ريال سعودي',
      description: 'قيمة المشاريع المنجزة',
      icon: <DollarSign />,
      growth: '+67% هذا العام',
    },
    {
      value: '98.7%',
      label: 'معدل الرضا',
      description: 'من العملاء والمحترفين',
      icon: <Star />,
      growth: 'أعلى في الصناعة',
    },
    {
      value: '195K+',
      label: 'مشروع مكتمل',
      description: 'بنجاح وفي الوقت المحدد',
      icon: <CheckCircle />,
      growth: '+45% هذا العام',
    },
  ];

  const platformFeatures = [
    {
      icon: <Shield />,
      title: 'حماية شاملة للمدفوعات',
      description:
        'نظام Escrow متقدم يحمي أموالك حتى استلام العمل بجودة عالية مع ضمان استرداد كامل',
      benefits: ['تشفير بنكي', 'ضمان الجودة', 'استرداد سريع'],
    },
    {
      icon: <Award />,
      title: 'مواهب معتمدة ومختبرة',
      description: 'جميع المحترفين خضعوا لاختبارات صارمة وتحقق من الهوية ومراجعة للأعمال السابقة',
      benefits: ['تحقق الهوية', 'اختبار المهارات', 'مراجعة الأعمال'],
    },
    {
      icon: <Zap />,
      title: 'سرعة في التوظيف',
      description: 'ابدأ مشروعك خلال 48 ساعة مع أفضل المواهب المتاحة في مجالك',
      benefits: ['بحث ذكي', 'مطابقة دقيقة', 'استجابة سريعة'],
    },
    {
      icon: <Headphones />,
      title: 'دعم فني متخصص',
      description: 'فريق دعم محترف متاح 24/7 لمساعدتك في كل خطوة من رحلة مشروعك',
      benefits: ['متاح 24/7', 'دعم متعدد اللغات', 'حل سريع'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrollY > 20 ? 'bg-[#0C2B4E] shadow-xl' : 'bg-[#0C2B4E]/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#1A3D64]/50 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6 text-[#F4F4F4]/70">
                <span className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span className="hidden sm:inline">+966 11 234 5678</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span className="hidden md:inline">support@elitetalent.sa</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#F4F4F4]/70 transition-colors hover:text-[#F4F4F4]">
                  العربية
                </button>
                <span className="text-[#1A3D64]">|</span>
                <button className="text-[#F4F4F4]/70 transition-colors hover:text-[#F4F4F4]">
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Main Nav */}
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#1D546C]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D64] to-[#1D546C] opacity-50" />
                  <Crown className="relative z-10 h-6 w-6 text-[#F4F4F4]" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0C2B4E] bg-[#1D546C]" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#F4F4F4]">ELITE TALENT</h1>
                <p className="text-xs font-semibold tracking-wider text-[#1D546C]">
                  PROFESSIONAL NETWORK
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {[
                { label: 'المشاريع المميزة', icon: <Sparkles className="h-4 w-4" /> },
                { label: 'كبار المحترفين', icon: <Award className="h-4 w-4" /> },
                { label: 'التخصصات', icon: <Layers className="h-4 w-4" /> },
                { label: 'للشركات', icon: <Building2 className="h-4 w-4" /> },
                { label: 'عن المنصة', icon: <Info className="h-4 w-4" /> },
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#F4F4F4] transition-all hover:bg-[#1A3D64]/50 hover:text-[#1D546C]"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden items-center gap-3 lg:flex">
              <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-[#F4F4F4] transition-all hover:bg-[#1A3D64]/50">
                تسجيل الدخول
              </button>
              <button className="rounded-lg bg-[#1D546C] px-6 py-2.5 text-sm font-black text-[#F4F4F4] shadow-lg transition-all hover:bg-[#1A3D64]">
                ابدأ مشروعك
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-[#F4F4F4] transition-all hover:bg-[#1A3D64]/50 lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="border-t border-[#1D546C]/30 bg-[#1A3D64] lg:hidden"
            >
              <div className="space-y-2 px-4 py-6">
                {['المشاريع المميزة', 'كبار المحترفين', 'التخصصات', 'للشركات', 'عن المنصة'].map(
                  (item, index) => (
                    <button
                      key={index}
                      className="w-full rounded-lg px-4 py-3 text-right font-semibold text-[#F4F4F4] transition-all hover:bg-[#1D546C]/50"
                    >
                      {item}
                    </button>
                  )
                )}
                <div className="space-y-3 border-t border-[#1D546C]/30 pt-4">
                  <button className="w-full rounded-lg border-2 border-[#1D546C] px-4 py-3 font-bold text-[#F4F4F4]">
                    تسجيل الدخول
                  </button>
                  <button className="w-full rounded-lg bg-[#1D546C] px-4 py-3 font-black text-[#F4F4F4]">
                    ابدأ مشروعك
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#0C2B4E] px-4 pt-40 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-[#1D546C] blur-3xl" />
          <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-[#1A3D64] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#1D546C]/50 bg-[#1A3D64]/50 px-5 py-2.5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#1D546C]" />
                  <span className="text-sm font-bold text-[#F4F4F4]">المنصة الاحترافية رقم 1</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#1D546C] text-[#1D546C]" />
                  ))}
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-5xl leading-tight font-black sm:text-6xl lg:text-7xl"
              >
                <span className="text-[#F4F4F4]">وظّف</span>
                <br />
                <span className="text-[#1D546C]">النخبة العالمية</span>
                <br />
                <span className="text-[#F4F4F4]">لمشاريعك الكبرى</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 max-w-xl text-xl leading-relaxed text-[#F4F4F4]/80"
              >
                منصة احترافية تربطك بأفضل 1% من المواهب التقنية والإبداعية في العالم العربي لتنفيذ
                مشاريع استثنائية بأعلى معايير الجودة
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-10 rounded-2xl border border-[#1D546C]/30 bg-[#1A3D64]/70 p-3 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-3 px-4">
                    <Search className="h-6 w-6 text-[#1D546C]" />
                    <input
                      type="text"
                      placeholder="ابحث عن مشاريع، مهارات محددة، أو خبراء..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-lg font-medium text-[#F4F4F4] placeholder-[#F4F4F4]/50 outline-none"
                    />
                  </div>
                  <button className="rounded-xl bg-[#1D546C] px-10 py-4 font-black text-[#F4F4F4] shadow-lg transition-all hover:bg-[#1A3D64]">
                    بحث
                  </button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-8"
              >
                {[
                  { icon: <Shield />, text: 'دفع آمن 100%' },
                  { icon: <CheckCircle />, text: 'جودة مضمونة' },
                  { icon: <Award />, text: 'خبراء معتمدون' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D546C]/30">
                      {React.cloneElement(item.icon, { className: 'w-5 h-5 text-[#F4F4F4]' })}
                    </div>
                    <span className="font-bold text-[#F4F4F4]">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-6">
                {platformStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="rounded-2xl border border-[#1D546C]/30 bg-[#1A3D64]/50 p-6 shadow-xl backdrop-blur-md"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D546C]/30">
                        {React.cloneElement(stat.icon, { className: 'w-6 h-6 text-[#F4F4F4]' })}
                      </div>
                      <span className="rounded-full bg-[#1D546C]/50 px-3 py-1 text-xs font-bold text-[#F4F4F4]">
                        {stat.growth}
                      </span>
                    </div>
                    <div className="mb-2 text-4xl font-black text-[#F4F4F4]">{stat.value}</div>
                    <div className="mb-1 text-sm font-bold text-[#F4F4F4]/90">{stat.label}</div>
                    <div className="text-xs text-[#F4F4F4]/60">{stat.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#0C2B4E]"
            >
              التخصصات الاحترافية
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#1A3D64]"
            >
              اختر من بين أفضل التخصصات التقنية والإبداعية
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-2xl border-2 p-8 text-right transition-all ${
                  activeFilter === category.id
                    ? 'border-[#1D546C] bg-[#0C2B4E] text-[#F4F4F4] shadow-2xl'
                    : 'border-transparent bg-[#F4F4F4] text-[#0C2B4E] hover:border-[#1D546C] hover:shadow-xl'
                }`}
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${
                    activeFilter === category.id ? 'bg-[#1D546C]' : 'bg-[#0C2B4E]'
                  }`}
                >
                  {React.cloneElement(category.icon, {
                    className: `w-7 h-7 ${activeFilter === category.id ? 'text-[#F4F4F4]' : 'text-[#F4F4F4]'}`,
                  })}
                </div>

                <h3 className="mb-6 text-xl font-black">{category.title}</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        activeFilter === category.id ? 'text-[#F4F4F4]/70' : 'text-[#1A3D64]/70'
                      }`}
                    >
                      المشاريع المتاحة
                    </span>
                    <span className="text-2xl font-black text-[#1D546C]">
                      {category.projects.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        activeFilter === category.id ? 'text-[#F4F4F4]/70' : 'text-[#1A3D64]/70'
                      }`}
                    >
                      المحترفون
                    </span>
                    <span className="text-lg font-bold">
                      {category.professionals.toLocaleString()}
                    </span>
                  </div>

                  <div
                    className={`border-t pt-3 ${
                      activeFilter === category.id ? 'border-[#1A3D64]' : 'border-[#0C2B4E]/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${
                          activeFilter === category.id ? 'text-[#F4F4F4]/70' : 'text-[#1A3D64]/70'
                        }`}
                      >
                        متوسط الأجر/ساعة
                      </span>
                      <span className="text-xl font-black text-[#1D546C]">
                        {category.avgRate} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#F4F4F4] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 text-5xl font-black text-[#0C2B4E]"
              >
                المشاريع المميزة
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl text-[#1A3D64]"
              >
                فرص استثنائية من شركات عالمية رائدة
              </motion.p>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-xl bg-[#0C2B4E] px-6 py-3 font-bold text-[#F4F4F4]">
                الكل
              </button>
              <button className="rounded-xl bg-white px-6 py-3 font-bold text-[#0C2B4E] transition-all hover:bg-[#0C2B4E] hover:text-[#F4F4F4]">
                الأحدث
              </button>
              <button className="rounded-xl bg-white px-6 py-3 font-bold text-[#0C2B4E] transition-all hover:bg-[#0C2B4E] hover:text-[#F4F4F4]">
                الأعلى قيمة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="rounded-3xl border-2 border-transparent bg-white p-8 shadow-lg transition-all hover:border-[#1D546C] hover:shadow-2xl"
              >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1A3D64] text-3xl shadow-lg">
                      {project.logo}
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#0C2B4E]">{project.company}</h3>
                        {project.verified && <BadgeCheck className="h-5 w-5 text-[#1D546C]" />}
                      </div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-[#1A3D64]">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                        {project.remote && (
                          <span className="rounded bg-[#1D546C]/10 px-2 py-0.5 text-xs font-bold text-[#1D546C]">
                            عن بعد
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {project.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-[#1D546C] px-3 py-1.5 text-xs font-black text-[#F4F4F4] shadow-md">
                        <Sparkles className="h-3 w-3" />
                        مميز
                      </span>
                    )}
                    {project.urgent && (
                      <span className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-black text-white shadow-md">
                        <Zap className="h-3 w-3" />
                        عاجل
                      </span>
                    )}
                  </div>
                </div>

                {/* Category & Type */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-lg bg-[#0C2B4E] px-3 py-1.5 text-sm font-bold text-[#F4F4F4]">
                    {project.category}
                  </span>
                  <span className="rounded-lg border border-[#1A3D64]/20 bg-[#F4F4F4] px-3 py-1.5 text-sm font-bold text-[#0C2B4E]">
                    {project.type}
                  </span>
                  <span className="rounded-lg bg-[#1D546C]/10 px-3 py-1.5 text-sm font-bold text-[#1D546C]">
                    {project.level}
                  </span>
                </div>

                {/* Title */}
                <h4 className="mb-4 text-2xl leading-tight font-black text-[#0C2B4E]">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-[#1A3D64]">{project.description}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h5 className="mb-3 text-sm font-bold text-[#0C2B4E]">المهارات المطلوبة:</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-[#1A3D64]/20 bg-[#F4F4F4] px-3 py-1.5 text-sm font-semibold text-[#0C2B4E]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl border border-[#1A3D64]/10 bg-gradient-to-br from-[#F4F4F4] to-white p-5">
                  <div className="text-center">
                    <DollarSign className="mx-auto mb-2 h-5 w-5 text-[#1D546C]" />
                    <p className="mb-1 text-xs font-semibold text-[#1A3D64]">الميزانية</p>
                    <p className="text-lg font-black text-[#0C2B4E]">
                      {project.budget.min.toLocaleString()}
                    </p>
                    <p className="text-xs font-bold text-[#1D546C]">
                      - {project.budget.max.toLocaleString()} {project.budget.currency}
                    </p>
                  </div>

                  <div className="border-x border-[#1A3D64]/10 text-center">
                    <Clock className="mx-auto mb-2 h-5 w-5 text-[#1D546C]" />
                    <p className="mb-1 text-xs font-semibold text-[#1A3D64]">المدة المتوقعة</p>
                    <p className="text-lg font-black text-[#0C2B4E]">{project.duration}</p>
                  </div>

                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-5 w-5 text-[#1D546C]" />
                    <p className="mb-1 text-xs font-semibold text-[#1A3D64]">العروض المقدمة</p>
                    <p className="text-lg font-black text-[#0C2B4E]">{project.proposals}</p>
                    <p className="text-xs font-bold text-[#1D546C]">عرض</p>
                  </div>
                </div>

                {/* Company Stats */}
                <div className="mb-6 flex items-center gap-6 border-b border-[#1A3D64]/10 pb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-[#1D546C] text-[#1D546C]" />
                    <span className="text-sm font-bold text-[#0C2B4E]">{project.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1A3D64]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-semibold">{project.projectsCompleted} مشروع منجز</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1A3D64]">
                    <Eye className="h-4 w-4" />
                    <span className="font-semibold">{project.views} مشاهدة</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 font-semibold text-[#1A3D64]">
                      <Clock className="h-4 w-4" />
                      {project.posted}
                    </span>
                    <span className="flex items-center gap-2 font-semibold text-[#1A3D64]">
                      <Calendar className="h-4 w-4" />
                      آخر موعد: {project.deadline}
                    </span>
                  </div>

                  <button className="rounded-xl bg-[#0C2B4E] px-8 py-3 font-black text-[#F4F4F4] shadow-lg transition-all hover:bg-[#1A3D64]">
                    تقديم عرض
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="rounded-xl bg-[#0C2B4E] px-16 py-4 text-lg font-black text-[#F4F4F4] shadow-xl transition-all hover:bg-[#1A3D64]">
              عرض جميع المشاريع
            </button>
          </div>
        </div>
      </section>

      {/* Top Experts Section */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#0C2B4E]"
            >
              نخبة المحترفين المعتمدين
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#1A3D64]"
            >
              تواصل مع أفضل 1% من المواهب في مجالك
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="rounded-3xl border-2 border-transparent bg-[#F4F4F4] p-6 shadow-lg transition-all hover:border-[#1D546C] hover:shadow-2xl"
              >
                {/* Header Badges */}
                <div className="mb-6 flex items-center justify-between">
                  {expert.elite && (
                    <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#0C2B4E] to-[#1A3D64] px-3 py-1.5 text-xs font-black text-[#F4F4F4] shadow-md">
                      <Crown className="h-3 w-3" />
                      ELITE
                    </span>
                  )}
                  <div
                    className={`h-3 w-3 rounded-full ${
                      expert.availability === 'متاح للعمل فوراً'
                        ? 'bg-green-500'
                        : expert.availability === 'متاح جزئياً'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    } shadow-lg`}
                  />
                </div>

                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0C2B4E] to-[#1A3D64] text-5xl shadow-2xl">
                    {expert.avatar}
                  </div>
                  {expert.verified && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full border-2 border-[#1D546C] bg-white p-2 shadow-xl">
                        <BadgeCheck className="h-6 w-6 text-[#1D546C]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-black text-[#0C2B4E]">{expert.name}</h3>
                  <p className="mb-3 text-sm font-bold text-[#1A3D64]">{expert.title}</p>
                  <p className="mb-4 text-xs leading-relaxed text-[#1A3D64]/70">{expert.bio}</p>

                  {/* Rating */}
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#1D546C] text-[#1D546C]" />
                      ))}
                    </div>
                    <span className="text-sm font-black text-[#0C2B4E]">{expert.rating}</span>
                    <span className="text-xs text-[#1A3D64]">({expert.reviews} تقييم)</span>
                  </div>

                  {/* Location & Timezone */}
                  <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[#1A3D64]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {expert.location}
                    </span>
                    <span>•</span>
                    <span>{expert.timezone}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                    <p className="text-2xl font-black text-[#0C2B4E]">{expert.completedProjects}</p>
                    <p className="text-xs font-semibold text-[#1A3D64]">مشروع</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                    <p className="text-2xl font-black text-[#1D546C]">{expert.successRate}%</p>
                    <p className="text-xs font-semibold text-[#1A3D64]">نجاح</p>
                  </div>
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                    <p className="text-2xl font-black text-[#0C2B4E]">{expert.totalEarnings}</p>
                    <p className="text-xs font-semibold text-[#1A3D64]">إيرادات</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h5 className="mb-3 text-xs font-bold text-[#0C2B4E]">التخصصات الرئيسية:</h5>
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-[#1A3D64]/20 bg-white px-3 py-1 text-xs font-semibold text-[#0C2B4E]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rate & Response Time */}
                <div className="mb-6 space-y-3 rounded-xl bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1A3D64]">الأجر/ساعة</span>
                    <span className="text-2xl font-black text-[#1D546C]">
                      {expert.hourlyRate} ر.س
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1A3D64]">وقت الاستجابة</span>
                    <span className="text-sm font-bold text-[#0C2B4E]">{expert.responseTime}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full rounded-xl bg-[#0C2B4E] py-3 font-black text-[#F4F4F4] shadow-lg transition-all hover:bg-[#1A3D64]">
                  عرض الملف الشخصي
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#0C2B4E] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#F4F4F4]"
            >
              لماذا ELITE TALENT؟
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#F4F4F4]/80"
            >
              مزايا احترافية تضمن نجاح مشاريعك الكبرى
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="rounded-3xl border border-[#1D546C]/30 bg-[#1A3D64]/50 p-8 text-center shadow-xl backdrop-blur-md"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1D546C]/50 shadow-lg">
                  {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-[#F4F4F4]' })}
                </div>

                <h3 className="mb-4 text-xl font-black text-[#F4F4F4]">{feature.title}</h3>
                <p className="mb-6 leading-relaxed text-[#F4F4F4]/80">{feature.description}</p>

                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center gap-2 text-sm font-semibold text-[#F4F4F4]"
                    >
                      <CheckCircle className="h-4 w-4 text-[#1D546C]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-5xl font-black text-[#0C2B4E]"
            >
              شهادات عملائنا
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-[#1A3D64]"
            >
              قصص نجاح حقيقية من شركات رائدة
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="rounded-3xl border-2 border-[#1D546C]/20 bg-gradient-to-br from-[#F4F4F4] to-white p-12 shadow-2xl"
            >
              {/* Rating */}
              <div className="mb-8 flex justify-center gap-2">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-7 w-7 fill-[#1D546C] text-[#1D546C]" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-10 text-center text-3xl leading-relaxed font-semibold text-[#0C2B4E]">
                "{testimonials[activeTestimonial].quote}"
              </p>

              {/* Author */}
              <div className="mb-8 flex items-center justify-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0C2B4E] to-[#1A3D64] text-4xl shadow-xl">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-right">
                  <h4 className="mb-1 text-2xl font-black text-[#0C2B4E]">
                    {testimonials[activeTestimonial].author}
                  </h4>
                  <p className="mb-1 text-sm font-bold text-[#1A3D64]">
                    {testimonials[activeTestimonial].position}
                  </p>
                  <p className="text-sm font-semibold text-[#1A3D64]/70">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Project Value */}
              <div className="rounded-xl border border-[#1D546C]/10 bg-[#0C2B4E]/5 p-4 text-center">
                <p className="mb-1 text-sm font-semibold text-[#1A3D64]">قيمة المشروع</p>
                <p className="text-3xl font-black text-[#1D546C]">
                  {testimonials[activeTestimonial].projectValue}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="mt-12 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`rounded-full transition-all ${
                  activeTestimonial === index
                    ? 'h-4 w-16 bg-[#1D546C]'
                    : 'h-4 w-4 bg-[#1D546C]/30 hover:bg-[#1D546C]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C] px-4 py-32">
        {/* Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#F4F4F4] blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#1D546C] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1D546C] shadow-2xl"
          >
            <Rocket className="h-12 w-12 text-[#F4F4F4]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-6xl font-black text-[#F4F4F4]"
          >
            ابدأ مشروعك التالي اليوم
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 max-w-2xl text-2xl leading-relaxed text-[#F4F4F4]/80"
          >
            انضم إلى آلاف الشركات والمحترفين الذين يحققون النجاح من خلال منصتنا الاحترافية
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col justify-center gap-6 sm:flex-row"
          >
            <button className="rounded-xl bg-[#F4F4F4] px-16 py-5 text-xl font-black text-[#0C2B4E] shadow-2xl transition-all hover:bg-white">
              أنشئ مشروعك الآن
            </button>
            <button className="rounded-xl border-2 border-[#F4F4F4] bg-transparent px-16 py-5 text-xl font-black text-[#F4F4F4] transition-all hover:bg-[#F4F4F4] hover:text-[#0C2B4E]">
              انضم كمحترف
            </button>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12">
            {[
              { icon: <CheckCircle />, text: 'تسجيل مجاني بالكامل' },
              { icon: <Shield />, text: 'دفع آمن ومضمون' },
              { icon: <Award />, text: 'جودة احترافية عالية' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-lg font-bold text-[#F4F4F4]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D546C]/50 shadow-lg backdrop-blur-sm">
                  {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C2B4E] px-4 pt-20 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D546C]">
                  <Crown className="h-6 w-6 text-[#F4F4F4]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#F4F4F4]">ELITE TALENT</h3>
                  <p className="text-xs font-semibold text-[#1D546C]">PROFESSIONAL NETWORK</p>
                </div>
              </div>

              <p className="mb-8 leading-relaxed text-[#F4F4F4]/70">
                منصة احترافية رائدة تربط الشركات العالمية بأفضل 1% من المواهب التقنية والإبداعية في
                العالم العربي
              </p>

              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Facebook].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3D64] text-[#F4F4F4] shadow-lg transition-all hover:bg-[#1D546C]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {[
              {
                title: 'المنصة',
                links: ['عن ELITE TALENT', 'كيف نعمل', 'المدونة', 'الوظائف', 'الصحافة'],
              },
              {
                title: 'الخدمات',
                links: ['للشركات', 'للمحترفين', 'الخطط والأسعار', 'الشراكات', 'API'],
              },
              {
                title: 'الدعم',
                links: [
                  'مركز المساعدة',
                  'الأسئلة الشائعة',
                  'اتصل بنا',
                  'الشروط والأحكام',
                  'سياسة الخصوصية',
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="mb-6 text-lg font-black text-[#F4F4F4]">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="font-semibold text-[#F4F4F4]/70 transition-colors hover:text-[#1D546C]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#1A3D64]/50 pt-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-center font-semibold text-[#F4F4F4]/70 md:text-right">
                © 2025 ELITE TALENT. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center gap-8">
                <span className="font-semibold text-[#F4F4F4]/70">مصنوع بـ ❤️ في السعودية</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Component for Info icon
function Info({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default EliteFreelancePlatform;
