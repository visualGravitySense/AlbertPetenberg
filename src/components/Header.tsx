import React from "react";
import "./header.css";

interface HeaderProps {
  links: { label: string; href: string }[];
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ links, title = "COSMIC UI" }) => {
  return (
    <header className="sci-header">
      <div className="sh-title">{title}</div>
      <nav className="sh-nav">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="sh-link">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
