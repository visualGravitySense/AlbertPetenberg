import React from "react";
import { Clock, Users, TrendingUp } from "lucide-react";
import "./header.css";

interface HeaderProps {
  links: { label: string; href: string }[];
  title?: string;
  githubUrl?: string;
  // MOTIVATION: Social proof and urgency
  daysLeft?: number;
  totalBackers?: number;
  progressPercent?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  links, 
  title = "COSMIC UI", 
  githubUrl,
  daysLeft,
  totalBackers,
  progressPercent
}) => {
  return (
    <header className="sci-header">
      <div className="sh-left">
        <div className="sh-title">{title}</div>
        
        {/* MOTIVATION: Social proof and urgency indicators in header */}
        {(daysLeft !== undefined || totalBackers !== undefined) && (
          <div className="sh-stats">
            {daysLeft !== undefined && (
              <div className="sh-stat-item">
                <Clock className="sh-stat-icon" />
                <span className="sh-stat-value">{daysLeft}</span>
                <span className="sh-stat-label">дней</span>
              </div>
            )}
            {totalBackers !== undefined && (
              <div className="sh-stat-item">
                <Users className="sh-stat-icon" />
                <span className="sh-stat-value">{totalBackers}</span>
                <span className="sh-stat-label">спонсоров</span>
              </div>
            )}
            {progressPercent !== undefined && (
              <div className="sh-stat-item">
                <TrendingUp className="sh-stat-icon" />
                <span className="sh-stat-value">{Math.round(progressPercent)}%</span>
                <span className="sh-stat-label">цели</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sh-right">
        <nav className="sh-nav">
          {links.map((l) => {
            // Special styling for "Support Us" button
            if (l.label === "Support Us" || l.label === "Поддержать") {
              return (
                <a key={l.label} href={l.href} className="sh-cta-button">
                  <svg className="sh-cta-frame" viewBox="0 0 150 40" preserveAspectRatio="none">
                    <path d="M5 5 L145 5 L150 20 L145 35 L5 35 L0 20 Z" className="sh-cta-path" />
                  </svg>
                  <span className="sh-cta-label">{l.label}</span>
                </a>
              );
            }
            return (
              <a key={l.label} href={l.href} className="sh-link">
                {l.label}
              </a>
            );
          })}
        </nav>
        
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="sh-github-btn">
            <svg className="sh-github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        )}
      </div>
    </header>
  );
};
