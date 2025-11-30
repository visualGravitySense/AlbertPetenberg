import React from "react";
import "./quick-support-button.css";

interface QuickSupportButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount?: number;
  isRecommended?: boolean;
  isBestValue?: boolean;
  isCustom?: boolean;
  children?: React.ReactNode;
}

const DEFAULT_PATH = "M10 10 L190 10 L200 30 L190 50 L10 50 L0 30 Z";

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
      <svg className="qs-btn-frame" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path d={DEFAULT_PATH} className="qs-btn-path" />
      </svg>
      <span className="qs-btn-label">
        {children || (amount && `€${amount.toLocaleString()}`)}
      </span>
    </button>
  );
};

