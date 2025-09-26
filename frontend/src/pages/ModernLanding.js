import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Stack,
  Avatar,
  Rating,
  Chip
} from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

// Icons
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';

// Components (using existing ones for now)
import AuroraBackground from '../components/AuroraBackground';
import GlassmorphicCard from '../components/GlassmorphicCard';

// Import the modern animations CSS
import '../styles/modern-animations.css';

// Next-level animations
const modernEntrance = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
`;

const floatingOrb = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    filter: hue-rotate(0deg);
  }
  33% { 
    transform: translateY(-30px) rotate(120deg); 
    filter: hue-rotate(120deg);
  }
  66% { 
    transform: translateY(-15px) rotate(240deg); 
    filter: hue-rotate(240deg);
  }
`;

const morphingGradient = keyframes`
  0%, 100% {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  }
  25% {
    background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%);
  }
  50% {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  }
  75% {
    background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  }
`;

// Next-Level Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  background: `
    radial-gradient(ellipse at top left, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(252, 211, 77, 0.1) 0%, transparent 50%)
  `,
}));

const AnimatedSection = styled(Box)(({ delay = 0 }) => ({
  animation: `${modernEntrance} 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
}));

// Removed unused styled components

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: `${morphingGradient} 6s ease-in-out infinite`,
}));

const FloatingElement = styled(Box)(({ delay = 0, amplitude = 20 }) => ({
  animation: `${floatingOrb} ${8 + delay * 2}s ease-in-out infinite ${delay}s`,
  transformOrigin: 'center',
}));

