import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Blade Design System Filled Icons
import { 
  LightningFilledIcon,
  TrendingUpFilledIcon,
  ClockFilledIcon,
  UsersFilledIcon,
  ArrowRightFilledIcon,
  RocketFilledIcon,
  ShieldFilledIcon,
  HeartFilledIcon,
  CheckCircleFilledIcon,
  GiftFilledIcon,
  WalletFilledIcon,
  MusicNoteFilledIcon,
  PaletteFilledIcon,
  CamperVanFilledIcon,
  SpaFilledIcon,
  StarFilledIcon,
  SearchFilledIcon,
  EmojiEventsFilledIcon
} from "./components/BladeIcons";
// Blade Card Components
import { 
  BladeCard, 
  CardMedia, 
  CardBody, 
  CardFooter, 
  CardBadge, 
  CardProgress, 
  CardAction 
} from "./components/BladeCard";
import { PlatformHeader } from "./components/PlatformHeader";
import { PlatformFooter } from "./components/PlatformFooter";
import { SocialIconButton, ActionIconButton } from "./components/IconButton";
import { Language, getTranslation, translations } from "./locales";

// Project Images
import tiivallImage from './render-1.jpg';
import colorPaletteImage from '../plan/gemini-image-2_Fine_art_photography_of_ColorPalette_Pro_device_as_an_artist_s_essential_tool_pl-0.jpg';
import creativeBusImage from './cb-render-1.png';

// Platform-specific styles (different from Albert sci-fi theme)
import './crowdfunding-platform.css';

type ProjectIconType = 'music' | 'palette' | 'bus' | 'yoga' | 'star' | 'rocket';

interface Project {
  id: string;
  slug: string;
  iconType: ProjectIconType;
  image?: string;
  title: string;
  description: string;
  collected: number;
  goal: number;
  daysLeft: number;
  backers: number;
  gradient: string;
  category: string;
}

// Project Icon Component
const ProjectIcon: React.FC<{ type: ProjectIconType; className?: string }> = ({ type, className = '' }) => {
  const iconClass = `project-card-icon project-card-icon--${type} ${className}`;
  
  switch (type) {
    case 'music':
      return <div className={iconClass}><MusicNoteFilledIcon size="2xlarge" /></div>;
    case 'palette':
      return <div className={iconClass}><PaletteFilledIcon size="2xlarge" /></div>;
    case 'bus':
      return <div className={iconClass}><CamperVanFilledIcon size="2xlarge" /></div>;
    case 'yoga':
      return <div className={iconClass}><SpaFilledIcon size="2xlarge" /></div>;
    case 'star':
      return <div className={iconClass}><StarFilledIcon size="2xlarge" /></div>;
    case 'rocket':
      return <div className={iconClass}><RocketFilledIcon size="2xlarge" /></div>;
    default:
      return <div className={iconClass}><RocketFilledIcon size="2xlarge" /></div>;
  }
};

