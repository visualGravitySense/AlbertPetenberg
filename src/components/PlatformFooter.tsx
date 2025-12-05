import React from "react";
import { Link } from "react-router-dom";
import { 
  PiRocketLaunchFill, 
  PiEnvelopeFill, 
  PiGithubLogoFill,
  PiLinkedinLogoFill,
  PiTwitterLogoFill,
  PiShieldCheckFill,
  PiHandshakeFill,
  PiHeartFill
} from "react-icons/pi";
import "./platform-footer.css";
import { Language, getTranslation } from "../locales";

interface PlatformFooterProps {
  language?: Language;
}

export const PlatformFooter: React.FC<PlatformFooterProps> = ({ language = 'et' }) => {
  const t = (key: keyof typeof import('../locales').translations.ru) => getTranslation(language, key);
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="platform-footer">
      <div className="platform-footer-container">
        {/* Main Footer Content */}
        <div className="platform-footer-grid">
          {/* Brand Section */}
          <div className="platform-footer-brand">
            <Link to="/" className="platform-footer-logo">
              <PiRocketLaunchFill className="platform-footer-logo-icon" />
              <span>Crowdfunding</span>
            </Link>
            <p className="platform-footer-tagline">
              {language === 'et' 
                ? 'Platvorm innovaatiliste projektide toetamiseks'
                : 'Платформа для поддержки инновационных проектов'}
            </p>
            {/* Social Links */}
            <div className="platform-footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="platform-footer-social-link">
                <PiGithubLogoFill />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="platform-footer-social-link">
                <PiLinkedinLogoFill />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="platform-footer-social-link">
                <PiTwitterLogoFill />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="platform-footer-links">
            <h4 className="platform-footer-links-title">
              {language === 'et' ? 'Platvorm' : 'Платформа'}
            </h4>
            <ul className="platform-footer-links-list">
              <li><Link to="/">{language === 'et' ? 'Kõik projektid' : 'Все проекты'}</Link></li>
              <li><Link to="/about">{language === 'et' ? 'Meist' : 'О нас'}</Link></li>
              <li><Link to="/how-it-works">{language === 'et' ? 'Kuidas see töötab' : 'Как это работает'}</Link></li>
              <li><Link to="/start-project">{language === 'et' ? 'Alusta projekti' : 'Начать проект'}</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="platform-footer-links">
            <h4 className="platform-footer-links-title">
              {language === 'et' ? 'Tugi' : 'Поддержка'}
            </h4>
            <ul className="platform-footer-links-list">
              <li><Link to="/faq">{language === 'et' ? 'KKK' : 'FAQ'}</Link></li>
              <li><Link to="/contact">{language === 'et' ? 'Kontakt' : 'Контакты'}</Link></li>
              <li><Link to="/terms">{language === 'et' ? 'Kasutustingimused' : 'Условия использования'}</Link></li>
              <li><Link to="/privacy">{language === 'et' ? 'Privaatsus' : 'Конфиденциальность'}</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="platform-footer-contact">
            <h4 className="platform-footer-links-title">
              {language === 'et' ? 'Kontakt' : 'Связаться'}
            </h4>
            <a href="mailto:info@crowdfunding.ee" className="platform-footer-email">
              <PiEnvelopeFill />
              <span>info@crowdfunding.ee</span>
            </a>
            {/* Trust Badges */}
            <div className="platform-footer-trust">
              <div className="platform-footer-trust-item">
                <PiShieldCheckFill className="platform-footer-trust-icon" />
                <span>{language === 'et' ? 'Turvalised maksed' : 'Безопасные платежи'}</span>
              </div>
              <div className="platform-footer-trust-item">
                <PiHandshakeFill className="platform-footer-trust-icon" />
                <span>{language === 'et' ? 'Tagastusgarantii' : 'Гарантия возврата'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="platform-footer-bottom">
          <div className="platform-footer-copyright">
            © {currentYear} Crowdfunding Platform. {language === 'et' ? 'Kõik õigused kaitstud.' : 'Все права защищены.'}
          </div>
          <div className="platform-footer-made">
            {language === 'et' ? 'Tehtud' : 'Сделано с'} <PiHeartFill className="platform-footer-heart" /> {language === 'et' ? 'Eestis' : 'в Эстонии'}
          </div>
        </div>
      </div>
    </footer>
  );
};
