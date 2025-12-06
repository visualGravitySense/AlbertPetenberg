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

// Creative & Media Icons
export const MusicFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </IconWrapper>
);

export const MusicNoteFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
  </IconWrapper>
);

export const PaletteFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </IconWrapper>
);

export const BrushFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
  </IconWrapper>
);

export const BusFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
  </IconWrapper>
);

export const CamperVanFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </IconWrapper>
);

// Wellness & Lifestyle Icons
export const YogaFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm5.5 11.5c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2.5v-3L7 10.5 8.5 9l3 2.5h1l3-2.5 1.5 1.5-2.5 2.5v3H17c.28 0 .5.22.5.5z" />
  </IconWrapper>
);

export const LotusFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C8.5 6 4 9 4 14c0 3.5 3 6 6 6.5V22h4v-1.5c3-.5 6-3 6-6.5 0-5-4.5-8-8-12zm0 16c-2.21 0-4-1.79-4-4 0-2.72 1.94-4.82 4-7.5 2.06 2.68 4 4.78 4 7.5 0 2.21-1.79 4-4 4z" />
  </IconWrapper>
);

export const MeditationFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm7 14v-1c-2.33 0-4.32-1.45-5.12-3.5h-.76c-.8 2.05-2.79 3.5-5.12 3.5v1c2.09 0 3.96-.88 5.29-2.29L12 16.41l-.29-.29C13.04 17.12 14.91 18 17 18h2zm-7-4c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
  </IconWrapper>
);

export const SpaFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M15.49 9.63c-.18-2.79-1.31-5.51-3.43-7.63a12.188 12.188 0 0 0-3.55 7.63c1.28.68 2.46 1.56 3.49 2.63 1.03-1.06 2.21-1.94 3.49-2.63zm-6.5 2.65c-.14-.1-.3-.19-.45-.29.15.11.31.19.45.29zm6.42-.25c-.13.09-.27.16-.4.26.13-.1.27-.17.4-.26zM12 15.45C9.85 12.17 6.18 10 2 10c0 5.32 3.36 9.82 8.03 11.49.63.23 1.29.4 1.97.51.68-.12 1.34-.29 1.97-.51C18.64 19.82 22 15.32 22 10c-4.18 0-7.85 2.17-10 5.45z" />
  </IconWrapper>
);

// Celebration & Events Icons
export const CelebrationFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M2 22l14-5-9-9-5 14zm14.5-8.5c.83.83 2.17.83 3 0 .83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0-.83.83-.83 2.17 0 3zM13 5.5L14.5 4 16 5.5 14.5 7 13 5.5zm7 4.5l-1.5 1.5L17 10l1.5-1.5L20 10zM5.5 10L4 11.5 2.5 10 4 8.5 5.5 10zm7.5 9l1.5-1.5L16 19l-1.5 1.5L13 19z" />
  </IconWrapper>
);

export const PartyFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z" />
  </IconWrapper>
);

export const EmojiEventsFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </IconWrapper>
);

// Professional & Design Icons
export const DesignFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </IconWrapper>
);

export const HomeWorkFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M8.17 5.7L1 10.48V21h5v-8h4v8h5V10.25z" />
    <path d="M10 3v1.51l2 1.33L13.73 7H15v.85l2 1.34V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z" />
  </IconWrapper>
);

export const DressFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2L8 6v2l-4 4v8h16v-8l-4-4V6l-4-4zm0 2.83L14 7v1H10V7l2-2.17zM6 12.17L10 8.17V10h4V8.17l4 4V20H6v-7.83z" />
  </IconWrapper>
);

export const LaptopFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </IconWrapper>
);

export const SchoolFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
  </IconWrapper>
);

export const BrushAltFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
  </IconWrapper>
);

// Nature & Places Icons
export const ParkFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M17 12h2L12 2 5 12h2l-3 6h7v4h2v-4h7l-3-6z" />
  </IconWrapper>
);

export const MuseumFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M22 11V9L12 2 2 9v2h2v9H2v2h20v-2h-2v-9h2zm-6 7h-2v-4l-2 3-2-3v4H8v-7h2l2 3 2-3h2v7z" />
  </IconWrapper>
);

export const TerrainFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
  </IconWrapper>
);

export const EcoFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M6.05 8.05c-2.73 2.73-2.73 7.15-.02 9.88 1.47-3.4 4.09-6.24 7.36-7.93-2.77 2.34-4.71 5.61-5.39 9.32 2.6 1.23 5.8.78 7.95-1.37C19.43 14.47 20 4 20 4S9.53 4.57 6.05 8.05z" />
  </IconWrapper>
);

export const CastleFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M21 9V7l-2-1V3h-2v2h-2V3h-2v2h-2V3H9v2H7V3H5v3L3 7v2l2 1v9H3v2h18v-2h-2v-9l2-1zm-4 9H7v-2h10v2zm0-4H7v-2h10v2z" />
  </IconWrapper>
);

// Technology & Services Icons
export const WebFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </IconWrapper>
);

export const SmartphoneFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
  </IconWrapper>
);

export const CameraFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="3.2"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
  </IconWrapper>
);

export const DroneFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M22 11h-1.5c0-1.39-.37-2.69-1.02-3.81l1.06-1.06-1.41-1.41-1.06 1.06C16.69 5.12 15.39 4.75 14 4.75V3.25h-2v1.5c-1.39 0-2.69.37-3.81 1.02L7.13 4.71 5.72 6.12l1.06 1.06C6.12 8.31 5.75 9.61 5.75 11H4.25v2h1.5c0 1.39.37 2.69 1.02 3.81l-1.06 1.06 1.41 1.41 1.06-1.06c1.12.65 2.42 1.02 3.81 1.02v1.5h2v-1.5c1.39 0 2.69-.37 3.81-1.02l1.06 1.06 1.41-1.41-1.06-1.06c.65-1.12 1.02-2.42 1.02-3.81H22v-2zm-9 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </IconWrapper>
);

export const LightbulbFilledIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
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
  // Creative & Media
  MusicFilledIcon,
  MusicNoteFilledIcon,
  PaletteFilledIcon,
  BrushFilledIcon,
  BusFilledIcon,
  CamperVanFilledIcon,
  // Wellness & Lifestyle
  YogaFilledIcon,
  LotusFilledIcon,
  MeditationFilledIcon,
  SpaFilledIcon,
  // Celebration & Events
  CelebrationFilledIcon,
  PartyFilledIcon,
  EmojiEventsFilledIcon,
  // Professional & Design
  DesignFilledIcon,
  HomeWorkFilledIcon,
  DressFilledIcon,
  LaptopFilledIcon,
  SchoolFilledIcon,
  BrushAltFilledIcon,
  // Nature & Places
  ParkFilledIcon,
  MuseumFilledIcon,
  TerrainFilledIcon,
  EcoFilledIcon,
  CastleFilledIcon,
  // Technology & Services
  WebFilledIcon,
  SmartphoneFilledIcon,
  CameraFilledIcon,
  DroneFilledIcon,
  LightbulbFilledIcon,
};

export default BladeIcons;
