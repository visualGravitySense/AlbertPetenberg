import React, { useState } from 'react';
import './blade-card.css';

// Card variants
type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';
type CardSize = 'small' | 'medium' | 'large';
type CardColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface BladeCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  color?: CardColor;
  onClick?: () => void;
  href?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'border' | 'none';
  as?: 'div' | 'article' | 'section';
}

export const BladeCard: React.FC<BladeCardProps> = ({
  children,
  variant = 'elevated',
  size = 'medium',
  color = 'default',
  onClick,
  href,
  isSelected = false,
  isDisabled = false,
  className = '',
  hoverEffect = 'lift',
  as: Component = 'div',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isInteractive = !!onClick || !!href;

  const baseClass = 'blade-card';
  const variantClass = `blade-card--${variant}`;
  const sizeClass = `blade-card--${size}`;
  const colorClass = `blade-card--${color}`;
  const hoverClass = `blade-card--hover-${hoverEffect}`;
  const interactiveClass = isInteractive ? 'blade-card--interactive' : '';
  const selectedClass = isSelected ? 'blade-card--selected' : '';
  const disabledClass = isDisabled ? 'blade-card--disabled' : '';
  const pressedClass = isPressed ? 'blade-card--pressed' : '';
  const focusedClass = isFocused ? 'blade-card--focused' : '';

  const combinedClassName = [
    baseClass,
    variantClass,
    sizeClass,
    colorClass,
    hoverClass,
    interactiveClass,
    selectedClass,
    disabledClass,
    pressedClass,
    focusedClass,
    className,
  ].filter(Boolean).join(' ');

  const handleMouseDown = () => !isDisabled && setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const interactiveProps = isInteractive ? {
    tabIndex: isDisabled ? -1 : 0,
    role: 'button',
    'aria-disabled': isDisabled,
    'aria-pressed': isSelected,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: handleClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
        e.preventDefault();
        onClick?.();
      }
    },
  } : {};

  if (href && !isDisabled) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </a>
    );
  }

  return (
    <Component className={combinedClassName} {...interactiveProps}>
      {children}
    </Component>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  action,
}) => (
  <div className={`blade-card__header ${className}`}>
    <div className="blade-card__header-content">{children}</div>
    {action && <div className="blade-card__header-action">{action}</div>}
  </div>
);

// Card Body Component
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => (
  <div className={`blade-card__body ${className}`}>
    {children}
  </div>
);

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  divider = false,
}) => (
  <div className={`blade-card__footer ${divider ? 'blade-card__footer--divider' : ''} ${className}`}>
    {children}
  </div>
);

// Card Media Component (for images)
interface CardMediaProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  gradient?: string;
  height?: number | string;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  src,
  alt = '',
  children,
  className = '',
  overlay = false,
  gradient,
  height = 180,
}) => (
  <div 
    className={`blade-card__media ${overlay ? 'blade-card__media--overlay' : ''} ${className}`}
    style={{ 
      height: typeof height === 'number' ? `${height}px` : height,
      background: gradient,
    }}
  >
    {src && <img src={src} alt={alt} className="blade-card__media-image" />}
    {children}
    {overlay && <div className="blade-card__media-overlay" />}
  </div>
);

// Card Badge Component
interface CardBadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const CardBadge: React.FC<CardBadgeProps> = ({
  children,
  variant = 'solid',
  color = 'default',
  position = 'top-right',
}) => (
  <div className={`blade-card__badge blade-card__badge--${variant} blade-card__badge--${color} blade-card__badge--${position}`}>
    {children}
  </div>
);

// Card Progress Component
interface CardProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

export const CardProgress: React.FC<CardProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  color = 'primary',
  size = 'medium',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={`blade-card__progress blade-card__progress--${size}`}>
      <div className="blade-card__progress-track">
        <div 
          className={`blade-card__progress-fill blade-card__progress-fill--${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="blade-card__progress-label">{percentage.toFixed(0)}%</span>
      )}
    </div>
  );
};

// Card Stats Component
interface CardStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const CardStat: React.FC<CardStatProps> = ({
  label,
  value,
  icon,
  trend,
}) => (
  <div className={`blade-card__stat ${trend ? `blade-card__stat--${trend}` : ''}`}>
    {icon && <span className="blade-card__stat-icon">{icon}</span>}
    <span className="blade-card__stat-value">{value}</span>
    <span className="blade-card__stat-label">{label}</span>
  </div>
);

// Card Action Button
interface CardActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
}

export const CardAction: React.FC<CardActionProps> = ({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
}) => (
  <button
    className={`blade-card__action blade-card__action--${variant} ${fullWidth ? 'blade-card__action--full' : ''} ${disabled ? 'blade-card__action--disabled' : ''} ${loading ? 'blade-card__action--loading' : ''}`}
    onClick={(e) => {
      e.stopPropagation();
      if (!disabled && !loading) {
        onClick?.();
      }
    }}
    disabled={disabled || loading}
    aria-disabled={disabled || loading}
  >
    {loading && (
      <span className="blade-card__action-spinner">
        <svg className="blade-card__spinner" viewBox="0 0 24 24">
          <circle className="blade-card__spinner-circle" cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
        </svg>
      </span>
    )}
    {!loading && icon && iconPosition === 'left' && <span className="blade-card__action-icon">{icon}</span>}
    <span>{children}</span>
    {!loading && icon && iconPosition === 'right' && <span className="blade-card__action-icon">{icon}</span>}
  </button>
);

// Export all
export default BladeCard;
