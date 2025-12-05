import { useState, useEffect } from 'react';
import { Star, Users, Clock, Shield, CheckCircle, TrendingUp, Zap, ArrowRight, ShoppingCart, Palette, BarChart3, HelpCircle, AlertCircle, Trophy, Cpu, Eye, EyeOff, X, RotateCcw, AlertTriangle, CheckCircle2, Paintbrush, Smartphone, Wifi, Battery, Cloud, Sparkles } from 'lucide-react';
import { SciFiBadge } from "./components/SciFiBadge";
import { QuickSupportButton } from "./components/QuickSupportButton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Button } from "./components/SciFiButton2";
import { Language, getTranslation } from "./locales";

// Project-specific styles
import './color-palette-project.css';

// Import the product image
import productImage from '../plan/gemini-image-2_Fine_art_photography_of_ColorPalette_Pro_device_as_an_artist_s_essential_tool_pl-0.jpg';

export default function ColorPaletteProProject() {
  const [language, setLanguage] = useState<Language>('et');
  const t = (key: keyof typeof import('./locales').translations.ru) => getTranslation(language, key);
  
  // Project-specific data
  const [progress] = useState(87500);
  const goal = 150000;
  const progressPercent = (progress / goal) * 100;
  const [timeLeft, setTimeLeft] = useState({ days: 28, hours: 14, minutes: 22 });
  const totalBackers = 534;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSupportedAmount, setLastSupportedAmount] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
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
    99: 'https://buy.stripe.com/test_colorpalette_99',
    149: 'https://buy.stripe.com/test_colorpalette_149',
    279: 'https://buy.stripe.com/test_colorpalette_279',
    499: 'https://buy.stripe.com/test_colorpalette_499',
    1999: 'https://buy.stripe.com/test_colorpalette_1999'
  };

  // Project-specific rewards based on Kickstarter tiers
  const rewards = [
    {
      amount: 99,
      title: language === 'et' ? 'Varajane Lind' : 'Ранняя Пташка',
      description: language === 'et' 
        ? 'ColorPalette Pro seade, standardne kandekott, eluaegne pilvehoiustus (5GB), kõik rakendused' 
        : 'ColorPalette Pro устройство, стандартный чехол, пожизненное облачное хранилище (5GB), все приложения',
      icon: Star,
      backers: 187,
      savings: '€80',
      limited: true,
      limitCount: 200
    },
    {
      amount: 149,
      title: language === 'et' ? 'Looja Väljaanne' : 'Издание Создателя',
      description: language === 'et' 
        ? 'Premium nahast kandekott, 20GB pilv, laiendatud kalibreerimiskaardid (24 värvi), prioriteetne tugi' 
        : 'Премиум кожаный чехол, 20GB облако, расширенный набор калибровки (24 цвета), приоритетная поддержка',
      icon: Paintbrush,
      backers: 234,
      savings: '€100',
      popular: true
    },
    {
      amount: 279,
      title: language === 'et' ? 'Pro Väljaanne' : 'Pro Издание',
      description: language === 'et' 
        ? 'Alumiiniumist kandekott, 100GB pilv, Pro funktsioonid, ColorChecker Pass, meeskonna funktsioonid (5 kohta)' 
        : 'Алюминиевый кейс, 100GB облако, Pro функции, ColorChecker Pass, командные функции (5 мест)',
      icon: Trophy,
      backers: 89,
      savings: '€220'
    },
    {
      amount: 499,
      title: language === 'et' ? 'Stuudio Pakett' : 'Студийный Пакет',
      description: language === 'et' 
        ? '2x seadet, 2x premium kotid, 500GB pilv, meeskond (25 kohta), kohandatud bränding' 
        : '2x устройства, 2x премиум чехлы, 500GB облако, команда (25 мест), кастомный брендинг',
      icon: Users,
      backers: 21,
      savings: '€499'
    },
    {
      amount: 1999,
      title: language === 'et' ? 'Ettevõte' : 'Корпорация',
      description: language === 'et' 
        ? '10x seadet, kohandatud kotid, piiramatu pilv ja meeskond, kohapealne koolitus, 3-aastane garantii' 
        : '10x устройств, кастомные чехлы, безлимитное облако и команда, обучение на месте, 3-летняя гарантия',
      icon: Cpu,
      backers: 3,
      savings: 'Custom'
    }
  ];

  const validateAmount = (amount: number | string): { valid: boolean; error?: string } => {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
    if (!numAmount || isNaN(numAmount)) return { valid: false, error: 'Введите сумму' };
    if (numAmount < 50) return { valid: false, error: 'Минимальная сумма €50' };
    if (numAmount > 5000) return { valid: false, error: 'Максимальная сумма €5000' };
    return { valid: true };
  };

  const handleSupport = (amount?: number, rewardIndex?: number) => {
    if (amount && amount >= 99) {
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
    mostPopularAmount: 149,
    bestValueAmount: 149,
    recommendedAmount: 149
  };

  // Project-specific content
  const projectTitle = language === 'et' ? 'ColorPalette Pro' : 'ColorPalette Pro';
  const projectDescription = language === 'et' 
    ? 'Maailma esimene kaasaskantav, professionaalse kvaliteediga värvipaleti generaator. Skaneeri mis tahes pinda, loo harmoonilised paletid koheselt.'
    : 'Первый в мире портативный генератор цветовых палитр профессионального уровня. Сканируйте любую поверхность, создавайте гармоничные палитры мгновенно.';

  // Features list
  const features = [
    { icon: Sparkles, label: language === 'et' ? 'ΔE < 2 täpsus' : 'ΔE < 2 точность' },
    { icon: Palette, label: language === 'et' ? '7+ paleti algoritmi' : '7+ алгоритмов палитр' },
    { icon: Wifi, label: language === 'et' ? 'WiFi 6 + Bluetooth 5.0' : 'WiFi 6 + Bluetooth 5.0' },
    { icon: Battery, label: language === 'et' ? '10+ tundi tööaeg' : '10+ часов работы' },
    { icon: Cloud, label: language === 'et' ? 'Pilve sünkroniseerimine' : 'Облачная синхронизация' },
    { icon: Smartphone, label: language === 'et' ? 'iOS & Android rakendused' : 'iOS & Android приложения' },
  ];

  return (
    <div className="min-h-screen text-white bg-grid-pattern color-palette-theme">
      {/* Header */}
      <div className="pt-0">
        <Header 
          links={[{ label: t('allProjects'), href: '/' }, { label: t('about'), href: '/about' }, { label: t('supportUs'), href: '/contact' }]} 
          title={projectTitle}
          githubUrl="https://github.com/colorpalette/colorpalette-pro"
          daysLeft={timeLeft.days}
          totalBackers={totalBackers}
          progressPercent={progressPercent}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* Undo notification */}
      {showUndo && lastAction && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[55] flex items-center gap-4 animate-fadeIn border-2 border-orange-400">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-semibold">Поддержка €{lastAction.amount} принята!</div>
            <div className="text-sm text-orange-100">Можно отменить в течение 10 секунд</div>
          </div>
          <button onClick={handleUndo} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Отменить
          </button>
          <button onClick={() => setShowUndo(false)} className="text-orange-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Success confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-2 border-orange-400 animate-scaleIn">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Спасибо за поддержку!</h3>
              {lastSupportedAmount && (
                <p className="text-lg text-orange-100 mb-4">
                  Ваш вклад: <span className="font-bold text-white">€{lastSupportedAmount}</span>
                </p>
              )}
              <button onClick={() => setShowConfirmation(false)} className="bg-white text-orange-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 color-cta-bar p-4 shadow-2xl z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-sm">
              <div className="color-cta-progress-value animate-pulse-once">€{progress.toLocaleString()} собрано</div>
              <div className="color-cta-progress-label">{progressPercent.toFixed(1)}% от цели</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm color-cta-timer">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Осталось <span className="font-bold">{timeLeft.days}д {timeLeft.hours}ч</span></span>
            </div>
          </div>
          <button onClick={() => handleSupport()} className="color-cta-button-main">
            <svg className="color-cta-button-frame" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path d="M10 10 L190 10 L200 25 L190 40 L10 40 L0 25 Z" className="color-cta-button-path" />
            </svg>
            <span className="color-cta-button-label">
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
                <SciFiBadge icon={<Palette className="w-5 h-5 animate-bounce-subtle" />} className="animate-fadeIn">
                  {language === 'et' ? 'IoT Disain' : 'IoT Дизайн'}
                </SciFiBadge>
                <SciFiBadge icon={<TrendingUp className="w-5 h-5" />} className="animate-fadeIn delay-100">
                  {totalBackers} {t('sponsors')}
                </SciFiBadge>
                <SciFiBadge icon={<Clock className="w-5 h-5 animate-pulse" />} className="animate-fadeIn delay-200">
                  {timeLeft.days} {t('daysLeft')}
                </SciFiBadge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent animate-fadeIn delay-300 text-left">
                {projectTitle}
              </h1>

              <div className="mb-6 animate-fadeIn delay-400">
                <p className="text-lg md:text-xl text-gray-300 mb-4 text-left">
                  {projectDescription}
                </p>
                <p className="text-base md:text-lg text-orange-300 mb-6 font-medium text-left">
                  {totalBackers > 0 
                    ? (language === 'et' 
                        ? `Liitu ${totalBackers} toetajaga, kes on juba projekti toetanud!` 
                        : `Присоединяйтесь к ${totalBackers} спонсорам, которые уже поддержали проект!`)
                    : (language === 'et' ? 'Saa esimeseks toetajaks!' : 'Станьте первым спонсором этого проекта!')}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 animate-fadeIn delay-500">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 bg-orange-900/20 rounded-lg px-3 py-2 border border-orange-500/20">
                      <Icon className="w-4 h-4 text-orange-400" />
                      <span className="text-sm text-gray-300">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Support Buttons */}
              <div className="flex flex-wrap items-start justify-start gap-3 mb-8 animate-fadeIn delay-700">
                <span className="text-sm text-gray-400 w-full mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <ShoppingCart className="w-4 h-4 text-orange-400" />
                  {language === 'et' ? 'Kiire toetus:' : 'Быстрая поддержка:'}
                </span>
                <div className="flex flex-wrap items-center justify-start gap-3">
                  {[99, 149, 279, 499].map((amount) => {
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
                      <div className="absolute top-full mt-2 left-0 bg-gray-800 border-2 border-orange-500 rounded-lg p-4 shadow-2xl z-10 min-w-[200px] animate-fadeIn">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setErrors([]); }}
                          placeholder={language === 'et' ? 'alates €50' : 'от €50'}
                          className="w-full bg-gray-900 border border-orange-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-400"
                        />
                        {errors.find(e => e.field === 'amount') && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {errors.find(e => e.field === 'amount')?.message}
                          </div>
                        )}
                        <button onClick={() => handleSupport()} className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-all">
                          {language === 'et' ? 'Kinnita' : 'Подтвердить'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Product Image */}
          <div className="relative">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-orange-500/30">
              <img 
                src={productImage} 
                alt="ColorPalette Pro" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-orange-300">{language === 'et' ? 'Jaemüügihind' : 'Розничная цена'}</div>
                    <div className="text-lg line-through text-gray-400">€179</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">{language === 'et' ? 'Early Bird hind' : 'Early Bird цена'}</div>
                    <div className="text-2xl font-bold text-white">€99</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto mt-8 md:mt-16 mb-8 md:mb-16 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-600/30 px-6 py-3 rounded-full border border-orange-500/50 mb-4">
            <Sparkles className="w-6 h-6 text-orange-400" />
            <span className="text-lg font-bold text-orange-400">
              {language === 'et' ? 'Kuidas see töötab' : 'Как это работает'}
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: language === 'et' ? 'Suuna & Skaneeri' : 'Наведи и Сканируй', desc: language === 'et' ? 'Suuna seade mis tahes pinnale' : 'Наведите устройство на любую поверхность' },
            { step: 2, title: language === 'et' ? 'Genereeri' : 'Генерируй', desc: language === 'et' ? 'Loo koheselt harmoonilisi palette' : 'Создайте гармоничные палитры мгновенно' },
            { step: 3, title: language === 'et' ? 'Kohanda' : 'Настрой', desc: language === 'et' ? 'Peenhäälestatavus enkoodritega' : 'Тонкая настройка с помощью энкодеров' },
            { step: 4, title: language === 'et' ? 'Salvesta & Jaga' : 'Сохрани и Поделись', desc: language === 'et' ? 'Ekspordi Figmasse, Adobesse, CSS-i' : 'Экспорт в Figma, Adobe, CSS' },
          ].map((item) => (
            <div key={item.step} className="text-center bg-gradient-to-br from-orange-900/30 to-amber-900/20 rounded-xl p-6 border border-orange-500/20">
              <div className="w-12 h-12 rounded-full bg-orange-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-orange-300 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="max-w-4xl mx-auto mb-8 md:mb-16 bg-gradient-to-br from-orange-900/40 to-amber-900/30 rounded-xl p-4 md:p-8 border border-orange-500/30">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-300">
            {language === 'et' ? 'Ideaalne kellele?' : 'Идеально для кого?'}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { emoji: '👨‍🎨', title: language === 'et' ? 'Graafilised disainerid' : 'Графические дизайнеры', desc: language === 'et' ? 'Loo brändipalette inspiratsioonist' : 'Создавайте палитры бренда из вдохновения' },
            { emoji: '🏠', title: language === 'et' ? 'Sisearhitektid' : 'Интерьерные дизайнеры', desc: language === 'et' ? 'Sobita värvid mööbli ja kangastega' : 'Сочетайте цвета с мебелью и тканями' },
            { emoji: '👗', title: language === 'et' ? 'Moedisainerid' : 'Модные дизайнеры', desc: language === 'et' ? 'Jäädvusta poodiumivärvid' : 'Захватывайте цвета подиумов' },
            { emoji: '💻', title: language === 'et' ? 'UI/UX disainerid' : 'UI/UX дизайнеры', desc: language === 'et' ? 'Loo ligipääsetavaid värvisüsteeme' : 'Создавайте доступные цветовые системы' },
            { emoji: '🎓', title: language === 'et' ? 'Üliõpilased' : 'Студенты', desc: language === 'et' ? 'Õpi värviteooriat praktiliselt' : 'Изучайте теорию цвета на практике' },
            { emoji: '🖌️', title: language === 'et' ? 'Kunstnikud' : 'Художники', desc: language === 'et' ? 'Ära kaota kunagi täiuslikku tooni' : 'Никогда не теряйте идеальный оттенок' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-black/20 rounded-lg p-4">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <div className="font-semibold text-orange-300">{item.title}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specs Toggle */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-orange-500/20">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-bold">{language === 'et' ? 'Tehnilised andmed' : 'Технические характеристики'}</h3>
            </div>
            <ArrowRight className={`w-5 h-5 transition-transform ${showSpecs ? 'rotate-90' : ''}`} />
          </button>
          
          {showSpecs && (
            <div className="mt-6 grid md:grid-cols-2 gap-6 animate-fadeIn">
              <div>
                <h4 className="font-semibold text-orange-300 mb-3">{language === 'et' ? 'Riistvara' : 'Аппаратное обеспечение'}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• <span className="text-gray-300">Sensor:</span> AS7341 11-Channel Spectral</li>
                  <li>• <span className="text-gray-300">Display:</span> 3.5" IPS Touchscreen (480x320)</li>
                  <li>• <span className="text-gray-300">Processor:</span> ESP32-S3 (WiFi 6, BT 5.0)</li>
                  <li>• <span className="text-gray-300">Battery:</span> 3000mAh LiPo (10+ hours)</li>
                  <li>• <span className="text-gray-300">Storage:</span> 32GB microSD + Cloud</li>
                  <li>• <span className="text-gray-300">Size:</span> 120 x 75 x 25mm</li>
                  <li>• <span className="text-gray-300">Weight:</span> 185g</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-300 mb-3">{language === 'et' ? 'Tarkvara' : 'Программное обеспечение'}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• {language === 'et' ? 'Reaalajas skaneerimine (60fps)' : 'Сканирование в реальном времени (60fps)'}</li>
                  <li>• {language === 'et' ? '7+ paleti algoritmi' : '7+ алгоритмов палитр'}</li>
                  <li>• {language === 'et' ? 'Värvipimeduse simulatsioon' : 'Симуляция дальтонизма'}</li>
                  <li>• {language === 'et' ? 'WCAG kontrasti kontroll' : 'Проверка контраста WCAG'}</li>
                  <li>• {language === 'et' ? '1000+ eelskaneeritud värvi' : '1000+ предсканированных цветов'}</li>
                  <li>• Export: ASE, ACO, SCSS, JSON, PNG</li>
                  <li>• API {language === 'et' ? 'kohandatud integratsioonideks' : 'для кастомных интеграций'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            {language === 'et' ? 'Vali oma tase' : 'Выберите уровень поддержки'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-2">
            {language === 'et' ? 'Piiratud koguses saadaval Early Bird hindadega' : 'Ограниченное количество по ценам Early Bird'}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const isPopular = reward.popular;
            const isLimited = reward.limited;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-br rounded-xl p-4 md:p-6 border-2 transition-all hover:scale-105 relative ${
                  isPopular 
                    ? 'border-yellow-500/50 hover:border-yellow-500 shadow-xl shadow-yellow-500/20' 
                    : 'border-orange-500/20 hover:border-orange-500/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'et' ? 'Populaarseim' : 'Популярный выбор'}
                  </div>
                )}
                {isLimited && (
                  <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'et' ? `Piiratud: ${reward.limitCount}` : `Лимит: ${reward.limitCount}`}
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${isPopular ? 'bg-yellow-600/30' : 'bg-orange-600/30'}`}>
                    <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-400' : 'text-orange-400'}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400">{language === 'et' ? 'Säästa' : 'Экономия'} {reward.savings}</div>
                    <div className={`text-2xl font-bold ${isPopular ? 'text-yellow-400' : 'text-orange-400'}`}>
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
                  <div className="text-xs text-gray-500">
                    {language === 'et' ? 'Tarne: August 2026' : 'Доставка: Август 2026'}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSupport(reward.amount, index)}
                  variant={isPopular ? "accent" : "default"}
                  shape="flat"
                  className={`w-full ${selectedReward === index ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''}`}
                  style={{ '--color-primary': '#f97316', '--color-accent': '#eab308' } as React.CSSProperties}
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

      {/* Stretch Goals */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/20 rounded-xl p-6 border border-orange-500/30">
          <h3 className="text-xl font-bold text-orange-300 mb-6 text-center">
            {language === 'et' ? 'Venitamise eesmärgid' : 'Stretch Goals'}
          </h3>
          <div className="space-y-4">
            {[
              { goal: 50000, unlocked: true, items: [language === 'et' ? 'Tasuta ekraanikaitsekile' : 'Бесплатная защитная пленка', language === 'et' ? 'Procreate & Affinity eksport' : 'Экспорт в Procreate & Affinity'] },
              { goal: 100000, unlocked: false, items: [language === 'et' ? 'Ambient light režiim' : 'Режим окружающего света', language === 'et' ? 'Hääljuhtimine' : 'Голосовое управление', language === 'et' ? 'AI värvinimetused' : 'AI названия цветов'] },
              { goal: 250000, unlocked: false, items: [language === 'et' ? 'Täiendatud sensor' : 'Улучшенный сенсор', language === 'et' ? 'Juhtmeta laadimine' : 'Беспроводная зарядка', language === 'et' ? 'Desktop rakendused' : 'Десктоп приложения'] },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg ${item.unlocked ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-800/30 border border-gray-600/30'}`}>
                <div className={`text-lg font-bold ${item.unlocked ? 'text-green-400' : 'text-gray-500'}`}>
                  €{item.goal.toLocaleString()}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {item.items.map((text, i) => (
                      <span key={i} className={`text-sm px-2 py-1 rounded ${item.unlocked ? 'bg-green-600/30 text-green-300' : 'bg-gray-700/30 text-gray-400'}`}>
                        {item.unlocked ? '✅' : '🔓'} {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16 mb-8 px-4">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-orange-500/20">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              <h3 className="text-xl font-bold">{language === 'et' ? 'Korduma kippuvad küsimused' : 'Часто задаваемые вопросы'}</h3>
            </div>
            <ArrowRight className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-90' : ''}`} />
          </button>
          
          {showFAQ && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {[
                { 
                  q: language === 'et' ? 'Kui täpne see on võrreldes professionaalsete tööriistadega?' : 'Насколько это точно по сравнению с профессиональными инструментами?', 
                  a: language === 'et' ? 'Meie ΔE < 2 täpsus vastab seadmetele, mis maksavad €2000+. Ideaalne 99% disainitöödeks.' : 'Наша точность ΔE < 2 соответствует устройствам за €2000+. Идеально для 99% дизайнерских работ.' 
                },
                { 
                  q: language === 'et' ? 'Kas see töötab kõigil pindadel?' : 'Работает ли это на всех поверхностях?', 
                  a: language === 'et' ? 'Jah! Kangas, puit, metall, plast, paber, ekraanid (kalibreerimisega) ja palju muud. 95%+ pindadel.' : 'Да! Ткань, дерево, металл, пластик, бумага, экраны (с калибровкой) и многое другое. Работает на 95%+ поверхностей.' 
                },
                { 
                  q: language === 'et' ? 'Kas saan kasutada offline režiimis?' : 'Можно ли использовать офлайн?', 
                  a: language === 'et' ? 'Absoluutselt! Täisfunktsionaalsus offline. Sünkroniseeri kui ühendatud.' : 'Абсолютно! Полная функциональность офлайн. Синхронизация при подключении.' 
                },
                { 
                  q: language === 'et' ? 'Kas on tellimustasu?' : 'Есть ли подписка?', 
                  a: language === 'et' ? 'Ei! Ühekordne ost sisaldab eluaegset juurdepääsu põhifunktsioonidele.' : 'Нет! Единоразовая покупка включает пожизненный доступ к основным функциям.' 
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-l-2 border-orange-500/50 pl-4">
                  <div className="font-semibold text-orange-300 mb-1">{faq.q}</div>
                  <div className="text-sm text-gray-400">{faq.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Press Section */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-400 mb-6">
            {language === 'et' ? 'Mida ajakirjandus ütleb' : 'Что пишет пресса'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: language === 'et' ? '"Võib revolutsioneerida, kuidas disainerid värviga töötavad"' : '"Может революционизировать работу дизайнеров с цветом"', source: 'TechCrunch' },
              { quote: language === 'et' ? '"Lõpuks professionaalne värvitööriist tarbijahinnaga"' : '"Наконец профессиональный инструмент по потребительской цене"', source: 'The Verge' },
              { quote: language === 'et' ? '"Seade, mida olen oodanud"' : '"Устройство, которое я ждал"', source: 'Adobe Create' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-lg p-4 border border-orange-500/10">
                <p className="text-sm text-gray-300 italic mb-2">{item.quote}</p>
                <p className="text-xs text-orange-400 font-semibold">— {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer totalBackers={totalBackers} language={language} />
    </div>
  );
}
