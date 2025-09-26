import React, { useState, useRef } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Advanced button animations
const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const morphGradient = keyframes`
  0%, 100% {
    background: linear-gradient(45deg, #667eea, #764ba2);
  }
  25% {
    background: linear-gradient(45deg, #f093fb, #f5576c);
  }
  50% {
    background: linear-gradient(45deg, #4facfe, #00f2fe);
  }
  75% {
    background: linear-gradient(45deg, #43e97b, #38f9d7);
  }
`;

// Styled components
const BaseButton = styled(Button)(({ theme, variant: buttonVariant = 'primary', size = 'medium' }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '0.875rem', minHeight: '36px' };
      case 'large':
        return { padding: '14px 32px', fontSize: '1rem', minHeight: '56px' };
      default:
        return { padding: '10px 24px', fontSize: '0.9375rem', minHeight: '44px' };
    }
  };

  const getVariantStyles = () => {
    switch (buttonVariant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 15px 0 rgba(99, 102, 241, 0.3)',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            boxShadow: '0 8px 25px 0 rgba(99, 102, 241, 0.4)',
            transform: 'translateY(-2px)',
          }
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
          }
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: 'none',
          '&:hover': {
            background: theme.palette.primary.main,
            color: '#ffffff',
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px 0 ${theme.palette.primary.main}40`,
          }
        };
      case 'gradient':
        return {
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 15px 0 rgba(99, 102, 241, 0.3)',
          animation: `${morphGradient} 6s ease-in-out infinite`,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 8px 25px 0 rgba(99, 102, 241, 0.4)',
          }
        };
      case 'neon':
        return {
          background: 'transparent',
          color: '#00f5ff',
          border: '2px solid #00f5ff',
          boxShadow: `
            inset 0 0 50px rgba(0, 245, 255, 0.1),
            0 0 20px rgba(0, 245, 255, 0.4)
          `,
          '&:hover': {
            background: 'rgba(0, 245, 255, 0.1)',
            boxShadow: `
              inset 0 0 50px rgba(0, 245, 255, 0.2),
              0 0 40px rgba(0, 245, 255, 0.6),
              0 0 80px rgba(0, 245, 255, 0.3)
            `,
            transform: 'translateY(-2px)',
          }
        };
      default:
        return {
          background: theme.palette.primary.main,
          color: '#ffffff',
        };
    }
  };

  return {
    ...getSize(),
    ...getVariantStyles(),
    borderRadius: '12px',
    fontWeight: 600,
    textTransform: 'none',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: theme.typography.button.fontFamily,
    
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
      }
    },

    // Ripple effect container
    '& .ripple-container': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },

    // Shimmer effect
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      transition: 'left 0.6s ease',
    },

    '&:hover:before': {
      left: '100%',
    }
  };
});

const RippleEffect = styled('span')(() => ({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  transform: 'scale(0)',
  animation: `${ripple} 600ms linear`,
  pointerEvents: 'none',
}));

const PulseContainer = styled(Box)(() => ({
  '&.pulse': {
    animation: `${pulse} 2s infinite`,
  }
}));

interface RippleState {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'neon';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  pulse?: boolean;
  magnetic?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  sx?: any;
  href?: string;
  component?: any;
  to?: string;
  [key: string]: any;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  pulse = false,
  magnetic = false,
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  sx = {},
  ...props
}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;

    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);
      
      const newRipple: RippleState = {
        id: Date.now(),
        x: x - size / 2,
        y: y - size / 2,
        size,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const magneticStyles = magnetic ? {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  } : {};

  return (
    <PulseContainer
      className={pulse ? 'pulse' : ''}
      sx={magneticStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BaseButton
        ref={buttonRef}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        onClick={handleClick}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        sx={sx}
        {...props}
      >
        {loading && (
          <CircularProgress
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
            sx={{
              color: 'inherit',
              mr: 1,
            }}
          />
        )}
        {children}
        
        <div className="ripple-container">
          {ripples.map((ripple) => (
            <RippleEffect
              key={ripple.id}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </div>
      </BaseButton>
    </PulseContainer>
  );
};

export default ModernButton;
