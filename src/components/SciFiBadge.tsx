import React from "react";
import "./sci-fi-badge.css";

interface SciFiBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const DEFAULT_PATH = "M5 5 L95 5 L100 15 L95 25 L5 25 L0 15 Z";

export const SciFiBadge: React.FC<SciFiBadgeProps> = ({
  children,
  icon,
  className = ""
}) => {
  return (
    <div className={`sci-badge ${className}`}>
      <svg className="sci-badge-frame" viewBox="0 0 100 30" preserveAspectRatio="none">
        <path d={DEFAULT_PATH} className="sci-badge-path" />
      </svg>
      <div className="sci-badge-content">
        {icon && <span className="sci-badge-icon">{icon}</span>}
        <span className="sci-badge-label">{children}</span>
      </div>
    </div>
  );
};

