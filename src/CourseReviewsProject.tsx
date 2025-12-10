import { useState, useEffect } from 'react';
import { Star, Users, Clock, CheckCircle, Zap, ArrowRight, ShoppingCart, HelpCircle, Trophy, BookOpen, Eye, EyeOff, X, RotateCcw, AlertTriangle, CheckCircle2, GraduationCap, MessageSquare, ThumbsUp } from 'lucide-react';
import { QuickSupportButton } from "./components/QuickSupportButton";
import { CourseReviewsHeader } from "./components/CourseReviewsHeader";
import { CourseReviewsFooter } from "./components/CourseReviewsFooter";
import { Language, getTranslation } from "./locales";
import classesReviewsImage from "./classes-reviews.jpg";

// Project-specific styles
import './course-reviews-project.css';
import './components/course-reviews-buttons.css';

export default function CourseReviewsProject() {
  const [language, setLanguage] = useState<Language>('et');
  const t = (key: keyof typeof import('./locales').translations.ru) => getTranslation(language, key);
  
  // Project-specific data - CHANGE THESE VALUES
  const [progress] = useState(1250);
  const goal = 30000;
  const progressPercent = (progress / goal) * 100;
  const [timeLeft, setTimeLeft] = useState({ days: 22, hours: 10, minutes: 45 });
  const totalBackers = 45;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSupportedAmount, setLastSupportedAmount] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
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

  // Payment links - UPDATE FOR THIS PROJECT
  const paymentLinks: Record<number, string> = {
    10: 'https://buy.stripe.com/test_placeholder_10',
    25: 'https://buy.stripe.com/test_placeholder_25',
    50: 'https://buy.stripe.com/test_placeholder_50',
    100: 'https://buy.stripe.com/test_placeholder_100',
    200: 'https://buy.stripe.com/test_placeholder_200'
  };

  // Project-specific rewards - based on monetization plan
  const rewards = [
    {
      amount: 10,
      title: language === 'et' ? 'Varajane toetaja' : 'Ранний спонсор',
      description: language === 'et' 
        ? 'Eksklusiivne juurdepääs beetaversioonile + tänuplatvormi leheküljel + 3 kuud tasuta Premium liikmesus (väärtus €21)'
        : 'Эксклюзивный доступ к бета-версии + благодарность на странице платформы + 3 месяца бесплатного Premium членства (стоимость €21)',
      icon: Star,
      backers: 45
    },
    {
      amount: 25,
      title: language === 'et' ? 'Aktiivne kasutaja' : 'Активный пользователь',
      description: language === 'et' 
        ? 'Kõik eelmise taseme hüved + 12 kuud Premium liikmesus (väärtus €84) + prioriteetne juurdepääs uutele funktsioonidele + võimalus lisada arvustusi prioriteediga'
        : 'Все преимущества предыдущего уровня + 12 месяцев Premium членства (стоимость €84) + приоритетный доступ к новым функциям + возможность добавлять отзывы с приоритетом',
      icon: MessageSquare,
      backers: 67
    },
    {
      amount: 50,
      title: language === 'et' ? 'Premium liige' : 'Премиум участник',
      description: language === 'et' 
        ? 'Kõik eelmised hüved + eluaegne Premium liikmesus (väärtus €600+) + AI-soovitused kursustele + statistika tööhõive kohta + ligipääs suletud kogukonnale lõpetajatele'
        : 'Все предыдущие преимущества + пожизненное Premium членство (стоимость €600+) + AI-рекомендации курсов + статистика трудоустройства + доступ к закрытому сообществу выпускников',
      icon: ThumbsUp,
      backers: 28
    },
    {
      amount: 100,
      title: language === 'et' ? 'Toetaja' : 'Меценат',
      description: language === 'et' 
        ? 'Kõik eelmised hüved + teie nimi platvormi asutajate nimekirjas + isiklik konsultatsioon kursuste valikul + eriline "Founder" märgis profiilil'
        : 'Все предыдущие преимущества + ваше имя в списке основателей платформы + персональная консультация по выбору курсов + специальный значок "Founder" в профиле',
      icon: Trophy,
      backers: 12
    },
    {
      amount: 200,
      title: language === 'et' ? 'Kaasasutaja' : 'Соучредитель',
      description: language === 'et' 
        ? 'Kõik eelmised hüved + osalemine platvormi arendamise otsustes + kord kvartalis kohtumised meeskonnaga + VIP staatuse ikoon + esimene juurdepääs uutele funktsioonidele'
        : 'Все предыдущие преимущества + участие в решениях по развитию платформы + ежеквартальные встречи с командой + VIP статус с особым значком + первый доступ ко всем новым функциям',
      icon: GraduationCap,
      backers: 4
    }
  ];

  const validateAmount = (amount: number | string): { valid: boolean; error?: string } => {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
    if (!numAmount || isNaN(numAmount)) return { valid: false, error: 'Введите сумму' };
    if (numAmount < 5) return { valid: false, error: 'Минимальная сумма €5' };
    if (numAmount > 1000) return { valid: false, error: 'Максимальная сумма €1000' };
    return { valid: true };
  };

  const handleSupport = (amount?: number, rewardIndex?: number) => {
    if (amount && amount >= 100) {
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
    mostPopularAmount: 25,
    bestValueAmount: 25,
    recommendedAmount: 25
  };

  // Project-specific content - CHANGE THESE
  const projectTitle = 'TarkValik';
  const projectDescription = language === 'et' 
    ? 'Riigikontroll tuvastas: vähem kui pooled kursuste lõpetajad leiavad tööd õpitud valdkonnas. Meie platvorm annab sulle ausad arvustused tõelistelt üliõpilastelt, et teha õige valik enne tuhandete eurode investeeringut.'
    : 'Riigikontroll установил: менее половины выпускников курсов находят работу в изученной области. Наша платформа даёт вам честные отзывы от реальных студентов, чтобы сделать правильный выбор до инвестиции тысяч евро.';
  
  const projectSubDescription = language === 'et'
    ? 'Alates 2023. aastast pole Töötukassa kursuste otsing enam avalik. Meie platvorm lahendab riikliku ulatusega probleemi, pakkudes läbipaistvat infot 500+ koolituse pakkuja kohta.'
    : 'С 2023 года поиск курсов Töötukassa больше не публичен. Наша платформа решает проблему государственного масштаба, предоставляя прозрачную информацию о 500+ провайдерах обучения.';

  return (
    <div className="min-h-screen text-white bg-grid-pattern course-reviews-theme">
      {/* Header */}
      <div className="pt-0">
        <CourseReviewsHeader 
          links={[{ label: t('allProjects'), href: '/' }]} 
          title={projectTitle}
          githubUrl="https://github.com/visualGravitySense/CourseReviews"
          daysLeft={timeLeft.days}
          totalBackers={totalBackers}
          progressPercent={progressPercent}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* Undo notification */}
      {showUndo && lastAction && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[55] flex items-center gap-4 animate-fadeIn border-2 border-purple-400">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-semibold">Поддержка €{lastAction.amount} принята!</div>
            <div className="text-sm text-purple-100">Можно отменить в течение 10 секунд</div>
          </div>
          <button onClick={handleUndo} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Отменить
          </button>
          <button onClick={() => setShowUndo(false)} className="text-purple-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Success confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-2 border-green-400 animate-scaleIn">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Спасибо за поддержку!</h3>
              {lastSupportedAmount && (
                <p className="text-lg text-green-100 mb-4">
                  Ваш вклад: <span className="font-bold text-white">€{lastSupportedAmount}</span>
                </p>
              )}
              <button onClick={() => setShowConfirmation(false)} className="bg-white text-green-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 sci-cta-bar p-4 shadow-2xl z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-sm">
              <div className="sci-cta-progress-value animate-pulse-once">€{progress.toLocaleString()} собрано</div>
              <div className="sci-cta-progress-label">{progressPercent.toFixed(1)}% от цели</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm sci-cta-timer">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Осталось <span className="font-bold">{timeLeft.days}д {timeLeft.hours}ч</span></span>
            </div>
          </div>
          <button onClick={() => handleSupport()} className="cr-btn-primary">
            <Zap className="w-5 h-5" />
            {language === 'et' ? 'Toeta projekti' : 'Поддержать проект'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-start gap-3 mb-6">
                {/* <SciFiBadge icon={<GraduationCap className="w-5 h-5 animate-bounce-subtle" />} className="animate-fadeIn">
                  {language === 'et' ? 'Haridus' : 'Образование'}
                </SciFiBadge> */}
                <div className="cr-badge-verified animate-fadeIn delay-100">
                  <CheckCircle className="cr-badge-verified-icon" />
                  {totalBackers} {t('sponsors')}
                </div>
                {/* <SciFiBadge icon={<Clock className="w-5 h-5 animate-pulse" />} className="animate-fadeIn delay-200">
                  {timeLeft.days} {t('daysLeft')}
                </SciFiBadge> */}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent animate-fadeIn delay-300 text-left">
                {projectTitle}
              </h1>

              <div className="mb-6 animate-fadeIn delay-400">
                <p className="text-lg md:text-xl text-gray-300 mb-4 text-left leading-relaxed">
                  {projectDescription}
                </p>
                <p className="text-base md:text-lg text-purple-300/90 mb-4 text-left leading-relaxed">
                  {projectSubDescription}
                </p>
                <p className="text-base md:text-lg text-yellow-300 mb-6 font-semibold text-left">
                  {totalBackers > 0 
                    ? (language === 'et' 
                        ? `🚀 Liituge ${totalBackers} toetajaga, kes usuvad läbipaistvusse hariduses!`
                        : `🚀 Присоединяйтесь к ${totalBackers} спонсорам, которые верят в прозрачность образования!`)
                    : (language === 'et' 
                        ? '🚀 Ole esimene, kes toetab läbipaistvat haridust!'
                        : '🚀 Станьте первым, кто поддержит прозрачность образования!')}
                </p>
              </div>

              {/* Quick Support Buttons */}
              <div className="flex flex-wrap items-start justify-start gap-3 mb-8 animate-fadeIn delay-700">
                <span className="text-sm text-gray-400 w-full mb-2 flex items-center gap-2">
                  <span className="inline-icon-small">
                    <Zap className="w-3 h-3 text-yellow-400" />
                  </span>
                  <span className="inline-icon-small">
                    <ShoppingCart className="w-3 h-3 text-purple-400" />
                  </span>
                  {language === 'et' ? 'Hetketoetus:' : 'Быстрая поддержка:'}
                </span>
                <div className="flex flex-wrap items-center justify-start gap-3">
                  {[10, 25, 50, 100].map((amount) => {
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
                      <span>Своя сумма</span>
                    </QuickSupportButton>
                    {showCustomInput && (
                      <div className="absolute top-full mt-2 left-0 bg-gray-800 border-2 border-purple-500 rounded-lg p-4 shadow-2xl z-10 min-w-[200px] animate-fadeIn">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setErrors([]); }}
                          placeholder="от €5"
                          className="w-full bg-gray-900 border border-purple-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                        />
                        {errors.find(e => e.field === 'amount') && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {errors.find(e => e.field === 'amount')?.message}
                          </div>
                        )}
                        <button onClick={() => handleSupport()} className="w-full mt-3 cr-btn-primary">
                          {language === 'et' ? 'Kinnita' : 'Подтвердить'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Project Image/Preview */}
          <div className="relative">
            <div 
              className="relative w-full h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden border border-purple-500/30 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${classesReviewsImage})` }}
            >
              {/* Overlay для лучшей читаемости */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 rounded-xl"></div>
              
              {/* Content overlay */}
              <div className="relative z-10 text-center p-8">
                <div className="hero-main-icon mx-auto mb-4">
                  <GraduationCap className="w-12 h-12 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-2" style={{ textShadow: '0 0 12px rgba(34, 211, 238, 0.8)' }}>
                  TarkValik
                </h3>
                <p className="text-gray-200" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                  {language === 'et' ? 'Aus platvorm hariduse hindamiseks' : 'Честная платформа для оценки образования'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Project Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-16 mb-8 md:mb-16 bg-gradient-to-br to-purple-900/40 rounded-xl p-4 md:p-8 border border-purple-500/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-600/30 px-6 py-3 rounded-full border border-purple-500/50 mb-4">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold text-purple-400">
              {language === 'et' ? 'Projekti kohta' : 'О проекте'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-300">
            {language === 'et' ? 'Miks me seda teeme?' : 'Зачем мы это делаем?'}
          </h2>
          
          <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto text-left">
            <p>
              {language === 'et' 
                ? <>Riigikontroll tuvastas 2022. aastal: Töötukassa ei kontrolli kursuste kvaliteeti ega kontrolli, kas need tõesti aitavad leida tööd. <strong className="text-yellow-300">Vähem kui pooled kursuste lõpetajad leiavad tööd õpitud valdkonnas.</strong></>
                : <>Riigikontroll (Госконтроль) установил в 2022 году: Töötukassa не контролирует качество курсов и не проверяет, действительно ли они помогают найти работу. <strong className="text-yellow-300">Менее половины выпускников курсов находят работу в изученной области.</strong></>}
            </p>
            
            <p>
              {language === 'et'
                ? <>Alates 2023. aastast pole kursuste otsing enam avalik. Inimesed ei saa võrrelda enne registreerumist ja peavad tuginema ainult konsultandi soovitustele. <strong className="text-purple-300">500+ erineva kvaliteediga koolituse pakkuja</strong> – kuid kuidas teha õige valik?</>
                : <>С 2023 года поиск курсов больше не публичен. Люди не могут сравнивать до регистрации и должны полагаться только на рекомендации консультанта. <strong className="text-purple-300">500+ провайдеров обучения</strong> с очень разным качеством – но как сделать правильный выбор?</>}
            </p>
            
            <p className="text-purple-200 font-medium pt-2">
              {language === 'et'
                ? 'Meie platvorm lahendab riikliku ulatusega probleemi: pakume läbipaistvat, kontrollitud infot tõelistelt üliõpilastelt, et inimesed saaksid teha teadlikke otsuseid enne tuhandete eurode investeeringut haridusse.'
                : 'Наша платформа решает проблему государственного масштаба: мы предоставляем прозрачную, проверенную информацию от реальных студентов, чтобы люди могли принимать осознанные решения до инвестиции тысяч евро в образование.'}
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            {language === 'et' ? 'Vali oma toetuse tase' : 'Выберите уровень поддержки'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-2">
            {language === 'et' ? 'Iga panus toob eksklusiivse hüve' : 'Каждый вклад приносит эксклюзивную награду'}
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const isPopular = reward.amount === 25;
            return (
              <div 
                key={index}
                className={`bg-gradient-to-br rounded-xl p-4 md:p-6 border-2 transition-all hover:scale-105 relative ${
                  isPopular 
                    ? 'border-yellow-500/50 hover:border-yellow-500 shadow-xl shadow-yellow-500/20' 
                    : 'border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="cr-badge-recommended">
                      <Star className="cr-badge-recommended-icon w-3.5 h-3.5 fill-current" />
                      {language === 'et' ? 'Soovitatud' : 'Рекомендуем'}
                    </div>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`reward-icon-wrapper ${isPopular ? 'bg-yellow-600/30 border-yellow-500/50' : 'bg-purple-600/30 border-purple-500/50'}`}>
                    <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-400' : 'text-purple-400'}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{language === 'et' ? 'Alates' : 'От'}</div>
                    <div className={`text-2xl font-bold ${isPopular ? 'text-yellow-400' : 'text-purple-400'}`}>
                      €{reward.amount}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-3">{reward.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 min-h-[60px]">{reward.description}</p>
                
                <div className="mb-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="inline-icon-small">
                      <Users className="w-3 h-3" />
                    </span>
                    <span>{reward.backers} {language === 'et' ? 'toetajat' : 'спонсоров'}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSupport(reward.amount, index)}
                  className={`w-full cr-btn-primary ${selectedReward === index ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {language === 'et' ? 'Toeta €' : 'Поддержать €'}{reward.amount}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16 mb-8 px-4">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold">{language === 'et' ? 'Korduma kippuvad küsimused' : 'Часто задаваемые вопросы'}</h3>
            </div>
            <ArrowRight className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-90' : ''}`} />
          </button>
          
          {showFAQ && (
            <div className="mt-6 space-y-4 animate-fadeIn">
              {[
                { 
                  q: language === 'et' ? 'Millal platvorm käivitub?' : 'Когда запустится платформа?', 
                  a: language === 'et' ? 'Plaanime käivitada beetaversiooni 3 kuu jooksul pärast rahastamise eesmärgi saavutamist.' : 'Планируем запустить бета-версию в течение 3 месяцев после достижения цели финансирования.' 
                },
                { 
                  q: language === 'et' ? 'Kuidas kontrollitakse arvustuste autentsust?' : 'Как проверяется подлинность отзывов?', 
                  a: language === 'et' ? 'Kasutame mitmeastmelist verifitseerimist: e-posti kinnitust, kursuse sertifikaate ja AI-põhist analüüsi.' : 'Используем многоступенчатую верификацию: подтверждение email, сертификаты курсов и AI-анализ.' 
                },
                { 
                  q: language === 'et' ? 'Mis juhtub, kui eesmärki ei saavutata?' : 'Что будет, если цель не будет достигнута?', 
                  a: language === 'et' ? 'Kõik toetused tagastatakse täies ulatuses.' : 'Все средства будут возвращены в полном объёме.' 
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-l-2 border-purple-500/50 pl-4">
                  <div className="font-semibold text-purple-300 mb-1">{faq.q}</div>
                  <div className="text-sm text-gray-400">{faq.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <CourseReviewsFooter totalBackers={totalBackers} language={language} />
    </div>
  );
}
