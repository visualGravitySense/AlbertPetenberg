import { useState } from 'react';
import { Link } from 'react-router-dom';
// Using react-icons (Phosphor Icons - Pi) for main page design
// More distinct visual style compared to lucide-react on Albert page
import { 
  PiStarFill, 
  PiLightningFill, 
  PiTrendUpBold, 
  PiClockBold, 
  PiUsersFourFill, 
  PiArrowRightBold, 
  PiRocketLaunchFill 
} from 'react-icons/pi';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Language, getTranslation, translations } from "./locales";

// Platform-specific styles (different from Albert sci-fi theme)
import './crowdfunding-platform.css';

interface Project {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  collected: number;
  goal: number;
  daysLeft: number;
  backers: number;
  gradient: string;
  category: string;
}

export default function CrowdfundingPlatform() {
  const [language, setLanguage] = useState<Language>('et');
  const t = (key: keyof typeof translations.ru) => getTranslation(language, key);

  const projects: Project[] = [
    {
      id: '1',
      slug: 'tiiva-all',
      icon: '🎵',
      title: language === 'et' ? 'Tiiva All — Muusikaprojekt' : 'Tiiva All — Музыкальный проект',
      description: language === 'et' 
        ? 'Albert Petenbergi uue laulu professionaalne salvestus ja muusikavideo. Atmosfääriline kompositsioon kodust ja igavesest armastusest.'
        : 'Профессиональная запись новой песни Альберта Петенберга и создание музыкального клипа. Атмосферная композиция о доме и вечной любви.',
      collected: 0,
      goal: 500,
      daysLeft: 23,
      backers: 0,
      gradient: 'from-pink-500 to-rose-600',
      category: language === 'et' ? 'Muusika' : 'Музыка'
    },
    {
      id: '2',
      slug: 'course-reviews',
      icon: '⭐',
      title: language === 'et' ? 'Kursuste Arvustused' : 'Отзывы про Курсы',
      description: language === 'et'
        ? 'Aus platvorm kursuste ja haridusprogrammide arvustustega tõelistelt üliõpilastelt autentsuse kontrollimisega.'
        : 'Честная платформа с отзывами о курсах и образовательных программах от реальных студентов с проверкой подлинности.',
      collected: 12600,
      goal: 30000,
      daysLeft: 22,
      backers: 156,
      gradient: 'from-cyan-500 to-blue-600',
      category: language === 'et' ? 'Haridus' : 'Образование'
    },
    {
      id: '3',
      slug: 'yoga-bot',
      icon: '🧘',
      title: 'Yoga Bot',
      description: language === 'et'
        ? 'Tark AI-assistent joogaks personaliseeritud treeningprogrammidega, videojuhenditega ja edenemise jälgimisega.'
        : 'Умный AI-помощник для йоги с персонализированными программами тренировок, видео-инструкциями и отслеживанием прогресса.',
      collected: 23400,
      goal: 30000,
      daysLeft: 8,
      backers: 312,
      gradient: 'from-emerald-500 to-teal-600',
      category: language === 'et' ? 'Tervis' : 'Здоровье'
    }
  ];

  const totalBackers = projects.reduce((acc, p) => acc + p.backers, 0);

  return (
    <div className="platform-theme platform-bg min-h-screen text-white">
      {/* Header */}
      <Header 
        links={[
          { label: t('main'), href: '/' }, 
          { label: t('about'), href: '/about' }, 
          { label: t('supportUs'), href: '/contact' }
        ]} 
        title="Crowdfunding Platform"
        githubUrl="https://github.com/visualGravitySense/AlbertPetenberg"
        daysLeft={0}
        totalBackers={totalBackers}
        progressPercent={0}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 pt-20">
        <div className="text-center mb-16 platform-animate-fadeIn">
          <div className="platform-badge mb-6">
            <PiRocketLaunchFill className="w-5 h-5 platform-icon-primary" />
            <span>
              {language === 'et' ? 'Rahvarahastus Platvorm' : 'Краудфандинг Платформа'}
            </span>
          </div>
          
          <h1 className="platform-hero-title mb-6">
            {language === 'et' ? 'Toetage Innovatiivseid Projekte' : 'Поддержите Инновационные Проекты'}
          </h1>
          
          <p className="platform-hero-subtitle mx-auto mb-10">
            {language === 'et' 
              ? 'Avastage ja toetage ambitsioonikaid projekte, mis muudavad maailma. Iga panus loeb!'
              : 'Откройте для себя и поддержите амбициозные проекты, которые меняют мир. Каждый вклад имеет значение!'}
          </p>

          {/* Platform Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            <div className="platform-stat">
              <div className="flex items-center justify-center gap-2">
                <PiTrendUpBold className="w-5 h-5 platform-icon-primary" />
                <span className="platform-stat-value">3</span>
              </div>
              <div className="platform-stat-label">
                {language === 'et' ? 'Aktiivsed projektid' : 'Активных проектов'}
              </div>
            </div>
            <div className="platform-stat">
              <div className="flex items-center justify-center gap-2">
                <PiUsersFourFill className="w-5 h-5 text-violet-400" />
                <span className="platform-stat-value">{totalBackers}</span>
              </div>
              <div className="platform-stat-label">
                {language === 'et' ? 'Toetajat' : 'Спонсоров'}
              </div>
            </div>
            <div className="platform-stat">
              <div className="flex items-center justify-center gap-2">
                <PiStarFill className="w-5 h-5 text-amber-400" />
                <span className="platform-stat-value">€{projects.reduce((acc, p) => acc + p.collected, 0).toLocaleString()}</span>
              </div>
              <div className="platform-stat-label">
                {language === 'et' ? 'Kogutud' : 'Собрано'}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {projects.map((project) => {
            const progressPercent = (project.collected / project.goal) * 100;
            const isActive = project.slug === 'tiiva-all';
            
            return (
              <div 
                key={project.id}
                className="platform-project-card"
              >
                {/* Project Image/Icon */}
                <div className={`platform-project-card-image bg-gradient-to-br ${project.gradient}`}>
                  <span className="text-7xl relative z-10">{project.icon}</span>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium z-10">
                    {project.category}
                  </div>
                  
                  {/* Status Badge */}
                  {isActive && (
                    <div className="absolute top-4 right-4 platform-badge-active flex items-center gap-1 z-10">
                      <PiLightningFill className="w-3 h-3" />
                      {language === 'et' ? 'AKTIIVNE' : 'АКТИВНЫЙ'}
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="platform-project-card-content">
                  <h2 className="platform-project-card-title">{project.title}</h2>
                  <p className="platform-project-card-description mb-5">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-indigo-400">€{project.collected.toLocaleString()}</span>
                      <span className="text-slate-500">{language === 'et' ? 'eesmärk' : 'цель'}: €{project.goal.toLocaleString()}</span>
                    </div>
                    <div className="platform-progress">
                      <div 
                        className="platform-progress-bar"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-slate-500 mt-1">
                      {progressPercent.toFixed(1)}%
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-slate-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <PiUsersFourFill className="w-4 h-4" />
                      <span>{project.backers} {language === 'et' ? 'toetajat' : 'спонсоров'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PiClockBold className="w-4 h-4" />
                      <span>{project.daysLeft} {language === 'et' ? 'päeva' : 'дней'}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {isActive ? (
                    <Link 
                      to={`/project/${project.slug}`}
                      className="platform-btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {language === 'et' ? 'Toeta projekti' : 'Поддержать проект'}
                      <PiArrowRightBold className="w-5 h-5" />
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="platform-btn-secondary w-full opacity-50 cursor-not-allowed"
                    >
                      {language === 'et' ? 'Tulekul' : 'Скоро'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-20 md:mt-28 mb-16">
          <h2 className="platform-hero-title text-center mb-12" style={{ fontSize: '2rem' }}>
            {language === 'et' ? 'Kuidas see töötab?' : 'Как это работает?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: '🔍',
                title: language === 'et' ? 'Avasta' : 'Откройте',
                desc: language === 'et' 
                  ? 'Sirvige meie kureeritud projektide valikut ja leidke need, mis teid inspireerivad'
                  : 'Просмотрите нашу подборку проектов и найдите те, которые вас вдохновляют'
              },
              {
                step: '02',
                icon: '💝',
                title: language === 'et' ? 'Toeta' : 'Поддержите',
                desc: language === 'et'
                  ? 'Valige oma toetuse summa ja saage ainulaadseid preemiaid'
                  : 'Выберите сумму поддержки и получите уникальные награды'
              },
              {
                step: '03',
                icon: '🎉',
                title: language === 'et' ? 'Jälgi' : 'Следите',
                desc: language === 'et'
                  ? 'Jälgige projekti edenemist ja olge osa loost!'
                  : 'Следите за прогрессом проекта и станьте частью истории!'
              }
            ].map((item, idx) => (
              <div key={idx} className="platform-step">
                <div className="platform-step-icon">{item.icon}</div>
                <div className="platform-step-number">{item.step}</div>
                <h3 className="platform-step-title">{item.title}</h3>
                <p className="platform-step-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto platform-cta">
          <h2 className="platform-cta-title">
            {language === 'et' ? 'Kas teil on idee?' : 'У вас есть идея?'}
          </h2>
          <p className="platform-cta-description">
            {language === 'et'
              ? 'Kui teil on projekt, mida soovite ellu viia, võtke meiega ühendust. Aitame teil unistusi teoks teha!'
              : 'Если у вас есть проект, который вы хотите воплотить в жизнь, свяжитесь с нами. Поможем осуществить мечту!'}
          </p>
          <button className="platform-btn-primary text-lg px-10 py-4">
            {language === 'et' ? 'Alusta oma projekti' : 'Начать свой проект'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer totalBackers={totalBackers} language={language} />
    </div>
  );
}
