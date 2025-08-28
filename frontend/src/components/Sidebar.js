import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdPets, MdFavorite, MdStore, MdMiscellaneousServices, MdOutlineMedicalServices, MdChat, MdSearch, MdAppRegistration, MdPersonSearch, MdDashboard, MdPerson, MdStoreMallDirectory } from 'react-icons/md';
import '../fonts.css';

const allLinks = [
  { name: 'Pet Listings', path: '/pets', icon: <MdPets /> },
  { name: 'Adoption', path: '/adoption', icon: <MdFavorite /> },
  { name: 'Store', path: '/store', icon: <MdStore /> },
  { name: 'Services', path: '/services', icon: <MdMiscellaneousServices /> },
  { name: 'Vets', path: '/vets', icon: <MdOutlineMedicalServices /> },
  { name: 'Chatbot', path: '/chatbot', icon: <MdChat /> },
  { name: 'Lost & Found', path: '/lostfound', icon: <MdSearch /> },
];

const extraLinks = [
  { name: 'Register as Vet', path: '/vet/register', icon: <MdAppRegistration /> },
  { name: 'Find a Vet', path: '/vets-directory', icon: <MdPersonSearch /> },
];

const vetLinks = [
  { name: 'Vet Dashboard', path: '/vet-dashboard', icon: <MdDashboard /> },
];
const buyerLinks = [
  { name: 'Buyer Dashboard', path: '/buyer-dashboard', icon: <MdPerson /> },
];
const sellerLinks = [
  { name: 'Seller Dashboard', path: '/seller-dashboard', icon: <MdStoreMallDirectory /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const roleLinks = user?.role === 'vet' ? vetLinks : user?.role === 'buyer' ? buyerLinks : user?.role === 'seller' ? sellerLinks : [];
  const links = [...roleLinks, ...allLinks];
  const showRegisterAsVet = !user || (user.role !== 'vet' && user.role !== 'buyer' && user.role !== 'seller');

  const NavLink = ({ link }) => {
    const active = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
    return (
      <Link
        to={link.path}
        className={`group flex items-center gap-2 px-2 py-2 rounded text-sm font-medium text-yellow-900 hover:bg-yellow-50 relative transition duration-200 ease-in-out hover:scale-[1.03] active:scale-95`}
        onClick={() => setOpen(false)}
      >
        <span className={`absolute left-0 h-5 w-1 rounded bg-yellow-500 transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        <span className="text-lg text-yellow-700">{link.icon}</span>
        <span className="truncate">{link.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white border border-yellow-100 rounded p-2 shadow-sm"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span className="text-xl text-yellow-700">☰</span>
      </button>

      {/* Sidebar with Framer Motion animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 h-full w-56 bg-white border-r border-yellow-100 shadow-lg flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-14 px-4 flex items-center border-b border-yellow-100">
                <span className="flex items-center gap-3 font-extrabold text-yellow-900 tracking-tight text-lg group select-none">
                  <MdPets className="text-4xl text-yellow-700" />
                  <span className="text-xl font-black tracking-widest ml-1 sidebar-logo-font" style={{fontFamily: 'Luckiest Guy, cursive'}}>PET CONNECT</span>
                </span>
                <button className="text-yellow-900 ml-auto" onClick={() => setOpen(false)} aria-label="Close navigation">✕</button>
              </div>
              <div className="px-2 py-4 space-y-2 flex-1 overflow-y-auto">
                <div className="px-2 text-xs uppercase tracking-wide text-yellow-700 font-bold">Main</div>
                {links.map(link => (
                  <NavLink key={link.path} link={link} />
                ))}
                <div className="pt-2 mt-2 border-t border-yellow-100" />
                <div className="px-2 text-xs uppercase tracking-wide text-yellow-700 font-bold">Explore</div>
                {extraLinks.map(link => {
                  if (link.name === 'Register as Vet' && !showRegisterAsVet) return null;
                  return <NavLink key={link.path} link={link} />;
                })}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full w-56 bg-white border-r border-yellow-100 z-40"
      >
        <div className="h-14 px-4 flex items-center border-b border-yellow-100">
          <span className="flex items-center gap-3 font-extrabold text-yellow-900 tracking-tight text-lg group select-none">
            <MdPets className="text-4xl text-yellow-700" />
            <span className="text-xl font-black tracking-widest ml-1 sidebar-logo-font" style={{fontFamily: 'Luckiest Guy, cursive'}}>PET CONNECT</span>
          </span>
        </div>
        <div className="px-2 py-4 space-y-2 flex-1 overflow-y-auto">
          <div className="px-2 text-xs uppercase tracking-wide text-yellow-700 font-bold">Main</div>
          {links.map(link => (
            <NavLink key={link.path} link={link} />
          ))}
          <div className="pt-2 mt-2 border-t border-yellow-100" />
          <div className="px-2 text-xs uppercase tracking-wide text-yellow-700 font-bold">Explore</div>
          {extraLinks.map(link => {
            if (link.name === 'Register as Vet' && !showRegisterAsVet) return null;
            return <NavLink key={link.path} link={link} />;
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
