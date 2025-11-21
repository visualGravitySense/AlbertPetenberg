import { useState, useEffect } from 'react';
import { Music, Heart, Video, Headphones, Award, Users, Clock, Shield, CheckCircle, TrendingUp, Zap, Star, Sparkles, ArrowRight, Info, ShoppingCart, Percent, Target, BarChart3, HelpCircle, AlertCircle, ThumbsUp, Trophy, BookOpen, Eye, EyeOff, X, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MusicCrowdfundingLanding() {
  const [progress] = useState(3250);
  const goal = 50000;
  const progressPercent = (progress / goal) * 100;
  const [timeLeft, setTimeLeft] = useState({ days: 23, hours: 14, minutes: 32 });
  const totalBackers = 28;
  const recentBackers = ['Анна К.', 'Дмитрий М.', 'Елена С.'];
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
      amount: 500,
      title: "Благодарность",
      description: "Ваше имя в описании видео и благодарность в соцсетях",
      icon: Heart,
      backers: 12
    },
    {
      amount: 1500,
      title: "Цифровой релиз",
      description: "Трек в высоком качестве + бэкинг-трек + имя в титрах",
      icon: Headphones,
      backers: 8
    },
    {
      amount: 3000,
      title: "Эксклюзивный контент",
      description: "Все предыдущее + закулисное видео со студии + демо версии",
      icon: Video,
      backers: 5
    },
    {
      amount: 5000,
      title: "Особая благодарность",
      description: "Все предыдущее + физический CD с автографом + видеосообщение",
      icon: Award,
      backers: 2
    },
    {
      amount: 10000,
      title: "VIP поддержка",
      description: "Все предыдущее + приглашение на съемку клипа + ужин с артистом",
      icon: Users,
      backers: 1
    }
  ];

  // SYSTEM 2: Error prevention and validation
  const validateAmount = (amount: number | string): { valid: boolean; error?: string } => {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;
    
    if (!numAmount || isNaN(numAmount)) {
      return { valid: false, error: 'Пожалуйста, введите сумму' };
    }
    if (numAmount < 100) {
      return { valid: false, error: 'Минимальная сумма: ₽100' };
    }
    if (numAmount > 100000) {
      return { valid: false, error: 'Максимальная сумма: ₽100,000' };
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
    progressPerBacker: Math.round(progress / totalBackers),
    daysRemaining: timeLeft.days,
    averageContribution: Math.round(progress / totalBackers),
    goalCompletion: progressPercent
  };
  
  // HEURISTICS: Calculate comparison metrics
  const heuristicMetrics = {
    mostPopularAmount: 1500,
    bestValueAmount: 1500, // Most backers per ruble
    recommendedAmount: 1500,
    averageAmount: valueMetrics.averageContribution,
    completionRate: progressPercent,
    daysPerPercent: (timeLeft.days / (100 - progressPercent)) * 100,
    backersNeeded: Math.ceil((goal - progress) / valueMetrics.averageContribution)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* CUE: Top notification bar - Attention-grabbing cue */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center py-2 z-50 shadow-lg animate-pulse">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>⚡ Осталось {timeLeft.days} дней! Присоединяйтесь к {totalBackers} спонсорам</span>
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
      </div>

      {/* SYSTEM 2: Undo notification - Error prevention */}
      {showUndo && lastAction && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl z-[55] flex items-center gap-4 animate-fadeIn border-2 border-blue-400">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <div className="font-semibold">Поддержка на ₽{lastAction.amount.toLocaleString()} принята</div>
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
                    Ваш вклад: <span className="font-bold text-white">₽{lastSupportedAmount.toLocaleString()}</span>
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
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-pink-700 p-4 shadow-2xl z-50 border-t border-purple-500/50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <div className="font-bold text-lg animate-pulse-once">₽{progress.toLocaleString()} собрано</div>
              <div className="text-purple-200 text-xs">{progressPercent.toFixed(1)}% от цели</div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-purple-100">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Осталось: <span className="font-bold">{timeLeft.days}д {timeLeft.hours}ч</span></span>
            </div>
          </div>
          <button 
            onClick={() => handleSupport()}
            className="bg-white text-purple-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-110 shadow-lg flex items-center gap-2 w-full md:w-auto justify-center animate-pulse-subtle hover:animate-none"
          >
            <Zap className="w-5 h-5" />
            Поддержать проект
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 pb-32 pt-20">
        <div className="text-center mb-12">
          {/* CUE: Animated badges - Visual attention grabbers */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-600/30 px-4 py-2 rounded-full border border-purple-500/50 animate-fadeIn">
              <Music className="w-5 h-5 animate-bounce-subtle" />
              <span className="text-sm font-semibold">Краудфандинг</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-600/30 px-4 py-2 rounded-full border border-green-500/50 animate-fadeIn delay-100">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold">{totalBackers} спонсоров</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-orange-600/30 px-4 py-2 rounded-full border border-orange-500/50 animate-fadeIn delay-200 animate-pulse">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold">{timeLeft.days} дней до конца</span>
            </div>
          </div>
          
          {/* REACTION: Emotional hook with visual appeal */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fadeIn delay-300">
            Tiiva All — Новая песня эстонских музыкантов
          </h1>
          
          {/* REACTION: Personalized emotional storytelling */}
          <div className="mb-6 max-w-2xl mx-auto">
            <p className="text-xl text-gray-300 mb-4 animate-fadeIn delay-400">
              Атмосферная композиция о доме, реке и вечной любви. Профессиональная запись с участием талантливых эстонских музыкантов и создание визуального клипа мирового уровня.
            </p>
            <p className="text-lg text-purple-300 mb-4 font-medium animate-fadeIn delay-500">
              Присоединяйтесь к <span className="text-pink-400 font-bold">{totalBackers} людям</span>, которые уже помогают создать эту особенную музыку ✨
            </p>
            {/* EVALUATION: Value proposition upfront */}
            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30 mb-4 animate-fadeIn delay-600">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{totalBackers}</div>
                  <div className="text-gray-400">уже поддержали</div>
                </div>
                <div className="h-8 w-px bg-purple-500/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">₽{valueMetrics.averageContribution}</div>
                  <div className="text-gray-400">средний взнос</div>
                </div>
                <div className="h-8 w-px bg-purple-500/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{progressPercent.toFixed(0)}%</div>
                  <div className="text-gray-400">цели достигнуто</div>
                </div>
              </div>
            </div>
          </div>

          {/* SYSTEM 1: Quick action buttons - Visual cues and intuitive design */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fadeIn delay-700">
            <span className="text-sm text-gray-400 w-full mb-2 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <ShoppingCart className="w-4 h-4 text-purple-400" />
              ⚡ Быстрая поддержка одним кликом:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[500, 1500, 3000, 5000].map((amount) => {
                const isRecommended = amount === heuristicMetrics.recommendedAmount;
                const isBestValue = amount === heuristicMetrics.bestValueAmount;
                return (
                  <button
                    key={amount}
                    onClick={() => handleSupport(amount)}
                    className={`relative group font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-110 text-sm shadow-lg ${
                      isRecommended 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-2 border-yellow-400 hover:shadow-yellow-500/50' 
                        : 'bg-purple-600/30 hover:bg-purple-600/50 border-2 border-purple-500/50 text-white hover:border-purple-400 hover:shadow-purple-500/50'
                    }`}
                  >
                    {/* SYSTEM 1: Visual color coding */}
                    <span className="flex items-center gap-2">
                      <span className="text-lg font-bold">₽{amount.toLocaleString()}</span>
                      {isRecommended && <Star className="w-4 h-4 text-yellow-900 fill-yellow-900" />}
                      {isBestValue && (
                        <span className="text-xs bg-green-500/90 px-1.5 py-0.5 rounded text-white font-bold">
                          Лучшее
                        </span>
                      )}
                    </span>
                    {/* SYSTEM 1: Visual feedback on hover */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-ping"></div>
                    {isRecommended && (
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs bg-yellow-500 text-black px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-semibold shadow-lg">
                        ⭐ Самый популярный
                      </div>
                    )}
                  </button>
                );
              })}
              
              {/* SYSTEM 2: Custom amount input with error handling */}
              <div className="relative">
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className={`bg-gray-700/50 hover:bg-gray-700/70 border-2 border-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-110 text-sm shadow-lg flex items-center gap-2 ${
                    showCustomInput ? 'border-purple-400 bg-purple-600/30' : ''
                  }`}
                >
                  {showCustomInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  Своя сумма
                </button>
                {showCustomInput && (
                  <div className="absolute top-full mt-2 left-0 bg-gray-800 border-2 border-purple-500 rounded-lg p-4 shadow-2xl z-10 min-w-[200px] animate-fadeIn">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setErrors(errors.filter(e => e.field !== 'amount'));
                      }}
                      placeholder="От ₽100"
                      className="w-full bg-gray-900 border border-purple-500/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                      min={100}
                      max={100000}
                    />
                    {errors.find(e => e.field === 'amount') && (
                      <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.find(e => e.field === 'amount')?.message}
                      </div>
                    )}
                    <button
                      onClick={() => handleSupport()}
                      className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      Подтвердить
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl border-2 border-purple-500/30">
            <div className="aspect-video bg-gray-800 relative">
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
            </div>
          </div>

          {/* MOTIVATION: Recent backers social proof */}
          <div className="max-w-2xl mx-auto mb-8 bg-gray-800/30 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold">Недавние спонсоры</h3>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {recentBackers.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-purple-600/20 px-3 py-2 rounded-lg border border-purple-500/30">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {name[0]}
                  </div>
                  <span className="text-sm">{name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">И еще {totalBackers - recentBackers.length}...</span>
              </div>
            </div>
          </div>

          {/* EVALUATION + CUE: Enhanced progress bar - Shows value and triggers action */}
          <div className="max-w-2xl mx-auto bg-gray-800/40 rounded-2xl p-6 border-2 border-purple-500/30 shadow-xl hover:border-purple-400/50 transition-all animate-fadeIn delay-800">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <CheckCircle className="w-6 h-6 text-green-400 animate-pulse-subtle" />
                    <div className="absolute inset-0 w-6 h-6 text-green-400 animate-ping opacity-20"></div>
                  </div>
                  <span className="text-sm text-gray-300 font-semibold">Активный проект</span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-400 animate-pulse-once">₽{progress.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">из ₽{goal.toLocaleString()}</div>
                  {/* EVALUATION: Show what's left */}
                  <div className="text-xs text-orange-400 mt-1">
                    Осталось собрать: ₽{(goal - progress).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-full h-10 overflow-hidden relative shadow-inner">
                <div 
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-full transition-all duration-1000 flex items-center justify-end pr-4 shadow-lg relative animate-progress-glow"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                >
                  <span className="text-sm font-bold text-white drop-shadow-lg">
                    {progressPercent.toFixed(1)}%
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
            
            {/* TIMING: Contextual urgency indicator */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2 bg-orange-600/30 px-4 py-2 rounded-full border-2 border-orange-500/50 animate-pulse">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-orange-200 font-semibold">
                  Осталось: <span className="font-bold text-white">{timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-600/30 px-4 py-2 rounded-full border border-purple-500/50">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-gray-200">{totalBackers} спонсоров уже присоединились</span>
              </div>
            </div>

            {/* SYSTEM 1: Visual step-by-step guide with icons */}
            <div className="mb-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-200 flex-1">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Как это работает (знакомый процесс):
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-blue-400">
                        <span className="text-lg font-bold text-blue-300">1</span>
                      </div>
                      <div className="text-blue-300">Выберите сумму</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-blue-400">
                        <span className="text-lg font-bold text-blue-300">2</span>
                      </div>
                      <div className="text-blue-300">Безопасная оплата</div>
                    </div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-blue-400">
                        <span className="text-lg font-bold text-blue-300">3</span>
                      </div>
                      <div className="text-blue-300">Получите подарки</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* SYSTEM 1: Visual decision rules with icons and colors */}
            <div className="mb-4 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-purple-200 flex-1">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Правила выбора (для быстрого решения):
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 bg-purple-800/30 p-2 rounded border border-purple-500/30">
                      <ThumbsUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <div>
                        <div className="text-purple-300 font-semibold">Рекомендуем</div>
                        <div className="text-yellow-400 font-bold">₽{heuristicMetrics.recommendedAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-800/30 p-2 rounded border border-purple-500/30">
                      <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-purple-300 font-semibold">Средний</div>
                        <div className="text-pink-400 font-bold">₽{heuristicMetrics.averageAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-800/30 p-2 rounded border border-purple-500/30">
                      <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-purple-300 font-semibold">Нужно</div>
                        <div className="text-orange-400 font-bold">~{heuristicMetrics.backersNeeded} спонсоров</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-800/30 p-2 rounded border border-purple-500/30">
                      <Percent className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <div>
                        <div className="text-purple-300 font-semibold">Прогресс</div>
                        <div className="text-green-400 font-bold">{progressPercent.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CUE + REACTION: Primary CTA button with emotional appeal */}
            <button
              onClick={() => handleSupport()}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white font-bold py-5 rounded-lg transition-all transform hover:scale-105 shadow-2xl text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Heart className="w-6 h-6 group-hover:animate-pulse" />
              <span>Поддержать проект сейчас</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* About the Song Section */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl p-8 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-600/30 px-6 py-3 rounded-full border border-purple-500/50 mb-4">
              <Music className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold">О песне</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Tiiva All — Под крылом</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Пронзительная композиция на эстонском языке о доме, реке и вечной любви. 
              Песня рассказывает о том, как мы находим утешение и силу под защитой близких, 
              как река несет нас через жизненные испытания, а свет любви рассеивает все тучи.
            </p>
            <p className="text-md text-purple-300 mt-4 font-medium">
              "Särab su valgus minule ja tuul viib pilved eemale" — 
              "Твой свет сияет мне, и ветер уносит облака прочь"
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Команда проекта
            </h2>
            <p className="text-gray-400">
              Профессиональные музыканты и звукорежиссеры с мировым опытом
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "Альберт Петенберг", 
                role: "Композитор и автор музыки", 
                desc: "Создатель мелодии, которая трогает сердце",
                icon: Music,
                color: "purple"
              },
              { 
                name: "Ребекка Контус", 
                role: "Автор текста", 
                desc: "Поэтесса, написавшая пронзительные слова о любви и доме",
                icon: BookOpen,
                color: "pink"
              },
              { 
                name: "Роланд Антон Ранд", 
                role: "Аранжировщик и звукорежиссер", 
                desc: "Профессиональная запись и аранжировка композиции",
                icon: Headphones,
                color: "blue"
              },
              { 
                name: "Отта Маннинен", 
                role: "Гитарист", 
                desc: "Виртуозная гитарная партия, создающая атмосферу",
                icon: Music,
                color: "green"
              },
              { 
                name: "Маргус Алвисте", 
                role: "Запись вокала", 
                desc: "Funkifactori Studio — профессиональная запись голоса",
                icon: Video,
                color: "orange"
              },
              { 
                name: "Роман Уваров", 
                role: "Сведение и мастеринг", 
                desc: "Room667 Studio — финальная обработка звука мирового уровня",
                icon: Award,
                color: "yellow"
              },
              { 
                name: "Олександр Городиловский", 
                role: "Видео и визуализация", 
                desc: "Kofuku Studio — создание атмосферного музыкального клипа",
                icon: Video,
                color: "purple"
              }
            ].map((member, idx) => {
              const Icon = member.icon;
              const getColorClasses = (color: string) => {
                const colors: Record<string, { bg: string; border: string; text: string }> = {
                  purple: { bg: "bg-purple-600/30", border: "border-purple-500/50", text: "text-purple-400" },
                  pink: { bg: "bg-pink-600/30", border: "border-pink-500/50", text: "text-pink-400" },
                  blue: { bg: "bg-blue-600/30", border: "border-blue-500/50", text: "text-blue-400" },
                  green: { bg: "bg-green-600/30", border: "border-green-500/50", text: "text-green-400" },
                  orange: { bg: "bg-orange-600/30", border: "border-orange-500/50", text: "text-orange-400" },
                  yellow: { bg: "bg-yellow-600/30", border: "border-yellow-500/50", text: "text-yellow-400" }
                };
                return colors[color] || colors.purple;
              };
              const colorClasses = getColorClasses(member.color);
              return (
                <div 
                  key={idx}
                  className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all hover:scale-105"
                >
                  <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4 border ${colorClasses.border}`}>
                    <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                  <div className="text-sm text-purple-400 font-semibold mb-2">{member.role}</div>
                  <p className="text-sm text-gray-400">{member.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* EVALUATION: Budget Breakdown - Shows value and transparency */}
        <div className="max-w-3xl mx-auto mb-16 bg-gray-800/30 rounded-xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-purple-400 animate-pulse-subtle" />
            <h3 className="text-2xl font-bold text-center">На что пойдут средства</h3>
          </div>
          <p className="text-center text-gray-400 mb-2 text-sm">
            Полная прозрачность: каждый рубль идет на создание музыки и клипа
          </p>
          {/* EVALUATION: Show ROI/impact */}
          <p className="text-center text-green-400 mb-6 text-xs font-semibold">
            ✓ 100% средств на производство • ✓ Гарантия выполнения • ✓ Отчеты по тратам
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { item: "Студия звукозаписи (Funkifactori)", cost: "₽15,000", percent: 30 },
              { item: "Съемка видеоклипа (Kofuku Studio)", cost: "₽20,000", percent: 40 },
              { item: "Сведение и мастеринг (Room667)", cost: "₽8,000", percent: 16 },
              { item: "Визуальные эффекты и постпродакшн", cost: "₽7,000", percent: 14 }
            ].map((item, i) => (
              <div key={i} className="bg-gray-700/30 rounded-lg p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-300 font-medium">{item.item}</span>
                  <span className="font-bold text-purple-400">{item.cost}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percent}% бюджета</div>
              </div>
            ))}
          </div>
          
          {/* ABILITY: Trust indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Безопасные платежи • Прозрачный бюджет • Гарантия возврата</span>
          </div>
        </div>

        {/* REACTION + EVALUATION: Rewards Section - Emotional appeal with value clarity */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Подарки за поддержку
            </h2>
            <p className="text-gray-400 text-lg mb-2">
              Выберите свой уровень поддержки и получите эксклюзивные бонусы
            </p>
            {/* EVALUATION: Value proposition */}
            <p className="text-purple-300 text-sm font-medium">
              💎 Каждый подарок создан специально для вас • 🎁 Ограниченное количество
            </p>
          </div>

          {/* CUE + TIMING: Popular choice indicator with urgency */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-yellow-600/30 text-yellow-200 px-4 py-2 rounded-full border-2 border-yellow-500/50 text-sm font-semibold shadow-lg animate-pulse">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              Самый популярный: ₽1,500 - Цифровой релиз
              <span className="text-xs ml-2">• Осталось мало мест!</span>
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              const isPopular = reward.amount === 1500;
              const isLimited = reward.backers >= 8 && reward.backers < 10;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border-2 transition-all hover:scale-105 relative ${
                    isPopular 
                      ? 'border-yellow-500/50 hover:border-yellow-500 shadow-xl shadow-yellow-500/20' 
                      : 'border-purple-500/20 hover:border-purple-500/50'
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
                    <div className={`p-3 rounded-lg ${isPopular ? 'bg-yellow-600/30' : 'bg-purple-600/30'}`}>
                      <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-400' : 'text-purple-400'}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">от</div>
                      <div className={`text-2xl font-bold ${isPopular ? 'text-yellow-400' : 'text-purple-400'}`}>
                        ₽{reward.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{reward.title}</h3>
                  <p className="text-gray-400 mb-6 min-h-[60px]">{reward.description}</p>
                  
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
                  <button 
                    onClick={() => handleSupport(reward.amount, index)}
                    className={`w-full font-semibold py-4 rounded-lg transition-all transform hover:scale-110 shadow-lg hover:shadow-xl relative overflow-hidden group ${
                      isPopular
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    } flex items-center justify-center gap-2 ${
                      selectedReward === index ? 'ring-4 ring-green-400 ring-offset-2 ring-offset-gray-900' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {isPopular && <Star className="w-5 h-5 fill-current animate-pulse-subtle" />}
                    {/* HABITS: Shopping cart icon for familiarity */}
                    <ShoppingCart className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Поддержать за ₽{reward.amount.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
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
          <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-8 border-2 border-purple-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-400" />
              <h3 className="text-2xl font-bold">Или выберите свою сумму</h3>
            </div>
            <p className="text-gray-300 mb-2">Любая поддержка важна для нас!</p>
            <p className="text-sm text-gray-400 mb-6">
              От ₽100 до любой суммы - каждый рубль приближает нас к цели
            </p>
            
            {/* ABILITY: Quick amount selection */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="text-sm text-gray-400 w-full">Популярные суммы:</span>
              {[200, 1000, 2500, 7500, 15000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSupport(amount)}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 text-sm"
                >
                  ₽{amount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => handleSupport()}
              className="bg-white text-purple-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Выбрать свою сумму
            </button>
          </div>
        </div>

        {/* Why Support Section */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border-2 border-blue-500/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                <div key={idx} className="bg-gray-800/40 rounded-lg p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/50">
                      <Icon className="w-6 h-6 text-purple-400" />
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
        </div>

        {/* SELF-CONCEPT: Community identity section - "You are a supporter" */}
        <div className="max-w-4xl mx-auto mt-16 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-6 py-3 rounded-full border border-purple-500/50 mb-4">
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
              <div key={idx} className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{testimonial.name}</div>
                    {/* SELF-CONCEPT: Role identity */}
                    <div className="text-xs text-purple-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* SELF-CONCEPT: Identity badges */}
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-500/30 text-center">
            <p className="text-lg font-semibold mb-4">Каждый спонсор получает:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Trophy, text: 'Статус спонсора', desc: 'Особое признание' },
                { icon: Star, text: 'Эксклюзивные бонусы', desc: 'Только для вас' },
                { icon: Users, text: 'Доступ к сообществу', desc: 'Присоединяйтесь к нам' }
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/30 min-w-[140px]">
                    <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
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
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-center">Детальная информация</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Скрыть' : 'Показать все'}
            </button>
          </div>
          
          <div className="space-y-4">
            {/* SYSTEM 2: Detailed comparison table with toggle */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-bold">Сравнение уровней поддержки</h3>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
              </button>
              
              {showComparison && (
                <div className="animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-500/30">
                          <th className="text-left py-2 text-gray-400">Сумма</th>
                          <th className="text-center py-2 text-gray-400">Спонсоров</th>
                          <th className="text-center py-2 text-gray-400">Популярность</th>
                          <th className="text-center py-2 text-gray-400">Ценность</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rewards.map((reward, idx) => (
                          <tr key={idx} className="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
                            <td className="py-3 font-semibold">₽{reward.amount.toLocaleString()}</td>
                            <td className="text-center py-3">{reward.backers}</td>
                            <td className="text-center py-3">
                              {reward.amount === heuristicMetrics.mostPopularAmount ? (
                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">Самый популярный</span>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </td>
                            <td className="text-center py-3">
                              <span className="text-purple-400">
                                {Math.round(reward.backers / reward.amount * 1000)} / 1000₽
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
            <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
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
                    <div key={idx} className="border-l-2 border-purple-500/50 pl-4">
                      <div className="font-semibold text-purple-300 mb-1">{faq.q}</div>
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
            <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold">Финансовая прозрачность</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-purple-400 mb-2">Гарантии:</div>
                  <ul className="space-y-1 text-gray-300">
                    <li>✓ 100% средств идет на производство</li>
                    <li>✓ Ежемесячные финансовые отчеты</li>
                    <li>✓ Возврат средств при невыполнении цели</li>
                    <li>✓ Публичный доступ к бюджету</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-purple-400 mb-2">Сроки выплат:</div>
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

        {/* Footer - ABILITY: Trust & security indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Безопасные платежи</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Гарантия возврата</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm">{totalBackers} доверяют нам</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-2">Спасибо за вашу поддержку! 💜</p>
          <p className="text-gray-500 text-xs mb-4">Все средства идут напрямую на производство музыки "Tiiva All" и создание профессионального видеоклипа</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span>Музыка: Альберт Петенберг</span>
            <span>•</span>
            <span>Текст: Ребекка Контус</span>
            <span>•</span>
            <span>Аранжировка: Роланд Антон Ранд</span>
          </div>
        </div>
      </div>
    </div>
  );
}