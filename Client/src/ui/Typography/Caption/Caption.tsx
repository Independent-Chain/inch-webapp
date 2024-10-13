import { ReactNode } from 'react';

// Included styles;
import './Caption.scss';

type Levels = 1 | 2; // 13px, 11px;
type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	level?: Levels;
	weight?: Weights;
	color: Colors;
	center?: boolean;
	caps?: boolean;
	children: any;
}

const Caption = ({ level=1, weight=1, color, center, caps, children }: ComponentProps): ReactNode => {
   return (
      <span className={`caption level-${level} weight-${weight} color-${color} center-${center}`}>
         { caps ? children.toUpperCase() : children }
      </span>
   )
}

export default Caption;