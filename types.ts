import type { ReactNode } from 'react';

export interface OriginalImageInfo {
  src: string;
  name: string;
  width: number;
  height: number;
  size: number; // in bytes
  type: string;
}

export interface ProcessedImage {
  id: string;
  platformName: string;
  width: number;
  height: number;
  blob: Blob;
  dataUrl: string;
  size: number;
}

export interface SocialPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
  isRecommended?: boolean;
  icon: ReactNode;
}
