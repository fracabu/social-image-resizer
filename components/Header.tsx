
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#8E1F2F] mb-3">🖼️ Social Image Resizer</h1>
      <div className="bg-gradient-to-r from-red-50 via-white to-amber-50 p-5 rounded-xl border-l-4 border-[#8E1F2F] shadow-sm max-w-3xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-[#8E1F2F]">🎯 Fix Your Facebook & Social Previews</h2>
        <p className="text-gray-600 mt-1">
          Resize any image to the perfect dimensions for social media. Facebook requires <strong>1200×630 pixels</strong> for a perfect link preview.
        </p>
      </div>
    </header>
  );
};

export default Header;
