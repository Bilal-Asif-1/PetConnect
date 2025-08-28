import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Pets', to: '/pets' },
  { label: 'Adoption', to: '/adoption' },
  { label: 'Store', to: '/store' },
  { label: 'Services', to: '/services' },
  { label: 'Vets', to: '/vets' },
  { label: 'Chatbot', to: '/chatbot' },
  { label: 'Lost & Found', to: '/lostfound' },
];

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Sparkle animation CSS
  const sparkleStyle = `@keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
    10% { opacity: 1; transform: scale(1.2) rotate(10deg); }
    20% { opacity: 0; transform: scale(0.8) rotate(0deg); }
    100% { opacity: 0; }
  }`;
  if (typeof window !== 'undefined' && !document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.innerHTML = sparkleStyle;
    document.head.appendChild(style);
  }

  const Sparkle = () => (
    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{animation: 'sparkle 1.5s infinite'}}>
      <g filter="url(#filter0_d_1_2)"><path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 15.77L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" fill="#facc15"/></g>
      <defs><filter id="filter0_d_1_2" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_1_2"/></filter></defs>
    </svg>
  );

  return (
    <nav className="sticky top-0 z-30 md:ml-56 border-b bg-white/90 border-yellow-100 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          {/* Brand (icon + text) */}
          <Link to={user?.role === 'vet' ? '/vet-dashboard' : user?.role === 'buyer' ? '/buyer-dashboard' : user?.role === 'seller' ? '/seller-dashboard' : '/dashboard'} className="flex items-center gap-2" aria-label="Home">
            {/* Brand removed for minimalism */}
          </Link>

          {/* Primary links */}
          <div className="hidden md:flex items-center gap-2 text-yellow-900 font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-2 py-1 rounded transition-colors duration-200 ease-in-out hover:bg-yellow-50 hover:scale-[1.07] active:scale-95 ${isActive(l.to) ? 'bg-yellow-100 text-yellow-900 font-semibold' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden md:inline text-xs font-medium text-yellow-900 bg-yellow-50 border border-yellow-100 px-2 py-0.5 rounded transition duration-200" style={{transitionProperty:'background, color, border'}}> {user.name} ({user.role})</span>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" className="h-8 w-8 rounded-full border border-yellow-100 transition duration-200 hover:scale-105" />
                <button className="relative px-2 py-1 rounded bg-yellow-100 text-yellow-900 hover:bg-yellow-200 text-xs font-semibold transition duration-200 hover:scale-105 active:scale-95 overflow-hidden" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>
                  Logout
                  <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <Sparkle />
                  </span>
                </button>
              </>
            ) : (
              <Link to="/login" className="relative px-2 py-1 rounded bg-yellow-100 text-yellow-900 hover:bg-yellow-200 text-xs font-semibold transition duration-200 hover:scale-105 active:scale-95 overflow-hidden">
                Login
                <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <Sparkle />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
