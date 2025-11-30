import { useState, useEffect } from 'react';
import { Music, Heart, Video, Headphones, Award, Users, Clock, Shield, CheckCircle, TrendingUp, Zap, Star, Sparkles, ArrowRight, Info, ShoppingCart, Percent, Target, BarChart3, HelpCircle, AlertCircle, ThumbsUp, Trophy, BookOpen, Eye, EyeOff, X, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SciFiButton } from "./components/SciFiButton";
import { SciFiDialog } from "./components/SciFiDialog";
import { SciFiBadge } from "./components/SciFiBadge";
import { QuickSupportButton } from "./components/QuickSupportButton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TextBlock } from "./components/TextBlock";
import { ProductCard } from "./components/ProductCard";


import { Frame } from "./components/Frame";
import { Button } from "./components/SciFiButton2";
              
              

export default function MusicCrowdfundingLanding() {
  const [progress] = useState(0);
  const goal = 500;
  const progressPercent = (progress / goal) * 100;
  const [timeLeft, setTimeLeft] = useState({ days: 23, hours: 14, minutes: 32 });
  const totalBackers = 0;
  const recentBackers: string[] = [];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSupportedAmount, setLastSupportedAmount] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [lastAction, setLastAction] = useState<{type: 'support', amount: number} | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [errors, setErrors] = useState<{field: string, message: string}[]>([]);
  
  // TIMING: Detect scroll for contextual cues
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate countdown timer - TIMING: Real-time urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const rewards = [
    {
      amount: 8,
      title: "Благодарность и цифровой буклет",
      description: "Красивая открытка с рукописными словами благодарности + цифровой буклет с текстами и переводом + обои для телефона с кадрами из клипа + личное спасибо в соцсетях",
      icon: Heart,
      backers: 0
    },
    {
      amount: 25,
      title: "Цифровой релиз",
      description: "Трек в студийном качестве FLAC/WAV + акустическая версия песни (только голос и инструмент) + видео 'как создавалась песня' + ноты/аккорды для тех, кто играет + имя в титрах",
      icon: Headphones,
      backers: 0
    },
    {
      amount: 50,
      title: "Премиум пакет",
      description: "Все предыдущее + печатный сборник текстов с красивым оформлением + рукописный лист с текстом песни + именное упоминание в благодарностях",
      icon: Video,
      backers: 0
    },
    {
      amount: 100,
      title: "Особая благодарность",
      description: "Все предыдущее + винил или CD в подарочной упаковке с автографом + персональное видеообращение от исполнителя + приглашение на живой концерт/запись",
      icon: Award,
      backers: 0
    },
    {
      amount: 150,
      title: "VIP поддержка",
      description: "Все предыдущее + частный мини-концерт онлайн + личная встреча с артистом + ваше имя вдохновило песню (соавторство)",
      icon: Users,
      backers: 0
    }
  ];

  // SYSTEM 2: Error prevention and validation
  const validateAmount = (amount: number | string): { valid: boolean; error?: string } => {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
    
    if (!numAmount || isNaN(numAmount)) {
      return { valid: false, error: 'Пожалуйста, введите сумму' };
    }
    if (numAmount < 5) {
      return { valid: false, error: 'Минимальная сумма: €5' };
    }
    if (numAmount > 1000) {
      return { valid: false, error: 'Максимальная сумма: €1,000' };
    }
    return { valid: true };
  };

  const handleSupport = (amount?: number, rewardIndex?: number) => {
    // SYSTEM 1: Quick path - no validation needed for preset amounts
    if (amount && amount >= 100) {
      executeSupport(amount, rewardIndex);
      return;
    }
    
    // SYSTEM 2: Custom amount needs validation
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
    // HABITS: Familiar cart/checkout pattern
    if (rewardIndex !== undefined) {
      setSelectedReward(rewardIndex);
    }
    
    // SYSTEM 2: Store action for undo capability
    if (amount) {
      setLastAction({ type: 'support', amount });
      setShowUndo(true);
    }
    
    // EXECUTION: Success feedback and confirmation
    setLastSupportedAmount(amount || null);
    setShowConfirmation(true);
    setErrors([]);
    
    // In real app, this would open payment modal with smooth transition
    console.log('Support clicked', amount);
    
    // Auto-hide confirmation after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedReward(null);
    }, 5000);
    
    // Auto-hide undo after 10 seconds
    setTimeout(() => {
      setShowUndo(false);
      setLastAction(null);
    }, 10000);
    
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SYSTEM 2: Undo capability
  const handleUndo = () => {
    if (lastAction) {
      setShowConfirmation(false);
      setLastAction(null);
      setShowUndo(false);
      setLastSupportedAmount(null);
      // In real app, this would cancel the payment/transaction
      console.log('Undo support:', lastAction.amount);
    }
  };
  
  // EVALUATION: Calculate value metrics (must be before heuristicMetrics)
  const valueMetrics = {
    progressPerBacker: totalBackers > 0 ? Math.round(progress / totalBackers) : 0,
    daysRemaining: timeLeft.days,
    averageContribution: totalBackers > 0 ? Math.round(progress / totalBackers) : 0,
    goalCompletion: progressPercent
  };
  
  // HEURISTICS: Calculate comparison metrics
  const heuristicMetrics = {
    mostPopularAmount: 25,
    bestValueAmount: 25, // Most backers per euro
    recommendedAmount: 25,
    averageAmount: valueMetrics.averageContribution || 25,
    completionRate: progressPercent,
    daysPerPercent: progressPercent < 100 ? (timeLeft.days / (100 - progressPercent)) * 100 : 0,
    backersNeeded: valueMetrics.averageContribution > 0 ? Math.ceil((goal - progress) / valueMetrics.averageContribution) : Math.ceil((goal - progress) / 25)
  };

  return (
    <div className="min-h-screen text-white bg-grid-pattern">
      {/* CUE: Top notification bar - Attention-grabbing cue */}
      {/* <div className="top-0 left-0 right-0 text-center py-2 z-50 shadow-lg animate-pulse">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>⚡ Осталось {timeLeft.days} дней! {totalBackers > 0 ? `Присоединяйтесь к ${totalBackers} спонсорам` : 'Станьте первым спонсором!'}</span>
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
      </div> */}

      {/* Header - Navigation */}
      <div className="pt-0">
        <Header 
          links={[{ label: 'Main', href: '/' }, { label: 'About', href: '/about' }, { label: 'Support Us', href: '/contact' }]} 
          title="Tiiva All"
          githubUrl="https://github.com/visualGravitySense/AlbertPetenberg"
          daysLeft={timeLeft.days}
          totalBackers={totalBackers}
          progressPercent={progressPercent}
        />
      </div>

      {/* SYSTEM 2: Undo notification - Error prevention */}
      {showUndo && lastAction && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[55] flex items-center gap-4 animate-fadeIn border-2 border-blue-400">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-semibold">Поддержка на €{lastAction.amount.toLocaleString()} принята</div>
            <div className="text-sm text-blue-100">Вы можете отменить в течение 10 секунд</div>
          </div>
          <button
            onClick={handleUndo}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Отменить
          </button>
          <button
            onClick={() => setShowUndo(false)}
            className="text-blue-100 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* EXECUTION: Success confirmation modal - SYSTEM 2: Detailed feedback */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-2 border-green-400 animate-scaleIn">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Спасибо за поддержку! 🎉</h3>
              {lastSupportedAmount && (
                <div className="space-y-2 mb-4">
                  <p className="text-lg text-green-100">
                    Ваш вклад: <span className="font-bold text-white">€{lastSupportedAmount.toLocaleString()}</span>
                  </p>
                  {/* SYSTEM 2: Detailed impact calculation */}
                  <div className="bg-green-700/30 rounded-lg p-3 text-sm text-green-100">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Ваш вклад к цели:</div>
                      <div className="font-bold">{(lastSupportedAmount / goal * 100).toFixed(2)}%</div>
                      <div>Новый прогресс:</div>
                      <div className="font-bold">{((progress + lastSupportedAmount) / goal * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-green-100 mb-6">
                Вы помогли приблизить нас к цели на {lastSupportedAmount ? ((lastSupportedAmount / goal) * 100).toFixed(1) : 'новый'}%!
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-white text-green-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all"
                >
                  Закрыть
                </button>
                {/* SYSTEM 1: Quick repeat action */}
                {lastSupportedAmount && (
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      handleSupport(lastSupportedAmount);
                    }}
                    className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-400 transition-all"
                  >
                    Поддержать еще
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky CTA Bar - CUE: Always visible prompt, ABILITY: Easy access */}
      <div className={`fixed bottom-0 left-0 right-0 sci-cta-bar p-4 shadow-2xl z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-sm">
              <div className="sci-cta-progress-value animate-pulse-once">€{progress.toLocaleString()} собрано</div>
              <div className="sci-cta-progress-label">{progressPercent.toFixed(1)}% от цели</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm sci-cta-timer">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Осталось: <span className="font-bold">{timeLeft.days}д {timeLeft.hours}ч</span></span>
            </div>
          </div>
          <button 
            onClick={() => handleSupport()}
            className="sci-cta-button-main"
          >
            <svg className="sci-cta-button-frame" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path d="M10 10 L190 10 L200 25 L190 40 L10 40 L0 25 Z" className="sci-cta-button-path" />
            </svg>
            <span className="sci-cta-button-label">
              <Zap className="w-5 h-5" />
              Поддержать проект
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Hero Section - Split Screen 50/50 */}
      <div className="container mx-auto px-4 py-12 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side: All Text and Content */}
          <div className="relative z-10">
            <div className="mb-8">
              {/* CUE: Animated badges - Visual attention grabbers */}
              <div className="flex flex-wrap items-center justify-start gap-3 mb-6">
                <SciFiBadge 
                  icon={<Music className="w-5 h-5 animate-bounce-subtle" />}
                  className="animate-fadeIn"
                >
                  Краудфандинг
                </SciFiBadge>
                <SciFiBadge 
                  icon={<TrendingUp className="w-5 h-5" />}
                  className="animate-fadeIn delay-100"
                >
                  {totalBackers} спонсоров
                </SciFiBadge>
                <SciFiBadge 
                  icon={<Clock className="w-5 h-5 animate-pulse" />}
                  className="animate-fadeIn delay-200"
                >
                  {timeLeft.days} дней до конца
                </SciFiBadge>
              </div>
              
              {/* REACTION: Emotional hook with visual appeal */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent animate-fadeIn delay-300 text-left">
                Tiiva All — Новая песня Альберта Плеттенберг
              </h1>

              {/* REACTION: Personalized emotional storytelling */}
              <div className="mb-6 animate-fadeIn delay-400">
                <p className="text-lg md:text-xl text-gray-300 mb-4 text-left">
                  Атмосферная композиция о доме и вечной любви. Профессиональная запись с участием талантливых эстонских музыкантов и создание визуального клипа мирового уровня.
                </p>
                <p className="text-base md:text-lg text-cyan-300 mb-6 font-medium text-left">
                  {totalBackers > 0 ? (
                    <>Присоединяйтесь к <span className="text-pink-400 font-bold">{totalBackers} людям</span>, которые уже помогают создать эту особенную музыку ✨</>
                  ) : (
                    <>Станьте первым, кто поможет создать эту особенную музыку ✨</>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-start justify-start gap-3 mb-8 animate-fadeIn delay-700">
                <span className="text-sm text-gray-400 w-full mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  ⚡ Быстрая поддержка одним кликом:
                </span>
                <div className="flex flex-wrap items-center justify-start gap-3">
                  {[8, 25, 50, 100].map((amount) => {
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
                            <span>€{amount.toLocaleString()}</span>
                            {isRecommended && <Star className="w-4 h-4 fill-current" />}
                            {isBestValue && (
                              <span className="text-xs bg-green-500/90 px-1.5 py-0.5 rounded text-white font-bold">
                                Лучшее
                              </span>
                            )}
                          </span>
                        </QuickSupportButton>
                        {/* SYSTEM 1: Visual feedback on hover */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-ping"></div>
                        {isRecommended && (
                          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-500 text-black px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-semibold shadow-lg z-20">
                            ⭐ Самый популярный
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* SYSTEM 2: Custom amount input with error handling */}
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
                      <div className="absolute top-full mt-2 left-0 bg-gray-800 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl z-10 min-w-[200px] animate-fadeIn">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setErrors(errors.filter(e => e.field !== 'amount'));
                          }}
                          placeholder="От €5"
                          className="w-full bg-gray-900 border border-cyan-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          min={5}
                          max={1000}
                        />
                        {errors.find(e => e.field === 'amount') && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {errors.find(e => e.field === 'amount')?.message}
                          </div>
                        )}
                        <button
                          onClick={() => handleSupport()}
                          className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-all"
                        >
                          Подтвердить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MOTIVATION: Recent backers social proof */}
              {totalBackers > 0 && (
                <div className="mb-8 bg-gray-800/30 rounded-xl p-6 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold">Недавние спонсоры</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {recentBackers.map((name, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-blue-600/20 px-3 py-2 rounded-lg border border-cyan-500/30">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
                          {name[0]}
                        </div>
                        <span className="text-sm">{name}</span>
                      </div>
                    ))}
                    {totalBackers > recentBackers.length && (
                      <div className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">И еще {totalBackers - recentBackers.length}...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Video Animation */}
          <div className="relative">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden">
              <video 
                src={new URL('./make_animation_1.mp4', import.meta.url).href}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
              {/* Optional overlay for better visual integration */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* About the Song Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-16 mb-8 md:mb-16 bg-gradient-to-br  to-blue-900/40 rounded-xl p-4 md:p-8 border-cyan-500/30 hover:border-cyan-400/50 transition-all">
          
          {/* Video Preview & About Song - Split Screen 50/50 */}
          <div className="max-w-6xl mx-auto mb-8 md:mb-12 grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Left: Video Preview with CYAN cyber style */}
            <div className="relative sci-video-container" style={{ padding: '8px' }}>
              <svg className="absolute inset-0 w-full " viewBox="0 0 200 120" preserveAspectRatio="none">
                <path 
                  d="M15 10 L185 10 L195 20 L190 30 L190 90 L195 100 L185 110 L15 110 L5 100 L10 90 L10 30 L5 20 Z" 
                  fill="rgba(0, 255, 255, 0.05)" 
                  stroke="cyan" 
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 8px cyan) drop-shadow(0 0 12px rgba(0, 255, 255, 0.4))' }}
                />
                {/* Decorative corner elements */}
                <path 
                  d="M15 10 L25 10 L20 20 L15 15 Z" 
                  fill="cyan" 
                  style={{ filter: 'drop-shadow(0 0 4px cyan)' }}
                />
                <path 
                  d="M185 10 L195 10 L190 20 L185 15 Z" 
                  fill="cyan" 
                  style={{ filter: 'drop-shadow(0 0 4px cyan)' }}
                />
                <path 
                  d="M15 110 L25 110 L20 100 L15 105 Z" 
                  fill="cyan" 
                  style={{ filter: 'drop-shadow(0 0 4px cyan)' }}
                />
                <path 
                  d="M185 110 L195 110 L190 100 L185 105 Z" 
                  fill="cyan" 
                  style={{ filter: 'drop-shadow(0 0 4px cyan)' }}
                />
              </svg>
              <div className="relative z-10 aspect-video bg-gray-900 rounded overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/KghgZkii32c?si=PuzqwKVYCYbmmfAB"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                {/* Overlay glow effect on hover */}
                <div className="absolute inset-0 bg-cyan-500/0 hover:bg-cyan-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Right: About Song */}
            <div className="flex flex-col justify-center mt-4 md:mt-0">
              <div className="inline-flex items-center gap-2 bg-cyan-600/30 px-4 md:px-6 py-2 md:py-3 rounded-full border border-cyan-500/50 mb-4 w-fit">
                <Music className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" style={{ filter: 'drop-shadow(0 0 4px cyan)' }} />
                <span className="text-base md:text-lg font-bold text-cyan-400" style={{ textShadow: '0 0 8px cyan' }}>О песне</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300" style={{ textShadow: '0 0 8px cyan' }}>Tiiva All — Под крылом</h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                Песня рассказывает о том, как мы находим утешение и силу под защитой близких, 
                как река несет нас через жизненные испытания, а свет любви рассеивает все тучи.
              </p>
              <p className="text-md text-cyan-300 mt-4 font-medium" style={{ textShadow: '0 0 6px rgba(0, 255, 255, 0.5)' }}>
                "Särab su valgus minule ja tuul viib pilved eemale" — 
                "Твой свет сияет мне, и ветер уносит облака прочь"
              </p>
            </div>
          </div>
        </div>

        {/* Team Section with CYAN cyber style */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-16 px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-cyan-400" style={{ textShadow: '0 0 12px cyan' }}>
              Команда проекта
            </h2>
            <p className="text-sm md:text-base text-gray-300" style={{ textShadow: '0 0 4px rgba(0, 255, 255, 0.3)' }}>
              Профессиональные музыканты и звукорежиссеры с мировым опытом
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { 
                name: "Альберт Петенберг", 
                role: "Композитор и автор музыки", 
                desc: "Создатель мелодии, которая трогает сердце",
                icon: Music,
                color: "cyan"
              },
              { 
                name: "Ребекка Контус", 
                role: "Автор текста", 
                desc: "Поэтесса, написавшая пронзительные слова о любви и доме",
                icon: BookOpen,
                color: "pink"
              },
              // { 
              //   name: "Роланд Антон Ранд", 
              //   role: "Аранжировщик и звукорежиссер", 
              //   desc: "Профессиональная запись и аранжировка композиции",
              //   icon: Headphones,
              //   color: "blue"
              // },
              // { 
              //   name: "Отта Маннинен", 
              //   role: "Гитарист", 
              //   desc: "Виртуозная гитарная партия, создающая атмосферу",
              //   icon: Music,
              //   color: "green"
              // },
              // { 
              //   name: "Маргус Алвисте", 
              //   role: "Запись вокала", 
              //   desc: "Funkifactori Studio — профессиональная запись голоса",
              //   icon: Video,
              //   color: "orange"
              // },
              // { 
              //   name: "Роман Уваров", 
              //   role: "Сведение и мастеринг", 
              //   desc: "Room667 Studio — финальная обработка звука мирового уровня",
              //   icon: Award,
              //   color: "yellow"
              // },
              { 
                name: "Дмитрий Горнаков", 
                role: "Видео и визуализация", 
                desc: "AMOE Studio — создание атмосферного музыкального клипа",
                icon: Video,
                color: "cyan"
              }
            ].map((member, idx) => {
              const Icon = member.icon;
              const getColorClasses = (color: string) => {
                const colors: Record<string, { bg: string; border: string; text: string }> = {
                  cyan: { bg: "bg-cyan-600/30", border: "border-cyan-500/50", text: "text-cyan-400" },
                  pink: { bg: "bg-pink-600/30", border: "border-pink-500/50", text: "text-pink-400" },
                  blue: { bg: "bg-blue-600/30", border: "border-blue-500/50", text: "text-blue-400" },
                  green: { bg: "bg-green-600/30", border: "border-green-500/50", text: "text-green-400" },
                  orange: { bg: "bg-orange-600/30", border: "border-orange-500/50", text: "text-orange-400" },
                  yellow: { bg: "bg-yellow-600/30", border: "border-yellow-500/50", text: "text-yellow-400" }
                };
                return colors[color] || colors.cyan;
              };
              const colorClasses = getColorClasses(member.color);
              return (
                <div 
                  key={idx}
                  className="relative sci-team-card"
                  style={{ padding: '20px' }}
                >
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 180" preserveAspectRatio="none">
                    <path 
                      d="M12 10 L188 10 L195 18 L192 25 L192 155 L195 162 L188 170 L12 170 L5 162 L8 155 L8 25 L5 18 Z" 
                      fill="rgba(0, 255, 255, 0.05)" 
                      stroke="cyan" 
                      strokeWidth="2"
                      style={{ filter: 'drop-shadow(0 0 6px cyan) drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' }}
                    />
                    {/* Corner decorations */}
                    <path 
                      d="M12 10 L20 10 L15 18 L12 15 Z" 
                      fill="cyan" 
                      style={{ filter: 'drop-shadow(0 0 3px cyan)' }}
                    />
                    <path 
                      d="M188 10 L195 10 L190 18 L188 15 Z" 
                      fill="cyan" 
                      style={{ filter: 'drop-shadow(0 0 3px cyan)' }}
                    />
                    <path 
                      d="M12 170 L20 170 L15 162 L12 165 Z" 
                      fill="cyan" 
                      style={{ filter: 'drop-shadow(0 0 3px cyan)' }}
                    />
                    <path 
                      d="M188 170 L195 170 L190 162 L188 165 Z" 
                      fill="cyan" 
                      style={{ filter: 'drop-shadow(0 0 3px cyan)' }}
                    />
                  </svg>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4 border-2 ${colorClasses.border}`} style={{ filter: 'drop-shadow(0 0 4px ' + (colorClasses.text.includes('cyan') ? 'rgba(147, 51, 234, 0.8)' : colorClasses.text.includes('pink') ? 'rgba(236, 72, 153, 0.8)' : colorClasses.text.includes('blue') ? 'rgba(59, 130, 246, 0.8)' : colorClasses.text.includes('green') ? 'rgba(34, 197, 94, 0.8)' : colorClasses.text.includes('orange') ? 'rgba(249, 115, 22, 0.8)' : 'rgba(234, 179, 8, 0.8)') + ')' }}>
                      <Icon className={`w-6 h-6 ${colorClasses.text}`} style={{ filter: 'drop-shadow(0 0 3px currentColor)' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-cyan-300" style={{ textShadow: '0 0 8px cyan' }}>{member.name}</h3>
                    <div className="text-sm text-cyan-400 font-semibold mb-2" style={{ textShadow: '0 0 6px rgba(0, 255, 255, 0.6)' }}>{member.role}</div>
                    <p className="text-sm text-gray-300">{member.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EVALUATION: Budget Breakdown - Shows value and transparency */}
        {/* <div className="max-w-3xl mx-auto mb-16 bg-gray-800/30 rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-cyan-400 animate-pulse-subtle" />
            <h3 className="text-2xl font-bold text-center">На что пойдут средства</h3>
          </div>
          <p className="text-center text-gray-400 mb-2 text-sm">
            Полная прозрачность: каждый евро идет на создание музыки и клипа
          </p>
          
          <p className="text-center text-green-400 mb-6 text-xs font-semibold">
            ✓ 100% средств на производство • ✓ Гарантия выполнения • ✓ Отчеты по тратам
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { item: "Студия звукозаписи (Funkifactori)", cost: "€150", percent: 30 },
              { item: "Съемка видеоклипа (Kofuku Studio)", cost: "€200", percent: 40 },
              { item: "Сведение и мастеринг (Room667)", cost: "€80", percent: 16 },
              { item: "Визуальные эффекты и постпродакшн", cost: "€70", percent: 14 }
            ].map((item, i) => (
              <div key={i} className="bg-gray-700/30 rounded-lg p-4 border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-300 font-medium">{item.item}</span>
                  <span className="font-bold text-cyan-400">{item.cost}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percent}% бюджета</div>
              </div>
            ))}
          </div> */}
          
          {/* ABILITY: Trust indicator */}
          {/* <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Безопасные платежи • Прозрачный бюджет • Гарантия возврата</span>
          </div> */}
        {/* </div> */}

        {/* REACTION + EVALUATION: Rewards Section - Emotional appeal with value clarity */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Подарки за поддержку
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-2">
              Выберите свой уровень поддержки и получите эксклюзивные бонусы
            </p>
            {/* EVALUATION: Value proposition */}
            <p className="text-cyan-300 text-xs md:text-sm font-medium">
              💎 Каждый подарок создан специально для вас • 🎁 Ограниченное количество
            </p>
          </div>

          {/* CUE + TIMING: Popular choice indicator with urgency */}
          <div className="text-center mb-6 md:mb-8">
            <span className="inline-flex flex-wrap items-center justify-center gap-2 bg-cyan-600/30 text-white-200 px-3 md:px-4 py-2 rounded-full border-2 border-blue-500/50 text-xs md:text-sm font-semibold shadow-lg animate-pulse">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Самый популярный: €25 - Цифровой релиз</span>
              <span className="text-xs">• Осталось мало мест!</span>
            </span>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              const isPopular = reward.amount === 1500;
              const isLimited = reward.backers >= 8 && reward.backers < 10;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br rounded-xl p-4 md:p-6 border-2 transition-all hover:scale-105 relative ${
                    isPopular 
                      ? 'border-yellow-500/50 hover:border-yellow-500 shadow-xl shadow-yellow-500/20' 
                      : 'border-cyan-500/20 hover:border-cyan-500/50'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      ПОПУЛЯРНЫЙ ВЫБОР
                    </div>
                  )}
                  {isLimited && (
                    <div className="absolute -top-2 right-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Осталось мало!
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${isPopular ? 'bg-yellow-600/30' : 'bg-cyan-600/30'}`}>
                      <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-400' : 'text-cyan-400'}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">от</div>
                      <div className={`text-2xl font-bold ${isPopular ? 'text-yellow-400' : 'text-cyan-400'}`}>
                        €{reward.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3">{reward.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 min-h-[60px]">{reward.description}</p>
                  
                  {/* INTUITIVE RESPONSES + HEURISTICS: Social proof with familiar patterns */}
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>
                        {reward.backers} {reward.backers === 1 ? 'спонсор' : 'спонсоров'} выбрали
                      </span>
                      {/* HEURISTICS: Quick value indicator */}
                      {reward.amount === heuristicMetrics.bestValueAmount && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-semibold">
                          Лучшее соотношение
                        </span>
                      )}
                    </div>
                    {isLimited && (
                      <span className="text-orange-400 text-xs font-semibold">
                        Осталось: {10 - reward.backers}
                      </span>
                    )}
                  </div>
                  
                  {/* HEURISTICS: Comparison helper */}
                  {reward.amount === heuristicMetrics.recommendedAmount && (
                    <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-200">
                      <div className="flex items-center gap-1 font-semibold mb-1">
                        <Target className="w-3 h-3" />
                        Рекомендуемый выбор
                      </div>
                      <div className="text-yellow-300/80">
                        Самый популярный вариант среди спонсоров
                      </div>
                    </div>
                  )}
                  
                  {/* HABITS: Shopping cart button pattern + SELF-CONCEPT: Identity reinforcement */}
                  <Button 
                    onClick={() => handleSupport(reward.amount, index)}
                    variant={isPopular ? "accent" : "default"}
                    shape="flat"
                    className={`w-full ${
                      selectedReward === index ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''
                    }`}
                    style={{
                      '--color-primary': 'cyan',
                      '--color-accent': '#eab308',
                      '--color-primary-foreground': 'cyan',
                      '--color-accent-foreground': '#000'
                    } as React.CSSProperties}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isPopular && <Star className="w-5 h-5 fill-current animate-pulse-subtle" />}
                      <ShoppingCart className="w-5 h-5" />
                      Поддержать за €{reward.amount.toLocaleString()}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  {/* SELF-CONCEPT: Identity reinforcement */}
                  {selectedReward === index && (
                    <div className="mt-2 text-center text-xs text-green-400 font-semibold animate-fadeIn">
                      ✓ Вы выбрали стать спонсором проекта!
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Custom Amount - ABILITY: Flexible option */}
          {/* <div className="mt-8 bg-gradient-to-r from-cyan-600/20 to-pink-600/20 rounded-xl p-8 border-2 border-cyan-500/30 text-center"> */}
            {/* <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h3 className="text-2xl font-bold">Или выберите свою сумму</h3>
            </div>
            <p className="text-gray-300 mb-2">Любая поддержка важна для нас!</p>
            <p className="text-sm text-gray-400 mb-6">
              От €5 до любой суммы - каждый евро приближает нас к цели
            </p> */}
            
            {/* ABILITY: Quick amount selection */}
            {/* <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="text-sm text-gray-400 w-full">Популярные суммы:</span>
              {[10, 30, 75, 120, 200].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSupport(amount)}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 text-sm"
                >
                  €{amount.toLocaleString()}
                </button>
              ))}
            </div> */}
            
            {/* <Button 
              onClick={() => handleSupport()}
              variant="secondary"
              shape="flat"
              className="mx-auto"
            >
              Выбрать свою сумму
            </Button> */}
          {/* </div> */}
        </div>

        {/* Why Support Section */}
        {/* <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border-2 border-blue-500/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Почему стоит поддержать этот проект?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Star,
                title: "Уникальная музыка",
                desc: "Атмосферная композиция, объединяющая эстонскую поэзию с современным звучанием. Песня, которая трогает душу."
              },
              {
                icon: Users,
                title: "Профессиональная команда",
                desc: "Опытные музыканты и звукорежиссеры с мировым именем. Каждый участник — мастер своего дела."
              },
              {
                icon: Video,
                title: "Визуальное воплощение",
                desc: "Профессиональный музыкальный клип, который визуально передаст атмосферу и эмоции песни."
              },
              {
                icon: Heart,
                title: "Поддержка искусства",
                desc: "Ваш вклад помогает независимым музыкантам создавать качественную музыку без компромиссов."
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gray-800/40 rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-500/50">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* SELF-CONCEPT: Community identity section - "You are a supporter" */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 px-6 py-3 rounded-full border border-cyan-500/50 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-bold">Сообщество спонсоров</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Присоединяйтесь к людям, которые верят в музыку
            </h2>
            <p className="text-gray-400">
              Станьте частью сообщества, которое создает особенную музыку вместе с талантливыми эстонскими артистами
            </p>
          </div>
          
          {/* INTUITIVE RESPONSES: Familiar testimonial pattern */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'Анна К.', text: 'Рада быть частью этого проекта! Жду релиза 🎵', rating: 5, role: 'Спонсор с первого дня' },
              { name: 'Дмитрий М.', text: 'Отличная идея, поддерживаю на все 100%!', rating: 5, role: 'Активный спонсор' },
              { name: 'Елена С.', text: 'Прекрасная музыка, уверена получится круто!', rating: 5, role: 'Спонсор проекта' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800/30 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{testimonial.name}</div>
                    {/* SELF-CONCEPT: Role identity */}
                    <div className="text-xs text-cyan-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* SELF-CONCEPT: Identity badges */}
          <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-xl p-6 border border-cyan-500/30 text-center">
            <p className="text-lg font-semibold mb-4">Каждый спонсор получает:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Trophy, text: 'Статус спонсора', desc: 'Особое признание' },
                { icon: Star, text: 'Эксклюзивные бонусы', desc: 'Только для вас' },
                { icon: Users, text: 'Доступ к сообществу', desc: 'Присоединяйтесь к нам' }
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30 min-w-[140px]">
                    <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-sm font-semibold mb-1">{badge.text}</div>
                    <div className="text-xs text-gray-400">{badge.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* SYSTEM 2: Detailed information section - Progressive disclosure */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl font-bold text-center">Детальная информация</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Скрыть' : 'Показать все'}
            </button>
          </div>
          
          <div className="space-y-4">
            {/* SYSTEM 2: Detailed comparison table with toggle */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-cyan-500/20">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-bold">Сравнение уровней поддержки</h3>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
              </button>
              
              {showComparison && (
                <div className="animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-cyan-500/30">
                          <th className="text-left py-2 text-gray-400">Сумма</th>
                          <th className="text-center py-2 text-gray-400">Спонсоров</th>
                          <th className="text-center py-2 text-gray-400">Популярность</th>
                          <th className="text-center py-2 text-gray-400">Ценность</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rewards.map((reward, idx) => (
                          <tr key={idx} className="border-b border-cyan-500/10 hover:bg-cyan-900/20 transition-colors">
                            <td className="py-3 font-semibold">€{reward.amount.toLocaleString()}</td>
                            <td className="text-center py-3">{reward.backers}</td>
                            <td className="text-center py-3">
                              {reward.amount === heuristicMetrics.mostPopularAmount ? (
                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">Самый популярный</span>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </td>
                            <td className="text-center py-3">
                              <span className="text-cyan-400">
                                {Math.round(reward.backers / reward.amount * 1000)} / 1000€
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            {/* FAQ Section - Toggleable for focused calculation */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-cyan-500/20">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-bold">Часто задаваемые вопросы</h3>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform ${showFAQ ? 'rotate-90' : ''}`} />
              </button>
              
              {showFAQ && (
                <div className="mt-6 space-y-4 animate-fadeIn">
            {[
              { q: 'Как я получу подарки?', a: 'Все подарки будут отправлены вам в течение 30 дней после завершения проекта. Цифровые материалы (трек в высоком качестве, бэкинг-трек) придут на вашу электронную почту. Физические подарки (CD с автографом) будут отправлены почтой.' },
              { q: 'Что если проект не соберет нужную сумму?', a: 'Ваши средства будут возвращены в полном объеме. Мы гарантируем 100% возврат, если цель не будет достигнута. Никаких скрытых комиссий.' },
              { q: 'Когда будет готов трек и клип?', a: 'Мы планируем завершить запись и сведение через 1-2 месяца после достижения цели. Съемка и монтаж клипа займут еще 1 месяц. Вы будете получать еженедельные обновления о прогрессе работы в студиях.' },
              { q: 'Могу ли я изменить сумму поддержки?', a: 'Да, вы можете добавить к своей поддержке в любое время до окончания кампании. Это позволит вам получить подарки более высокого уровня.' },
              { q: 'Как отслеживать прогресс проекта?', a: 'Мы будем публиковать еженедельные отчеты с фотографиями из студий Funkifactori и Room667, видео со съемок клипа от Kofuku Studio, а также аудио демо-версии процесса записи.' },
              { q: 'На каком языке песня?', a: 'Песня "Tiiva All" написана на эстонском языке. Это атмосферная композиция о доме, реке и вечной любви. Мы планируем создать версию с субтитрами для международной аудитории.' },
              { q: 'Кто участвует в проекте?', a: 'В проекте участвуют профессиональные эстонские музыканты: композитор Альберт Петенберг, поэтесса Ребекка Контус, аранжировщик Роланд Антон Ранд, гитарист Отта Маннинен, а также звукорежиссеры из студий Funkifactori и Room667, и режиссер клипа из Kofuku Studio.' }
            ].map((faq, idx) => (
                    <div key={idx} className="border-l-2 border-cyan-500/50 pl-4">
                      <div className="font-semibold text-cyan-300 mb-1">{faq.q}</div>
                      <div className="text-sm text-gray-400">{faq.a}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Risk disclosure - Focused calculation */}
            <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <h3 className="text-xl font-bold">Важная информация о рисках</h3>
              </div>
              <div className="text-sm text-orange-200 space-y-2">
                <p>• Проект может быть отложен из-за непредвиденных обстоятельств</p>
                <p>• Если цель не достигнута, средства будут возвращены автоматически</p>
                <p>• Все расходы публикуются в открытом доступе для полной прозрачности</p>
                <p>• Ваша поддержка идет непосредственно на производство - никаких посредников</p>
              </div>
            </div>
            
            {/* Financial transparency - Focused calculation */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold">Финансовая прозрачность</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-cyan-400 mb-2">Гарантии:</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>✓ 100% средств идет на производство</li>
                    <li>✓ Ежемесячные финансовые отчеты</li>
                    <li>✓ Возврат средств при невыполнении цели</li>
                    <li>✓ Публичный доступ к бюджету</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-cyan-400 mb-2">Сроки выплат:</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Студия: при достижении 30%</li>
                    <li>• Съемка: при достижении 60%</li>
                    <li>• Постпродакшн: при достижении 90%</li>
                    <li>• Эффекты: при достижении 100%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <SciFiButton onClick={() => alert("Engage engines!")}>
          ENGAGE
        </SciFiButton> */}

        {/* <SciFiDialog /> */}

        {/* <TextBlock title="Tiiva All" svgPath="M10 10 H390 L380 150 H20 Z">
          <p>Атмосферная композиция о доме, реке и вечной любви. Профессиональная запись с участием талантливых эстонских музыкантов и создание визуального клипа мирового уровня.</p>
        </TextBlock> */}

        {/* <ProductCard title="Tiiva All" price="100" image="https://via.placeholder.com/150" onBuy={() => alert("Buy now!")} /> */}
        
        {/* Frame wrapper with proper positioning */}
        {/* <div className="relative w-full max-w-4xl mx-auto my-8" style={{ minHeight: '400px' }}>
          <Frame
            className="drop-shadow-2xl"
            paths={JSON.parse(
              '[{"show":true,"style":{"strokeWidth":"2","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","37","12"],["L","0% + 59","12"],["L","0% + 85","0% + 33"],["L","79","0% + 12"],["L","50% - 3","12"],["L","50% + 16","30"],["L","100% - 35","30"],["L","100% - 16","47"],["L","100% - 16","100% - 47.05882352941177%"],["L","100% - 8","100% - 44.85294117647059%"],["L","100% - 9","100% - 16.666666666666668%"],["L","100% - 17","100% - 14.705882352941176%"],["L","100% - 17","100% - 30"],["L","100% - 34","100% - 12"],["L","50% + 13","100% - 12"],["L","50% + 15","100% - 26"],["L","50% - 11","100% - 12"],["L","37","100% - 12"],["L","19","100% - 30"],["L","19","0% + 50.490196078431374%"],["L","10","0% + 48.529411764705884%"],["L","10","0% + 20.098039215686274%"],["L","0% + 19.000000000000004","0% + 18.38235294117647%"],["L","19","29"],["L","37","12"]]},{"show":true,"style":{"strokeWidth":"2","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","50% + 10","15"],["L","50% + 19","15"],["L","50% + 24","0% + 20"],["L","50% + 16","0% + 20"],["L","50% + 10","15"]]},{"show":true,"style":{"strokeWidth":"2","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","50% + 25","15"],["L","50% + 34","15"],["L","50% + 40","0% + 21"],["L","50% + 31","0% + 21"],["L","50% + 25","15"]]},{"show":true,"style":{"strokeWidth":"2","stroke":"var(--color-frame-4-stroke)","fill":"var(--color-frame-4-fill)"},"path":[["M","50% + 40","15"],["L","50% + 52","15"],["L","50% + 61","0% + 23"],["L","50% + 49","0% + 23"],["L","50% + 40","15"]]},{"show":true,"style":{"strokeWidth":"2","stroke":"var(--color-frame-5-stroke)","fill":"var(--color-frame-5-fill)"},"path":[["M","36","3"],["L","0% + 58","0"],["L","0% + 84","0% + 40"],["L","81","0% + 0"],["L","50% - 1","4"],["L","50% + 5","6"],["L","50% + 54","7"],["L","50% + 74","23"],["L","100% - 32","21"],["L","100% - 8","42"],["L","100% - 9","100% - 52.450980392156865%"],["L","100% + 0","100% - 50.245098039215684%"],["L","100% + 0","100% - 15.196078431372548%"],["L","100% - 7","100% - 13.480392156862745%"],["L","100% - 7","100% - 27"],["L","100% - 29","100% - 3"],["L","50% + 14","100% + 0"],["L","50% + 21","100% - 31"],["L","50% - 13","100% + 0"],["L","37","100% - 4"],["L","11","100% - 28"],["L","10","0% + 55.3921568627451%"],["L","0","0% + 52.94117647058823%"],["L","1","0% + 18.627450980392158%"],["L","11","0% + 16.666666666666668%"],["L","11","25"],["L","36","3"]]}]'
            )}
          />
        </div> */}

      {/* Footer - ABILITY: Trust & security indicators */}
      <Footer totalBackers={totalBackers} />
    </div>
  );
}