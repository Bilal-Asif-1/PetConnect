import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen animal-bg text-yellow-900">
      <Sidebar />
      <Navbar />
      <main className="pt-4 md:pt-6 pb-10 px-4 md:px-6 md:ml-64">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 