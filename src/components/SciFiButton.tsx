import React from "react";
import "./sci-fi-button.css";

interface SciFiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  svgPath?: string;
}

export const SciFiButton: React.FC<SciFiButtonProps> = ({
  children,
  svgPath = DEFAULT_PATH,
  ...props
}) => {
  return (
    <button className="sci-btn" {...props}>
      <svg className="sci-btn-frame" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path d={svgPath} className="sci-btn-path" />
      </svg>
      <span className="sci-btn-label">{children}</span>
    </button>
  );
};

const DEFAULT_PATH = "M10 10 L190 10 L200 30 L190 50 L10 50 L0 30 Z";
