import { useState, useEffect } from 'react';
import { Star, Users, Clock, Shield, CheckCircle, TrendingUp, Zap, ArrowRight, ShoppingCart, Bus, BarChart3, HelpCircle, AlertCircle, Trophy, Camera, Eye, EyeOff, X, RotateCcw, AlertTriangle, CheckCircle2, Palette, Monitor, Smartphone, MapPin, Wifi, Video, Laptop, Sun, Sparkles } from 'lucide-react';
import { SciFiBadge } from "./components/SciFiBadge";
import { QuickSupportButton } from "./components/QuickSupportButton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Button } from "./components/SciFiButton2";
import { Language, getTranslation } from "./locales";
import { 
  ParkFilledIcon,
  MuseumFilledIcon,
  PaletteFilledIcon,
  TerrainFilledIcon,
  EcoFilledIcon,
  CastleFilledIcon,
  WebFilledIcon,
  SmartphoneFilledIcon,
  CameraFilledIcon,
  DroneFilledIcon,
  LightbulbFilledIcon
} from "./components/BladeIcons";

// Project-specific styles
import './creative-bus-project.css';

// Hero Image
import heroImage from './cb-render-1.png';

export default function CreativeBusProject() {
  const [language, setLanguage] = useState<Language>('et');
  const t = (key: keyof typeof import('./locales').translations.ru) => getTranslation(language, key);
  
  // Project-specific data
  const [progress] = useState(0);
  const goal = 65000;
  const progressPercent = (progress / goal) * 100;
  const [timeLeft, setTimeLeft] = useState({ days: 35, hours: 8, minutes: 15 });
  const totalBackers = 0;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSupportedAmount, setLastSupportedAmount] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [lastAction, setLastAction] = useState<{type: 'support', amount: number} | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [errors, setErrors] = useState<{field: string, message: string}[]>([]);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) minutes--;
        else if (hours > 0) { hours--; minutes = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Payment links
  const paymentLinks: Record<number, string> = {
    25: 'https://buy.stripe.com/test_creativebus_25',
    75: 'https://buy.stripe.com/test_creativebus_75',
    150: 'https://buy.stripe.com/test_creativebus_150',
    500: 'https://buy.stripe.com/test_creativebus_500',
    1500: 'https://buy.stripe.com/test_creativebus_1500'
  };

  // Project-specific rewards
  const rewards = [
    {
      amount: 25,
      title: language === 'et' ? 'Fänn' : 'Фанат',
      description: language === 'et' 
        ? 'Nimi toetajate seinal Creative Bussis + digitaalne tänukiri + eksklusiivne sisu kulisside tagant' 
        : 'Имя на стене спонсоров в Creative Bus + цифровое благодарственное письмо + эксклюзивный контент из-за кулис',
      icon: Star,
      backers: 45,
      available: true
    },
    {
      amount: 75,
      title: language === 'et' ? 'Avastaja' : 'Исследователь',
      description: language === 'et' 
        ? 'Kõik eelnev + ekskursioon Creative Bussile + 30min konsultatsioon disaini/brändingu teemal' 
        : 'Всё предыдущее + экскурсия по Creative Bus + 30мин консультация по дизайну/брендингу',
      icon: MapPin,
      backers: 38,
      available: true
    },
    {
      amount: 150,
      title: language === 'et' ? 'Looja' : 'Создатель',
      description: language === 'et' 
        ? 'Kõik eelnev + 2-tunnine loominguline sessioon bussis + professionaalne portreefotosessioon' 
        : 'Всё предыдущее + 2-часовая творческая сессия в автобусе + профессиональная портретная фотосессия',
      icon: Camera,
      backers: 28,
      popular: true,
      available: true
    },
    {
      amount: 500,
      title: language === 'et' ? 'Partner' : 'Партнёр',
      description: language === 'et' 
        ? 'Kõik eelnev + täispäevane sessioon bussis + logo ja brändiraamat + prioriteetne broneerimine 1 aasta' 
        : 'Всё предыдущее + полный день сессии в автобусе + логотип и брендбук + приоритетное бронирование 1 год',
      icon: Trophy,
      backers: 14,
      available: true
    },
    {
      amount: 1500,
      title: language === 'et' ? 'Kaasasutaja' : 'Соучредитель',
      description: language === 'et' 
        ? 'Kõik eelnev + nimi bussil + eluaegne 20% allahindlus kõigile teenustele + VIP pass kõigile üritustele + kohandatud brändipakett' 
        : 'Всё предыдущее + имя на автобусе + пожизненная скидка 20% на все услуги + VIP пропуск на все мероприятия + кастомный бренд-пакет',
      icon: Bus,
      backers: 3,
      available: true
    }
  ];

  const validateAmount = (amount: number | string): { valid: boolean; error?: string } => {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
    if (!numAmount || isNaN(numAmount)) return { valid: false, error: 'Введите сумму' };
    if (numAmount < 10) return { valid: false, error: 'Минимальная сумма €10' };
    if (numAmount > 5000) return { valid: false, error: 'Максимальная сумма €5000' };
    return { valid: true };
  };

  const handleSupport = (amount?: number, rewardIndex?: number) => {
    if (amount && amount >= 25) {
      executeSupport(amount, rewardIndex);
      return;
    }
    if (customAmount) {
      const validation = validateAmount(customAmount);
      if (!validation.valid) {
        setErrors([{ field: 'amount', message: validation.error || '' }]);
        return;
      }
      executeSupport(parseInt(customAmount), rewardIndex);
      setCustomAmount('');
      setShowCustomInput(false);
    } else {
      executeSupport(amount, rewardIndex);
    }
  };

  const executeSupport = (amount?: number, rewardIndex?: number) => {
    if (rewardIndex !== undefined) setSelectedReward(rewardIndex);
    if (amount) {
      setLastAction({ type: 'support', amount });
      setShowUndo(true);
    }
    setLastSupportedAmount(amount || null);
    setShowConfirmation(true);
    setErrors([]);
    
    if (amount && paymentLinks[amount]) {
      setTimeout(() => window.open(paymentLinks[amount], '_blank'), 1000);
    }
    
    setTimeout(() => { setShowConfirmation(false); setSelectedReward(null); }, 5000);
    setTimeout(() => { setShowUndo(false); setLastAction(null); }, 10000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUndo = () => {
    if (lastAction) {
      setShowConfirmation(false);
      setLastAction(null);
      setShowUndo(false);
      setLastSupportedAmount(null);
    }
  };

  const heuristicMetrics = {
    mostPopularAmount: 150,
    bestValueAmount: 150,
    recommendedAmount: 150
  };

  // Project-specific content
  const projectTitle = language === 'et' ? 'Creative Bus' : 'Creative Bus';
  const projectDescription = language === 'et' 
    ? 'Mobiilne disainistuudio premium-klassis. Ümberehitatud buss veebilehtede, rakenduste, foto- ja videosisu loomiseks otse inspireerival lokatsioonis.'
    : 'Мобильная дизайн-студия премиум-класса. Переоборудованный автобус для создания сайтов, приложений, фото и видеоконтента прямо на вдохновляющей локации.';

  // Services list
  const services = [
    { icon: Monitor, label: language === 'et' ? 'Veebilehtede disain' : 'Дизайн сайтов' },
    { icon: Smartphone, label: language === 'et' ? 'UI/UX rakendused' : 'UI/UX приложения' },
    { icon: Camera, label: language === 'et' ? 'Foto/videosisu' : 'Фото/видео контент' },
    { icon: Palette, label: language === 'et' ? 'Bränding' : 'Брендинг' },
    { icon: Video, label: language === 'et' ? 'Droonivõtted' : 'Дрон-съёмка' },
    { icon: Sparkles, label: language === 'et' ? 'Loovseansid' : 'Креативные сессии' },
  ];

  // Locations with icons
  const locations = [
    { icon: ParkFilledIcon, iconClass: 'location-icon--park', name: language === 'et' ? 'Pargid ja rannad' : 'Парки и набережные' },
    { icon: MuseumFilledIcon, iconClass: 'location-icon--museum', name: language === 'et' ? 'Muuseumid' : 'Музеи' },
    { icon: PaletteFilledIcon, iconClass: 'location-icon--art', name: language === 'et' ? 'Kunstikvartalid' : 'Арт-кварталы' },
    { icon: TerrainFilledIcon, iconClass: 'location-icon--terrain', name: language === 'et' ? 'Vaateplatvormid' : 'Смотровые площадки' },
    { icon: EcoFilledIcon, iconClass: 'location-icon--eco', name: language === 'et' ? 'Botaanikaaiad' : 'Ботанические сады' },
    { icon: CastleFilledIcon, iconClass: 'location-icon--castle', name: language === 'et' ? 'Ajaloolised kohad' : 'Исторические места' },
  ];

  return (
    <div className="min-h-screen text-white bg-grid-pattern creative-bus-theme">
      {/* Header */}
      <div className="pt-0">
        <Header 
          links={[{ label: t('allProjects'), href: '/' }, { label: t('about'), href: '/about' }, { label: t('supportUs'), href: '/contact' }]} 
          title={projectTitle}
          githubUrl="https://github.com/creativebus/studio"
          daysLeft={timeLeft.days}
          totalBackers={totalBackers}
          progressPercent={progressPercent}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* Undo notification */}
      {showUndo && lastAction && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-violet-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[55] flex items-center gap-4 animate-fadeIn border-2 border-violet-400">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-semibold">Поддержка €{lastAction.amount} принята!</div>
            <div className="text-sm text-violet-100">Можно отменить в течение 10 секунд</div>
          </div>
          <button onClick={handleUndo} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Отменить
          </button>
          <button onClick={() => setShowUndo(false)} className="text-violet-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Success confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-2 border-violet-400 animate-scaleIn">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Спасибо за поддержку!</h3>
              {lastSupportedAmount && (
                <p className="text-lg text-violet-100 mb-4">
                  Ваш вклад: <span className="font-bold text-white">€{lastSupportedAmount}</span>
                </p>
              )}
              <button onClick={() => setShowConfirmation(false)} className="bg-white text-violet-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bus-cta-bar p-4 shadow-2xl z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-sm">
              <div className="bus-cta-progress-value animate-pulse-once">€{progress.toLocaleString()} собрано</div>
              <div className="bus-cta-progress-label">{progressPercent.toFixed(1)}% от цели</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm bus-cta-timer">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Осталось <span className="font-bold">{timeLeft.days}д {timeLeft.hours}ч</span></span>
            </div>
          </div>
          <button onClick={() => handleSupport()} className="bus-cta-button-main">
            <svg className="bus-cta-button-frame" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path d="M10 10 L190 10 L200 25 L190 40 L10 40 L0 25 Z" className="bus-cta-button-path" />
            </svg>
            <span className="bus-cta-button-label">
              <Zap className="w-5 h-5" />
              Поддержать проект
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-start gap-3 mb-6">
                <SciFiBadge icon={<Bus className="w-5 h-5 animate-bounce-subtle" />} className="animate-fadeIn">
                  {language === 'et' ? 'Mobiilne Stuudio' : 'Мобильная Студия'}
                </SciFiBadge>
                <SciFiBadge icon={<TrendingUp className="w-5 h-5" />} className="animate-fadeIn delay-100">
                  {totalBackers} {t('sponsors')}
                </SciFiBadge>
                <SciFiBadge icon={<Clock className="w-5 h-5 animate-pulse" />} className="animate-fadeIn delay-200">
                  {timeLeft.days} {t('daysLeft')}
                </SciFiBadge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent animate-fadeIn delay-300 text-left">
                {projectTitle}
              </h1>

              <div className="mb-6 animate-fadeIn delay-400">
                <p className="text-lg md:text-xl text-gray-300 mb-4 text-left">
                  {projectDescription}
                </p>
                <p className="text-base md:text-lg text-violet-300 mb-6 font-medium text-left">
                  {totalBackers > 0 
                    ? (language === 'et' 
                        ? `Liitu ${totalBackers} toetajaga, kes usuvad sellesse projekti!` 
                        : `Присоединяйтесь к ${totalBackers} спонсорам, которые верят в этот проект!`)
                    : (language === 'et' ? 'Saa esimeseks toetajaks!' : 'Станьте первым спонсором!')}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 animate-fadeIn delay-500">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 bg-violet-900/20 rounded-lg px-3 py-2 border border-violet-500/20">
                      <Icon className="w-4 h-4 text-violet-400" />
                      <span className="text-sm text-gray-300">{service.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Support Buttons */}
              <div className="flex flex-wrap items-start justify-start gap-3 mb-8 animate-fadeIn delay-700">
                <span className="text-sm text-gray-400 w-full mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <ShoppingCart className="w-4 h-4 text-violet-400" />
                  {language === 'et' ? 'Kiire toetus:' : 'Быстрая поддержка:'}
                </span>
                <div className="flex flex-wrap items-center justify-start gap-3">
                  {[25, 75, 150, 500].map((amount) => {
                    const isRecommended = amount === heuristicMetrics.recommendedAmount;
                    const isBestValue = amount === heuristicMetrics.bestValueAmount;
                    return (
                      <div key={amount} className="relative group">
                        <QuickSupportButton
                          amount={amount}
                          isRecommended={isRecommended}
                          isBestValue={isBestValue}
                          onClick={() => handleSupport(amount)}
                          className="transform hover:scale-110 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <span>€{amount}</span>
                            {isRecommended && <Star className="w-4 h-4 fill-current" />}
                          </span>
                        </QuickSupportButton>
                      </div>
                    );
                  })}
                  
                  <div className="relative">
                    <QuickSupportButton
                      isCustom={true}
                      onClick={() => setShowCustomInput(!showCustomInput)}
                      className="transform hover:scale-110 transition-all"
                    >
                      {showCustomInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{language === 'et' ? 'Oma summa' : 'Своя сумма'}</span>
                    </QuickSupportButton>
                    {showCustomInput && (
                      <div className="absolute top-full mt-2 left-0 bg-gray-800 border-2 border-violet-500 rounded-lg p-4 shadow-2xl z-10 min-w-[200px] animate-fadeIn">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setErrors([]); }}
                          placeholder={language === 'et' ? 'alates €10' : 'от €10'}
                          className="w-full bg-gray-900 border border-violet-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-400"
                        />
                        {errors.find(e => e.field === 'amount') && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {errors.find(e => e.field === 'amount')?.message}
                          </div>
                        )}
                        <button onClick={() => handleSupport()} className="w-full mt-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition-all">
                          {language === 'et' ? 'Kinnita' : 'Подтвердить'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Bus Image */}
          <div className="relative">
            <div className="cb-hero-image-wrapper">
              <img 
                src={heroImage} 
                alt="Creative Bus - Mobile Design Studio" 
                className="cb-hero-image"
              />
              {/* Gradient Overlay */}
              <div className="cb-hero-image-overlay"></div>
              
              {/* Feature Badges */}
              <div className="cb-hero-badges">
                <span className="cb-hero-badge">
                  <Laptop className="w-4 h-4" />
                  {language === 'et' ? '3 töökohta' : '3 рабочих места'}
                </span>
                <span className="cb-hero-badge">
                  <Wifi className="w-4 h-4" />
                  5G Internet
                </span>
                <span className="cb-hero-badge">
                  <Sun className="w-4 h-4" />
                  {language === 'et' ? 'Päikesepaneelid' : 'Солнечные панели'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-16 mb-8 md:mb-16 bg-gradient-to-br from-violet-900/40 to-purple-900/30 rounded-xl p-4 md:p-8 border border-violet-500/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-600/30 px-6 py-3 rounded-full border border-violet-500/50 mb-4">
            <Bus className="w-6 h-6 text-violet-400" />
            <span className="text-lg font-bold text-violet-400">
              {language === 'et' ? 'Kontseptsioon' : 'Концепция'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-violet-300">
            {language === 'et' ? 'Miks Creative Bus?' : 'Почему Creative Bus?'}
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {language === 'et' 
              ? 'Kujutage ette: teie veebisait või bränd sünnib mitte kontoris, vaid merekaldal, kunstimuuseumis või keset loodust. Creative Bus toob professionaalse disainistuudio sinna, kus inspiratsioon on käegakatsutav.'
              : 'Представьте: ваш сайт или бренд рождается не в офисе, а на берегу моря, в художественном музее или посреди природы. Creative Bus привозит профессиональную дизайн-студию туда, где вдохновение осязаемо.'}
          </p>
        </div>

        {/* What's Inside */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-black/20 rounded-lg p-6">
            <h4 className="font-semibold text-violet-300 mb-4 flex items-center gap-2">
              <Laptop className="w-5 h-5" />
              {language === 'et' ? 'Tehniline varustus' : 'Техническое оснащение'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 2-3 {language === 'et' ? 'võimsat Mac/PC tööjaama' : 'мощных Mac/PC рабочих станции'}</li>
              <li>• {language === 'et' ? 'Graafilised tahvelarvutid' : 'Графические планшеты'}</li>
              <li>• 4K {language === 'et' ? 'monitorid' : 'мониторы'}</li>
              <li>• {language === 'et' ? 'Professionaalsed kaamerad + droonid' : 'Профессиональные камеры + дроны'}</li>
              <li>• {language === 'et' ? 'Stuudiovalgustus' : 'Студийное освещение'}</li>
              <li>• NAS {language === 'et' ? 'failiserverid' : 'файловые серверы'}</li>
            </ul>
          </div>
          <div className="bg-black/20 rounded-lg p-6">
            <h4 className="font-semibold text-violet-300 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {language === 'et' ? 'Mugavused' : 'Удобства'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• {language === 'et' ? 'Ergonoomiline klienditsoon' : 'Эргономичная клиентская зона'}</li>
              <li>• {language === 'et' ? 'Kliimakontroll (küte/konditsioneer)' : 'Климат-контроль (отопление/кондиционер)'}</li>
              <li>• {language === 'et' ? 'Heliisolatsioon' : 'Звукоизоляция'}</li>
              <li>• {language === 'et' ? 'Foto/video tsoon' : 'Фото/видео зона'}</li>
              <li>• {language === 'et' ? 'Päikesepaneelid + generaator' : 'Солнечные панели + генератор'}</li>
              <li>• 5G + {language === 'et' ? 'varuühendus' : 'резервное подключение'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="max-w-6xl mx-auto mb-8 md:mb-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-violet-300">
            {language === 'et' ? 'Kus me töötame?' : 'Где мы работаем?'}
          </h2>
          <p className="text-gray-400">
            {language === 'et' ? 'Creative Bus saabub sinna, kus teie inspiratsioon on' : 'Creative Bus приедет туда, где ваше вдохновение'}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((loc, idx) => (
            <div key={idx} className="location-card bg-violet-900/20 rounded-lg p-4 text-center border border-violet-500/20 hover:border-violet-500/50 transition-all group">
              <div className={`location-icon ${loc.iconClass} mb-3 mx-auto`}>
                <loc.icon size="large" />
              </div>
              <div className="text-sm text-gray-300">{loc.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Toggle */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-violet-500/20">
          <button
            onClick={() => setShowServices(!showServices)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-violet-400" />
              <h3 className="text-xl font-bold">{language === 'et' ? 'Meie teenused' : 'Наши услуги'}</h3>
            </div>
            <ArrowRight className={`w-5 h-5 transition-transform ${showServices ? 'rotate-90' : ''}`} />
          </button>
          
          {showServices && (
            <div className="mt-6 grid md:grid-cols-2 gap-4 animate-fadeIn">
              {/* Web Design */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--web">
                  <WebFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'Veebilehtede disain' : 'Дизайн сайтов'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Loome veebilehti inspireerival lokatsioonis' : 'Создаём сайты на вдохновляющей локации'}</div>
                </div>
              </div>

              {/* UI/UX Apps */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--app">
                  <SmartphoneFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'UI/UX rakendused' : 'UI/UX приложения'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Kasutajaliideste disain' : 'Дизайн пользовательских интерфейсов'}</div>
                </div>
              </div>

              {/* Photo & Video */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--photo">
                  <CameraFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'Foto & video' : 'Фото и видео'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Professionaalne sisu loomine' : 'Профессиональный контент'}</div>
                </div>
              </div>

              {/* Branding */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--brand">
                  <PaletteFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'Bränding' : 'Брендинг'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Logo, stiiliraamat, identiteet' : 'Логотип, стайлгайд, айдентика'}</div>
                </div>
              </div>

              {/* Drone */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--drone">
                  <DroneFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'Droonivõtted' : 'Дрон-съёмка'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Aerofotograafia ja video' : 'Аэрофотосъёмка и видео'}</div>
                </div>
              </div>

              {/* Creative Sessions */}
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-4 group hover:bg-black/30 transition-all">
                <div className="service-icon service-icon--creative">
                  <LightbulbFilledIcon size="large" />
                </div>
                <div>
                  <div className="font-semibold text-violet-300">{language === 'et' ? 'Loovseansid' : 'Креативные сессии'}</div>
                  <div className="text-sm text-gray-400">{language === 'et' ? 'Ajurünnakud ja ideede genereerimine' : 'Мозговые штурмы и генерация идей'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {language === 'et' ? 'Vali oma tase' : 'Выберите уровень поддержки'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-2">
            {language === 'et' ? 'Iga panus aitab meil bussi teoks teha' : 'Каждый вклад помогает нам воплотить автобус в реальность'}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const isPopular = reward.popular;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-br rounded-xl p-4 md:p-6 border-2 transition-all hover:scale-105 relative ${
                  isPopular 
                    ? 'border-yellow-500/50 hover:border-yellow-500 shadow-xl shadow-yellow-500/20' 
                    : 'border-violet-500/20 hover:border-violet-500/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'et' ? 'Populaarseim' : 'Популярный выбор'}
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${isPopular ? 'bg-yellow-600/30' : 'bg-violet-600/30'}`}>
                    <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-400' : 'text-violet-400'}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{language === 'et' ? 'Alates' : 'От'}</div>
                    <div className={`text-2xl font-bold ${isPopular ? 'text-yellow-400' : 'text-violet-400'}`}>
                      €{reward.amount}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-3">{reward.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 min-h-[80px]">{reward.description}</p>
                
                <div className="mb-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{reward.backers} {language === 'et' ? 'toetajat' : 'спонсоров'}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSupport(reward.amount, index)}
                  variant={isPopular ? "accent" : "default"}
                  shape="flat"
                  className={`w-full ${selectedReward === index ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''}`}
                  style={{ '--color-primary': '#8b5cf6', '--color-accent': '#eab308' } as React.CSSProperties}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {language === 'et' ? 'Toeta €' : 'Поддержать €'}{reward.amount}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 rounded-xl p-6 border border-violet-500/30">
          <h3 className="text-xl font-bold text-violet-300 mb-6 text-center">
            {language === 'et' ? 'Kuhu läheb teie toetus?' : 'Куда пойдёт ваша поддержка?'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: language === 'et' ? 'Bussi ost' : 'Покупка автобуса', amount: '€20,000', percent: 31 },
              { label: language === 'et' ? 'Ümberehitus' : 'Переоборудование', amount: '€15,000', percent: 23 },
              { label: language === 'et' ? 'Tehnika' : 'Оборудование', amount: '€20,000', percent: 31 },
              { label: language === 'et' ? 'Turundus & juriidika' : 'Маркетинг и юридика', amount: '€10,000', percent: 15 },
            ].map((item, idx) => (
              <div key={idx} className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-violet-400 font-bold">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">{item.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-violet-300">
            {language === 'et' ? 'Ajakava' : 'Таймлайн'}
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {[
            { month: language === 'et' ? 'Kuud 1-2' : 'Месяц 1-2', task: language === 'et' ? 'Bussi ost ja ümberehitus' : 'Покупка и переоборудование' },
            { month: language === 'et' ? 'Kuu 3' : 'Месяц 3', task: language === 'et' ? 'Tehnika ja juriidika' : 'Оборудование и юридика' },
            { month: language === 'et' ? 'Kuu 4' : 'Месяц 4', task: language === 'et' ? 'Veebileht ja turundus' : 'Сайт и маркетинг' },
            { month: language === 'et' ? 'Kuu 5' : 'Месяц 5', task: language === 'et' ? 'Testprojektid' : 'Тестовые проекты' },
            { month: language === 'et' ? 'Kuu 6+' : 'Месяц 6+', task: language === 'et' ? 'Täiskäivitus!' : 'Полный запуск!' },
          ].map((item, idx) => (
            <div key={idx} className="flex md:flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-sm">
                {idx + 1}
              </div>
              <div>
                <div className="text-sm font-semibold text-violet-300">{item.month}</div>
                <div className="text-xs text-gray-400">{item.task}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16 mb-8 px-4">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-violet-500/20">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-400" />
              <h3 className="text-xl font-bold">{language === 'et' ? 'Korduma kippuvad küsimused' : 'Часто задаваемые вопросы'}</h3>
            </div>
            <ArrowRight className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-90' : ''}`} />
          </button>
          
          {showFAQ && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {[
                { 
                  q: language === 'et' ? 'Kuhu te sõita saate?' : 'Куда вы можете приехать?', 
                  a: language === 'et' ? 'Töötame kogu Eestis ja naabrimaades. Pikem sõit võib kaasata lisakulu.' : 'Работаем по всей Эстонии и соседним странам. Дальние поездки могут включать дополнительную оплату.' 
                },
                { 
                  q: language === 'et' ? 'Mis juhtub halva ilmaga?' : 'Что если плохая погода?', 
                  a: language === 'et' ? 'Buss on täielikult varustatud kliimakontrolliga. Lisaks on meil varulokatsioonid kaetud aladel.' : 'Автобус полностью оснащён климат-контролем. Также есть резервные локации под крышей.' 
                },
                { 
                  q: language === 'et' ? 'Kas saab broneerida mitmeks päevaks?' : 'Можно забронировать на несколько дней?', 
                  a: language === 'et' ? 'Jah! Pakume päevapakette ja pikemaid projekte soodustusega.' : 'Да! Предлагаем дневные пакеты и длительные проекты со скидкой.' 
                },
                { 
                  q: language === 'et' ? 'Millal Creative Bus käivitub?' : 'Когда запустится Creative Bus?', 
                  a: language === 'et' ? 'Plaanime täiskäivitust 6 kuud pärast rahastamise eesmärgi saavutamist.' : 'Планируем полный запуск через 6 месяцев после достижения цели финансирования.' 
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-l-2 border-violet-500/50 pl-4">
                  <div className="font-semibold text-violet-300 mb-1">{faq.q}</div>
                  <div className="text-sm text-gray-400">{faq.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer totalBackers={totalBackers} language={language} />
    </div>
  );
}
