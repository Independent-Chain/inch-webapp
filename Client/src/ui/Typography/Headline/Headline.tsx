import { ReactNode } from 'react';

// Included styles;
import './Headline.scss';

type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	weight?: Weights;
	color: Colors;
	plain?: boolean;
	caps?: boolean;
	children: string;
}

const Headline = ({ weight=1, color, plain, caps, children }: ComponentProps): ReactNode => {
   return (
      <h5 className={`headline weight-${weight} color-${color} plain-${plain}`}>
         { caps ? children.toUpperCase() : children }
      </h5>
   )
}

export default Headline;