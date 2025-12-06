import React from "react";
import "./quick-support-button.css";

interface QuickSupportButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount?: number;
  isRecommended?: boolean;
  isBestValue?: boolean;
  isCustom?: boolean;
  children?: React.ReactNode;
}

export const QuickSupportButton: React.FC<QuickSupportButtonProps> = ({
  amount,
  isRecommended = false,
  isBestValue = false,
  isCustom = false,
  children,
  className = "",
  ...props
}) => {
  const getButtonClass = () => {
    if (isRecommended) return "qs-btn qs-btn-recommended";
    if (isCustom) return "qs-btn qs-btn-custom";
    return "qs-btn qs-btn-default";
  };

  return (
    <button className={`${getButtonClass()} ${className}`} {...props}>
      <span className="qs-btn-label">
        {children || (amount && `€${amount.toLocaleString()}`)}
      </span>
    </button>
  );
};

