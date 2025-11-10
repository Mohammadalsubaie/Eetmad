import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle2, Shield, Target, Briefcase, Code, Palette, Users, Package, BarChart3, Sparkles, ArrowRight, Building2, Bookmark, Share2, MapPin, ChevronDown, Heart, Activity, Zap, Play, Download, FileText, BookOpen, Settings, LogOut, Home, Folder, TrendingDown, Plus, X, ChevronRight, AlertCircle, Info, Grid3x3, LayoutGrid, Layers, Menu, Mail, Phone, Globe, Instagram, Twitter, Linkedin, Facebook, Crown, Flame, Clock, ThumbsUp, Send, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ModernProfessionalPlatform() {
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedProjects, setSavedProjects] = useState(new Set([1, 3]));
  const [view, setView] = useState('grid');

  const categories = [
    { id: 'all', name: 'الكل', count: 248, icon: LayoutGrid },
    { id: 'tech', name: 'التقنية', count: 89, icon: Code },
    { id: 'design', name: 'التصميم', count: 67, icon: Palette },
    { id: 'business', name: 'الأعمال', count: 54, icon: Briefcase },
    { id: 'data', name: 'البيانات', count: 38, icon: BarChart3 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة حكومية متكاملة للخدمات الإلكترونية',
      organization: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'tech',
      budget: '12.5M - 18.2M',
      deadline: 45,
      proposals: 156,
      views: 18234,
      rating: 4.9,
      verified: true,
      featured: true,
      urgent: false,
      tags: ['حكومة رقمية', 'Cloud', 'API', 'أمن سيبراني'],
      description: 'بناء منصة رقمية شاملة لتقديم الخدمات الحكومية بكفاءة عالية',
      icon: Building2,
      color: '#8294C4',
      progress: 35,
      applicants: 89
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمبادرة وطنية استراتيجية',
      organization: 'الهيئة العامة للاستثمار',
      category: 'design',
      budget: '5.8M - 8.4M',
      deadline: 30,
      proposals: 203,
      views: 24567,
      rating: 4.8,
      verified: true,
      featured: true,
      urgent: true,
      tags: ['براندينج', 'هوية بصرية', 'تصميم إبداعي'],
      description: 'إنشاء هوية بصرية مميزة تعكس الرؤية والطموح الوطني',
      icon: Palette,
      color: '#ACB1D6',
      progress: 60,
      applicants: 124
    },
    {
      id: 3,
      title: 'استشارات استراتيجية للتحول الرقمي المؤسسي الشامل',
      organization: 'مجموعة الاستثمارات الوطنية',
      category: 'business',
      budget: '15.2M - 22.8M',
      deadline: 60,
      proposals: 98,
      views: 15678,
      rating: 5.0,
      verified: true,
      featured: false,
      urgent: false,
      tags: ['استشارات', 'تحول رقمي', 'تخطيط استراتيجي'],
      description: 'خطة متكاملة للتحول الرقمي وتطوير العمليات المؤسسية',
      icon: Briefcase,
      color: '#8294C4',
      progress: 25,
      applicants: 67
    },
    {
      id: 4,
      title: 'نظام تحليل البيانات الضخمة وذكاء الأعمال المتقدم',
      organization: 'مركز المعلومات الوطني',
      category: 'data',
      budget: '9.7M - 14.3M',
      deadline: 50,
      proposals: 134,
      views: 19845,
      rating: 4.7,
      verified: true,
      featured: true,
      urgent: false,
      tags: ['Big Data', 'AI', 'Machine Learning', 'Analytics'],
      description: 'بناء نظام متطور لتحليل البيانات واستخلاص الرؤى الاستراتيجية',
      icon: BarChart3,
      color: '#ACB1D6',
      progress: 70,
      applicants: 95
    },
    {
      id: 5,
      title: 'تطوير تطبيقات الأجهزة الذكية للخدمات الأساسية',
      organization: 'هيئة الحكومة الرقمية',
      category: 'tech',
      budget: '6.4M - 9.8M',
      deadline: 40,
      proposals: 187,
      views: 21234,
      rating: 4.6,
      verified: true,
      featured: false,
      urgent: true,
      tags: ['iOS', 'Android', 'React Native', 'UX'],
      description: 'تطبيقات متطورة توفر الخدمات الحكومية بسهولة ويسر',
      icon: Code,
      color: '#8294C4',
      progress: 45,
      applicants: 112
    },
    {
      id: 6,
      title: 'استراتيجية التسويق الرقمي والتواجد الإلكتروني',
      organization: 'الهيئة العامة للسياحة',
      category: 'business',
      budget: '4.2M - 6.7M',
      deadline: 35,
      proposals: 176,
      views: 17890,
      rating: 4.8,
      verified: true,
      featured: false,
      urgent: false,
      tags: ['تسويق رقمي', 'SEO', 'محتوى', 'سوشيال ميديا'],
      description: 'خطة تسويقية شاملة لتعزيز الحضور الرقمي والوصول العالمي',
      icon: Users,
      color: '#ACB1D6',
      progress: 55,
      applicants: 98
    },
  ];

  const stats = [
    { label: 'المشاريع النشطة', value: '248', change: '+32', trend: 'up', icon: Layers, color: '#8294C4' },
    { label: 'إجمالي الميزانيات', value: '3.2B', change: '+24%', trend: 'up', icon: DollarSign, color: '#ACB1D6' },
    { label: 'معدل الإتمام', value: '96.8%', change: '+3.2%', trend: 'up', icon: TrendingUp, color: '#8294C4' },
    { label: 'الشركات المعتمدة', value: '1,847', change: '+156', trend: 'up', icon: Shield, color: '#ACB1D6' },
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

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ 
        background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%)',
                    boxShadow: '0 4px 12px rgba(130, 148, 196, 0.2)'
                  }}>
                    <Target className="w-7 h-7" style={{ color: '#8294C4' }} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #FFEAD2 0%, #FFD4A3 100%)'
                  }}>
                    <Sparkles className="w-3 h-3" style={{ color: '#92400E' }} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">بوابة الفرص</h1>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>الاحترافية • الابتكار • الثقة</p>
                </div>
              </motion.div>

              <div className="hidden lg:flex items-center gap-1">
                {['الرئيسية', 'المشاريع', 'الشركات', 'الموارد'].map((item, idx) => (
                  <motion.button
                    key={item}
                    whileHover={{ y: -2 }}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all relative overflow-hidden group"
                    style={{ 
                      color: idx === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                      backgroundColor: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                    }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-lg transition-all" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse" style={{ 
                  background: 'linear-gradient(135deg, #FFEAD2 0%, #FFD4A3 100%)'
                }}></span>
              </motion.button>

              <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer group" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold" style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%)',
                  color: '#8294C4'
                }}>
                  م
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">محمد العتيبي</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>مدير المشتريات</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>

              <button className="lg:hidden p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern & Professional */}
      <section className="relative py-20 overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #DBDFEA 0%, #FFFFFF 100%)'
      }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: '#8294C4' }}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: '#ACB1D6' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 border-2"
              style={{ 
                backgroundColor: 'rgba(130, 148, 196, 0.08)',
                borderColor: 'rgba(130, 148, 196, 0.2)'
              }}
            >
              <Shield className="w-4 h-4" style={{ color: '#8294C4' }} />
              <span className="text-sm font-bold" style={{ color: '#1F2937' }}>منصة موثوقة ومعتمدة</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }}></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: '#1F2937' }}
            >
              شريكك الاحترافي في<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                تحقيق التميز
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#4B5563' }}
            >
              منصة متطورة تربط الجهات الحكومية والخاصة بأفضل الخبرات والحلول المبتكرة
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-10 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:shadow-xl group" style={{ 
                background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(130, 148, 196, 0.3)'
              }}>
                <span>استكشف الفرص</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 rounded-xl font-bold text-base border-2 transition-all hover:shadow-lg" style={{ 
                borderColor: '#8294C4',
                color: '#8294C4',
                backgroundColor: '#FFFFFF'
              }}>
                كيف تبدأ
              </button>
            </motion.div>
          </div>

          {/* Stats Cards - Premium Design */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border-2 relative overflow-hidden group cursor-pointer"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(130, 148, 196, 0.15)',
                  boxShadow: '0 2px 8px rgba(130, 148, 196, 0.08)'
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" style={{ 
                  background: stat.color 
                }}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                      backgroundColor: 'rgba(130, 148, 196, 0.1)'
                    }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ 
                      backgroundColor: '#10B981',
                      color: '#FFFFFF'
                    }}>
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>{stat.value}</div>
                  <div className="text-sm font-semibold" style={{ color: '#6B7280' }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-10" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <div className="flex-1 relative w-full">
              <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10">
                <Search className="w-6 h-6" style={{ color: '#8294C4' }} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن المشاريع، التخصصات، أو الجهات..."
                className="w-full h-16 pr-16 pl-6 rounded-2xl text-base font-semibold outline-none transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#1F2937',
                  border: '2px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(130, 148, 196, 0.08)'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #8294C4';
                  e.target.style.boxShadow = '0 0 0 4px rgba(130, 148, 196, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #E5E7EB';
                  e.target.style.boxShadow = '0 2px 8px rgba(130, 148, 196, 0.08)';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="h-16 px-6 rounded-2xl font-bold border-2 flex items-center gap-3 transition-all hover:shadow-lg" 
                style={{ 
                  borderColor: '#E5E7EB',
                  color: '#1F2937',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Filter className="w-5 h-5" style={{ color: '#8294C4' }} />
                <span className="hidden sm:inline">تصفية</span>
              </button>

              <button className="h-16 px-10 rounded-2xl font-bold transition-all hover:shadow-xl" style={{ 
                background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(130, 148, 196, 0.2)'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(cat.id)}
                className="px-6 py-3.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-3 border-2 transition-all relative overflow-hidden group"
                style={{
                  backgroundColor: activeTab === cat.id ? '#8294C4' : '#FFFFFF',
                  borderColor: activeTab === cat.id ? '#8294C4' : '#E5E7EB',
                  color: activeTab === cat.id ? '#FFFFFF' : '#1F2937',
                  boxShadow: activeTab === cat.id ? '0 4px 12px rgba(130, 148, 196, 0.2)' : 'none'
                }}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.name}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{
                  backgroundColor: activeTab === cat.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(130, 148, 196, 0.1)',
                  color: activeTab === cat.id ? '#FFFFFF' : '#8294C4'
                }}>
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>المشاريع المتاحة</h2>
              <p className="text-lg font-semibold" style={{ color: '#6B7280' }}>{filteredProjects.length} فرصة مميزة</p>
            </div>

            <div className="flex items-center gap-4">
              <select className="h-12 px-5 rounded-xl border-2 font-semibold outline-none cursor-pointer" style={{ 
                borderColor: '#E5E7EB',
                color: '#1F2937',
                backgroundColor: '#FFFFFF'
              }}>
                <option>الأحدث</option>
                <option>الأعلى ميزانية</option>
                <option>الأكثر عروضاً</option>
                <option>ينتهي قريباً</option>
              </select>

              <div className="flex gap-2 p-1 rounded-lg" style={{ backgroundColor: '#E5E7EB' }}>
                <button 
                  onClick={() => setView('grid')}
                  className="p-2 rounded-lg transition-all" 
                  style={{ backgroundColor: view === 'grid' ? '#FFFFFF' : 'transparent' }}
                >
                  <Grid3x3 className="w-5 h-5" style={{ color: '#1F2937' }} />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className="p-2 rounded-lg transition-all" 
                  style={{ backgroundColor: view === 'list' ? '#FFFFFF' : 'transparent' }}
                >
                  <LayoutGrid className="w-5 h-5" style={{ color: '#1F2937' }} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl overflow-hidden border-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.featured ? '#8294C4' : 'rgba(130, 148, 196, 0.15)',
                  boxShadow: '0 2px 12px rgba(130, 148, 196, 0.08)'
                }}
              >
                {/* Header with Gradient */}
                <div className="p-8 relative overflow-hidden" style={{ 
                  background: project.featured 
                    ? 'linear-gradient(135deg, rgba(130, 148, 196, 0.08) 0%, rgba(172, 177, 214, 0.08) 100%)'
                    : '#FFFFFF'
                }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10" style={{ 
                    background: project.color 
                  }}></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ 
                          background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}CC 100%)`,
                          boxShadow: `0 4px 12px ${project.color}40`
                        }}>
                          <project.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-bold text-base" style={{ color: '#1F2937' }}>{project.organization}</span>
                            {project.verified && (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 text-sm" style={{ color: '#6B7280' }}>
                            <MapPin className="w-4 h-4" />
                            <span className="font-semibold">المملكة العربية السعودية</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {project.featured && (
                          <div className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5" style={{ 
                            background: 'linear-gradient(135deg, #FFEAD2 0%, #FFD4A3 100%)',
                            color: '#92400E'
                          }}>
                            <Crown className="w-3.5 h-3.5" />
                            مميز
                          </div>
                        )}
                        {project.urgent && (
                          <div className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5" style={{ 
                            backgroundColor: '#EF4444',
                            color: '#FFFFFF'
                          }}>
                            <AlertCircle className="w-3.5 h-3.5" />
                            عاجل
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-opacity-80 transition-all" style={{ color: '#1F2937' }}>
                      {project.title}
                    </h3>

                    <p className="text-base mb-5 leading-relaxed" style={{ color: '#4B5563' }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-semibold border" style={{ 
                          backgroundColor: 'rgba(130, 148, 196, 0.08)',
                          borderColor: 'rgba(130, 148, 196, 0.2)',
                          color: '#8294C4'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span style={{ color: '#6B7280' }}>نسبة الإنجاز</span>
                        <span style={{ color: '#8294C4' }}>{project.progress}%</span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(130, 148, 196, 0.15)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${project.color} 0%, ${project.color}CC 100%)` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="px-8 py-6" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid rgba(130, 148, 196, 0.1)' }}>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { icon: DollarSign, label: 'الميزانية', value: project.budget, color: '#8294C4' },
                      { icon: Users, label: 'المتقدمون', value: project.applicants, color: '#ACB1D6' },
                      { icon: Eye, label: 'المشاهدات', value: project.views, color: '#8294C4' },
                      { icon: Clock, label: 'الوقت', value: `${project.deadline} يوم`, color: '#EF4444' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <item.icon className="w-4 h-4" style={{ color: item.color }} />
                          <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>{item.label}</span>
                        </div>
                        <div className="font-bold text-sm" style={{ color: '#1F2937' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 h-14 rounded-xl font-bold transition-all hover:shadow-xl flex items-center justify-center gap-2" style={{ 
                      background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(130, 148, 196, 0.2)'
                    }}>
                      <span>تقديم عرض</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all hover:shadow-lg"
                      style={{
                        borderColor: savedProjects.has(project.id) ? '#8294C4' : '#E5E7EB',
                        backgroundColor: savedProjects.has(project.id) ? 'rgba(130, 148, 196, 0.1)' : '#FFFFFF'
                      }}
                    >
                      <Bookmark
                        className="w-5 h-5"
                        style={{ color: savedProjects.has(project.id) ? '#8294C4' : '#6B7280' }}
                        fill={savedProjects.has(project.id) ? '#8294C4' : 'none'}
                      />
                    </button>
                    <button className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all hover:shadow-lg" style={{ 
                      borderColor: '#E5E7EB',
                      backgroundColor: '#FFFFFF'
                    }}>
                      <Share2 className="w-5 h-5" style={{ color: '#6B7280' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-12 py-4 rounded-2xl font-bold border-2 inline-flex items-center gap-3 transition-all hover:shadow-lg" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#8294C4',
              borderColor: '#8294C4'
            }}>
              عرض المزيد من المشاريع
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)' }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#FFFFFF' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#FFEAD2' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8" style={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 100%)',
            boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)'
          }}>
            <Target className="w-12 h-12" style={{ color: '#8294C4' }} />
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white">انضم إلى مجتمع الاحتراف</h2>
          <p className="text-2xl mb-10 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            ابدأ رحلتك نحو التميز مع آلاف الفرص المتاحة
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#8294C4',
              boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3)'
            }}>
              سجل الآن مجاناً
            </button>
            <button className="px-12 py-5 rounded-2xl font-bold text-lg border-2 transition-all hover:bg-white hover:bg-opacity-10" style={{ 
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              تعرف على المزايا
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10" style={{ backgroundColor: '#1F2937' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #8294C4 0%, #ACB1D6 100%)'
                }}>
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">بوابة الفرص</h3>
              </div>
              <p className="leading-relaxed mb-6 text-base" style={{ color: '#D1D5DB' }}>
                منصة احترافية رائدة تربط الطموحات بالفرص
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <button key={idx} className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110" style={{ 
                    backgroundColor: 'rgba(130, 148, 196, 0.1)',
                    color: '#8294C4'
                  }}>
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الخدمات', links: ['المشاريع', 'الشركات', 'الاستشارات', 'التدريب'] },
              { title: 'الموارد', links: ['المدونة', 'الدعم', 'الأسئلة', 'الأدلة'] },
              { title: 'الشركة', links: ['من نحن', 'اتصل بنا', 'الشروط', 'الخصوصية'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold mb-6 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-base transition-all hover:translate-x-1 inline-block" style={{ color: '#D1D5DB' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#374151' }}>
            <p className="text-base" style={{ color: '#9CA3AF' }}>© 2025 بوابة الفرص. جميع الحقوق محفوظة</p>
            <div className="flex gap-6">
              {['الشروط', 'الخصوصية', 'ملفات تعريف الارتباط'].map((item) => (
                <a key={item} href="#" className="text-sm transition-all" style={{ color: '#9CA3AF' }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernProfessionalPlatform;