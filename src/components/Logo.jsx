import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <div className="inline-flex items-center gap-2 active:scale-95 transition-transform duration-150 cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
        <img src={logo} alt="SkillSpire Logo" className="w-6 h-6" />
      </div>
      <h3 className="text-3xl font-bold text-secondary">
        SkillSpire
      </h3>
    </div>
  );
};

export default Logo;
