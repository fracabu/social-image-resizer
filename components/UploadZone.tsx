
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | undefined | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Invalid file type. Please upload an image (JPG, PNG, GIF, etc.).');
        return;
      }
      if (file.size > 15 * 1024 * 1024) { // 15MB limit
        alert('File is too large. Maximum size is 15MB.');
        return;
      }
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };
  
  const baseClasses = 'border-4 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300';
  const stateClasses = isDragging 
    ? 'border-[#F0BC42] bg-amber-50 scale-105 ring-4 ring-amber-200'
    : 'border-[#8E1F2F] bg-red-50 hover:bg-amber-50 hover:border-[#F0BC42]';

  return (
    <div
      className={`${baseClasses} ${stateClasses}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        disabled={isLoading}
      />
      <UploadIcon className="w-16 h-16 mx-auto text-[#8E1F2F] mb-4" />
      <h3 className="text-xl font-bold text-gray-800">Drag & Drop Your Image Here</h3>
      <p className="text-gray-600 mt-1">or click to browse files</p>
      <p className="text-xs text-gray-500 mt-2">Max 15MB. JPG, PNG, WEBP supported.</p>
    </div>
  );
};

export default UploadZone;
