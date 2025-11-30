import React from "react";
import { Shield, CheckCircle, Users } from "lucide-react";
import "./footer.css";

interface FooterProps {
  totalBackers?: number;
}

export const Footer: React.FC<FooterProps> = ({ totalBackers = 28 }) => {
  return (
    <footer className="sci-footer">
      
      
      {/* Trust & security indicators */}
      <div className="sf-trust-badges">
        <div className="sf-trust-item">
          <Shield className="sf-trust-icon sf-icon-green" />
          <span className="sf-trust-text">Безопасные платежи</span>
        </div>
        <div className="sf-trust-item">
          <CheckCircle className="sf-trust-icon sf-icon-blue" />
          <span className="sf-trust-text">Гарантия возврата</span>
        </div>
        <div className="sf-trust-item">
          <Users className="sf-trust-icon sf-icon-purple" />
          <span className="sf-trust-text">{totalBackers} доверяют нам</span>
        </div>
      </div>

      

      {/* Thank you message */}
      <div className="sf-thanks">
        <p className="sf-thanks-text">Спасибо за вашу поддержку! 💜</p>
        <p className="sf-thanks-desc">Все средства идут напрямую на производство музыки "Tiiva All" и создание профессионального видеоклипа</p>
      </div>

      

      {/* Credits */}
      <div className="sf-credits">
        <span>Музыка: Альберт Петенберг</span>
        <span>•</span>
        <span>Текст: Ребекка Контус</span>
        <span>•</span>
        <span>Арт-директор: Дмитрий Горнаков</span>
      </div>

      <div className="sf-line"></div>

      {/* Copyright */}
      <div className="sf-copyright">© 2025 Tiiva All</div>
    </footer>
  );
};
