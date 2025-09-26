import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GlassCard = styled(Box)(({ theme, variant = 'default' }) => ({
  background: variant === 'primary' 
    ? 'rgba(99, 102, 241, 0.1)' 
    : 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${variant === 'primary' 
    ? 'rgba(99, 102, 241, 0.2)' 
    : 'rgba(255, 255, 255, 0.3)'}`,
  borderRadius: '24px',
  boxShadow: variant === 'primary'
    ? '0 8px 32px rgba(99, 102, 241, 0.15)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: variant === 'primary'
      ? '0 12px 40px rgba(99, 102, 241, 0.2)'
      : '0 12px 40px rgba(0, 0, 0, 0.15)',
    border: `1px solid ${variant === 'primary' 
      ? 'rgba(99, 102, 241, 0.3)' 
      : 'rgba(255, 255, 255, 0.4)'}`,
  }
}));

const GlassmorphicCard = ({ children, variant, sx, ...props }) => {
  return (
    <GlassCard variant={variant} sx={sx} {...props}>
      {children}
    </GlassCard>
  );
};

export default GlassmorphicCard;