import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import "./reward-button.css";

interface RewardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount: number;
  language?: 'et' | 'ru';
  className?: string;
}

export const RewardButton: React.FC<RewardButtonProps> = ({
  amount,
  language = 'et',
  className = "",
  ...props
}) => {
  return (
    <button className={`reward-btn ${className}`} {...props}>
      <ShoppingCart className="reward-btn-icon" />
      <span className="reward-btn-text">
        {language === 'et' ? 'Toeta €' : 'Поддержать €'}{amount}
      </span>
      <ArrowRight className="reward-btn-arrow" />
    </button>
  );
};
