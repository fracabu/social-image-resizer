
export const resizeImage = (
  imageSrc: string,
  targetW: number,
  targetH: number,
  quality: number // 0-1
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      // Fill background white for JPGs
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetW, targetH);

      const sourceRatio = img.width / img.height;
      const targetRatio = targetW / targetH;

      let drawW, drawH, offsetX, offsetY;

      if (sourceRatio > targetRatio) {
        // Source is wider, fit to target height and crop width
        drawH = targetH;
        drawW = targetH * sourceRatio;
        offsetX = (targetW - drawW) / 2;
        offsetY = 0;
      } else {
        // Source is taller or same ratio, fit to target width and crop height
        drawW = targetW;
        drawH = targetW / sourceRatio;
        offsetX = 0;
        offsetY = (targetH - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas toBlob returned null'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = (err) => {
        reject(new Error(`Failed to load image: ${err}`));
    };
    img.src = imageSrc;
  });
};
