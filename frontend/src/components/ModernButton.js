import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, variant: buttonVariant = 'primary' }) => ({
  borderRadius: '16px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  ...(buttonVariant === 'primary' && {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: '#FFFFFF',
    border: 'none',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',
      background: 'linear-gradient(135deg, #5B5BF7 0%, #8B5CF6 100%)',
    },
    '&:active': {
      transform: 'translateY(0px)',
    }
  }),
  
  ...(buttonVariant === 'secondary' && {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: theme.palette.text.primary,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    }
  }),
  
  ...(buttonVariant === 'ghost' && {
    background: 'transparent',
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#FFFFFF',
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px ${theme.palette.primary.main}40`,
    }
  }),

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  
  '&:hover::before': {
    left: '100%',
  }
}));

const ModernButton = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default ModernButton;