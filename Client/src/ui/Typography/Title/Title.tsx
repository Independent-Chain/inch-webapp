import React, { ReactNode } from 'react';

import './Title.scss';

type Levels = 1 | 2 | 3; // 28px, 24px, 20px;
type Weights = 1 | 2 | 3; // 400, 600, 700;
type Colors = 'white' | 'gray' | 'black';

interface ComponentProps {
	level: Levels;
	weight: Weights;
	color: Colors;
	center?: boolean;
	plain?: boolean;
	caps?: boolean;
	children: string;
}

const Title = ({ level=1, weight=1, color, center, plain, caps, children }: ComponentProps): ReactNode => {
	return (
		<h2 className={`title level-${level} weight-${weight} color-${color} plain-${plain} center-${center}`}>
			{ caps ? children.toUpperCase() : children }
		</h2>
	)
}

export default Title;