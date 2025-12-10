import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, TrendingUp, Menu, X, Globe, GraduationCap } from "lucide-react";
import "./course-reviews-header.css";
import { Language, getTranslation } from "../locales";

interface CourseReviewsHeaderProps {
  links: { label: string; href: string }[];
  title?: string;
  githubUrl?: string;
  customIcon?: React.ReactNode;
  daysLeft?: number;
  totalBackers?: number;
  progressPercent?: number;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const CourseReviewsHeader: React.FC<CourseReviewsHeaderProps> = ({ 
  links, 
  title = "TarkValik", 
  githubUrl,
  customIcon,
  daysLeft,
  totalBackers,
  progressPercent,
  currentLanguage = 'et',
  onLanguageChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const t = (key: keyof typeof import('../locales').translations.ru) => getTranslation(currentLanguage, key);

  return (
    <header className="cr-header">
      {/* SVG Gradient Definition for Course Reviews Theme */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="cr-gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="cr-header__left">
        <div className="cr-header__title">
          {customIcon || <GraduationCap className="cr-header__icon" />}
          <span>{title}</span>
        </div>
        
        {/* Stats indicators - hidden on mobile */}
        {(daysLeft !== undefined || totalBackers !== undefined) && (
          <div className="cr-header__stats hidden md:flex">
            {daysLeft !== undefined && (
              <div className="cr-header__stat-item">
                <Clock className="cr-header__stat-icon" />
                <span className="cr-header__stat-value">{daysLeft}</span>
                <span className="cr-header__stat-label">{t('daysFull')}</span>
              </div>
            )}
            {totalBackers !== undefined && (
              <div className="cr-header__stat-item">
                <Users className="cr-header__stat-icon" />
                <span className="cr-header__stat-value">{totalBackers}</span>
                <span className="cr-header__stat-label">{t('sponsors')}</span>
              </div>
            )}
            {progressPercent !== undefined && (
              <div className="cr-header__stat-item">
                <TrendingUp className="cr-header__stat-icon" />
                <span className="cr-header__stat-value">{Math.round(progressPercent)}</span>
                <span className="cr-header__stat-label">%</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="cr-header__right">
        {/* Desktop Navigation */}
        <nav className="cr-header__nav hidden md:flex">
          {links.map((l) => {
            const isExternal = l.href.startsWith('http');
            if (isExternal) {
              return (
                <a key={l.label} href={l.href} className="cr-header__link">
                  {l.label}
                </a>
              );
            }
            return (
              <Link key={l.label} to={l.href} className="cr-header__link">
                {l.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Language Switcher */}
        {onLanguageChange && (
          <div className="cr-header__language-switcher hidden md:flex relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="cr-header__language-btn"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5" />
              <span className="cr-header__language-code">{currentLanguage.toUpperCase()}</span>
            </button>
            {showLanguageMenu && (
              <div className="cr-header__language-menu">
                <button
                  onClick={() => {
                    onLanguageChange('ru');
                    setShowLanguageMenu(false);
                  }}
                  className={`cr-header__language-option ${currentLanguage === 'ru' ? 'active' : ''}`}
                >
                  🇷🇺 Русский
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('et');
                    setShowLanguageMenu(false);
                  }}
                  className={`cr-header__language-option ${currentLanguage === 'et' ? 'active' : ''}`}
                >
                  🇪🇪 Eesti
                </button>
              </div>
            )}
          </div>
        )}

        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="cr-header__github-btn hidden md:flex">
            <svg className="cr-header__github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="cr-header__mobile-menu-btn md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="cr-header__mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <nav className="cr-header__mobile-nav" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="cr-header__mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            
            {links.map((l) => {
              const isExternal = l.href.startsWith('http');
              if (isExternal) {
                return (
                  <a 
                    key={l.label} 
                    href={l.href} 
                    className="cr-header__mobile-link"
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
                  className="cr-header__mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            {onLanguageChange && (
              <div className="cr-header__mobile-language-switcher">
                <div className="cr-header__mobile-language-label">
                  {currentLanguage === 'et' ? 'Keel:' : 'Язык:'}
                </div>
                <div className="cr-header__mobile-language-buttons">
                  <button
                    onClick={() => {
                      onLanguageChange('ru');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`cr-header__mobile-language-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
                  >
                    🇷🇺 Русский
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('et');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`cr-header__mobile-language-btn ${currentLanguage === 'et' ? 'active' : ''}`}
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
                className="cr-header__mobile-github-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="cr-header__github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <span>GitHub</span>
              </a>
            )}

            {/* Mobile Stats */}
            {(daysLeft !== undefined || totalBackers !== undefined) && (
              <div className="cr-header__mobile-stats">
                {daysLeft !== undefined && (
                  <div className="cr-header__stat-item">
                    <Clock className="cr-header__stat-icon" />
                    <span className="cr-header__stat-value">{daysLeft}</span>
                    <span className="cr-header__stat-label">{t('daysFull')}</span>
                  </div>
                )}
                {totalBackers !== undefined && (
                  <div className="cr-header__stat-item">
                    <Users className="cr-header__stat-icon" />
                    <span className="cr-header__stat-value">{totalBackers}</span>
                    <span className="cr-header__stat-label">{t('sponsors')}</span>
                  </div>
                )}
                {progressPercent !== undefined && (
                  <div className="cr-header__stat-item">
                    <TrendingUp className="cr-header__stat-icon" />
                    <span className="cr-header__stat-value">{Math.round(progressPercent)}</span>
                    <span className="cr-header__stat-label">%</span>
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

