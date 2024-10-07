import React, { ReactNode } from 'react';
import './Icon.scss';

interface ComponentProps {
	size: number;
}

const IconArrowRight = ({ size }: ComponentProps): ReactNode => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={4*size} height={4*size} color="#000000" fill="none">
				<path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

export default IconArrowRight;