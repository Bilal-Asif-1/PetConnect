import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Advanced aurora animations
const auroraGlow = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  25% {
    opacity: 0.8;
    transform: translateX(100px) translateY(-50px) rotate(90deg);
  }
  50% {
    opacity: 0.6;
    transform: translateX(200px) translateY(50px) rotate(180deg);
  }
  75% {
    opacity: 0.9;
    transform: translateX(-100px) translateY(-100px) rotate(270deg);
  }
`;

const particleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 1;
  }
`;

const waveMotion = keyframes`
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) rotate(180deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled components
const AuroraContainer = styled(Box)(() => ({
  position: 'absolute',\n  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  background: `
    radial-gradient(ellipse at top, rgba(99, 102, 241, 0.3) 0%, transparent 70%),
    radial-gradient(ellipse at bottom, rgba(236, 72, 153, 0.3) 0%, transparent 70%),
    linear-gradient(135deg, 
      rgba(99, 102, 241, 0.1) 0%, 
      rgba(6, 182, 212, 0.1) 25%, 
      rgba(236, 72, 153, 0.1) 50%, 
      rgba(245, 158, 11, 0.1) 75%, 
      rgba(99, 102, 241, 0.1) 100%
    )
  `,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 10s ease infinite`,
}));

const AuroraLayer = styled(Box)<{ delay?: number; size?: number; color?: string }>(
  ({ delay = 0, size = 400, color = 'rgba(99, 102, 241, 0.2)' }) => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    filter: 'blur(60px)',
    animation: `${auroraGlow} ${15 + delay * 2}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  })
);

const ParticleContainer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
}));

const Particle = styled(Box)<{ 
  x: number; 
  y: number; 
  size: number; 
  delay: number; 
  color: string;
  duration: number;
}>(({ x, y, size, delay, color, duration }) => ({
  position: 'absolute',
  left: `${x}%`,
  top: `${y}%`,
  width: size,
  height: size,
  borderRadius: '50%',
  background: color,
  opacity: 0.6,
  animation: `${particleFloat} ${duration}s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  filter: 'blur(1px)',
}));

const WaveLayer = styled(Box)<{ delay?: number }>(({ delay = 0 }) => ({
  position: 'absolute',
  bottom: '-50%',
  left: '50%',
  width: '200%',
  height: '200%',
  background: `
    conic-gradient(
      from 0deg at 50% 50%,
      rgba(99, 102, 241, 0.1) 0deg,
      rgba(6, 182, 212, 0.1) 72deg,
      rgba(236, 72, 153, 0.1) 144deg,
      rgba(245, 158, 11, 0.1) 216deg,
      rgba(34, 197, 94, 0.1) 288deg,
      rgba(99, 102, 241, 0.1) 360deg
    )
  `,
  borderRadius: '50%',
  filter: 'blur(40px)',
  opacity: 0.3,
  animation: `${waveMotion} ${20 + delay * 5}s linear infinite`,
  animationDelay: `${delay}s`,
}));

const MeshGradient = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.3) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.3) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.3) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(245, 158, 11, 0.3) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(34, 197, 94, 0.2) 0px, transparent 50%),
    radial-gradient(at 80% 100%, rgba(168, 85, 247, 0.3) 0px, transparent 50%),
    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.3) 0px, transparent 50%)
  `,
  filter: 'blur(100px) saturate(150%)',
  opacity: 0.4,
}));

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
  duration: number;
}

interface EnhancedAuroraProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  particleCount?: number;
  interactive?: boolean;
}

const EnhancedAurora: React.FC<EnhancedAuroraProps> = ({
  children,
  intensity = 'medium',
  particleCount = 50,
  interactive = false
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    'rgba(99, 102, 241, 0.8)',
    'rgba(236, 72, 153, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(168, 85, 247, 0.8)',
  ];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = intensity === 'low' ? particleCount * 0.5 : 
                   intensity === 'high' ? particleCount * 1.5 : 
                   particleCount;

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          delay: Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 10 + 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [intensity, particleCount]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const getIntensityLayers = () => {
    switch (intensity) {
      case 'low':
        return 3;
      case 'high':
        return 8;
      default:
        return 5;
    }
  };

  const auroraLayers = Array.from({ length: getIntensityLayers() }, (_, i) => {
    const colors = [
      'rgba(99, 102, 241, 0.15)',
      'rgba(236, 72, 153, 0.15)',
      'rgba(6, 182, 212, 0.15)',
      'rgba(245, 158, 11, 0.15)',
      'rgba(34, 197, 94, 0.15)',
      'rgba(168, 85, 247, 0.15)',
      'rgba(59, 130, 246, 0.15)',
      'rgba(16, 185, 129, 0.15)',
    ];

    return (
      <AuroraLayer
        key={i}
        delay={i * 2}
        size={300 + i * 50}
        color={colors[i % colors.length]}
        sx={{
          top: `${10 + i * 15}%`,
          left: `${5 + i * 10}%`,
        }}
      />
    );
  });

  return (
    <Box 
      ref={containerRef}
      sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
    >
      <AuroraContainer>
        {/* Mesh gradient background */}
        <MeshGradient />
        
        {/* Wave layers */}
        <WaveLayer delay={0} />
        <WaveLayer delay={3} sx={{ transform: 'scale(0.8)' }} />
        
        {/* Aurora layers */}
        {auroraLayers}
        
        {/* Interactive cursor effect */}
        {interactive && (
          <Box
            sx={{
              position: 'absolute',
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
            }}
          />
        )}
        
        {/* Particle system */}
        <ParticleContainer>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              x={particle.x}
              y={particle.y}
              size={particle.size}
              delay={particle.delay}
              color={particle.color}
              duration={particle.duration}
            />
          ))}
        </ParticleContainer>
      </AuroraContainer>
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default EnhancedAurora;
