import React, { ReactNode } from 'react';

import './Text.scss';

type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	weight: Weights;
	color: Colors;
	center?: boolean;
	caps?: boolean;
	children: string;
}

const Text = ({ weight=1, color, center, caps, children }: ComponentProps): ReactNode => {
	return (
		<span className={`text weight-${weight} color-${color} center-${center}`}>
			{ caps ? children.toUpperCase() : children }
		</span>
	)
}

export default Text;