const ModernLanding = () => {
  const theme = useTheme();
  const [counters, setCounters] = useState({ vets: 0, appointments: 0, pets: 0, users: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Enhanced animated counters with easing
  useEffect(() => {
    const targets = { vets: 500, appointments: 2500, pets: 1200, users: 5000 };
    const duration = 2500;
    const steps = 80;
    const stepTime = duration / steps;
    
    // Easing function for smooth animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const intervals = Object.keys(targets).map((key, index) => {
      let step = 0;
      
      return setInterval(() => {
        step++;
        const progress = Math.min(step / steps, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(targets[key] * easedProgress);
        
        setCounters(prev => ({ ...prev, [key]: current }));
        
        if (progress >= 1) {
          clearInterval(intervals[index]);
        }
      }, stepTime + index * 100); // Stagger the animations
    });

    return () => intervals.forEach(clearInterval);
  }, []);
  
  // Mouse tracking for interactive elements
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const features = [
    {
      title: 'AI-Powered Vet Matching',
      description: 'Our advanced AI finds the perfect veterinarian based on your pet\'s specific needs, location, and your preferences.',
      icon: <LocalHospitalOutlinedIcon sx={{ fontSize: '3rem' }} />,
      to: '/vets',
      priority: 'high',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: '500+ Verified Vets'
    },
    {
      title: 'Smart Pet Adoption',
      description: 'Discover your perfect companion with our intelligent matching system.',
      icon: <PetsOutlinedIcon sx={{ fontSize: '2.5rem' }} />,
      to: '/adoption',
      priority: 'normal',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: '1,200+ Available Pets'
    },
    {
      title: 'Premium Pet Store',
      description: 'Curated selection of premium pet products with same-day delivery.',
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: '2.5rem' }} />,
      to: '/store',
      priority: 'low',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: '10,000+ Products'
    },
    {
      title: 'Instant Booking',
      description: 'Book appointments in seconds with real-time availability.',
      icon: <CalendarMonthOutlinedIcon sx={{ fontSize: '2.5rem' }} />,
      to: '/my-appointments',
      priority: 'low',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
      stats: 'Sub-60s Booking'
    },
    {
      title: 'AI Health Assistant',
      description: '24/7 AI-powered health monitoring and instant support.',
      icon: <ChatOutlinedIcon sx={{ fontSize: '2.5rem' }} />,
      to: '/chatbot',
      priority: 'normal',
      gradient: 'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
      stats: '24/7 Available'
    },
    {
      title: 'Community Hub',
      description: 'Connect with pet lovers, share experiences, and get advice.',
      icon: <GroupIcon sx={{ fontSize: '2.5rem' }} />,
      to: '/community',
      priority: 'normal',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      stats: '50K+ Members'
    }
  ];
  
  const benefits = [
    {
      icon: <SecurityIcon sx={{ fontSize: '2rem', color: 'success.main' }} />,
      title: 'Verified & Trusted',
      description: 'All professionals thoroughly vetted'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: '2rem', color: 'info.main' }} />,
      title: 'Lightning Fast',
      description: 'Average booking time under 60 seconds'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: '2rem', color: 'error.main' }} />,
      title: 'Pet-First Approach',
      description: 'Everything designed with your pet in mind'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Golden Retriever Mom',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763014?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The AI matching system found the perfect vet for Max within minutes. The platform is incredibly intuitive and the care has been exceptional!',
      location: 'San Francisco, CA'
    },
    {
      name: 'Mike Chen',
      role: 'Multi-Pet Parent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'From adoption to ongoing care, PetConnect has been our one-stop solution. The community features and expert advice are game-changers.',
      location: 'New York, NY'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Cat & Dog Owner',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The 24/7 AI health assistant saved my cat\'s life. Quick responses, accurate advice, and immediate vet connections when needed.',
      location: 'Austin, TX'
    }
  ];

  const stats = [
    { 
      label: 'Verified Vets', 
      value: counters.vets, 
      suffix: '+',
      icon: <LocalHospitalOutlinedIcon />,
      description: 'AI-matched professionals'
    },
    { 
      label: 'Appointments Booked', 
      value: counters.appointments, 
      suffix: '+',
      icon: <CalendarMonthOutlinedIcon />,
      description: 'Average 47s booking time'
    },
    { 
      label: 'Happy Pets', 
      value: counters.pets, 
      suffix: 'K+',
      icon: <PetsOutlinedIcon />,
      description: 'Lives improved daily'
    },
    { 
      label: 'Pet Parents', 
      value: counters.users, 
      suffix: '+',
      icon: <GroupIcon />,
      description: 'Growing community'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        width: '100vw',
        minHeight: '100vh'
      }} className="custom-scrollbar">
        {/* Next-Level Hero Section */}
        <HeroSection ref={heroRef} onMouseMove={handleMouseMove}>
          <AuroraBackground>
            <Container maxWidth="xl" sx={{ 
              py: { xs: 6, sm: 8, md: 12 },
              px: { xs: 2, sm: 4, md: 6 }
            }}>
              <AnimatedSection delay={0.2}>
                {/* Hero Content */}
                <Box sx={{ 
                  textAlign: 'center',
                  maxWidth: '900px',
                  mx: 'auto',
                  position: 'relative',
                  zIndex: 10,
                  px: { xs: 2, sm: 4 }
                }}>
                  {/* Badge */}
                  <Box className="fade-in-up" sx={{ mb: 4 }}>
                    <Chip
                      icon={<PetsOutlinedIcon />}
                      label="🚀 Next-Gen Pet Care Platform"
                      variant="outlined"
                      className="glass hover-glow"
                      sx={{
                        color: 'white',
                        fontSize: '0.9rem',
                        py: 2,
                        px: 1,
                        '& .MuiChip-icon': { color: 'white' },
                        animation: 'fadeInUp 0.8s ease-out 0.3s both'
                      }}
                    />
                  </Box>

                  {/* Main Heading */}
                  <Box sx={{ mb: 4, perspective: '1000px' }}>
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        color: 'white',
                        mb: 2,
                        fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
                        fontWeight: 800,
                        lineHeight: 1.1,
                        animation: 'fadeInUp 1s ease-out 0.5s both',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      The Future of
                    </Typography>
                    <GradientText 
                      variant="h1"
                      sx={{ 
                        fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
                        fontWeight: 800,
                        lineHeight: 1.1,
                        display: 'block',
                        animation: 'fadeInUp 1s ease-out 0.7s both',
                        filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))',
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      Pet Care is Here
                    </GradientText>
                  </Box>

                  {/* Subtitle */}
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 6, 
                      color: 'rgba(255, 255, 255, 0.95)', 
                      fontWeight: 400,
                      fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                      maxWidth: '700px',
                      mx: 'auto',
                      lineHeight: 1.6,
                      animation: 'fadeInUp 1s ease-out 0.9s both',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    AI-powered matching, instant booking, and 24/7 support. 
                    Everything your pet needs in one revolutionary platform.
                  </Typography>

                  {/* Action Buttons */}
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={3} 
                    sx={{ 
                      mb: 6, 
                      animation: 'fadeInUp 1s ease-out 1.1s both',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      component={Link}
                      to="/register"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        minWidth: { xs: '180px', sm: '200px' },
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px 0 rgba(251, 191, 36, 0.4)',
                        }
                      }}
                    >
                      Start Free Today
                      <ArrowForwardIcon />
                    </Box>
                    
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        minWidth: { xs: '160px', sm: '180px' },
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
                        }
                      }}
                    >
                      <PlayArrowIcon />
                      Watch Demo
                    </Box>
                  </Stack>

                  {/* Benefits Row */}
                  <Box className="stagger-children" sx={{ opacity: 1 }}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={4} 
                      alignItems="center"
                      justifyContent="center"
                      sx={{ 
                        maxWidth: '800px',
                        mx: 'auto'
                      }}
                    >
                      {benefits.map((benefit, index) => (
                        <Stack 
                          key={index} 
                          direction="row" 
                          spacing={2} 
                          alignItems="center"
                          className="hover-scale"
                          sx={{ 
                            cursor: 'pointer',
                            textAlign: { xs: 'center', sm: 'left' },
                            justifyContent: { xs: 'center', sm: 'flex-start' }
                          }}
                        >
                          <Box className="hover-glow">{benefit.icon}</Box>
                          <Box>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                color: 'white', 
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                              }}
                            >
                              {benefit.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.8)',
                                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {benefit.description}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
                
                {/* Interactive Floating Elements */}
                <Box sx={{ 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '100%',
                  pointerEvents: 'none',
                  display: { xs: 'none', lg: 'block' }
                }}>
                  {/* Dynamic floating cards based on mouse position */}
                  <FloatingElement delay={0} sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                    transition: 'transform 0.3s ease'
                  }}>
                    <GlassmorphicCard 
                      sx={{ 
                        width: '180px', 
                        p: 3, 
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.1)',
                        animation: `${floatingOrb} 6s ease-in-out infinite`
                      }}
                    >
                      <LocalHospitalOutlinedIcon sx={{ 
                        fontSize: '3rem', 
                        color: '#f59e0b', 
                        mb: 2,
                        filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))'
                      }} />
                      <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>AI Matching</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        500+ Verified Vets
                      </Typography>
                    </GlassmorphicCard>
                  </FloatingElement>
                  
                  <FloatingElement delay={2} sx={{
                    position: 'absolute',
                    top: '60%',
                    right: '30%',
                    transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.05}px)`,
                    transition: 'transform 0.3s ease'
                  }}>
                    <GlassmorphicCard 
                      sx={{ 
                        width: '160px', 
                        p: 2.5, 
                        textAlign: 'center',
                        background: 'rgba(251, 191, 36, 0.1)',
                        animation: `${floatingOrb} 8s ease-in-out infinite 2s`
                      }}
                    >
                      <PetsOutlinedIcon sx={{ 
                        fontSize: '2.5rem', 
                        color: '#f97316', 
                        mb: 2,
                        filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))'
                      }} />
                      <Typography variant="h6" sx={{ mb: 1, color: 'white', fontSize: '1rem' }}>Smart Adoption</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        1.2K+ Available
                      </Typography>
                    </GlassmorphicCard>
                  </FloatingElement>
                </Box>
              </AnimatedSection>
            </Container>
          </AuroraBackground>
        </HeroSection>

        {/* Light Yellow Transition Section */}
        <Box sx={{ 
          py: 8, 
          background: 'linear-gradient(180deg, rgba(254, 243, 199, 0.3) 0%, rgba(253, 230, 138, 0.2) 50%, rgba(254, 243, 199, 0.1) 100%)',
          borderTop: '1px solid rgba(251, 191, 36, 0.1)',
          borderBottom: '1px solid rgba(251, 191, 36, 0.1)'
        }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(146, 64, 14, 0.8)',
                  fontWeight: 500,
                  mb: 2,
                  opacity: 0.9
                }}
              >
                Trusted by thousands of pet parents worldwide
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(146, 64, 14, 0.6)',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Join our growing community of pet lovers who trust us with their furry friends' care and well-being.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              {stats.map((stat, index) => (
                <GlassmorphicCard 
                  key={index} 
                  sx={{ 
                    flex: 1,
                    textAlign: 'center',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: '0 25px 60px rgba(31, 38, 135, 0.4)',
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value.toLocaleString()}{stat.suffix}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                    {stat.description}
                  </Typography>
                </GlassmorphicCard>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Features Section - Masonry Layout */}
        <Box sx={{ py: 12, bgcolor: 'background.default' }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Everything Your Pet Needs
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                From finding the perfect vet to shopping for essentials, we've got every aspect of pet care covered.
              </Typography>
            </Box>

            {/* Asymmetric Grid Layout */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
              gridTemplateRows: 'repeat(3, auto)',
              gap: 3,
              '& > :nth-of-type(1)': { 
                gridColumn: { md: 'span 2', lg: 'span 2' },
                gridRow: { md: 'span 2' }
              },
              '& > :nth-of-type(2)': { 
                gridColumn: { lg: 'span 1' }
              },
              '& > :nth-of-type(3)': { 
                gridColumn: { lg: 'span 1' }
              },
              '& > :nth-of-type(4)': { 
                gridColumn: { md: 'span 1' }
              },
              '& > :nth-of-type(5)': { 
                gridColumn: { md: 'span 2', lg: 'span 2' }
              }
            }}>
              {features.map((feature, index) => (
                <GlassmorphicCard
                  key={index}
                  component={Link}
                  to={feature.to}
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    p: feature.priority === 'high' ? 4 : 3,
                    height: feature.priority === 'high' ? '400px' : feature.priority === 'low' ? '200px' : '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                    }
                  }}
                >
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                      Explore
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                  </Box>
                </GlassmorphicCard>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Loved by Pet Parents
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Join thousands of happy pet owners who trust PetConnect
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
              {testimonials.map((testimonial, index) => (
                <GlassmorphicCard 
                  key={index} 
                  sx={{ 
                    flex: 1,
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {testimonial.text}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={testimonial.avatar} sx={{ width: 50, height: 50 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {testimonial.role}
                      </Typography>
                      <Rating value={testimonial.rating} size="small" readOnly />
                    </Box>
                  </Stack>
                </GlassmorphicCard>
              ))}
            </Stack>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 12, position: 'relative', overflow: 'hidden' }}>
          <AuroraBackground>
            <Container maxWidth="lg">
              <GlassmorphicCard sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 3, color: 'white' }}>
                  Ready to Transform Pet Care?
                </Typography>
                <Typography variant="h6" sx={{ mb: 6, color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', mx: 'auto' }}>
                  Join the future of pet care today. Connect with trusted professionals, 
                  find loving companions, and give your pets the care they deserve.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                  <Box
                    component={Link}
                    to="/register"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 4,
                      py: 2,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      justifyContent: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px 0 rgba(251, 191, 36, 0.4)',
                      }
                    }}
                  >
                    Start Your Journey
                    <ArrowForwardIcon />
                  </Box>
                  <Box
                    component={Link}
                    to="/login"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 4,
                      py: 2,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      justifyContent: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
                      }
                    }}
                  >
                    Sign In
                  </Box>
                </Stack>
              </GlassmorphicCard>
            </Container>
          </AuroraBackground>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 6, bgcolor: 'grey.900', color: 'white' }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <PetsOutlinedIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  PetConnect
                </Typography>
              </Stack>
              <Typography variant="body2" color="grey.400">
                © {new Date().getFullYear()} PetConnect. All rights reserved.
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ModernLanding;