
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#8E1F2F] rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-[#8E1F2F]">Processing image...</p>
    </div>
  );
};

export default Spinner;
