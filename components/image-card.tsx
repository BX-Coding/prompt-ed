
import React from 'react';
import Image from 'next/image';

type ImageCardProps = {
  imageUrl: string;
  promptTitle: string;
};

export const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, promptTitle }) => {
  return (
    <div className='bg-background border border-primary rounded-xl p-2 drop-shadow-md'>
        <img className="rounded-xl" src={imageUrl} alt={promptTitle} height={256} width={256} />
        <h2 className="text-center text-primary-foreground font-bold mt-2">{promptTitle}</h2>
    </div>
  );
};
