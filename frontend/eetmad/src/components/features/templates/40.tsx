import React, { useState } from 'react';
import { Search, TrendingUp, Clock, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle2, Shield, Target, Briefcase, Code, Palette, Megaphone, Users, Package, BarChart3, Sparkles, ArrowRight, Building2, Bookmark, Share2, MapPin, ChevronDown, Heart, Activity, Zap, Play, Download, FileText, BookOpen, Settings, LogOut, Home, Folder, TrendingDown, Plus, X, ChevronRight, AlertCircle, Info, Grid3x3, LayoutGrid, Layers, Menu, Mail, Phone, Globe, Instagram, Twitter, Linkedin, Facebook, Crown, Flame, ChevronLeft, Leaf, TreeDeciduous, Sprout, Droplet, Sun, Wind, CloudRain, Factory, Recycle, TrendingUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function NaturalElegantPlatform() {
  const [activeView, setActiveView] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedProjects, setSavedProjects] = useState(new Set([2, 4]));
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'جميع المشاريع', icon: Grid3x3, count: 156, color: '#1C6758' },
    { id: 'tech', name: 'التقنية والابتكار', icon: Code, count: 47, color: '#3D8361' },
    { id: 'sustain', name: 'الاستدامة البيئية', icon: Leaf, count: 32, color: '#1C6758' },
    { id: 'consult', name: 'الاستشارات', icon: Briefcase, count: 28, color: '#3D8361' },
    { id: 'design', name: 'التصميم والإبداع', icon: Palette, count: 25, color: '#1C6758' },
    { id: 'data', name: 'البيانات والتحليل', icon: BarChart3, count: 24, color: '#3D8361' },
  ];

  const projects = [
    {
      id: 1,
      title: 'مبادرة التحول الأخضر للمدن الذكية المستدامة',
      organization: 'الهيئة الملكية للعلا',
      category: 'sustain',
      budget: '15.8M - 22.4M',
      deadline: '45 يوم',
      proposals: 89,
      views: 12456,
      rating: 4.9,
      verified: true,
      featured: true,
      urgent: false,
      sustainability: true,
      tags: ['طاقة متجددة', 'مدن ذكية', 'استدامة', 'تقنية خضراء'],
      icon: TreeDeciduous,
      location: 'العلا',
      progress: 35,
      description: 'مشروع رائد لتحويل المدن إلى نماذج مستدامة صديقة للبيئة'
    },
    {
      id: 2,
      title: 'نظام إدارة الموارد المائية الذكي والمستدام',
      organization: 'وزارة البيئة والمياه',
      category: 'tech',
      budget: '8.5M - 12.3M',
      deadline: '30 يوم',
      proposals: 124,
      views: 18234,
      rating: 4.8,
      verified: true,
      featured: true,
      urgent: true,
      sustainability: true,
      tags: ['IoT', 'إدارة مياه', 'AI', 'استشعار'],
      icon: Droplet,
      location: 'الرياض',
      progress: 60,
      description: 'حلول تقنية متقدمة لإدارة الموارد المائية بكفاءة عالية'
    },
    {
      id: 3,
      title: 'استراتيجية تطوير الاقتصاد الدائري للصناعات الخضراء',
      organization: 'صندوق الاستثمارات العامة',
      category: 'consult',
      budget: '12.2M - 18.7M',
      deadline: '60 يوم',
      proposals: 67,
      views: 9876,
      rating: 5.0,
      verified: true,
      featured: false,
      urgent: false,
      sustainability: true,
      tags: ['استشارات', 'اقتصاد دائري', 'تخطيط', 'تطوير'],
      icon: Recycle,
      location: 'الرياض',
      progress: 25,
      description: 'بناء استراتيجية متكاملة للاقتصاد الأخضر المستدام'
    },
    {
      id: 4,
      title: 'منصة رقمية متطورة للحكومة الإلكترونية الشاملة',
      organization: 'هيئة الحكومة الرقمية',
      category: 'tech',
      budget: '18.3M - 25.6M',
      deadline: '50 يوم',
      proposals: 156,
      views: 21456,
      rating: 4.9,
      verified: true,
      featured: true,
      urgent: false,
      sustainability: false,
      tags: ['حكومة إلكترونية', 'Cloud', 'أمن سيبراني', 'تكامل'],
      icon: Building2,
      location: 'الرياض',
      progress: 70,
      description: 'تطوير بنية تحتية رقمية متكاملة للخدمات الحكومية'
    },
    {
      id: 5,
      title: 'تصميم هوية بصرية متكاملة لمبادرة الطاقة المتجددة',
      organization: 'مبادرة السعودية الخضراء',
      category: 'design',
      budget: '4.5M - 7.2M',
      deadline: '40 يوم',
      proposals: 201,
      views: 15678,
      rating: 4.7,
      verified: true,
      featured: false,
      urgent: true,
      sustainability: true,
      tags: ['هوية بصرية', 'تصميم', 'براندينج', 'إبداع'],
      icon: Sun,
      location: 'جدة',
      progress: 45,
      description: 'إنشاء هوية بصرية مميزة تعكس رؤية الاستدامة والطاقة النظيفة'
    },
    {
      id: 6,
      title: 'مركز تحليل البيانات الضخمة للقطاعات الحيوية',
      organization: 'مركز المعلومات الوطني',
      category: 'data',
      budget: '10.8M - 16.5M',
      deadline: '55 يوم',
      proposals: 93,
      views: 11234,
      rating: 4.8,
      verified: true,
      featured: false,
      urgent: false,
      sustainability: false,
      tags: ['Big Data', 'تحليل', 'ذكاء أعمال', 'تقارير'],
      icon: BarChart3,
      location: 'الرياض',
      progress: 50,
      description: 'بناء مركز متقدم لتحليل البيانات واستخلاص الرؤى الاستراتيجية'
    },
  ];

  const stats = [
    { label: 'المشاريع المتاحة', value: '156', change: '+24', icon: Layers, trend: 'up' },
    { label: 'إجمالي القيمة', value: '2.4B', change: '+18%', icon: DollarSign, trend: 'up' },
    { label: 'معدل الإنجاز', value: '94.2%', change: '+2.8%', icon: TrendingUp, trend: 'up' },
    { label: 'الجهات المشاركة', value: '127', change: '+15', icon: Building2, trend: 'up' },
  ];

  const toggleSave = (id) => {
    setSavedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EEF2E6' }}>
      
      {/* Elegant Natural Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ 
        background: 'linear-gradient(135deg, #1C6758 0%, #3D8361 100%)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                    <Leaf className="w-7 h-7" style={{ color: '#1C6758' }} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full" style={{ backgroundColor: '#3D8361' }}>
                    <div className="w-2 h-2 rounded-full m-1" style={{ backgroundColor: '#FFFFFF' }}></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">بوابة المنافسات</h1>
                  <p className="text-xs font-semibold" style={{ color: '#D6CDA4' }}>نمو مستدام • شراكات ناجحة</p>
                </div>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-1">
                {['الرئيسية', 'المشاريع', 'الفرص', 'الشراكات'].map((item, idx) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    style={{ 
                      color: idx === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-lg transition-all" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: '#D4A574' }}></span>
              </button>

              <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#FFFFFF', color: '#1C6758' }}>
                  أ
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">أحمد الغامدي</div>
                  <div className="text-xs" style={{ color: '#D6CDA4' }}>مدير استراتيجي</div>
                </div>
              </div>

              <button className="lg:hidden p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Natural Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full blur-3xl" style={{ background: '#1C6758' }}></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: '#3D8361' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
              style={{ 
                backgroundColor: 'rgba(61, 131, 97, 0.1)',
                borderColor: 'rgba(61, 131, 97, 0.2)'
              }}
            >
              <Sprout className="w-4 h-4" style={{ color: '#3D8361' }} />
              <span className="text-sm font-bold" style={{ color: '#1C6758' }}>منصة وطنية موثوقة ومستدامة</span>
              <Shield className="w-4 h-4" style={{ color: '#1C6758' }} />
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-5 leading-tight" style={{ color: '#1F2E1B' }}>
              شريكك في التحول<br />
              <span style={{ color: '#1C6758' }}>نحو مستقبل مستدام</span>
            </h1>

            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A6C57' }}>
              منصة احترافية تربط الجهات الحكومية بأفضل الخبرات والحلول المبتكرة لبناء مستقبل أفضل
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-xl" style={{ 
                backgroundColor: '#1C6758',
                color: '#FFFFFF'
              }}>
                <span>استكشف الفرص</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-xl font-bold text-base border-2 transition-all" style={{ 
                borderColor: '#3D8361',
                color: '#1C6758',
                backgroundColor: '#FFFFFF'
              }}>
                ابدأ مشروعك
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(61, 131, 97, 0.15)',
                  boxShadow: '0 2px 8px rgba(28, 103, 88, 0.08)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ 
                    backgroundColor: 'rgba(61, 131, 97, 0.1)'
                  }}>
                    <stat.icon className="w-6 h-6" style={{ color: '#1C6758' }} />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ 
                    backgroundColor: '#3D8361',
                    color: '#FFFFFF'
                  }}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#1F2E1B' }}>{stat.value}</div>
                <div className="text-sm font-semibold" style={{ color: '#5A6C57' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8" style={{ backgroundColor: '#D6CDA4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5" style={{ color: '#1C6758' }} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن المشاريع، الجهات، أو التخصصات..."
                className="w-full h-14 pr-14 pl-5 rounded-xl text-base font-semibold outline-none transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#1F2E1B',
                  border: '2px solid transparent',
                  boxShadow: '0 2px 8px rgba(28, 103, 88, 0.08)'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #1C6758';
                  e.target.style.boxShadow = '0 0 0 4px rgba(28, 103, 88, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid transparent';
                  e.target.style.boxShadow = '0 2px 8px rgba(28, 103, 88, 0.08)';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3.5 rounded-xl font-bold border-2 flex items-center gap-2 transition-all" 
                style={{ 
                  borderColor: 'rgba(61, 131, 97, 0.3)',
                  color: '#1C6758',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">تصفية</span>
              </button>

              <button className="px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg" style={{ 
                backgroundColor: '#1C6758',
                color: '#FFFFFF'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6" style={{ backgroundColor: '#EEF2E6' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className="px-5 py-3 rounded-xl font-bold whitespace-nowrap flex items-center gap-2 border-2 transition-all"
                style={{
                  backgroundColor: selectedFilter === cat.id ? '#1C6758' : '#FFFFFF',
                  borderColor: selectedFilter === cat.id ? '#1C6758' : 'rgba(61, 131, 97, 0.2)',
                  color: selectedFilter === cat.id ? '#FFFFFF' : '#1F2E1B'
                }}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{
                  backgroundColor: selectedFilter === cat.id ? 'rgba(255, 255, 255, 0.2)' : '#EEF2E6',
                  color: selectedFilter === cat.id ? '#FFFFFF' : '#1C6758'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12" style={{ backgroundColor: '#EEF2E6' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ color: '#1F2E1B' }}>المشاريع المتميزة</h2>
              <p className="text-base font-semibold" style={{ color: '#5A6C57' }}>{filteredProjects.length} فرصة متاحة</p>
            </div>

            <div className="flex items-center gap-3">
              <select className="px-4 py-2.5 rounded-xl border-2 font-semibold outline-none" style={{ 
                borderColor: 'rgba(61, 131, 97, 0.2)',
                color: '#1F2E1B',
                backgroundColor: '#FFFFFF'
              }}>
                <option>الأحدث</option>
                <option>الأعلى قيمة</option>
                <option>الأكثر مشاهدة</option>
                <option>ينتهي قريباً</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl overflow-hidden border-2 transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.featured ? '#1C6758' : 'rgba(61, 131, 97, 0.15)',
                  boxShadow: '0 2px 8px rgba(28, 103, 88, 0.08)'
                }}
              >
                {/* Header */}
                <div className="p-6" style={{ background: 'linear-gradient(135deg, #EEF2E6 0%, #FFFFFF 100%)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(61, 131, 97, 0.1)' }}>
                        <project.icon className="w-7 h-7" style={{ color: '#1C6758' }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-base" style={{ color: '#1F2E1B' }}>{project.organization}</span>
                          {project.verified && (
                            <CheckCircle2 className="w-4 h-4" style={{ color: '#3D8361' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3.5 h-3.5" style={{ color: '#5A6C57' }} />
                          <span style={{ color: '#5A6C57' }}>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {project.sustainability && (
                        <div className="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1" style={{ 
                          backgroundColor: 'rgba(61, 131, 97, 0.15)',
                          color: '#1C6758'
                        }}>
                          <Leaf className="w-3 h-3" />
                          مستدام
                        </div>
                      )}
                      {project.urgent && (
                        <div className="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1" style={{ 
                          backgroundColor: '#C85A54',
                          color: '#FFFFFF'
                        }}>
                          <AlertCircle className="w-3 h-3" />
                          عاجل
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: '#1F2E1B' }}>
                    {project.title}
                  </h3>

                  <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5A6C57' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg text-xs font-semibold border" style={{ 
                        backgroundColor: 'rgba(61, 131, 97, 0.08)',
                        borderColor: 'rgba(61, 131, 97, 0.15)',
                        color: '#1C6758'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span style={{ color: '#5A6C57' }}>التقدم</span>
                      <span style={{ color: '#1C6758' }}>{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(61, 131, 97, 0.15)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#1C6758' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-6 py-5" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(61, 131, 97, 0.1)' }}>
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <DollarSign className="w-3.5 h-3.5" style={{ color: '#1C6758' }} />
                        <span className="text-xs font-semibold" style={{ color: '#5A6C57' }}>الميزانية</span>
                      </div>
                      <div className="font-bold text-xs" style={{ color: '#1F2E1B' }}>{project.budget}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Users className="w-3.5 h-3.5" style={{ color: '#1C6758' }} />
                        <span className="text-xs font-semibold" style={{ color: '#5A6C57' }}>العروض</span>
                      </div>
                      <div className="font-bold text-xs" style={{ color: '#1F2E1B' }}>{project.proposals}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Eye className="w-3.5 h-3.5" style={{ color: '#1C6758' }} />
                        <span className="text-xs font-semibold" style={{ color: '#5A6C57' }}>المشاهدات</span>
                      </div>
                      <div className="font-bold text-xs" style={{ color: '#1F2E1B' }}>{project.views}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3.5 h-3.5" style={{ color: '#C85A54' }} />
                        <span className="text-xs font-semibold" style={{ color: '#5A6C57' }}>الوقت</span>
                      </div>
                      <div className="font-bold text-xs" style={{ color: '#1F2E1B' }}>{project.deadline}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3.5 rounded-xl font-bold transition-all shadow-lg" style={{ 
                      backgroundColor: '#1C6758',
                      color: '#FFFFFF'
                    }}>
                      تقديم عرض
                    </button>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all"
                      style={{
                        borderColor: savedProjects.has(project.id) ? '#1C6758' : 'rgba(61, 131, 97, 0.2)',
                        backgroundColor: savedProjects.has(project.id) ? 'rgba(28, 103, 88, 0.1)' : '#FFFFFF'
                      }}
                    >
                      <Bookmark
                        className="w-5 h-5"
                        style={{ color: savedProjects.has(project.id) ? '#1C6758' : '#5A6C57' }}
                        fill={savedProjects.has(project.id) ? '#1C6758' : 'none'}
                      />
                    </button>
                    <button className="w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all" style={{ 
                      borderColor: 'rgba(61, 131, 97, 0.2)',
                      backgroundColor: '#FFFFFF'
                    }}>
                      <Share2 className="w-5 h-5" style={{ color: '#5A6C57' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="px-10 py-4 rounded-xl font-bold border-2 inline-flex items-center gap-3 transition-all" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#1C6758',
              borderColor: '#3D8361'
            }}>
              عرض المزيد
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Sustainability CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1C6758 0%, #3D8361 100%)' }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: '#FFFFFF' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: '#D6CDA4' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFFFFF' }}>
            <TreeDeciduous className="w-10 h-10" style={{ color: '#1C6758' }} />
          </div>
          <h2 className="text-4xl font-bold mb-5 text-white">انضم إلى رحلة النمو المستدام</h2>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            كن جزءاً من التحول نحو مستقبل أفضل وأكثر استدامة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#1C6758'
            }}>
              سجل الآن
            </button>
            <button className="px-10 py-4 rounded-xl font-bold text-lg border-2 transition-all" style={{ 
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              اعرف المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#D6CDA4' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                  backgroundColor: '#1C6758'
                }}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1F2E1B' }}>بوابة المنافسات</h3>
              </div>
              <p className="leading-relaxed mb-5 text-sm" style={{ color: '#5A6C57' }}>
                منصة وطنية رائدة للمشاريع الحكومية المستدامة والمبتكرة
              </p>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المشاريع', 'الفرص', 'الشراكات', 'الدعم'] },
              { title: 'الخدمات', links: ['للجهات', 'للشركات', 'الاستشارات', 'التدريب'] },
              { title: 'تواصل معنا', links: ['المساعدة', 'الشروط', 'الخصوصية', 'من نحن'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-base font-bold mb-5" style={{ color: '#1F2E1B' }}>{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-all hover:translate-x-1 inline-block" style={{ color: '#5A6C57' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(61, 131, 97, 0.2)' }}>
            <p className="text-sm" style={{ color: '#5A6C57' }}>© 2025 بوابة المنافسات. جميع الحقوق محفوظة</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <button key={idx} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ 
                  backgroundColor: 'rgba(28, 103, 88, 0.1)',
                  color: '#1C6758'
                }}>
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NaturalElegantPlatform;