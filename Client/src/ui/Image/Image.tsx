import { ReactNode } from 'react';

// Included styles;
import './Image.scss';

type Sizes = 20 | 24 | 28 | 40 | 48 | 96;

interface ComponentProps {
	src: string;
	fallback: any;
	size: Sizes;
}

const Image = ({ src, fallback, size }: ComponentProps): ReactNode => {
   const calculateStyle = (size: number) => {
      switch(size) {
      case 20:
         return { width: '20px', height: '20px', borderRadius: '4px' }
      case 24:
         return { width: '24px', height: '24px', borderRadius: '4px' }
      case 28:
         return { width: '28px', height: '28px', borderRadius: '4px' }
      case 40:
         return { width: '40px', height: '40px', borderRadius: '8px' }
      case 48:
         return { width: '48px', height: '48px', borderRadius: '8px' }
      case 96:
         return { width: '96px', height: '96px', borderRadius: '12px' }
      }
   }

   return (
      <div className="image-box" style={calculateStyle(size)}>
         <img className="image" src={src} alt={fallback} />
      </div>
   )
}

export default Image;