import React, { useState } from 'react';
import { Search, TrendingUp, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle, Shield, Target, Briefcase, Code, Palette, Users, Package, BarChart3, Building2, Bookmark, Share2, MapPin, ChevronDown, Clock, ThumbsUp, Send, Menu, Mail, Globe, Linkedin, Twitter, Facebook, Crown, Zap, FileText, Settings, ArrowRight, Plus, X, AlertCircle, ChevronRight, Activity, TrendingDown, Layers, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function EliteCorporatePlatform() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedItems, setSavedItems] = useState(new Set([1, 3]));
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'جميع المشاريع', count: 248, icon: Grid },
    { id: 'tech', name: 'التقنية', count: 89, icon: Code },
    { id: 'design', name: 'التصميم', count: 67, icon: Palette },
    { id: 'business', name: 'الأعمال', count: 54, icon: Briefcase },
    { id: 'data', name: 'تحليل البيانات', count: 38, icon: BarChart3 },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة حكومية إلكترونية متكاملة',
      organization: 'وزارة الاتصالات وتقنية المعلومات',
      category: 'tech',
      budget: '12,500,000 - 18,200,000',
      deadline: 45,
      proposals: 156,
      views: 18234,
      rating: 4.9,
      verified: true,
      featured: true,
      tags: ['Cloud Computing', 'API Development', 'Cybersecurity'],
      description: 'مشروع استراتيجي لبناء منصة رقمية شاملة تقدم الخدمات الحكومية بكفاءة عالية',
      progress: 35,
      location: 'الرياض',
      status: 'active'
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية متكاملة لمبادرة وطنية',
      organization: 'الهيئة العامة للاستثمار',
      category: 'design',
      budget: '5,800,000 - 8,400,000',
      deadline: 30,
      proposals: 203,
      views: 24567,
      rating: 4.8,
      verified: true,
      featured: true,
      tags: ['Brand Identity', 'Visual Design', 'Creative Strategy'],
      description: 'تصميم هوية بصرية شاملة تعكس الرؤية الوطنية والطموح المستقبلي',
      progress: 60,
      location: 'جدة',
      status: 'urgent'
    },
    {
      id: 3,
      title: 'استشارات تحول رقمي مؤسسي شامل',
      organization: 'مجموعة الاستثمارات الوطنية',
      category: 'business',
      budget: '15,200,000 - 22,800,000',
      deadline: 60,
      proposals: 98,
      views: 15678,
      rating: 5.0,
      verified: true,
      featured: false,
      tags: ['Digital Transformation', 'Strategy', 'Change Management'],
      description: 'خطة استراتيجية متكاملة للتحول الرقمي وتطوير العمليات المؤسسية',
      progress: 25,
      location: 'الدمام',
      status: 'active'
    },
    {
      id: 4,
      title: 'نظام تحليل البيانات الضخمة وذكاء الأعمال',
      organization: 'مركز المعلومات الوطني',
      category: 'data',
      budget: '9,700,000 - 14,300,000',
      deadline: 50,
      proposals: 134,
      views: 19845,
      rating: 4.7,
      verified: true,
      featured: true,
      tags: ['Big Data', 'AI & ML', 'Business Intelligence'],
      description: 'بناء نظام متطور لتحليل البيانات واستخلاص الرؤى الاستراتيجية',
      progress: 70,
      location: 'الرياض',
      status: 'active'
    },
  ];

  const stats = [
    { label: 'المشاريع النشطة', value: '248', change: '+32', icon: Layers, color: '#0C2B4E' },
    { label: 'إجمالي الميزانيات', value: '3.2B', change: '+24%', icon: DollarSign, color: '#1A3D64' },
    { label: 'معدل الإنجاز', value: '96.8%', change: '+3.2%', icon: TrendingUp, color: '#1D546C' },
    { label: 'الشركات المعتمدة', value: '1,847', change: '+156', icon: Shield, color: '#0C2B4E' },
  ];

  const toggleSave = (id) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredProjects = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      
      {/* Corporate Navigation */}
      <nav className="sticky top-0 z-50 border-b" style={{ 
        background: 'linear-gradient(135deg, #0C2B4E 0%, #1A3D64 100%)',
        borderColor: 'rgba(255, 255, 255, 0.08)'
      }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  <Shield className="w-7 h-7" style={{ color: '#0C2B4E' }} />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-white tracking-tight">المنصة المؤسسية</h1>
                  <p className="text-xs font-bold" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>الثقة • الاحترافية • التميز</p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2">
                {['الرئيسية', 'المشاريع', 'الشركات', 'التقارير'].map((item, idx) => (
                  <button
                    key={item}
                    className="px-6 py-2.5 rounded-md text-sm font-bold transition-all"
                    style={{ 
                      color: idx === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2.5 rounded-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: '#D68000' }}></span>
              </button>

              <div className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-md border" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}>
                <div className="w-9 h-9 rounded-md flex items-center justify-center text-sm font-extrabold" style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#0C2B4E'
                }}>
                  م
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">محمد العتيبي</div>
                  <div className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>مدير المشتريات</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white opacity-80" />
              </div>

              <button className="lg:hidden p-2.5 rounded-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)' }}>
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md mb-6 border-2" style={{ 
              backgroundColor: 'rgba(12, 43, 78, 0.05)',
              borderColor: 'rgba(12, 43, 78, 0.15)'
            }}>
              <Shield className="w-4 h-4" style={{ color: '#0C2B4E' }} />
              <span className="text-sm font-bold" style={{ color: '#0C2B4E' }}>منصة حكومية معتمدة وموثوقة</span>
              <CheckCircle className="w-4 h-4" style={{ color: '#0A8754' }} />
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold mb-5 leading-tight" style={{ color: '#0C2B4E' }}>
              البوابة المؤسسية للمشاريع<br />
              <span style={{ color: '#1A3D64' }}>الحكومية والخاصة</span>
            </h1>

            <p className="text-xl mb-10 max-w-3xl mx-auto font-semibold leading-relaxed" style={{ color: '#334155' }}>
              منصة احترافية تربط الجهات الحكومية بأفضل الشركات والخبرات المعتمدة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-md font-bold text-base flex items-center justify-center gap-2 transition-all" style={{ 
                background: 'linear-gradient(135deg, #0C2B4E 0%, #1A3D64 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(12, 43, 78, 0.25)'
              }}>
                <span>استعراض المشاريع</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 rounded-md font-bold text-base border-2 transition-all" style={{ 
                borderColor: '#0C2B4E',
                color: '#0C2B4E',
                backgroundColor: '#FFFFFF'
              }}>
                دليل الاستخدام
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-lg border-2"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(12, 43, 78, 0.1)',
                  boxShadow: '0 1px 3px rgba(10, 25, 41, 0.06)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ 
                    backgroundColor: 'rgba(12, 43, 78, 0.08)'
                  }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold" style={{ 
                    backgroundColor: '#0A8754',
                    color: '#FFFFFF'
                  }}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-4xl font-extrabold mb-2" style={{ color: '#0C2B4E' }}>{stat.value}</div>
                <div className="text-sm font-bold" style={{ color: '#64748B' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(12, 43, 78, 0.08)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#64748B' }} />
              <input
                type="text"
                placeholder="البحث عن مشاريع، تخصصات، أو جهات..."
                className="w-full h-14 pr-14 pl-6 rounded-md text-base font-semibold outline-none transition-all border-2"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: '#0A1929',
                  borderColor: '#CBD5E1'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0C2B4E';
                  e.target.style.boxShadow = '0 0 0 4px rgba(12, 43, 78, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#CBD5E1';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="h-14 px-6 rounded-md font-bold border-2 flex items-center gap-2.5 transition-all" 
                style={{ 
                  borderColor: '#CBD5E1',
                  color: '#0C2B4E',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">فلترة</span>
              </button>

              <button className="h-14 px-10 rounded-md font-bold transition-all" style={{ 
                background: 'linear-gradient(135deg, #0C2B4E 0%, #1A3D64 100%)',
                color: '#FFFFFF'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-3 rounded-md font-bold whitespace-nowrap flex items-center gap-2.5 border-2 transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#0C2B4E' : '#FFFFFF',
                  borderColor: activeCategory === cat.id ? '#0C2B4E' : '#CBD5E1',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#0C2B4E'
                }}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.name}</span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold" style={{
                  backgroundColor: activeCategory === cat.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(12, 43, 78, 0.08)',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#0C2B4E'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-extrabold mb-2" style={{ color: '#0C2B4E' }}>المشاريع المتاحة</h2>
              <p className="text-lg font-bold" style={{ color: '#64748B' }}>{filteredProjects.length} مشروع نشط</p>
            </div>

            <select className="h-12 px-5 rounded-md border-2 font-bold outline-none" style={{ 
              borderColor: '#CBD5E1',
              color: '#0C2B4E',
              backgroundColor: '#FFFFFF'
            }}>
              <option>الأحدث</option>
              <option>الأعلى ميزانية</option>
              <option>الأكثر عروضاً</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: project.featured ? '#0C2B4E' : 'rgba(12, 43, 78, 0.1)',
                  boxShadow: '0 1px 3px rgba(10, 25, 41, 0.06)'
                }}
              >
                {/* Header */}
                <div className="p-6 border-b" style={{ 
                  borderColor: 'rgba(12, 43, 78, 0.08)',
                  backgroundColor: project.featured ? 'rgba(12, 43, 78, 0.03)' : '#FFFFFF'
                }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-md flex items-center justify-center" style={{ 
                        backgroundColor: '#0C2B4E'
                      }}>
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-base" style={{ color: '#0C2B4E' }}>{project.organization}</span>
                          {project.verified && (
                            <CheckCircle className="w-5 h-5" style={{ color: '#0A8754' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                          <MapPin className="w-4 h-4" />
                          <span className="font-semibold">{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {project.featured && (
                      <div className="px-3 py-1.5 rounded-md text-xs font-extrabold flex items-center gap-1.5" style={{ 
                        backgroundColor: '#0C2B4E',
                        color: '#FFFFFF'
                      }}>
                        <Crown className="w-3.5 h-3.5" />
                        مميز
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold mb-3 leading-tight" style={{ color: '#0C2B4E' }}>
                    {project.title}
                  </h3>

                  <p className="text-base mb-4 leading-relaxed font-medium" style={{ color: '#334155' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-md text-xs font-bold border" style={{ 
                        backgroundColor: 'rgba(12, 43, 78, 0.05)',
                        borderColor: 'rgba(12, 43, 78, 0.15)',
                        color: '#0C2B4E'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(12, 43, 78, 0.08)' }}>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { icon: DollarSign, label: 'الميزانية', value: project.budget.split(' - ')[0] },
                      { icon: Users, label: 'العروض', value: project.proposals },
                      { icon: Eye, label: 'المشاهدات', value: project.views },
                      { icon: Clock, label: 'المدة', value: `${project.deadline} يوم` },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <item.icon className="w-4 h-4" style={{ color: '#64748B' }} />
                          <span className="text-xs font-bold" style={{ color: '#64748B' }}>{item.label}</span>
                        </div>
                        <div className="font-extrabold text-sm" style={{ color: '#0C2B4E' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-5">
                  <div className="flex gap-3">
                    <button className="flex-1 h-12 rounded-md font-bold transition-all flex items-center justify-center gap-2" style={{ 
                      background: 'linear-gradient(135deg, #0C2B4E 0%, #1A3D64 100%)',
                      color: '#FFFFFF'
                    }}>
                      <span>تقديم عرض</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="w-12 h-12 rounded-md flex items-center justify-center border-2 transition-all"
                      style={{
                        borderColor: savedItems.has(project.id) ? '#0C2B4E' : '#CBD5E1',
                        backgroundColor: savedItems.has(project.id) ? 'rgba(12, 43, 78, 0.08)' : '#FFFFFF'
                      }}
                    >
                      <Bookmark
                        className="w-5 h-5"
                        style={{ color: savedItems.has(project.id) ? '#0C2B4E' : '#64748B' }}
                        fill={savedItems.has(project.id) ? '#0C2B4E' : 'none'}
                      />
                    </button>
                    <button className="w-12 h-12 rounded-md flex items-center justify-center border-2 transition-all" style={{ 
                      borderColor: '#CBD5E1',
                      backgroundColor: '#FFFFFF'
                    }}>
                      <Share2 className="w-5 h-5" style={{ color: '#64748B' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="px-12 py-4 rounded-md font-bold border-2 inline-flex items-center gap-2.5 transition-all" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#0C2B4E',
              borderColor: '#0C2B4E'
            }}>
              عرض المزيد من المشاريع
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0C2B4E 0%, #1A3D64 100%)' }}>
        <div className="max-w-5xl mx-auto px-8 text-center">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-8" style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
          }}>
            <Shield className="w-10 h-10" style={{ color: '#0C2B4E' }} />
          </div>
          <h2 className="text-5xl font-extrabold mb-5 text-white">انضم للمنصة المؤسسية</h2>
          <p className="text-2xl mb-10 leading-relaxed font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            ابدأ رحلتك مع آلاف الفرص المتاحة
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-12 py-5 rounded-md font-bold text-lg transition-all" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#0C2B4E',
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)'
            }}>
              التسجيل الآن
            </button>
            <button className="px-12 py-5 rounded-md font-bold text-lg border-2 transition-all" style={{ 
              borderColor: 'rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              معرفة المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: '#0A1929' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ 
                  backgroundColor: '#0C2B4E'
                }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white">المنصة المؤسسية</h3>
              </div>
              <p className="leading-relaxed mb-5 text-base font-medium" style={{ color: '#CBD5E1' }}>
                منصة احترافية موثوقة تربط الفرص بالخبرات
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Facebook].map((Icon, idx) => (
                  <button key={idx} className="w-10 h-10 rounded-md flex items-center justify-center transition-all" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#CBD5E1'
                  }}>
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الخدمات', links: ['المشاريع', 'الشركات', 'الاستشارات', 'التقارير'] },
              { title: 'الموارد', links: ['المدونة', 'الدعم', 'الأسئلة', 'التوثيق'] },
              { title: 'الشركة', links: ['من نحن', 'اتصل بنا', 'الشروط', 'الخصوصية'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-extrabold mb-5 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-base font-medium transition-all" style={{ color: '#CBD5E1' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#1E293B' }}>
            <p className="text-base font-semibold" style={{ color: '#94A3B8' }}>© 2025 المنصة المؤسسية. جميع الحقوق محفوظة</p>
            <div className="flex gap-6">
              {['الشروط', 'الخصوصية', 'الأمان'].map((item) => (
                <a key={item} href="#" className="text-sm font-bold transition-all" style={{ color: '#94A3B8' }}>
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

export default EliteCorporatePlatform;