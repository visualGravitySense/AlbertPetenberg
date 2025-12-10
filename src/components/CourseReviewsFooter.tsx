import React from "react";
import { Shield, CheckCircle, Users, GraduationCap, BookOpen, MessageSquare } from "lucide-react";
import "./course-reviews-footer.css";
import { Language, getTranslation } from "../locales";

interface CourseReviewsFooterProps {
  totalBackers?: number;
  language?: Language;
}

export const CourseReviewsFooter: React.FC<CourseReviewsFooterProps> = ({ 
  totalBackers = 45, 
  language = 'et' 
}) => {
  const t = (key: keyof typeof import('../locales').translations.ru) => getTranslation(language, key);
  
  return (
    <footer className="cr-footer">
      {/* Trust & security indicators */}
      <div className="cr-footer__trust-badges">
        <div className="cr-footer__trust-item">
          <Shield className="cr-footer__trust-icon cr-footer__trust-icon--green" />
          <span className="cr-footer__trust-text">
            {language === 'et' ? 'Turvalised maksed' : 'Безопасные платежи'}
          </span>
        </div>
        <div className="cr-footer__trust-item">
          <CheckCircle className="cr-footer__trust-icon cr-footer__trust-icon--blue" />
          <span className="cr-footer__trust-text">
            {language === 'et' ? 'Tagastusgarantii' : 'Гарантия возврата'}
          </span>
        </div>
        <div className="cr-footer__trust-item">
          <Users className="cr-footer__trust-icon cr-footer__trust-icon--cyan" />
          <span className="cr-footer__trust-text">
            {totalBackers} {language === 'et' ? 'toetajat' : 'спонсоров'}
          </span>
        </div>
      </div>

      {/* Thank you message */}
      <div className="cr-footer__thanks">
        <p className="cr-footer__thanks-text">
          {language === 'et' 
            ? 'Täname teid toetuse eest! 💜' 
            : 'Спасибо за вашу поддержку! 💜'}
        </p>
        <p className="cr-footer__thanks-desc">
          {language === 'et' 
            ? 'Kõik vahendid lähevad platvormi arendamisele ja kursuste arvustuste süsteemi loomisele' 
            : 'Все средства идут на развитие платформы и создание системы отзывов о курсах'}
        </p>
      </div>

      {/* Project Info */}
      <div className="cr-footer__project-info">
        <div className="cr-footer__project-badge">
          <GraduationCap className="cr-footer__project-icon" />
          <span>
            {language === 'et' ? 'Haridusplatoform' : 'Образовательная платформа'}
          </span>
        </div>
        <div className="cr-footer__project-description">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>
            {language === 'et' 
              ? 'Ausad arvustused tõelistelt üliõpilastelt' 
              : 'Честные отзывы от реальных студентов'}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="cr-footer__line"></div>

      {/* Copyright */}
      <div className="cr-footer__copyright">
        © 2025 {language === 'et' ? 'Kursuste Arvustused' : 'Отзывы про Курсы'}
      </div>
    </footer>
  );
};

