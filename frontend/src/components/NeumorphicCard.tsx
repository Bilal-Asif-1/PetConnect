import React, { useState, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Advanced animations
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(99, 102, 241, 0.3),
      0 8px 32px 0 rgba(31, 38, 135, 0.37),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(99, 102, 241, 0.5),
      0 8px 32px 0 rgba(31, 38, 135, 0.37),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

// Styled components
const GlassmorphicContainer = styled(Paper)(({ theme, variant = 'default', glowing = false }) => ({
  background: variant === 'translucent' 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },

  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    background: variant === 'translucent' 
      ? 'rgba(255, 255, 255, 0.12)' 
      : 'rgba(255, 255, 255, 0.16)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 20px 60px 0 rgba(31, 38, 135, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    
    '&:before': {
      opacity: 1
    }
  },

  '&:active': {
    transform: 'translateY(-4px) scale(1.01)',
  },

  ...(glowing && {
    animation: `${glow} 3s ease-in-out infinite`
  }),

  // Shimmer effect overlay
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transition: 'left 0.6s ease',
    pointerEvents: 'none',
  },

  '&:hover:after': {
    left: '100%',
  }
}));

const MagneticContainer = styled(Box)(() => ({
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}));

interface NeumorphicCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'translucent' | 'solid';
  magnetic?: boolean;
  floating?: boolean;
  glowing?: boolean;
  shimmer?: boolean;
  sx?: any;
  onClick?: () => void;
  className?: string;
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  variant = 'default',
  magnetic = false,
  floating = false,
  glowing = false,
  shimmer = false,
  sx = {},
  onClick,
  className,
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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

  const floatingStyles = floating ? {
    animation: `${float} 6s ease-in-out infinite`,
  } : {};

  const magneticStyles = magnetic ? {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  } : {};

  return (
    <MagneticContainer
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      sx={{
        ...magneticStyles,
        ...floatingStyles,
      }}
      {...props}
    >
      <GlassmorphicContainer
        variant={variant}
        glowing={glowing}
        elevation={0}
        sx={{
          ...sx,
          ...(shimmer && {
            backgroundImage: `linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 100%
            )`,
            backgroundSize: '200px 100%',
            backgroundRepeat: 'no-repeat',
            animation: `${shimmer} 2s infinite linear`,
          }),
        }}
      >
        {children}
      </GlassmorphicContainer>
    </MagneticContainer>
  );
};

export default NeumorphicCard;
