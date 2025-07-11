
import React from 'react';
import { type SocialPreset } from './types';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './components/icons';

export const SOCIAL_PRESETS: SocialPreset[] = [
  {
    id: 'facebook',
    name: 'Facebook / WhatsApp',
    width: 1200,
    height: 630,
    description: 'Perfect for Meta, Open Graph, link shares',
    isRecommended: true,
    icon: <FacebookIcon className="w-8 h-8 mx-auto mb-2 text-[#1877F2]" />,
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    width: 1200,
    height: 600,
    description: 'Ideal for Twitter Cards and X shares',
    icon: <TwitterIcon className="w-8 h-8 mx-auto mb-2 text-[#1DA1F2]" />,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    width: 1200,
    height: 627,
    description: 'For professional posts on LinkedIn',
    icon: <LinkedInIcon className="w-8 h-8 mx-auto mb-2 text-[#0A66C2]" />,
  },
  {
    id: 'instagram',
    name: 'Instagram Square',
    width: 1080,
    height: 1080,
    description: 'Classic square posts for your feed',
    icon: <InstagramIcon className="w-8 h-8 mx-auto mb-2 text-[#E4405F]" />,
  },
];
