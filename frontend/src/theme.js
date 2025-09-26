import { createTheme } from '@mui/material/styles';

// Advanced Design Tokens
const tokens = {
  colors: {
    // Sophisticated gradient system
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      aurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      ocean: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
      forest: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      cosmic: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    },
    // Enhanced glassmorphism
    glass: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.18)',
      backdrop: 'blur(20px)',
      shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    },
    // Neon accents for modern appeal
    neon: {
      cyan: '#00f5ff',
      purple: '#bf00ff',
      pink: '#ff0080',
      green: '#39ff14',
      yellow: '#ffff00'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  animations: {
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

const theme = createTheme({
  // Custom theme extension
  tokens,
  
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#FFFFFF',
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81'
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#FFFFFF',
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843'
    },
    tertiary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      disabled: '#94A3B8',
      hint: '#CBD5E1'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.08)',
      elevated: '#F8FAFC'
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A'
    },
    divider: 'rgba(148, 163, 184, 0.12)'
  },
  
  typography: {
    fontFamily: '"Inter", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
    
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
      fontWeight: 600,
      lineHeight: 1.5
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.00714em'
    },
    button: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none'
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em'
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase'
    }
  },
  
  shape: {
    borderRadius: 20
  },
  
  shadows: [
    'none',
    '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
    '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
    // Glassmorphic shadows
    '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    '0 8px 32px 0 rgba(99, 102, 241, 0.25)',
    '0 8px 32px 0 rgba(236, 72, 153, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(99, 102, 241, 0.25)',
    // Enhanced depth shadows
    'rgba(99, 102, 241, 0.15) 0px 4px 24px',
    'rgba(99, 102, 241, 0.15) 0px 8px 48px',
    'rgba(99, 102, 241, 0.15) 0px 16px 64px',
    'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
    'rgba(0, 0, 0, 0.3) 0px 30px 60px -12px, rgba(0, 0, 0, 0.08) 0px 18px 36px -18px',
    'rgba(0, 0, 0, 0.35) 0px 40px 80px -12px, rgba(0, 0, 0, 0.1) 0px 24px 48px -24px',
    'rgba(0, 0, 0, 0.4) 0px 50px 100px -12px, rgba(0, 0, 0, 0.12) 0px 30px 60px -30px',
    'rgba(0, 0, 0, 0.45) 0px 60px 120px -12px, rgba(0, 0, 0, 0.15) 0px 36px 72px -36px',
    'rgba(0, 0, 0, 0.5) 0px 70px 140px -12px, rgba(0, 0, 0, 0.18) 0px 42px 84px -42px',
    'rgba(0, 0, 0, 0.55) 0px 80px 160px -12px, rgba(0, 0, 0, 0.2) 0px 48px 96px -48px'
  ],
  
  // Custom breakpoints for better responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },
  
  // Enhanced transitions
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  }
});

export default theme;