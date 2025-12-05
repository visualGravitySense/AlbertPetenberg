import React from 'react';
import './blade-icons.css';

// Icon size types matching Blade design system
type IconSize = 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge';

interface IconProps {
  size?: IconSize;
  color?: string;
  className?: string;
}

// Size mapping
const sizeMap: Record<IconSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
  '2xlarge': 40,
};

// Base Icon wrapper
const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 'medium',
  color = 'currentColor',
  className = '',
  children,
}) => {
  const pixelSize = sizeMap[size];
  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill={color}
      className={`blade-icon blade-icon--${size} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

// ===== FILLED ICONS =====

// Navigation & Actions
export const HomeFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2L2 9.5V22h7v-7h6v7h7V9.5L12 2z" />
  </IconWrapper>
);

export const SearchFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </IconWrapper>
);

export const SettingsFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </IconWrapper>
);

export const BellFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </IconWrapper>
);

export const MenuFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </IconWrapper>
);

// User & Profile
export const UserFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </IconWrapper>
);

export const UsersFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </IconWrapper>
);

// Status & Feedback
export const CheckCircleFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </IconWrapper>
);

export const ErrorFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </IconWrapper>
);

export const WarningFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </IconWrapper>
);

export const InfoFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </IconWrapper>
);

// Commerce & Finance
export const WalletFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </IconWrapper>
);

export const CreditCardFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </IconWrapper>
);

export const ShoppingCartFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </IconWrapper>
);

export const GiftFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
  </IconWrapper>
);

export const TrendingUpFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </IconWrapper>
);

export const TrendingDownFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
  </IconWrapper>
);

// Content & Media
export const StarFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </IconWrapper>
);

export const HeartFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </IconWrapper>
);

export const BookmarkFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </IconWrapper>
);

export const ImageFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </IconWrapper>
);

export const PlayFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M8 5v14l11-7z" />
  </IconWrapper>
);

export const PauseFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </IconWrapper>
);

// Communication
export const ChatFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
  </IconWrapper>
);

export const MailFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </IconWrapper>
);

export const PhoneFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </IconWrapper>
);

// Location & Time
export const LocationFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </IconWrapper>
);

export const ClockFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </IconWrapper>
);

export const CalendarFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
  </IconWrapper>
);

// Technology & Devices
export const LightningFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </IconWrapper>
);

export const RocketFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2.5c-3.07 2.17-5.79 6.39-5.79 10.43 0 1.45.29 2.84.83 4.11L4.5 19.59 5.91 21l2.52-2.52c1.33.59 2.79.93 4.32.93h.5c1.53 0 2.99-.34 4.32-.93L20.09 21l1.41-1.41-2.54-2.55c.54-1.27.83-2.66.83-4.11 0-4.04-2.72-8.26-5.79-10.43L12 1l-2 1.5zm0 16.41c-2.62 0-4.75-2.13-4.75-4.75 0-3.38 2.33-7.29 4.75-9.34 2.42 2.05 4.75 5.96 4.75 9.34 0 2.62-2.13 4.75-4.75 4.75z" />
  </IconWrapper>
);

export const CodeFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </IconWrapper>
);

export const CloudFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </IconWrapper>
);

export const DownloadFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </IconWrapper>
);

export const UploadFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
  </IconWrapper>
);

// Arrows & Direction
export const ArrowRightFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </IconWrapper>
);

export const ArrowLeftFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </IconWrapper>
);

export const ChevronDownFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </IconWrapper>
);

export const ChevronUpFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </IconWrapper>
);

// Actions
export const AddFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </IconWrapper>
);

export const CloseFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </IconWrapper>
);

export const EditFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </IconWrapper>
);

export const DeleteFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </IconWrapper>
);

export const ShareFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </IconWrapper>
);

export const CopyFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </IconWrapper>
);

export const FilterFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </IconWrapper>
);

export const SortFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
  </IconWrapper>
);

export const MoreFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </IconWrapper>
);

// Security
export const LockFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </IconWrapper>
);

export const ShieldFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </IconWrapper>
);

export const VisibilityFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </IconWrapper>
);

export const VisibilityOffFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </IconWrapper>
);

// Export all icons as a collection
export const BladeIcons = {
  // Navigation
  HomeFilledIcon,
  SearchFilledIcon,
  SettingsFilledIcon,
  BellFilledIcon,
  MenuFilledIcon,
  // User
  UserFilledIcon,
  UsersFilledIcon,
  // Status
  CheckCircleFilledIcon,
  ErrorFilledIcon,
  WarningFilledIcon,
  InfoFilledIcon,
  // Commerce
  WalletFilledIcon,
  CreditCardFilledIcon,
  ShoppingCartFilledIcon,
  GiftFilledIcon,
  TrendingUpFilledIcon,
  TrendingDownFilledIcon,
  // Content
  StarFilledIcon,
  HeartFilledIcon,
  BookmarkFilledIcon,
  ImageFilledIcon,
  PlayFilledIcon,
  PauseFilledIcon,
  // Communication
  ChatFilledIcon,
  MailFilledIcon,
  PhoneFilledIcon,
  // Location & Time
  LocationFilledIcon,
  ClockFilledIcon,
  CalendarFilledIcon,
  // Technology
  LightningFilledIcon,
  RocketFilledIcon,
  CodeFilledIcon,
  CloudFilledIcon,
  DownloadFilledIcon,
  UploadFilledIcon,
  // Arrows
  ArrowRightFilledIcon,
  ArrowLeftFilledIcon,
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  // Actions
  AddFilledIcon,
  CloseFilledIcon,
  EditFilledIcon,
  DeleteFilledIcon,
  ShareFilledIcon,
  CopyFilledIcon,
  FilterFilledIcon,
  SortFilledIcon,
  MoreFilledIcon,
  // Security
  LockFilledIcon,
  ShieldFilledIcon,
  VisibilityFilledIcon,
  VisibilityOffFilledIcon,
};

export default BladeIcons;
