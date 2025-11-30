import React from "react";
import "./product-card.css";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  onBuy?: () => void;
  svgPath?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  onBuy,
  svgPath = DEFAULT_FRAME,
}) => {
  return (
    <div className="pcard">
      <svg className="pc-frame" viewBox="0 0 260 360" preserveAspectRatio="none">
        <path d={svgPath} className="pc-path" />
      </svg>

      <img src={image} alt={title} className="pc-image" />

      <h3 className="pc-title">{title}</h3>
      <p className="pc-price">{price}</p>

      <button className="pc-btn" onClick={onBuy}>
        BUY
      </button>
    </div>
  );
};

const DEFAULT_FRAME = 
  "M10 10 H250 V350 H10 Z";
