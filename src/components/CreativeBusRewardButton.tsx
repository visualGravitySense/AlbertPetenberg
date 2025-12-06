import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import './creative-bus-reward-button.css';

interface CreativeBusRewardButtonProps {
  amount: number;
  onClick: () => void;
  isPopular?: boolean;
  isSelected?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CreativeBusRewardButton: React.FC<CreativeBusRewardButtonProps> = ({
  amount,
  onClick,
  isPopular = false,
  isSelected = false,
  className = '',
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={`cb-reward-button ${isPopular ? 'cb-reward-button--popular' : ''} ${isSelected ? 'cb-reward-button--selected' : ''} ${className}`}
    >
      <span className="cb-reward-button-content">
        <ShoppingCart className="cb-reward-button-icon" />
        <span className="cb-reward-button-text">
          {children || `Поддержать €${amount}`}
        </span>
        <ArrowRight className="cb-reward-button-arrow" />
      </span>
      {isPopular && <div className="cb-reward-button-glow"></div>}
    </button>
  );
};
