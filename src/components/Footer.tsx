import React from "react";
import "./footer.css";

interface FooterProps {
  text?: string;
}

export const Footer: React.FC<FooterProps> = ({ text = "© 2025 Cosmic Interface" }) => {
  return (
    <footer className="sci-footer">
      <div className="sf-line"></div>
      <div className="sf-text">{text}</div>
    </footer>
  );
};
