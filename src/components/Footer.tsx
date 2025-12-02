import React from "react";
import { Shield, CheckCircle, Users } from "lucide-react";
import "./footer.css";
import { Language, getTranslation } from "../locales";

interface FooterProps {
  totalBackers?: number;
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ totalBackers = 28, language = 'et' }) => {
  const t = (key: keyof typeof import('../locales').translations.ru) => getTranslation(language, key);
  return (
    <footer className="sci-footer">
      
      
      {/* Trust & security indicators */}
      <div className="sf-trust-badges">
        <div className="sf-trust-item">
          <Shield className="sf-trust-icon sf-icon-green" />
          <span className="sf-trust-text">{t('safePayments')}</span>
        </div>
        <div className="sf-trust-item">
          <CheckCircle className="sf-trust-icon sf-icon-blue" />
          <span className="sf-trust-text">{t('refundGuarantee')}</span>
        </div>
        <div className="sf-trust-item">
          <Users className="sf-trust-icon sf-icon-purple" />
          <span className="sf-trust-text">{totalBackers} {t('trustUs')}</span>
        </div>
      </div>

      

      {/* Thank you message */}
      <div className="sf-thanks">
        <p className="sf-thanks-text">{t('thanksForSupport')}</p>
        <p className="sf-thanks-desc">{t('fundsDescription')}</p>
      </div>

      

      {/* Credits */}
      <div className="sf-credits">
        <span>{t('music')} Albert Petenberg</span>
        <span>•</span>
        <span>{t('lyrics')} Rebecca Kontus</span>
        <span>•</span>
        <span>{t('artDirector')} Dmitri Gornakov</span>
      </div>

      <div className="sf-line"></div>

      {/* Copyright */}
      <div className="sf-copyright">© 2025 Tiiva All</div>
    </footer>
  );
};
