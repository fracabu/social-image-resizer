
import React, { useEffect, useState } from 'react';
import { type ProcessedImage } from '../types';
import { DownloadIcon, CopyIcon } from './icons';

interface DownloadItemProps {
  image: ProcessedImage;
}

const DownloadItem: React.FC<DownloadItemProps> = ({ image }) => {
  const [copyStatus, setCopyStatus] = useState('Copy');
  
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.dataUrl);
    };
  }, [image.dataUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = `resized-${image.platformName.toLowerCase().replace(' ', '-')}-${image.width}x${image.height}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/jpeg': image.blob })
      ]);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      setCopyStatus('Failed!');
       setTimeout(() => setCopyStatus('Copy'), 2000);
      alert('Copying image to clipboard failed. This feature may not be supported in your browser. Please use the download button or right-click the image to save.');
    }
  };
  
  const sizeKB = Math.round(image.size / 1024);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-4 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xl font-bold text-[#8E1F2F]">{image.platformName}</h4>
          <p className="text-gray-600 font-mono">{image.width} × {image.height} px • {sizeKB} KB</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownload} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <DownloadIcon />
            Download
          </button>
          <button onClick={handleCopy} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <CopyIcon />
            {copyStatus}
          </button>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-[#F0BC42] text-center">
         <h5 className="text-sm font-semibold text-gray-700 mb-3">Right-click or long-press on the image to save.</h5>
        <img src={image.dataUrl} alt={`Resized for ${image.platformName}`} className="max-w-full h-auto max-h-60 mx-auto rounded-md shadow-md" />
      </div>
    </div>
  );
};

export default DownloadItem;
