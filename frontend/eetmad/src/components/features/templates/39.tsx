import React, { useState } from 'react';
import { Search, TrendingUp, Clock, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle2, Shield, Target, Briefcase, Code, Palette, Megaphone, Users, Package, BarChart3, Sparkles, ArrowRight, Building2, Bookmark, Share2, MapPin, ChevronDown, Heart, Activity, Zap, Play, Download, FileText, BookOpen, Settings, LogOut, Home, Folder, TrendingDown, Plus, X, ChevronRight, AlertCircle, Info, Grid3x3, LayoutGrid, Layers, Boxes, Database, Server, CloudUpload, HardDrive, Cpu, Terminal, Binary, Hash, Menu, Mail, Phone, Globe, Instagram, Twitter, Linkedin, Facebook, TrendingUpIcon, ArrowUpRight, Crown, Flame, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CreativeVibrantPlatform() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [likedProjects, setLikedProjects] = useState(new Set([1, 3]));
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'dev', name: 'تطوير البرمجيات', icon: Code, count: 52, color: '#7743DB', gradient: 'from-purple-600 to-purple-700' },
    { id: 'design', name: 'التصميم الإبداعي', icon: Palette, count: 38, color: '#C3ACD0', gradient: 'from-purple-300 to-purple-400' },
    { id: 'consult', name: 'الاستشارات التقنية', icon: Briefcase, count: 45, color: '#7743DB', gradient: 'from-purple-600 to-indigo-600' },
    { id: 'market', name: 'التسويق الرقمي', icon: Megaphone, count: 29, color: '#C3ACD0', gradient: 'from-purple-400 to-pink-400' },
    { id: 'data', name: 'علوم البيانات', icon: Database, count: 34, color: '#7743DB', gradient: 'from-purple-600 to-blue-600' },
  ];

  const projects = [
    {
      id: 1,
      title: 'منصة ذكاء اصطناعي متقدمة للتحليلات الحكومية',
      company: 'المركز الوطني للذكاء الاصطناعي',
      category: 'dev',
      budget: '8.5M - 12.3M ر.س',
      deadline: '15 يوم',
      bids: 142,
      views: 8947,
      rating: 4.9,
      trending: true,
      featured: true,
      verified: true,
      urgent: true,
      tags: ['AI/ML', 'Python', 'Cloud', 'Analytics'],
      image: '🤖',
      percentage: 75,
      location: 'الرياض',
    },
    {
      id: 2,
      title: 'تصميم تجربة مستخدم متكاملة لتطبيق الخدمات الذكية',
      company: 'وزارة التحول الرقمي',
      category: 'design',
      budget: '2.8M - 4.5M ر.س',
      deadline: '22 يوم',
      bids: 98,
      views: 6234,
      rating: 4.8,
      trending: false,
      featured: true,
      verified: true,
      urgent: false,
      tags: ['UX/UI', 'Figma', 'Mobile', 'Research'],
      image: '🎨',
      percentage: 60,
      location: 'جدة',
    },
    {
      id: 3,
      title: 'استراتيجية تحول رقمي شاملة للقطاع الصحي',
      company: 'هيئة الصحة الرقمية',
      category: 'consult',
      budget: '6.2M - 9.8M ر.س',
      deadline: '30 يوم',
      bids: 76,
      views: 5621,
      rating: 5.0,
      trending: true,
      featured: false,
      verified: true,
      urgent: false,
      tags: ['Strategy', 'Healthcare', 'Digital', 'Planning'],
      image: '💼',
      percentage: 45,
      location: 'الدمام',
    },
    {
      id: 4,
      title: 'حملة تسويقية رقمية متعددة القنوات للسياحة',
      company: 'الهيئة السعودية للسياحة',
      category: 'market',
      budget: '4.1M - 6.7M ر.س',
      deadline: '18 يوم',
      bids: 203,
      views: 11234,
      rating: 4.7,
      trending: true,
      featured: true,
      verified: true,
      urgent: true,
      tags: ['Social Media', 'Content', 'SEO', 'Analytics'],
      image: '📱',
      percentage: 80,
      location: 'الرياض',
    },
    {
      id: 5,
      title: 'نظام تحليل البيانات الضخمة والتقارير الذكية',
      company: 'مركز المعلومات الوطني',
      category: 'data',
      budget: '7.3M - 11.2M ر.س',
      deadline: '25 يوم',
      bids: 84,
      views: 4892,
      rating: 4.8,
      trending: false,
      featured: true,
      verified: true,
      urgent: false,
      tags: ['Big Data', 'BI', 'Visualization', 'SQL'],
      image: '📊',
      percentage: 55,
      location: 'الرياض',
    },
    {
      id: 6,
      title: 'تطوير نظام إدارة المحتوى الحكومي المتقدم',
      company: 'وزارة الاتصالات',
      category: 'dev',
      budget: '3.9M - 5.8M ر.س',
      deadline: '28 يوم',
      bids: 127,
      views: 7456,
      rating: 4.9,
      trending: false,
      featured: false,
      verified: true,
      urgent: false,
      tags: ['CMS', 'React', 'Node.js', 'MongoDB'],
      image: '⚡',
      percentage: 50,
      location: 'جدة',
    },
  ];

  const stats = [
    { label: 'المشاريع النشطة', value: '247', change: '+18%', icon: Layers, color: '#7743DB' },
    { label: 'القيمة الإجمالية', value: '52.8M', change: '+24%', icon: DollarSign, color: '#10B981' },
    { label: 'معدل النجاح', value: '96.4%', change: '+3.2%', icon: TrendingUp, color: '#7743DB' },
    { label: 'الجهات المشاركة', value: '89', change: '+12', icon: Building2, color: '#C3ACD0' },
  ];

  const toggleLike = (id) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory)
    : projects;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      
      {/* Modern Vibrant Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ 
        background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                    <Sparkles className="w-8 h-8" style={{ color: '#7743DB' }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FFFFFF' }}></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">منصة المنافسات</h1>
                  <p className="text-sm font-semibold" style={{ color: '#C3ACD0' }}>بوابة الإبداع الحكومي</p>
                </div>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-1">
                {['الرئيسية', 'المشاريع', 'الفرص', 'المجتمع'].map((item, idx) => (
                  <button
                    key={item}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ 
                      color: idx === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: idx === 0 ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-3 rounded-xl transition-all hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#F59E0B' }}></span>
              </button>

              <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 rounded-xl cursor-pointer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold" style={{ backgroundColor: '#FFFFFF', color: '#7743DB' }}>
                  م
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">محمد العتيبي</div>
                  <div className="text-xs" style={{ color: '#C3ACD0' }}>مدير مشاريع</div>
                </div>
              </div>

              <button className="lg:hidden p-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Creative Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: '#7743DB' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: '#C3ACD0' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6" style={{ 
              background: 'linear-gradient(135deg, rgba(119, 67, 219, 0.15) 0%, rgba(195, 172, 208, 0.15) 100%)',
              border: '1px solid rgba(119, 67, 219, 0.2)'
            }}>
              <Crown className="w-4 h-4" style={{ color: '#7743DB' }} />
              <span className="text-sm font-bold" style={{ color: '#7743DB' }}>منصة معتمدة وموثوقة</span>
              <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: '#1F1F1F' }}>
              اكتشف فرص النمو<br />
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">والابتكار الحكومي</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              منصة رائدة تجمع أفضل المواهب والشركات لتنفيذ المشاريع الحكومية المتطورة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all" style={{ 
                background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)',
                color: '#FFFFFF'
              }}>
                <span>استكشف المشاريع</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all" style={{ 
                borderColor: '#7743DB',
                color: '#7743DB',
                backgroundColor: '#FFFFFF'
              }}>
                كيف تبدأ؟
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl shadow-lg border"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(195, 172, 208, 0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                    background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`
                  }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-bold px-3 py-1 rounded-lg" style={{ 
                    backgroundColor: '#10B981',
                    color: '#FFFFFF'
                  }}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: '#1F1F1F' }}>{stat.value}</div>
                <div className="text-sm font-semibold" style={{ color: '#6B7280' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Search */}
      <section className="py-10" style={{ backgroundColor: '#F7EFE5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <Search className="w-6 h-6" style={{ color: '#7743DB' }} />
              </div>
              <input
                type="text"
                placeholder="ابحث عن المشاريع، التخصصات، أو الجهات الحكومية..."
                className="w-full h-16 pr-20 pl-6 rounded-2xl text-base font-semibold outline-none transition-all shadow-lg"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#1F1F1F',
                  border: '2px solid transparent'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #7743DB';
                  e.target.style.boxShadow = '0 0 0 4px rgba(119, 67, 219, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid transparent';
                  e.target.style.boxShadow = '0 2px 8px rgba(119, 67, 219, 0.08)';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-4 rounded-2xl font-bold border-2 flex items-center gap-3 transition-all hover:scale-105" style={{ 
                borderColor: '#C3ACD0',
                color: '#7743DB',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(119, 67, 219, 0.08)'
              }}>
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">فلترة</span>
              </button>

              <button className="px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg" style={{ 
                background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)',
                color: '#FFFFFF'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Pills */}
      <section className="py-8" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-3.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-2.5 border-2 transition-all hover:scale-105"
              style={{
                backgroundColor: !selectedCategory ? '#7743DB' : '#FFFFFF',
                borderColor: !selectedCategory ? '#7743DB' : 'rgba(195, 172, 208, 0.3)',
                color: !selectedCategory ? '#FFFFFF' : '#1F1F1F'
              }}
            >
              <Grid3x3 className="w-5 h-5" />
              <span>جميع المشاريع</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{
                backgroundColor: !selectedCategory ? 'rgba(255, 255, 255, 0.25)' : '#F7EFE5',
                color: !selectedCategory ? '#FFFFFF' : '#7743DB'
              }}>
                {projects.length}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-3.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-2.5 border-2 transition-all hover:scale-105"
                style={{
                  backgroundColor: selectedCategory === cat.id ? '#7743DB' : '#FFFFFF',
                  borderColor: selectedCategory === cat.id ? '#7743DB' : 'rgba(195, 172, 208, 0.3)',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#1F1F1F'
                }}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.name}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{
                  backgroundColor: selectedCategory === cat.id ? 'rgba(255, 255, 255, 0.25)' : '#F7EFE5',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#7743DB'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2" style={{ color: '#1F1F1F' }}>المشاريع المميزة</h2>
              <p className="text-lg font-semibold" style={{ color: '#6B7280' }}>{filteredProjects.length} مشروع متاح للمنافسة</p>
            </div>

            <div className="flex items-center gap-3">
              <select className="px-5 py-3 rounded-xl border-2 font-semibold outline-none" style={{ 
                borderColor: 'rgba(195, 172, 208, 0.3)',
                color: '#1F1F1F',
                backgroundColor: '#FFFFFF'
              }}>
                <option>الأحدث</option>
                <option>الأكثر رواجاً</option>
                <option>الأعلى ميزانية</option>
                <option>ينتهي قريباً</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.featured ? '#7743DB' : 'rgba(195, 172, 208, 0.2)'
                }}
              >
                {/* Project Header */}
                <div className="relative p-8" style={{ background: 'linear-gradient(135deg, #F7EFE5 0%, #FFFBF5 100%)' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                        {project.image}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg" style={{ color: '#1F1F1F' }}>{project.company}</span>
                          {project.verified && (
                            <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" style={{ color: '#6B7280' }} />
                          <span style={{ color: '#6B7280' }}>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {project.trending && (
                        <div className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5" style={{ 
                          background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                          color: '#FFFFFF'
                        }}>
                          <Flame className="w-3.5 h-3.5" />
                          رائج
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

                  <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: '#1F1F1F' }}>
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ 
                        backgroundColor: 'rgba(119, 67, 219, 0.1)',
                        color: '#7743DB',
                        border: '1px solid rgba(119, 67, 219, 0.2)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span style={{ color: '#6B7280' }}>نسبة الاكتمال</span>
                      <span style={{ color: '#7743DB' }}>{project.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(195, 172, 208, 0.2)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #7743DB 0%, #9D6FE8 100%)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="px-8 py-6" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <DollarSign className="w-4 h-4" style={{ color: '#7743DB' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>الميزانية</span>
                      </div>
                      <div className="font-bold text-sm" style={{ color: '#1F1F1F' }}>{project.budget}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-4 h-4" style={{ color: '#7743DB' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>العروض</span>
                      </div>
                      <div className="font-bold text-sm" style={{ color: '#1F1F1F' }}>{project.bids}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Eye className="w-4 h-4" style={{ color: '#7743DB' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>المشاهدات</span>
                      </div>
                      <div className="font-bold text-sm" style={{ color: '#1F1F1F' }}>{project.views}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="w-4 h-4" style={{ color: '#EF4444' }} />
                        <span className="text-xs font-semibold" style={{ color: '#6B7280' }}>المدة</span>
                      </div>
                      <div className="font-bold text-sm" style={{ color: '#1F1F1F' }}>{project.deadline}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg" style={{ 
                      background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)',
                      color: '#FFFFFF'
                    }}>
                      تقديم عرض
                    </button>
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all hover:scale-105"
                      style={{
                        borderColor: likedProjects.has(project.id) ? '#7743DB' : 'rgba(195, 172, 208, 0.3)',
                        backgroundColor: likedProjects.has(project.id) ? 'rgba(119, 67, 219, 0.1)' : '#FFFFFF'
                      }}
                    >
                      <Heart
                        className="w-6 h-6"
                        style={{ color: likedProjects.has(project.id) ? '#7743DB' : '#6B7280' }}
                        fill={likedProjects.has(project.id) ? '#7743DB' : 'none'}
                      />
                    </button>
                    <button className="w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all hover:scale-105" style={{ 
                      borderColor: 'rgba(195, 172, 208, 0.3)',
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
            <button className="px-12 py-5 rounded-2xl font-bold border-2 inline-flex items-center gap-3 transition-all hover:scale-105" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#7743DB',
              borderColor: '#7743DB'
            }}>
              عرض المزيد من المشاريع
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Creative CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)' }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#FFFFFF' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#C3ACD0' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl" style={{ backgroundColor: '#FFFFFF' }}>
            <Zap className="w-12 h-12" style={{ color: '#7743DB' }} />
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white">هل أنت مستعد للنجاح؟</h2>
          <p className="text-2xl mb-10 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            انضم إلى آلاف المحترفين والشركات الناجحة على منصتنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-12 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105 shadow-2xl" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#7743DB'
            }}>
              ابدأ الآن مجاناً
            </button>
            <button className="px-12 py-5 rounded-2xl font-bold text-xl border-2 transition-all hover:scale-105" style={{ 
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              تحدث معنا
            </button>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="pt-20 pb-10" style={{ backgroundColor: '#F7EFE5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ 
                  background: 'linear-gradient(135deg, #7743DB 0%, #9D6FE8 100%)'
                }}>
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#1F1F1F' }}>منصة المنافسات</h3>
              </div>
              <p className="leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                بوابتك للابتكار والنجاح في عالم المشاريع الحكومية المتطورة
              </p>
            </div>

            {[
              { title: 'روابط سريعة', links: ['المشاريع', 'الفرص', 'المجتمع', 'الأسئلة'] },
              { title: 'الدعم', links: ['المساعدة', 'تواصل معنا', 'الشروط', 'الخصوصية'] },
              { title: 'الشركة', links: ['من نحن', 'المدونة', 'الوظائف', 'الشركاء'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold mb-6" style={{ color: '#1F1F1F' }}>{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-all hover:translate-x-1 inline-block" style={{ color: '#6B7280' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(195, 172, 208, 0.3)' }}>
            <p style={{ color: '#6B7280' }}>© 2025 منصة المنافسات. جميع الحقوق محفوظة</p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ 
                  backgroundColor: 'rgba(119, 67, 219, 0.1)',
                  color: '#7743DB'
                }}>
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreativeVibrantPlatform;