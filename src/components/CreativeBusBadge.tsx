import React from "react";
import "./creative-bus-badge.css";

interface CreativeBusBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'left' | 'center' | 'right';
}

// Arrow shapes for different positions
const ARROW_LEFT_PATH = "M0 15 L15 5 L95 5 L100 15 L95 25 L15 25 Z"; // Arrow on left, flat on right
const ARROW_CENTER_PATH = "M5 5 L95 5 L100 15 L95 25 L5 25 L0 15 Z"; // Arrows on both sides
const ARROW_RIGHT_PATH = "M5 5 L85 5 L100 15 L85 25 L5 25 Z"; // Arrow on right, flat on left

export const CreativeBusBadge: React.FC<CreativeBusBadgeProps> = ({
  children,
  icon,
  className = "",
  variant = 'center'
}) => {
  const getPath = () => {
    switch (variant) {
      case 'left':
        return ARROW_LEFT_PATH;
      case 'right':
        return ARROW_RIGHT_PATH;
      case 'center':
      default:
        return ARROW_CENTER_PATH;
    }
  };

  return (
    <div className={`cb-badge ${className}`}>
      <svg className="cb-badge-frame" viewBox="0 0 100 30" preserveAspectRatio="none">
        <path d={getPath()} className="cb-badge-path" />
      </svg>
      <div className="cb-badge-content">
        {icon && <span className="cb-badge-icon">{icon}</span>}
        <span className="cb-badge-label">{children}</span>
      </div>
    </div>
  );
};