export default function CrowdfundingPlatform() {
  const [language, setLanguage] = useState<Language>('et');
  const navigate = useNavigate();
  const t = (key: keyof typeof translations.ru) => getTranslation(language, key);

  const projects: Project[] = [
    {
      id: '1',
      slug: 'tiiva-all',
      iconType: 'music',
      image: tiivallImage,
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
      id: '3',
      slug: 'color-palette-pro',
      iconType: 'palette',
      image: colorPaletteImage,
      title: 'ColorPalette Pro',
      description: language === 'et'
        ? 'Maailma esimene kaasaskantav, professionaalse kvaliteediga värvipaleti generaator IoT seade disaineritele ja kunstnikele.'
        : 'Первый в мире портативный генератор цветовых палитр профессионального уровня. IoT устройство для дизайнеров и художников.',
      collected: 0,
      goal: 150000,
      daysLeft: 28,
      backers: 0,
      gradient: 'from-orange-500 to-amber-600',
      category: language === 'et' ? 'IoT Disain' : 'IoT Дизайн'
    },
    {
      id: '4',
      slug: 'creative-bus',
      iconType: 'bus',
      image: creativeBusImage,
      title: 'Creative Bus',
      description: language === 'et'
        ? 'Mobiilne disainistuudio premium-klassis. Ümberehitatud buss veebilehtede, foto- ja videosisu loomiseks inspireerivates kohtades.'
        : 'Мобильная дизайн-студия премиум-класса. Переоборудованный автобус для создания сайтов и контента на вдохновляющих локациях.',
      collected: 0,
      goal: 65000,
      daysLeft: 35,
      backers: 0,
      gradient: 'from-violet-500 to-purple-600',
      category: language === 'et' ? 'Disain' : 'Дизайн'
    },
    {
      id: '5',
      slug: 'yoga-bot',
      iconType: 'yoga',
      title: 'Yoga Bot',
      description: language === 'et'
        ? 'Tark AI-assistent joogaks personaliseeritud treeningprogrammidega, videojuhenditega ja edenemise jälgimisega.'
        : 'Умный AI-помощник для йоги с персонализированными программами тренировок, видео-инструкциями и отслеживанием прогресса.',
      collected: 0,
      goal: 30000,
      daysLeft: 8,
      backers: 0,
      gradient: 'from-emerald-500 to-teal-600',
      category: language === 'et' ? 'Tervis' : 'Здоровье'
    }
  ];

  const totalBackers = projects.reduce((acc, p) => acc + p.backers, 0);

  return (
    <div className="platform-theme platform-bg min-h-screen text-white">
      {/* Platform Header - Modern clean design */}
      <PlatformHeader 
        links={[
          { label: t('main'), href: '/' }, 
          { label: t('about'), href: '/about' }, 
          { label: t('supportUs'), href: '/contact' }
        ]} 
        title="AMOE"
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Hero Section - Split 50/50 Layout */}
      <div className="hero-split">
        <div className="hero-split__container">
          {/* Left Side - Image/Visual */}
          <div className="hero-split__left">
            <div className="hero-split__image-wrapper">
              {/* Animated Background Elements */}
              <div className="hero-split__bg-shapes">
                <div className="hero-split__shape hero-split__shape--1"></div>
                <div className="hero-split__shape hero-split__shape--2"></div>
                <div className="hero-split__shape hero-split__shape--3"></div>
              </div>
              
              {/* Main Visual */}
              <div className="hero-split__visual">
                <div className="hero-split__card hero-split__card--1">
                  <div className="hero-split__card-icon hero-split__card-icon--music">
                    <MusicNoteFilledIcon size="large" />
                  </div>
                  <div className="hero-split__card-text">Tiiva All</div>
                </div>
                <div className="hero-split__card hero-split__card--2">
                  <div className="hero-split__card-icon hero-split__card-icon--palette">
                    <PaletteFilledIcon size="large" />
                  </div>
                  <div className="hero-split__card-text">ColorPalette</div>
                </div>
                <div className="hero-split__card hero-split__card--3">
                  <div className="hero-split__card-icon hero-split__card-icon--bus">
                    <CamperVanFilledIcon size="large" />
                  </div>
                  <div className="hero-split__card-text">Creative Bus</div>
                </div>
                <div 
                  className="hero-split__card hero-split__card--center hero-split__card--clickable"
                  onClick={() => navigate('/project/tiiva-all')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/project/tiiva-all')}
                >
                  <div className="hero-split__logo">
                    <RocketFilledIcon size="2xlarge" className="blade-icon--primary" />
                  </div>
                  <div className="hero-split__logo-text">
                    {language === 'et' ? 'Nädala projekt' : 'Проект недели'}
                  </div>
                </div>
              </div>

              {/* Stats Floating */}
              <div className="hero-split__floating-stat hero-split__floating-stat--1">
                <WalletFilledIcon size="medium" className="blade-icon--warning" />
                <span>€{projects.reduce((acc, p) => acc + p.collected, 0).toLocaleString()}</span>
              </div>
              <div className="hero-split__floating-stat hero-split__floating-stat--2">
                <UsersFilledIcon size="medium" className="blade-icon--secondary" />
                <span>{totalBackers}+</span>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="hero-split__right">
            <div className="hero-split__content">
              {/* Badge */}
              <div className="platform-badge mb-6">
                <RocketFilledIcon size="medium" className="platform-icon-primary blade-icon--pulse" />
                <span>
                  {language === 'et' ? 'Rahvarahastus Platvorm' : 'Краудфандинг Платформа'}
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-split__title">
                {language === 'et' ? 'Toetage Innovatiivseid Projekte' : 'Поддержите Инновационные Проекты'}
              </h1>

              {/* Subtitle */}
              <p className="hero-split__subtitle">
                {language === 'et' 
                  ? 'Avastage ja toetage ambitsioonikaid projekte, mis muudavad maailma. Iga panus loeb!'
                  : 'Откройте для себя и поддержите амбициозные проекты, которые меняют мир. Каждый вклад имеет значение!'}
              </p>

              {/* Stats Row */}
              <div className="hero-split__stats">
                <div className="hero-split__stat">
                  <div className="hero-split__stat-value">
                    <TrendingUpFilledIcon size="medium" className="blade-icon--primary" />
                    <span>5</span>
                  </div>
                  <div className="hero-split__stat-label">
                    {language === 'et' ? 'Projektid' : 'Проектов'}
                  </div>
                </div>
                <div className="hero-split__stat-divider"></div>
                <div className="hero-split__stat">
                  <div className="hero-split__stat-value">
                    <UsersFilledIcon size="medium" className="blade-icon--secondary" />
                    <span>{totalBackers}</span>
                  </div>
                  <div className="hero-split__stat-label">
                    {language === 'et' ? 'Toetajat' : 'Спонсоров'}
                  </div>
                </div>
                <div className="hero-split__stat-divider"></div>
                <div className="hero-split__stat">
                  <div className="hero-split__stat-value">
                    <WalletFilledIcon size="medium" className="blade-icon--warning" />
                    <span>€{(projects.reduce((acc, p) => acc + p.collected, 0) / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="hero-split__stat-label">
                    {language === 'et' ? 'Kogutud' : 'Собрано'}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-split__buttons">
                <button 
                  className="hero-split__btn hero-split__btn--primary"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>{language === 'et' ? 'Avasta projekte' : 'Открыть проекты'}</span>
                  <ArrowRightFilledIcon size="medium" />
                </button>
                <button className="hero-split__btn hero-split__btn--secondary">
                  <RocketFilledIcon size="medium" />
                  <span>{language === 'et' ? 'Alusta projekti' : 'Начать проект'}</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="hero-split__social">
                <span className="hero-split__social-label">
                  {language === 'et' ? 'Jälgi meid:' : 'Следите за нами:'}
                </span>
                <div className="icon-button-group">
                  <SocialIconButton platform="twitter" href="https://twitter.com/crowdfunding" size="medium" />
                  <SocialIconButton platform="telegram" href="https://t.me/crowdfunding" size="medium" />
                  <SocialIconButton platform="discord" href="https://discord.gg/crowdfunding" size="medium" />
                  <SocialIconButton platform="instagram" href="https://instagram.com/crowdfunding" size="medium" />
                  <SocialIconButton platform="github" href="https://github.com/crowdfunding" size="medium" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            {language === 'et' ? 'Aktiivsed Projektid' : 'Активные Проекты'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {language === 'et' 
              ? 'Valige projekt, mida soovite toetada, ja saage osa nende põnevast teekonnast'
              : 'Выберите проект, который хотите поддержать, и станьте частью их увлекательного пути'}
          </p>
        </div>

        {/* Projects Grid - Using Blade Interactive Cards */}
        <div className="blade-card-grid blade-card-grid--3 max-w-7xl mx-auto">
          {projects.map((project) => {
            const progressPercent = (project.collected / project.goal) * 100;
            const isActive = project.slug === 'tiiva-all' || project.slug === 'course-reviews' || project.slug === 'color-palette-pro' || project.slug === 'creative-bus';
            
            return (
              <BladeCard
                key={project.id}
                variant="elevated"
                size="medium"
                hoverEffect={isActive ? "glow" : "lift"}
                onClick={isActive ? () => navigate(`/project/${project.slug}`) : undefined}
                isDisabled={!isActive}
                className="group"
              >
                {/* Project Image/Icon with CardMedia */}
                <CardMedia 
                  src={project.image}
                  alt={project.title}
                  gradient={!project.image ? `linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)` : undefined}
                  overlay
                  height={180}
                  className={!project.image ? `bg-gradient-to-br ${project.gradient}` : 'project-card-image'}
                >
                  {/* Show icon only if no image */}
                  {!project.image && <ProjectIcon type={project.iconType} />}
                  
                  {/* Category Badge */}
                  <CardBadge variant="solid" color="default" position="top-left">
                    {project.category}
                  </CardBadge>
                  
                  {/* Status Badge */}
                  {isActive && (
                    <CardBadge variant="solid" color="success" position="top-right">
                      <LightningFilledIcon size="small" className="blade-icon--bounce" />
                      {language === 'et' ? 'AKTIIVNE' : 'АКТИВНЫЙ'}
                    </CardBadge>
                  )}

                  {/* Action Buttons - Hover */}
                  <div className="absolute bottom-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ActionIconButton 
                      action="heart" 
                      size="small" 
                      variant="secondary"
                      onClick={() => console.log('Like', project.slug)}
                    />
                    <ActionIconButton 
                      action="bookmark" 
                      size="small" 
                      variant="secondary"
                      onClick={() => console.log('Bookmark', project.slug)}
                    />
                    <ActionIconButton 
                      action="share" 
                      size="small" 
                      variant="secondary"
                      onClick={() => {
                        navigator.share?.({ 
                          title: project.title, 
                          url: `/project/${project.slug}` 
                        }) || navigator.clipboard.writeText(window.location.origin + `/project/${project.slug}`);
                      }}
                    />
                  </div>
                </CardMedia>

                {/* Project Content with CardBody */}
                <CardBody>
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h2>
                  <p className="text-sm text-slate-400 mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress with CardProgress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-indigo-400">€{project.collected.toLocaleString()}</span>
                      <span className="text-slate-500">{language === 'et' ? 'eesmärk' : 'цель'}: €{project.goal.toLocaleString()}</span>
                    </div>
                    <CardProgress 
                      value={project.collected} 
                      max={project.goal} 
                      showLabel 
                      color={progressPercent >= 100 ? 'success' : 'primary'}
                    />
                  </div>

                  {/* Stats - Blade Icons */}
                  <div className="flex justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <UsersFilledIcon size="small" />
                      <span>{project.backers} {language === 'et' ? 'toetajat' : 'спонсоров'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockFilledIcon size="small" />
                      <span>{project.daysLeft} {language === 'et' ? 'päeva' : 'дней'}</span>
                    </div>
                  </div>
                </CardBody>

                {/* CTA with CardFooter */}
                <CardFooter divider>
                  {isActive ? (
                    <CardAction 
                      fullWidth 
                      variant="primary"
                      icon={<ArrowRightFilledIcon size="small" />}
                      onClick={() => navigate(`/project/${project.slug}`)}
                    >
                      {language === 'et' ? 'Toeta projekti' : 'Поддержать проект'}
                    </CardAction>
                  ) : (
                    <CardAction 
                      fullWidth 
                      variant="ghost"
                    >
                      {language === 'et' ? 'Tulekul' : 'Скоро'}
                    </CardAction>
                  )}
                </CardFooter>
              </BladeCard>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-20 md:mt-28 mb-16">
          <h2 className="platform-hero-title text-center mb-12" style={{ fontSize: '2rem' }}>
            {language === 'et' ? 'Kuidas see töötab?' : 'Как это работает?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 - Discover */}
            <div className="platform-step">
              <div className="platform-step-icon platform-step-icon--discover">
                <SearchFilledIcon size="xlarge" />
              </div>
              <div className="platform-step-number">01</div>
              <h3 className="platform-step-title">
                {language === 'et' ? 'Avasta' : 'Откройте'}
              </h3>
              <p className="platform-step-description">
                {language === 'et' 
                  ? 'Sirvige meie kureeritud projektide valikut ja leidke need, mis teid inspireerivad'
                  : 'Просмотрите нашу подборку проектов и найдите те, которые вас вдохновляют'}
              </p>
            </div>

            {/* Step 2 - Support */}
            <div className="platform-step">
              <div className="platform-step-icon platform-step-icon--support">
                <GiftFilledIcon size="xlarge" />
              </div>
              <div className="platform-step-number">02</div>
              <h3 className="platform-step-title">
                {language === 'et' ? 'Toeta' : 'Поддержите'}
              </h3>
              <p className="platform-step-description">
                {language === 'et'
                  ? 'Valige oma toetuse summa ja saage ainulaadseid preemiaid'
                  : 'Выберите сумму поддержки и получите уникальные награды'}
              </p>
            </div>

            {/* Step 3 - Follow */}
            <div className="platform-step">
              <div className="platform-step-icon platform-step-icon--follow">
                <EmojiEventsFilledIcon size="xlarge" />
              </div>
              <div className="platform-step-number">03</div>
              <h3 className="platform-step-title">
                {language === 'et' ? 'Jälgi' : 'Следите'}
              </h3>
              <p className="platform-step-description">
                {language === 'et'
                  ? 'Jälgige projekti edenemist ja olge osa loost!'
                  : 'Следите за прогрессом проекта и станьте частью истории!'}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges Section - Blade Icons */}
        <div className="max-w-5xl mx-auto mt-16 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="platform-trust-badge">
              <div className="blade-icon-bg blade-icon-bg--circle blade-icon-bg--success">
                <ShieldFilledIcon size="large" />
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold text-white">
                  {language === 'et' ? 'Turvaline makse' : 'Безопасная оплата'}
                </div>
                <div className="text-xs text-slate-500">SSL / Stripe</div>
              </div>
            </div>
            <div className="platform-trust-badge">
              <div className="blade-icon-bg blade-icon-bg--circle blade-icon-bg--primary">
                <CheckCircleFilledIcon size="large" />
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold text-white">
                  {language === 'et' ? 'Kontrollitud projektid' : 'Проверенные проекты'}
                </div>
                <div className="text-xs text-slate-500">100%</div>
              </div>
            </div>
            <div className="platform-trust-badge">
              <div className="blade-icon-bg blade-icon-bg--circle blade-icon-bg--warning">
                <GiftFilledIcon size="large" />
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold text-white">
                  {language === 'et' ? 'Eksklusiivne auhind' : 'Эксклюзивные награды'}
                </div>
                <div className="text-xs text-slate-500">{language === 'et' ? 'Ainulaadne' : 'Уникальные'}</div>
              </div>
            </div>
            <div className="platform-trust-badge">
              <div className="blade-icon-bg blade-icon-bg--circle blade-icon-bg--error">
                <HeartFilledIcon size="large" />
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold text-white">
                  {language === 'et' ? 'Kogukond' : 'Сообщество'}
                </div>
                <div className="text-xs text-slate-500">{totalBackers}+ {language === 'et' ? 'toetajat' : 'спонсоров'}</div>
              </div>
            </div>
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
            <span className="flex items-center gap-2">
              <RocketFilledIcon size="medium" />
              {language === 'et' ? 'Alusta oma projekti' : 'Начать свой проект'}
            </span>
          </button>
        </div>
      </div>

      {/* Platform Footer - Modern clean design */}
      <PlatformFooter language={language} />
    </div>
  );
}
