export const BRAND_COLORS = {
  // Primary brand colors from logo
  yellow: '#FDB913',
  orange: '#FF9500',
  red: '#EF3340',
  
  // Neutral colors
  black: '#000000',
  white: '#FFFFFF',
  cream: '#FFF8F0',
  
  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #FDB913 0%, #FF9500 50%, #EF3340 100%)',
  yellowToOrange: 'linear-gradient(135deg, #FDB913 0%, #FF9500 100%)',
  orangeToRed: 'linear-gradient(135deg, #FF9500 0%, #EF3340 100%)',
} as const;