import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, TrendingUp, Menu, X, Globe } from "lucide-react";
import "./header.css";
import { Language, getTranslation } from "../locales";

interface HeaderProps {
  links: { label: string; href: string }[];
  title?: string;
  githubUrl?: string;
  customIcon?: React.ReactNode;
  // MOTIVATION: Social proof and urgency
  daysLeft?: number;
  totalBackers?: number;
  progressPercent?: number;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  links, 
  title = "COSMIC UI", 
  githubUrl,
  customIcon,
  daysLeft,
  totalBackers,
  progressPercent,
  currentLanguage = 'ru',
  onLanguageChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = (key: keyof typeof import('../locales').translations.ru) => getTranslation(currentLanguage, key);

  return (
    <header className="sci-header">
      <div className="sh-left">
      <div className="sh-title">{title}</div>
        
        {/* MOTIVATION: Social proof and urgency indicators in header - hidden on mobile */}
        {(daysLeft !== undefined || totalBackers !== undefined) && (
          <div className="sh-stats hidden md:flex">
            {daysLeft !== undefined && (
              <div className="sh-stat-item">
                <Clock className="sh-stat-icon" />
                <span className="sh-stat-value">{daysLeft}</span>
                <span className="sh-stat-label">{t('daysFull')}</span>
              </div>
            )}
            {totalBackers !== undefined && (
              <div className="sh-stat-item">
                <Users className="sh-stat-icon" />
                <span className="sh-stat-value">{totalBackers}</span>
                <span className="sh-stat-label">{t('sponsors')}</span>
              </div>
            )}
            {progressPercent !== undefined && (
              <div className="sh-stat-item">
                <TrendingUp className="sh-stat-icon" />
                <span className="sh-stat-value">{Math.round(progressPercent)}</span>
                <span className="sh-stat-label">%</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sh-right">
        {/* Desktop Navigation */}
        <nav className="sh-nav hidden md:flex">
          {links.map((l) => {
            const isExternal = l.href.startsWith('http');
            // Special styling for "Support Us" button
            if (l.label === "Support Us" || l.label === "Поддержать" || l.label === "Toeta") {
              if (isExternal) {
                return (
                  <a key={l.label} href={l.href} className="sh-cta-button">
                    <svg className="sh-cta-frame" viewBox="0 0 150 40" preserveAspectRatio="none">
                      <path d="M5 5 L145 5 L150 20 L145 35 L5 35 L0 20 Z" className="sh-cta-path" />
                    </svg>
                    <span className="sh-cta-label">{l.label}</span>
                  </a>
                );
              }
              return (
                <Link key={l.label} to={l.href} className="sh-cta-button">
                  <svg className="sh-cta-frame" viewBox="0 0 150 40" preserveAspectRatio="none">
                    <path d="M5 5 L145 5 L150 20 L145 35 L5 35 L0 20 Z" className="sh-cta-path" />
                  </svg>
                  <span className="sh-cta-label">{l.label}</span>
                </Link>
              );
            }
            if (isExternal) {
              return (
                <a key={l.label} href={l.href} className="sh-link">
                  {l.label}
                </a>
              );
            }
            return (
              <Link key={l.label} to={l.href} className="sh-link">
                {l.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Language Switcher */}
        {onLanguageChange && (
          <div className="sh-language-switcher hidden md:flex relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="sh-language-btn"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5" />
              <span className="sh-language-code">{currentLanguage.toUpperCase()}</span>
            </button>
            {showLanguageMenu && (
              <div className="sh-language-menu">
                <button
                  onClick={() => {
                    onLanguageChange('ru');
                    setShowLanguageMenu(false);
                  }}
                  className={`sh-language-option ${currentLanguage === 'ru' ? 'active' : ''}`}
                >
                  🇷🇺 Русский
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('et');
                    setShowLanguageMenu(false);
                  }}
                  className={`sh-language-option ${currentLanguage === 'et' ? 'active' : ''}`}
                >
                  🇪🇪 Eesti
                </button>
              </div>
            )}
          </div>
        )}

        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="sh-github-btn hidden md:flex">
            <svg className="sh-github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        )}

        {customIcon && (
          <div className="sh-custom-icon hidden md:flex">
            {customIcon}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="sh-mobile-menu-btn md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sh-mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <nav className="sh-mobile-nav" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="sh-mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            
            {links.map((l) => {
              const isExternal = l.href.startsWith('http');
              if (l.label === "Support Us" || l.label === "Поддержать" || l.label === "Toeta") {
                if (isExternal) {
                  return (
                    <a 
                      key={l.label} 
                      href={l.href} 
                      className="sh-mobile-cta-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="sh-cta-frame" viewBox="0 0 150 40" preserveAspectRatio="none">
                        <path d="M5 5 L145 5 L150 20 L145 35 L5 35 L0 20 Z" className="sh-cta-path" />
                      </svg>
                      <span className="sh-cta-label">{l.label}</span>
                    </a>
                  );
                }
                return (
                  <Link 
                    key={l.label} 
                    to={l.href} 
                    className="sh-mobile-cta-button"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="sh-cta-frame" viewBox="0 0 150 40" preserveAspectRatio="none">
                      <path d="M5 5 L145 5 L150 20 L145 35 L5 35 L0 20 Z" className="sh-cta-path" />
                    </svg>
                    <span className="sh-cta-label">{l.label}</span>
                  </Link>
                );
              }
              if (isExternal) {
                return (
                  <a 
                    key={l.label} 
                    href={l.href} 
                    className="sh-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                );
              }
              return (
                <Link 
                  key={l.label} 
                  to={l.href} 
                  className="sh-mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            {/* Mobile Language Switcher */}
            {onLanguageChange && (
              <div className="sh-mobile-language-switcher">
                <div className="sh-mobile-language-label">Keel / Язык:</div>
                <div className="sh-mobile-language-buttons">
                  <button
                    onClick={() => {
                      onLanguageChange('ru');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`sh-mobile-language-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
                  >
                    🇷🇺 Русский
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('et');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`sh-mobile-language-btn ${currentLanguage === 'et' ? 'active' : ''}`}
                  >
                    🇪🇪 Eesti
                  </button>
                </div>
              </div>
            )}

            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sh-mobile-github-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="sh-github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <span>GitHub</span>
              </a>
            )}
            {/* Mobile Stats */}
            {(daysLeft !== undefined || totalBackers !== undefined) && (
              <div className="sh-mobile-stats">
                {daysLeft !== undefined && (
                  <div className="sh-stat-item">
                    <Clock className="sh-stat-icon" />
                    <span className="sh-stat-value">{daysLeft}</span>
                    <span className="sh-stat-label">дней</span>
                  </div>
                )}
                {totalBackers !== undefined && (
                  <div className="sh-stat-item">
                    <Users className="sh-stat-icon" />
                    <span className="sh-stat-value">{totalBackers}</span>
                    <span className="sh-stat-label">спонсоров</span>
                  </div>
                )}
                {progressPercent !== undefined && (
                  <div className="sh-stat-item">
                    <TrendingUp className="sh-stat-icon" />
                    <span className="sh-stat-value">{Math.round(progressPercent)}</span>
                    <span className="sh-stat-label">%</span>
                  </div>
                )}
              </div>
            )}
      </nav>
        </div>
      )}
    </header>
  );
};
