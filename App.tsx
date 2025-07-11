
import React, { useState, useCallback } from 'react';
import { type OriginalImageInfo, type ProcessedImage, type SocialPreset } from './types';
import { SOCIAL_PRESETS } from './constants';
import { resizeImage } from './services/imageService';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import Spinner from './components/Spinner';
import DownloadItem from './components/DownloadItem';
import Tips from './components/Tips';
import { CustomSizeIcon } from './components/icons';

const App: React.FC = () => {
  const [originalImageInfo, setOriginalImageInfo] = useState<OriginalImageInfo | null>(null);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jpegQuality, setJpegQuality] = useState<number>(85);
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');

  const handleFileSelect = useCallback((file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImageInfo({
          src: e.target?.result as string,
          name: file.name,
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type,
        });
        setProcessedImages([]);
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleResize = useCallback(async (preset: SocialPreset) => {
    if (!originalImageInfo) return;
    
    // Check if this version already exists
    const existingImage = processedImages.find(p => p.id === preset.id);
    if(existingImage) {
        // Maybe scroll to it or flash it
        document.getElementById(`download-${preset.id}`)?.scrollIntoView({behavior: 'smooth', block: 'center'});
        return;
    }

    setIsLoading(true);
    try {
      const blob = await resizeImage(originalImageInfo.src, preset.width, preset.height, jpegQuality / 100);
      const newImage: ProcessedImage = {
        id: preset.id,
        platformName: preset.name,
        width: preset.width,
        height: preset.height,
        blob: blob,
        dataUrl: URL.createObjectURL(blob),
        size: blob.size,
      };
      setProcessedImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error("Resize failed:", error);
      alert("Something went wrong during resizing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImageInfo, jpegQuality, processedImages]);
  
  const handleCustomResize = useCallback(async () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);
    if(!originalImageInfo || !width || !height || width <= 0 || height <= 0 || width > 4000 || height > 4000) {
        alert("Please enter valid dimensions (1-4000px).");
        return;
    }
    const id = `custom-${width}x${height}`;
    const name = `Custom Size`;

    const existingImage = processedImages.find(p => p.id === id);
    if(existingImage) {
        document.getElementById(`download-${id}`)?.scrollIntoView({behavior: 'smooth', block: 'center'});
        return;
    }

    setIsLoading(true);
    try {
      const blob = await resizeImage(originalImageInfo.src, width, height, jpegQuality / 100);
      const newImage: ProcessedImage = {
        id: id,
        platformName: name,
        width: width,
        height: height,
        blob: blob,
        dataUrl: URL.createObjectURL(blob),
        size: blob.size,
      };
      setProcessedImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error("Custom resize failed:", error);
      alert("Something went wrong during resizing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImageInfo, jpegQuality, customWidth, customHeight, processedImages]);


  const handleReset = () => {
    setOriginalImageInfo(null);
    setProcessedImages([]);
    setCustomWidth('');
    setCustomHeight('');
  };

  const sizeMB = originalImageInfo ? (originalImageInfo.size / (1024 * 1024)).toFixed(2) : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <main className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-xl">
          {isLoading && <Spinner />}

          {!isLoading && !originalImageInfo && (
            <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading}/>
          )}
          
          {!isLoading && originalImageInfo && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Image</h2>
                <button onClick={handleReset} className="font-semibold text-red-600 hover:text-red-800 transition">Start Over</button>
              </div>

              {/* Preview Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center bg-gray-50 p-4 rounded-lg">
                   <img src={originalImageInfo.src} alt="Original preview" className="max-w-full max-h-60 mx-auto rounded-md shadow-md" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700">Original Details</h3>
                  <p className="text-sm text-gray-500 truncate">{originalImageInfo.name}</p>
                  <ul className="mt-2 space-y-1 text-gray-600 font-mono">
                    <li><strong>Dimensions:</strong> {originalImageInfo.width} × {originalImageInfo.height} px</li>
                    <li><strong>Size:</strong> {sizeMB} MB</li>
                    <li><strong>Type:</strong> {originalImageInfo.type}</li>
                  </ul>
                  {/* Quality Control */}
                  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                      <label htmlFor="qualitySlider" className="block text-lg font-bold text-gray-700">Output Quality</label>
                      <p className="text-gray-600">JPEG Quality: <strong className="text-[#8E1F2F]">{jpegQuality}%</strong></p>
                      <input 
                        type="range" 
                        id="qualitySlider"
                        min="50"
                        max="100"
                        value={jpegQuality}
                        onChange={(e) => setJpegQuality(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer mt-2 accent-[#8E1F2F]"
                      />
                      <p className="text-xs text-gray-500 mt-1">Higher quality means larger file size.</p>
                  </div>
                </div>
              </div>

              {/* Tools Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Dimensions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SOCIAL_PRESETS.map(preset => (
                    <div key={preset.id} className={`relative p-5 border-2 rounded-2xl transition-all duration-300 ${preset.isRecommended ? 'border-[#F0BC42] bg-amber-50' : 'border-gray-200 bg-white'}`}>
                       {preset.isRecommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F0BC42] text-[#8E1F2F] px-4 py-1.5 rounded-full text-xs font-bold shadow-md">⭐ BEST FOR FACEBOOK</div>}
                      {preset.icon}
                      <h4 className="text-xl font-bold text-center text-[#8E1F2F]">{preset.name}</h4>
                      <p className="text-center font-bold text-2xl text-gray-700 my-2">{preset.width} × {preset.height}</p>
                      <p className="text-center text-gray-500 text-sm mb-4 h-10">{preset.description}</p>
                      <button onClick={() => handleResize(preset)} className="w-full bg-gradient-to-r from-[#8E1F2F] to-red-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Resize Now</button>
                    </div>
                  ))}
                   {/* Custom Size */}
                    <div className="p-5 border-2 border-gray-200 rounded-2xl bg-white">
                      <CustomSizeIcon className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                       <h4 className="text-xl font-bold text-center text-[#8E1F2F]">Custom Size</h4>
                       <div className="flex items-center justify-center gap-2 my-2">
                          <input type="number" placeholder="W" value={customWidth} onChange={e => setCustomWidth(e.target.value)} className="w-24 text-center p-2 border-2 rounded-md focus:ring-[#F0BC42] focus:border-[#F0BC42]"/>
                          <span className="font-bold text-gray-400">×</span>
                          <input type="number" placeholder="H" value={customHeight} onChange={e => setCustomHeight(e.target.value)} className="w-24 text-center p-2 border-2 rounded-md focus:ring-[#F0BC42] focus:border-[#F0BC42]"/>
                       </div>
                       <p className="text-center text-gray-500 text-sm mb-4 h-10">Enter your own dimensions.</p>
                       <button onClick={handleCustomResize} className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Resize Now</button>
                    </div>
                </div>
              </div>
            </div>
          )}
          
          {processedImages.length > 0 && (
             <div className="mt-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">💾 Your Resized Images</h3>
                <p className="text-gray-600 mb-6">Your images are ready! Use the buttons to download or copy them.</p>
                <div className="space-y-6">
                    {processedImages.map(img => (
                        <div key={img.id} id={`download-${img.id}`}>
                            <DownloadItem image={img} />
                        </div>
                    ))}
                </div>
            </div>
          )}
        </main>
        
        <Tips />

        <footer className="text-center mt-12 mb-4">
          <p className="text-gray-500 text-sm">
            Made with ❤️ by Codecraft Studio
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
