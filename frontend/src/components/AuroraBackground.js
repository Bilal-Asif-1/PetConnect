import React from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(-20px) rotate(240deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const AuroraContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.4) 50%, rgba(252, 211, 77, 0.4) 100%)',
    animation: `${pulse} 8s ease-in-out infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.3) 100%)',
    zIndex: 1,
  }
});

const FloatingOrb = styled(Box)(({ size = 200, delay = 0, color = 'rgba(168, 85, 247, 0.3)' }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  filter: 'blur(40px)',
  animation: `${float} ${12 + delay}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const AuroraBackground = ({ children }) => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AuroraContainer>
        <FloatingOrb 
          size={300} 
          delay={0} 
          color="rgba(251, 191, 36, 0.3)"
          sx={{ top: '10%', left: '10%' }}
        />
        <FloatingOrb 
          size={200} 
          delay={2} 
          color="rgba(245, 158, 11, 0.3)"
          sx={{ top: '60%', right: '20%' }}
        />
        <FloatingOrb 
          size={250} 
          delay={4} 
          color="rgba(252, 211, 77, 0.3)"
          sx={{ bottom: '20%', left: '30%' }}
        />
        <FloatingOrb 
          size={180} 
          delay={6} 
          color="rgba(251, 146, 60, 0.3)"
          sx={{ top: '30%', right: '10%' }}
        />
      </AuroraContainer>
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AuroraBackground;