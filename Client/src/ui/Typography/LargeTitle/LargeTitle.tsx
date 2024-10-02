import React, { ReactNode } from 'react';

import './LargeTitle.scss';

type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	weight: Weights;
	color: Colors;
	plain?: boolean;
	caps?: boolean;
	children: string;
}

const LargeTitle = ({ weight=1, color, plain, caps, children }: ComponentProps): ReactNode => {
	return (
		<h1 className={`largetitle weight-${weight} color-${color} plain-${plain}`}>
			{ caps ? children.toUpperCase() : children }
		</h1>
	)
}

export default LargeTitle;