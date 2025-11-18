import { useState } from 'react';
import { Music, Heart, Video, Headphones, Award, Users } from 'lucide-react';

export default function MusicCrowdfundingLanding() {
  const [progress, setProgress] = useState(3250);
  const goal = 50000;
  const progressPercent = (progress / goal) * 100;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-600/30 px-4 py-2 rounded-full mb-6">
            <Music className="w-5 h-5" />
            <span className="text-sm font-semibold">Краудфандинг</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Помогите записать новую песню
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Мы создаем атмосферный трек с профессиональным музыкальным видео. 
            Ваша поддержка поможет воплотить эту мечту в реальность!
          </p>

          {/* Video Preview */}
          <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-800">
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

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 rounded-full h-6 overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              >
                <span className="text-xs font-bold">
                  {progressPercent.toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-3xl font-bold text-purple-400">₽{progress.toLocaleString()}</span>
                <span className="text-gray-400"> собрано</span>
              </div>
              <div className="text-gray-400">
                Цель: <span className="text-white font-semibold">₽{goal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="max-w-3xl mx-auto mb-16 bg-gray-800/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">На что пойдут средства</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { item: "Студия звукозаписи", cost: "₽15,000" },
              { item: "Съемка видеоклипа", cost: "₽20,000" },
              { item: "Постпродакшн и монтаж", cost: "₽8,000" },
              { item: "Визуальные эффекты", cost: "₽7,000" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-700/30 rounded-lg p-4">
                <span className="text-gray-300">{item.item}</span>
                <span className="font-bold text-purple-400">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Подарки за поддержку
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => {
              const Icon = reward.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-600/30 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">от</div>
                      <div className="text-2xl font-bold text-purple-400">
                        ₽{reward.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{reward.title}</h3>
                  <p className="text-gray-400 mb-6 min-h-[60px]">{reward.description}</p>
                  
                  <div className="mb-4 text-sm text-gray-500">
                    {reward.backers} {reward.backers === 1 ? 'спонсор' : 'спонсоров'}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105">
                    Поддержать
                  </button>
                </div>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Или выберите свою сумму</h3>
            <p className="text-gray-300 mb-6">Любая поддержка важна для нас!</p>
            <button className="bg-white text-purple-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Поддержать проект
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Спасибо за вашу поддержку! 💜</p>
          <p className="mt-2">Все средства идут напрямую на производство музыки и видео</p>
        </div>
      </div>
    </div>
  );
}