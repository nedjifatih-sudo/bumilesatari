import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  className?: string;
  caption?: string;
  darkSurface?: boolean;
}

const ASPECT_CLASSES: Record<NonNullable<EditorialImageProps['aspectRatio']>, string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-square',
};

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectRatio = '16:9',
  className = '',
  caption,
  darkSurface = false,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`group relative ${className}`}>
      <div
        className={`relative w-full overflow-hidden ${ASPECT_CLASSES[aspectRatio]} ${
          darkSurface
            ? 'bg-[#1A221D] border border-white/10'
            : 'bg-[#EBE6DF] border border-stone-300/80'
        }`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center p-8 text-center ${
              darkSurface
                ? 'bg-gradient-to-br from-[#1A241E] to-[#111613] text-[#D6CEBE]'
                : 'bg-gradient-to-br from-[#F5F0E6] to-[#E5DDD0] text-stone-700'
            }`}
          >
            <Sprout className="mb-3 h-8 w-8 opacity-70" aria-hidden="true" />
            <p className="max-w-sm font-serif-display text-sm italic">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-2.5 font-serif-display text-xs italic leading-relaxed ${
            darkSurface ? 'text-[#A8A29E]' : 'text-stone-600'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
