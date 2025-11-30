import React from "react";
import "./text-block.css";

interface TextBlockProps {
  title?: string;
  children: React.ReactNode;
  svgPath?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  title,
  children,
  svgPath = DEFAULT_FRAME,
}) => {
  return (
    <div className="textblock">
      <svg className="tb-frame" viewBox="0 0 400 160" preserveAspectRatio="none">
        <path d={svgPath} className="tb-path" />
      </svg>

      {title && <h3 className="tb-title">{title}</h3>}
      <div className="tb-content">{children}</div>
    </div>
  );
};

const DEFAULT_FRAME =
  "M10 10 H390 L380 150 H20 Z";
