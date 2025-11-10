import React, { useState } from 'react';
import { Search, Bell, User, Filter, Star, Award, Calendar, Eye, MessageCircle, DollarSign, CheckCircle, Shield, Target, Briefcase, Code, Palette, Users, Package, BarChart3, Building2, Bookmark, Share2, MapPin, ChevronDown, Clock, ThumbsUp, Send, Menu, Mail, Globe, Linkedin, Twitter, Facebook, Heart, Download, Upload, Edit, Trash2, MoreVertical, TrendingUp, Layers, Grid, FileText, Settings, ArrowRight, Plus, X, AlertCircle, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ElegantCalmPlatform() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [savedProjects, setSavedProjects] = useState(new Set([2, 4]));
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع الفئات', count: 486, icon: Grid },
    { id: 'design', name: 'التصميم', count: 142, icon: Palette },
    { id: 'dev', name: 'التطوير', count: 198, icon: Code },
    { id: 'business', name: 'الأعمال', count: 89, icon: Briefcase },
    { id: 'marketing', name: 'التسويق', count: 57, icon: Target },
  ];

  const projects = [
    {
      id: 1,
      title: 'تطوير منصة حكومية متكاملة للخدمات الإلكترونية',
      company: 'وزارة الاتصالات وتقنية المعلومات',
      type: 'dev',
      budget: '850,000 - 1,500,000',
      duration: '6 أشهر',
      proposals: 23,
      views: 1842,
      rating: 4.8,
      verified: true,
      premium: true,
      tags: ['React', 'Node.js', 'Cloud'],
      deadline: '15 يناير 2025',
      description: 'تطوير منصة حكومية شاملة لتقديم الخدمات الإلكترونية للمواطنين بكفاءة عالية',
      status: 'active',
      location: 'الرياض'
    },
    {
      id: 2,
      title: 'تصميم هوية بصرية راقية لمشروع وطني استراتيجي',
      company: 'الهيئة الملكية لمدينة الرياض',
      type: 'design',
      budget: '420,000 - 750,000',
      duration: '3 أشهر',
      proposals: 34,
      views: 2156,
      rating: 4.9,
      verified: true,
      premium: true,
      tags: ['Brand Identity', 'UI/UX', 'Print'],
      deadline: '28 يناير 2025',
      description: 'تصميم هوية بصرية متكاملة تعكس الرؤية الاستراتيجية للمشروع الوطني',
      status: 'active',
      location: 'الرياض'
    },
    {
      id: 3,
      title: 'استشارات إدارية وتخطيط استراتيجي لمشاريع التحول',
      company: 'مركز الملك عبدالله المالي',
      type: 'business',
      budget: '950,000 - 1,800,000',
      duration: '8 أشهر',
      proposals: 18,
      views: 1423,
      rating: 5.0,
      verified: true,
      premium: false,
      tags: ['Strategy', 'Management', 'Digital'],
      deadline: '05 فبراير 2025',
      description: 'تقديم استشارات إدارية متخصصة لتطوير الخطط الاستراتيجية للتحول الرقمي',
      status: 'active',
      location: 'الرياض'
    },
    {
      id: 4,
      title: 'حملة تسويقية رقمية شاملة لمبادرة سياحية وطنية',
      company: 'الهيئة السعودية للسياحة',
      type: 'marketing',
      budget: '680,000 - 1,100,000',
      duration: '4 أشهر',
      proposals: 41,
      views: 2987,
      rating: 4.7,
      verified: true,
      premium: true,
      tags: ['Social Media', 'SEO', 'Content'],
      deadline: '20 يناير 2025',
      description: 'تصميم وتنفيذ حملة تسويقية رقمية متكاملة لتعزيز السياحة الداخلية',
      status: 'active',
      location: 'جدة'
    },
  ];

  const stats = [
    { label: 'المشاريع المتاحة', value: '486', icon: Layers, change: '+12%', trend: 'up' },
    { label: 'الشركات المسجلة', value: '1,248', icon: Building2, change: '+8%', trend: 'up' },
    { label: 'معدل الإنجاز', value: '96.2%', icon: CheckCircle, change: '+1.5%', trend: 'up' },
    { label: 'القيمة الإجمالية', value: '248M', icon: DollarSign, change: '+18%', trend: 'up' },
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

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F4' }}>
      
      {/* Sophisticated Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg" style={{ 
        backgroundColor: 'rgba(63, 87, 84, 0.95)',
        borderBottom: '1px solid rgba(196, 213, 211, 0.2)',
        boxShadow: '0 1px 3px rgba(85, 117, 113, 0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-16">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ 
                    background: 'linear-gradient(135deg, #D49A89 0%, #BC7C68 100%)',
                  }}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ 
                    backgroundColor: '#F7D1BA',
                    border: '2px solid #3F5754'
                  }}></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">منصة المشاريع</h1>
                  <p className="text-xs font-medium" style={{ color: '#C4D5D3' }}>الشريك الموثوق للقطاع الحكومي</p>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-2">
                {['الرئيسية', 'المشاريع', 'الشركات', 'الموارد'].map((item, idx) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{ 
                      color: idx === 1 ? '#FFFFFF' : '#C4D5D3',
                      backgroundColor: idx === 1 ? 'rgba(255, 255, 255, 0.12)' : 'transparent'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200" style={{ 
                backgroundColor: '#D49A89',
                color: '#FFFFFF'
              }}>
                <Plus className="w-4 h-4" />
                <span>مشروع جديد</span>
              </button>

              <button className="relative p-2.5 rounded-lg transition-all" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: '#D49A89' }}></span>
              </button>

              <div className="hidden md:flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(196, 213, 211, 0.2)'
              }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ 
                  backgroundColor: '#D49A89',
                  color: '#FFFFFF'
                }}>
                  م
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">محمد الأحمد</div>
                  <div className="text-xs font-medium" style={{ color: '#C4D5D3' }}>مستشار أعمال</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white opacity-60" />
              </div>

              <button className="lg:hidden p-2.5 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Elegant Hero */}
      <section className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%)',
        paddingTop: '64px',
        paddingBottom: '64px'
      }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full" style={{ 
            background: 'radial-gradient(circle, #557571 0%, transparent 70%)'
          }}></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full" style={{ 
            background: 'radial-gradient(circle, #D49A89 0%, transparent 70%)'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ 
              backgroundColor: '#FCEEE5',
              border: '1px solid #F7D1BA'
            }}>
              <CheckCircle className="w-4 h-4" style={{ color: '#BC7C68' }} />
              <span className="text-sm font-semibold" style={{ color: '#A45E48' }}>منصة معتمدة من الجهات الحكومية</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#1A1A1A' }}>
              فرص استثنائية<br />
              <span className="relative inline-block mt-2">
                <span style={{ color: '#557571' }}>لشركاء النجاح</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C70 2 130 2 198 6" stroke="#D49A89" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-xl mb-10 leading-relaxed font-medium" style={{ color: '#4D4D4D' }}>
              نربط الكفاءات المتميزة بأهم المشاريع الوطنية في بيئة احترافية موثوقة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200" style={{ 
                backgroundColor: '#557571',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(85, 117, 113, 0.2)'
              }}>
                <span>استكشف المشاريع</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 rounded-lg font-semibold text-base transition-all duration-200" style={{ 
                backgroundColor: '#FFFFFF',
                color: '#557571',
                border: '2px solid #557571'
              }}>
                التعرف على المنصة
              </button>
            </div>
          </div>

          {/* Refined Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBEBEB',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-5 transition-opacity" style={{ 
                  background: 'radial-gradient(circle, #557571 0%, transparent 70%)',
                  transform: 'translate(30%, -30%)'
                }}></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ 
                    backgroundColor: '#EAF1F0'
                  }}>
                    <stat.icon className="w-5 h-5" style={{ color: '#557571' }} />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold" style={{ 
                    backgroundColor: '#FCEEE5',
                    color: '#BC7C68'
                  }}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>

                <div className="text-3xl font-bold mb-1" style={{ color: '#557571' }}>{stat.value}</div>
                <div className="text-sm font-semibold" style={{ color: '#6B6B6B' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refined Search */}
      <section className="py-8" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            
            <div className="flex-1 relative">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B6B6B' }} />
              <input
                type="text"
                placeholder="ابحث عن مشاريع، مجالات، أو جهات حكومية..."
                className="w-full h-14 pr-14 pl-6 rounded-lg text-base font-medium outline-none transition-all duration-200"
                style={{ 
                  backgroundColor: '#F4F4F4',
                  color: '#1A1A1A',
                  border: '1px solid transparent'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#557571';
                  e.target.style.backgroundColor = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.backgroundColor = '#F4F4F4';
                }}
              />
            </div>

            <div className="flex gap-3">
              <button className="h-14 px-7 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200" style={{ 
                backgroundColor: '#F4F4F4',
                color: '#1A1A1A',
                border: '1px solid #D7D7D7'
              }}>
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">تصفية</span>
              </button>

              <button className="h-14 px-10 rounded-lg font-semibold transition-all duration-200" style={{ 
                backgroundColor: '#D49A89',
                color: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(212, 154, 137, 0.2)'
              }}>
                بحث
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Categories */}
      <section className="py-8" style={{ backgroundColor: '#FCEEE5' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-6 py-3 rounded-lg font-semibold whitespace-nowrap flex items-center gap-2.5 transition-all duration-200 flex-shrink-0"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#557571' : '#FFFFFF',
                  border: `1px solid ${activeCategory === cat.id ? '#557571' : '#EBEBEB'}`,
                  color: activeCategory === cat.id ? '#FFFFFF' : '#1A1A1A',
                  boxShadow: activeCategory === cat.id ? '0 2px 6px rgba(85, 117, 113, 0.15)' : 'none'
                }}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className="px-2 py-0.5 rounded text-xs font-bold" style={{
                  backgroundColor: activeCategory === cat.id ? 'rgba(255, 255, 255, 0.2)' : '#EAF1F0',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#3F5754'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Projects Grid */}
      <section className="py-16" style={{ backgroundColor: '#F4F4F4' }}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                المشاريع <span style={{ color: '#557571' }}>المتميزة</span>
              </h2>
              <p className="text-base font-medium" style={{ color: '#6B6B6B' }}>
                {filteredProjects.length} فرصة متاحة حالياً
              </p>
            </div>

            <select className="h-12 px-5 rounded-lg font-semibold outline-none cursor-pointer" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              border: '1px solid #D7D7D7'
            }}>
              <option>الأحدث</option>
              <option>الأعلى ميزانية</option>
              <option>الأكثر مشاهدة</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="rounded-xl overflow-hidden group relative"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: project.premium ? '2px solid #D49A89' : '1px solid #EBEBEB',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
                }}
              >
                {project.premium && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5" style={{ 
                    background: 'linear-gradient(135deg, #D49A89 0%, #BC7C68 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(212, 154, 137, 0.3)'
                  }}>
                    <Award className="w-3.5 h-3.5" />
                    متميز
                  </div>
                )}

                <div className="p-7">
                  
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0" style={{ 
                      backgroundColor: '#EAF1F0'
                    }}>
                      <Building2 className="w-7 h-7" style={{ color: '#557571' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-base truncate" style={{ color: '#1A1A1A' }}>{project.company}</span>
                        {project.verified && (
                          <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#557571' }} />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5"
                              style={{ color: i < Math.floor(project.rating) ? '#D49A89' : '#D7D7D7' }}
                              fill={i < Math.floor(project.rating) ? '#D49A89' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: '#6B6B6B' }}>{project.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSave(project.id)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0"
                      style={{
                        backgroundColor: savedProjects.has(project.id) ? '#EAF1F0' : '#F4F4F4'
                      }}
                    >
                      <Bookmark
                        className="w-5 h-5"
                        style={{ color: savedProjects.has(project.id) ? '#557571' : '#6B6B6B' }}
                        fill={savedProjects.has(project.id) ? '#557571' : 'none'}
                      />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-[#557571] transition-colors" style={{ color: '#1A1A1A' }}>
                    {project.title}
                  </h3>

                  <p className="text-base mb-5 leading-relaxed font-medium" style={{ color: '#4D4D4D' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-md text-sm font-semibold" style={{ 
                        backgroundColor: '#F7D1BA',
                        color: '#A45E48'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5 p-4 rounded-lg" style={{ backgroundColor: '#F4F4F4' }}>
                    {[
                      { icon: DollarSign, label: 'الميزانية', value: project.budget.split(' - ')[0] },
                      { icon: Users, label: 'العروض', value: project.proposals },
                      { icon: Clock, label: 'المدة', value: project.duration },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <item.icon className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                          <span className="text-xs font-semibold" style={{ color: '#6B6B6B' }}>{item.label}</span>
                        </div>
                        <div className="font-bold text-sm" style={{ color: '#557571' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 h-12 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200" style={{ 
                      backgroundColor: '#557571',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(85, 117, 113, 0.15)'
                    }}>
                      <span>تقديم عرض</span>
                      <Send className="w-4 h-4" />
                    </button>
                    <button className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200" style={{ 
                      backgroundColor: '#F4F4F4',
                      border: '1px solid #D7D7D7'
                    }}>
                      <Share2 className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-10 py-4 rounded-lg font-semibold text-base inline-flex items-center gap-2 transition-all duration-200" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#557571',
              border: '2px solid #557571'
            }}>
              عرض المزيد من المشاريع
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Warm CTA */}
      <section className="py-20 relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #557571 0%, #3F5754 100%)'
      }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #F7D1BA 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }}></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10" style={{ 
          background: 'radial-gradient(circle, #D49A89 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)'
        }}></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-8" style={{ 
            background: 'linear-gradient(135deg, #D49A89 0%, #BC7C68 100%)',
            boxShadow: '0 4px 16px rgba(212, 154, 137, 0.3)'
          }}>
            <Award className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-5xl font-bold mb-6 text-white">
            انضم إلى شركاء التميز
          </h2>
          <p className="text-xl mb-10 leading-relaxed font-medium" style={{ color: '#C4D5D3' }}>
            كن جزءاً من المنظومة الاحترافية التي تربط أفضل الكفاءات بأهم المشاريع الوطنية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-200" style={{ 
              backgroundColor: '#FFFFFF',
              color: '#557571',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
            }}>
              ابدأ الآن
            </button>
            <button className="px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-200" style={{ 
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              اعرف المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="pt-16 pb-8" style={{ 
        background: 'linear-gradient(135deg, #3F5754 0%, #2A3A38 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ 
                  backgroundColor: '#D49A89'
                }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">منصة المشاريع</h3>
              </div>
              <p className="leading-relaxed mb-5 text-base font-medium" style={{ color: '#C4D5D3' }}>
                نربط الكفاءات بالفرص في بيئة احترافية موثوقة
              </p>
              <div className="flex gap-3">
                {[Linkedin, Twitter, Facebook, Globe].map((Icon, idx) => (
                  <button key={idx} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200" style={{ 
                    backgroundColor: 'rgba(196, 213, 211, 0.1)'
                  }}>
                    <Icon className="w-5 h-5" style={{ color: '#C4D5D3' }} />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'الخدمات', links: ['المشاريع', 'الشركات', 'الاستشارات', 'التدريب'] },
              { title: 'الموارد', links: ['المدونة', 'الدعم', 'الأسئلة', 'التوثيق'] },
              { title: 'الشركة', links: ['من نحن', 'اتصل بنا', 'الوظائف', 'الشراكات'] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-bold mb-5 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-base font-medium transition-all duration-200" style={{ color: '#C4D5D3' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ 
            borderColor: 'rgba(196, 213, 211, 0.2)'
          }}>
            <p className="text-base font-medium" style={{ color: '#8BA5A3' }}>
              © 2025 منصة المشاريع. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6">
              {['الشروط', 'الخصوصية', 'الاستخدام'].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold transition-all duration-200" style={{ color: '#8BA5A3' }}>
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

export default ElegantCalmPlatform;