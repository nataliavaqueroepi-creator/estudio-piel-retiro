import React, { useState } from 'react';
import { Sparkles, Hammer, Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Fotografía Estudio Piel',
  className = '',
  fallbackTitle = 'Estudio Piel Retiro',
  fallbackSubtitle = 'Taller artesanal de calzado y bolsos',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#2c1810] via-[#3d2417] to-[#1a0e08] text-amber-50 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col items-center max-w-xs">
          <div className="w-12 h-12 rounded-full bg-amber-900/60 border border-amber-600/40 flex items-center justify-center text-amber-300 mb-3 shadow-inner">
            <Hammer className="w-6 h-6 stroke-[1.75]" />
          </div>
          <span className="font-serif text-base font-semibold tracking-wide text-amber-100">
            {fallbackTitle}
          </span>
          <span className="text-xs text-amber-300/80 mt-1 line-clamp-2">
            {fallbackSubtitle}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-amber-400/60 mt-3 font-mono">
            Foto de alta gama · Retiro, Madrid
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-stone-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
