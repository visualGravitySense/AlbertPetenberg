import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiList, PiX, PiGlobe, PiRocketLaunchFill } from "react-icons/pi";
import "./platform-header.css";
import { Language, getTranslation } from "../locales";

interface PlatformHeaderProps {
  links: { label: string; href: string }[];
  title?: string;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const PlatformHeader: React.FC<PlatformHeaderProps> = ({ 
  links, 
  title = "AMOE",
  currentLanguage = 'ru',
  onLanguageChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <header className="platform-header">
      <div className="platform-header-container">
        {/* Logo / Title */}
        <Link to="/" className="platform-header-logo">
          <PiRocketLaunchFill className="platform-header-logo-icon" />
          <span className="platform-header-logo-text">{title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="platform-header-nav">
          {links.map((l) => {
            const isExternal = l.href.startsWith('http');
            const isActive = window.location.pathname === l.href;
            
            if (isExternal) {
              return (
                <a 
                  key={l.label} 
                  href={l.href} 
                  className={`platform-header-link ${isActive ? 'active' : ''}`}
                >
                  {l.label}
                </a>
              );
            }
            return (
              <Link 
                key={l.label} 
                to={l.href} 
                className={`platform-header-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="platform-header-right">
          {/* Language Switcher */}
          {onLanguageChange && (
            <div className="platform-header-language">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="platform-header-language-btn"
                aria-label="Change language"
              >
                <PiGlobe className="w-5 h-5" />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>
              {showLanguageMenu && (
                <div className="platform-header-language-menu">
                  <button
                    onClick={() => {
                      onLanguageChange('ru');
                      setShowLanguageMenu(false);
                    }}
                    className={`platform-header-language-option ${currentLanguage === 'ru' ? 'active' : ''}`}
                  >
                    🇷🇺 Русский
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('et');
                      setShowLanguageMenu(false);
                    }}
                    className={`platform-header-language-option ${currentLanguage === 'et' ? 'active' : ''}`}
                  >
                    🇪🇪 Eesti
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="platform-header-mobile-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <PiX className="w-6 h-6" /> : <PiList className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="platform-mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <nav className="platform-mobile-nav" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="platform-mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <PiX className="w-6 h-6" />
            </button>

            {/* Mobile Links */}
            {links.map((l) => {
              const isExternal = l.href.startsWith('http');
              if (isExternal) {
                return (
                  <a 
                    key={l.label} 
                    href={l.href} 
                    className="platform-mobile-link"
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
                  className="platform-mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            {onLanguageChange && (
              <div className="platform-mobile-language">
                <div className="platform-mobile-language-label">Язык / Keel:</div>
                <div className="platform-mobile-language-btns">
                  <button
                    onClick={() => {
                      onLanguageChange('ru');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`platform-mobile-language-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
                  >
                    🇷🇺 RU
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('et');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`platform-mobile-language-btn ${currentLanguage === 'et' ? 'active' : ''}`}
                  >
                    🇪🇪 ET
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
