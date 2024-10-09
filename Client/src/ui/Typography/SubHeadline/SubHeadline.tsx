import { ReactNode } from 'react';

// Included styles;
import './SubHeadline.scss';

type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	weight?: Weights;
	color: Colors;
	plain?: boolean;
	caps?: boolean;
	children: string;
}

const SubHeadline = ({ weight=1, color, plain, caps, children }: ComponentProps): ReactNode => {
	return (
		<h6 className={`subheadline weight-${weight} color-${color} plain-${plain}`}>
			{ caps ? children.toUpperCase() : children }
		</h6>
	)
}

export default SubHeadline;