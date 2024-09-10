import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Ifarm from '../../../assets/dashboard/Ifarm.svg';
import Dashboard from '../../../assets/dashboard/grid-4-svgrepo-com.svg';
import plant from '../../../assets/dashboard/Plant.svg';
import cow from '../../../assets/dashboard/cow.svg';
import inventory from '../../../assets/dashboard/inventory.svg';
import community from '../../../assets/dashboard/community.svg';
import setting from '../../../assets/dashboard/settings-svgrepo-com.svg';
import bell from '../../../assets/dashboard/bell (1).svg';
import profile from '../../../assets/dashboard/user-1-svgrepo-com.svg';
import logout from '../../../assets/dashboard/logout.svg';
import plusIcon from '../../../assets/dashboard/+.svg';
import menuIcon from '../../../assets/dashboard/menu.jpg';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDashboardClick = () => {
    location.pathname === '/user/dashboard' ? window.location.reload() : (window.location.href = '/user/dashboard');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-label="Toggle sidebar"
      >
        <img src={menuIcon} alt="Menu Icon" className="h-6 w-6" />
      </button>

      <div
  className={`sidebar bg-gray-100 h-screen w-64 p-4 flex flex-col justify-between fixed z-40 transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 transition-transform duration-300 ${className} ${
    // Allow scrolling only on mobile and tablet
    'overflow-y-auto md:overflow-y-hidden'
  }`}
>

        <div>
          <div className="logo mb-8 hover:text-green-500">
            <Link to="/">
              <img src={Ifarm} alt="iFarmr Logo" className="h-16 mx-auto" />
            </Link>
          </div>
          <ul className="nav-links space-y-4">
            <li className="flex items-center" onClick={handleDashboardClick}>
              <img src={Dashboard} alt="Dashboard Icon" className="h-6 w-6 mr-2" />
              <span className="block text-gray-700 font-thin hover:text-green-500 cursor-pointer">Dashboard</span>
            </li>
            {[
              { src: plant, alt: 'Crop Management Icon', text: 'Crop Management', path: '/crop-management' },
              { src: cow, alt: 'Livestock Management Icon', text: 'Livestock Management', path: '/livestock-management' },
              { src: inventory, alt: 'Inventory Icon', text: 'Inventory', path: '/inventory' },
              { src: setting, alt: 'Settings Icon', text: 'Settings', path: '/settings' },
              { src: community, alt: 'Community Icon', text: 'Community', path: '/community' },
              { src: bell, alt: 'Notifications Icon', text: 'Notifications', path: '/notifications' },
              { src: profile, alt: 'Profile Icon', text: 'My Profile', path: '/profile' },
              { src: logout, alt: 'Logout Icon', text: 'Logout', path: '/logout', textColor: 'text-red-500' },
            ].map(({ src, alt, text, path, textColor = 'text-gray-700' }, index) => (
              <li key={index} className="flex items-center">
                <img src={src} alt={alt} className="h-6 w-6 mr-2" />
                <Link to={path} className={`block font-thin hover:text-green-500 ${textColor}`}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#C0F196] rounded-3xl p-6 text-center mt-8 shadow-sm relative overflow-hidden">
  {/* Top-left arc */}
  <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-[#D8F9C4] rounded-br-full"></div>
  {/* Bottom-right arc */}
  <div className="absolute bottom-0 right-0 w-2/5 h-2/5 bg-[#D8F9C4] rounded-tl-full"></div>
  
  {/* Plus icon */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
    <div className="bg-white rounded-full p-2 shadow-md">
      <img src={plusIcon} alt="Plus Icon" className="h-6 w-6" />
    </div>
  </div>
  
  <div className="mt-12 flex items-center justify-center flex-col relative z-10">
    <div className="text-green-800 font-semibold text-lg mb-2">Share Your Experience</div>
    <p className="text-green-700 text-sm mb-4 text-center">Connect with Others, Ask Questions, and Share Your Success Stories.</p>
    <Link to="/post">
      <button className="bg-white text-green-700 font-semibold py-2 px-6 rounded-lg text-sm hover:bg-green-50 transition duration-300">
        Create New Post
      </button>
    </Link>
  </div>
  
  {/* Cutout for the button */}
  <div className="absolute bottom-5 right-7 w-2/5 h-10.5 bg-[#C0F196]"></div>
</div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
