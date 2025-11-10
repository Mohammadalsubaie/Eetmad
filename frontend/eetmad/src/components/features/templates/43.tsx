import React, { useState } from 'react';
import { Search, TrendingUp, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle, Shield, Target, Briefcase, Code, Palette, Users, Package, BarChart3, Building2, Bookmark, Share2, MapPin, ChevronDown, Clock, ThumbsUp, Send, Menu, Mail, Globe, Linkedin, Twitter, Facebook, Crown, Zap, FileText, Settings, ArrowRight, Plus, X, AlertCircle, ChevronRight, Activity, TrendingDown, Layers, Grid, Heart, Download, Upload, Edit, Trash2, MoreVertical, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function VibrantNaturalPlatform() {
  const [activeTab, setActiveTab] = useState('all');
  const [likedProjects, setLikedProjects] = useState(new Set([1, 3]));
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'الكل', count: 328, icon: Grid, color: '#3F7D58' },
    { id: 'tech', name: 'تقنية', count: 124, icon: Code, color: '#3F7D58' },
    { id: 'design', name: 'تصميم', count: 89, icon: Palette, color: '#EF9651' },
    { id: 'business', name: 'أعمال', count: 67, icon: Briefcase, color: '#3F7D58' },
    { id: 'marketing', name: 'تسويق', count: 48, icon: Target, color: '#EF9651' },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة تعليمية تفاعلية متقدمة',
      company: 'وزارة التعليم',
      category: 'tech',
      budget: '750,000 - 1,200,000',
      deadline: '30 يوم',
      bids: 45,
      views: 2834,
      rating: 4.9,
      verified: true,
      featured: true,
      tags: ['React', 'Node.js', 'MongoDB'],
      description: 'منصة تعليمية حديثة تدعم التعلم الذكي والتفاعل المباشر',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية شاملة لمبادرة وطنية',
      company: 'الهيئة العامة للترفيه',
      category: 'design',
      budget: '450,000 - 680,000',
      deadline: '45 يوم',
      bids: 67,
      views: 3245,
      rating: 4.8,
      verified: true,
      featured: true,
      tags: ['Brand Design', 'UI/UX', 'Motion'],
      description: 'تصميم هوية بصرية متكاملة تعكس الرؤية الطموحة',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'استشارات تحول رقمي شامل للمؤسسات',
      company: 'هيئة الحكومة الرقمية',
      category: 'business',
      budget: '1,200,000 - 2,000,000',
      deadline: '60 يوم',
      bids: 34,
      views: 1987,
      rating: 5.0,
      verified: true,
      featured: false,
      tags: ['Strategy', 'Digital', 'Consulting'],
      description: 'خطة استراتيجية متكاملة للتحول الرقمي الشامل',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      urgency: 'low'
    },
    {
      id: 4,
      title: 'حملة تسويقية رقمية متكاملة',
      company: 'الهيئة العامة للسياحة',
      category: 'marketing',
      budget: '320,000 - 550,000',
      deadline: '25 يوم',
      bids: 89,
      views: 4123,
      rating: 4.7,
      verified: true,
      featured: true,
      tags: ['Social Media', 'SEO', 'Content'],
      description: 'حملة تسويقية شاملة لتعزيز السياحة الداخلية',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      urgency: 'high'
    },
  ];

  const stats = [
    { label: 'المشاريع النشطة', value: '328', change: '+15%', icon: Layers, trend: 'up' },
    { label: 'إجمالي العروض', value: '1,247', change: '+28%', icon: Send, trend: 'up' },
    { label: 'معدل النجاح', value: '94.8%', change: '+2.3%', icon: TrendingUp, trend: 'up' },
    { label: 'الشركات النشطة', value: '856', change: '+12%', icon: Building2, trend: 'up' },
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

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EFEFEF' }}>
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50" style={{ 
        background: 'linear-gradient(135deg, #3F7D58 0%, #2F5E42 100%)',
        boxShadow: '0 2px 12px rgba(63, 125, 88, 0.15)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)',
                  boxShadow: '0 4px 12px rgba(239, 150, 81, 0.3)'
                }}>
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">منصة الفرص</h1>
                  <p className="text-xs font-bold" style={{ color: '#A8D5BA' }}>حيث تلتقي المواهب بالفرص</p>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {['الرئيسية', 'المشاريع', 'الشركات', 'المواهب'].map((item, idx) => (
                  <button
                    key={item}
                    className="px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                    style={{ 
                      color: idx === 0 ? '#FFFFFF' : '#A8D5BA',
                      backgroundColor: idx === 0 ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all" style={{ 
                backgroundColor: '#EF9651',
                color: '#FFFFFF'
              }}>
                <Plus className="w-5 h-5" />
                <span>نشر مشروع</span>
              </button>

              <button className="relative p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EF9651' }}></span>
              </button>

              <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-lg" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm" style={{ 
                  background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)',
                  color: '#FFFFFF'
                }}>
                  أ
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">أحمد السعيد</div>
                  <div className="text-xs font-semibold" style={{ color: '#A8D5BA' }}>مطور واجهات</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white opacity-70" />
              </div>

              <button className="lg:hidden p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #3F7D58 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #EF9651 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ 
              backgroundColor: '#E8F4ED',
              border: '2px solid #3F7D58'
            }}>
              <CheckCircle className="w-4 h-4" style={{ color: '#3F7D58' }} />
              <span className="text-sm font-bold" style={{ color: '#2F5E42' }}>منصة موثوقة ومعتمدة حكومياً</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span style={{ color: '#1A1A1A' }}>اكتشف فرصك</span><br />
              <span className="relative inline-block">
                <span style={{ color: '#3F7D58' }}>المستقبلية</span>
                <svg className="absolute -bottom-3 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C70 2 130 2 198 10" stroke="#EF9651" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-semibold" style={{ color: '#4D4D4D' }}>
              منصة احترافية تربط المواهب بأفضل الفرص في السوق السعودي
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-10 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all" style={{ 
                background: 'linear-gradient(135deg, #3F7D58 0%, #2F5E42 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(63, 125, 88, 0.25)'
              }}>
                <span>استكشف المشاريع</span>
                <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 rounded-xl font-bold text-lg transition-all" style={{ 
                backgroundColor: '#FFFFFF',
                color: '#3F7D58',
                border: '2px solid #3F7D58'
              }}>
                كيف تبدأ؟
              </button>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl relative overflow-hidden group"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #E5E5E5',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ 
                  background: 'radial-gradient(circle, #3F7D58 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)'
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ 
                    backgroundColor: '#E8F4ED'
                  }}>
                    <stat.icon className="w-6 h-6" style={{ color: '#3F7D58' }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold" style={{ 
                    backgroundColor: '#E8F4ED',
                    color: '#2F5E42'
                  }}>
                    <TrendingUp className="w-3.5 h-3.5" />
                    {stat.change}
                  </div>
                </div>

                <div className="text-4xl font-extrabold mb-2" style={{ color: '#3F7D58' }}>{stat.value}</div>
                <div className="text-base font-bold" style={{ color: '#737373' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-10" style={{ backgroundColor: '#FFFFFF', borderTop: '2px solid #E5E5E5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            
            <div className="flex-1 relative">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6" style={{ color: '#737373' }} />
              <input
                type="text"
                placeholder="ابحث عن مشاريع، مهارات، أو شركات..."
                className="w-full h-16 pr-16 pl-6 rounded-xl text-lg font-semibold outline-none transition-all"
                style={{ 
                  backgroundColor: '#EFEFEF',
                  color: '#1A1A1A',
                  border: '2px solid transparent'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3F7D58';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.backgroundColor = '#EFEFEF';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button className="h-16 px-8 rounded-xl font-bold flex items-center gap-2.5 transition-all" style={{ 
                backgroundColor: '#EFEFEF',
                color: '#1A1A1A',
                border: '2px solid #D0D0D0'
              }}>
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">فلترة</span>
              </button>

              <button className="h-16 px-12 rounded-xl font-bold transition-all" style={{ 
                background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(239, 150, 81, 0.25)'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-3.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-3 transition-all flex-shrink-0"
                style={{
                  backgroundColor: selectedCategory === cat.id ? '#3F7D58' : '#FFFFFF',
                  border: `2px solid ${selectedCategory === cat.id ? '#3F7D58' : '#E5E5E5'}`,
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#1A1A1A',
                  boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(63, 125, 88, 0.2)' : 'none'
                }}
              >
                <cat.icon className="w-5 h-5" />
                <span>{cat.name}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold" style={{
                  backgroundColor: selectedCategory === cat.id ? 'rgba(255, 255, 255, 0.25)' : '#E8F4ED',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#2F5E42'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16" style={{ backgroundColor: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-extrabold mb-3" style={{ color: '#1A1A1A' }}>
                المشاريع <span style={{ color: '#3F7D58' }}>المميزة</span>
              </h2>
              <p className="text-lg font-bold" style={{ color: '#737373' }}>
                {filteredProjects.length} مشروع متاح الآن
              </p>
            </div>

            <select className="h-14 px-6 rounded-xl font-bold outline-none cursor-pointer" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              border: '2px solid #D0D0D0'
            }}>
              <option>الأحدث أولاً</option>
              <option>الأعلى ميزانية</option>
              <option>الأكثر طلباً</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="rounded-2xl overflow-hidden group relative"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: project.featured ? '3px solid #3F7D58' : '2px solid #E5E5E5',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ 
                    background: 'linear-gradient(180deg, transparent 0%, rgba(47, 94, 66, 0.7) 100%)'
                  }}></div>

                  {project.featured && (
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-lg font-extrabold text-sm flex items-center gap-2" style={{ 
                      background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(239, 150, 81, 0.35)'
                    }}>
                      <Crown className="w-4 h-4" />
                      مميز
                    </div>
                  )}

                  {project.urgency === 'high' && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5" style={{ 
                      backgroundColor: '#EC5228',
                      color: '#FFFFFF'
                    }}>
                      <Zap className="w-3.5 h-3.5" />
                      عاجل
                    </div>
                  )}

                  <button
                    onClick={() => toggleLike(project.id)}
                    className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: likedProjects.has(project.id) ? '#3F7D58' : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <Heart
                      className="w-5 h-5"
                      style={{ color: likedProjects.has(project.id) ? '#FFFFFF' : '#737373' }}
                      fill={likedProjects.has(project.id) ? '#FFFFFF' : 'none'}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-7">
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ 
                      background: 'linear-gradient(135deg, #3F7D58 0%, #2F5E42 100%)'
                    }}>
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-base" style={{ color: '#1A1A1A' }}>{project.company}</span>
                        {project.verified && (
                          <CheckCircle className="w-5 h-5" style={{ color: '#3F7D58' }} />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={{ color: i < Math.floor(project.rating) ? '#EF9651' : '#D0D0D0' }}
                              fill={i < Math.floor(project.rating) ? '#EF9651' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold" style={{ color: '#737373' }}>{project.rating}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold mb-3 leading-tight group-hover:text-[#3F7D58] transition-colors" style={{ color: '#1A1A1A' }}>
                    {project.title}
                  </h3>

                  <p className="text-base mb-5 leading-relaxed font-medium" style={{ color: '#4D4D4D' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-bold" style={{ 
                        backgroundColor: '#E8F4ED',
                        color: '#2F5E42'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl" style={{ backgroundColor: '#EFEFEF' }}>
                    {[
                      { icon: DollarSign, label: 'الميزانية', value: project.budget.split(' - ')[0] },
                      { icon: Users, label: 'العروض', value: project.bids },
                      { icon: Clock, label: 'المدة', value: project.deadline },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <item.icon className="w-4 h-4" style={{ color: '#737373' }} />
                          <span className="text-xs font-bold" style={{ color: '#737373' }}>{item.label}</span>
                        </div>
                        <div className="font-extrabold text-sm" style={{ color: '#3F7D58' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 h-14 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all" style={{ 
                      background: 'linear-gradient(135deg, #3F7D58 0%, #2F5E42 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(63, 125, 88, 0.2)'
                    }}>
                      <span>تقديم عرض</span>
                      <Send className="w-5 h-5" />
                    </button>
                    <button className="w-14 h-14 rounded-xl flex items-center justify-center transition-all" style={{ 
                      backgroundColor: '#EFEFEF',
                      border: '2px solid #D0D0D0'
                    }}>
                      <Share2 className="w-5 h-5" style={{ color: '#737373' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-12 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 transition-all" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#3F7D58',
              border: '3px solid #3F7D58'
            }}>
              عرض المزيد
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #3F7D58 0%, #2F5E42 100%)'
      }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #EF9651 0%, transparent 70%)',
          transform: 'translate(40%, -40%)'
        }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #A8D5BA 0%, transparent 70%)',
          transform: 'translate(-40%, 40%)'
        }}></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ 
            background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)',
            boxShadow: '0 8px 24px rgba(239, 150, 81, 0.35)'
          }}>
            <Zap className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-6xl font-extrabold mb-6 text-white">
            ابدأ رحلتك الآن
          </h2>
          <p className="text-2xl mb-12 leading-relaxed font-semibold" style={{ color: '#A8D5BA' }}>
            انضم لآلاف المحترفين الناجحين على منصتنا
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-12 py-6 rounded-xl font-bold text-xl transition-all" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#3F7D58',
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.25)'
            }}>
              سجل مجاناً
            </button>
            <button className="px-12 py-6 rounded-xl font-bold text-xl transition-all" style={{ 
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '3px solid rgba(255, 255, 255, 0.4)'
            }}>
              تعرف أكثر
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10" style={{ 
        background: 'linear-gradient(135deg, #2F5E42 0%, #1F3F2C 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #EF9651 0%, #D67A37 100%)'
                }}>
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">منصة الفرص</h3>
              </div>
              <p className="leading-relaxed mb-6 text-base font-medium" style={{ color: '#A8D5BA' }}>
                نربط المواهب بالفرص في بيئة احترافية آمنة
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Facebook, Globe].map((Icon, idx) => (
                  <button key={idx} className="w-11 h-11 rounded-xl flex items-center justify-center transition-all" style={{ 
                    backgroundColor: 'rgba(168, 213, 186, 0.15)'
                  }}>
                    <Icon className="w-5 h-5" style={{ color: '#A8D5BA' }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الخدمات', links: ['المشاريع', 'الشركات', 'المواهب', 'الاستشارات'] },
              { title: 'الموارد', links: ['المدونة', 'المساعدة', 'الأسئلة', 'الدليل'] },
              { title: 'الشركة', links: ['من نحن', 'تواصل معنا', 'الوظائف', 'الشركاء'] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-xl font-extrabold mb-6 text-white">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-base font-medium transition-all" style={{ color: '#A8D5BA' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ 
            borderColor: 'rgba(168, 213, 186, 0.2)'
          }}>
            <p className="text-base font-semibold" style={{ color: '#68A67E' }}>
              © 2025 منصة الفرص. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-8">
              {['الشروط', 'الخصوصية', 'ملفات تعريف الارتباط'].map((item) => (
                <a key={item} href="#" className="text-sm font-bold transition-all" style={{ color: '#68A67E' }}>
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

export default VibrantNaturalPlatform;