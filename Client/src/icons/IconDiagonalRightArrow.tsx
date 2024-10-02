import React, { ReactNode } from 'react';
import './Icon.scss';

interface ComponentProps {
	size: number;
}

const IconDiagonalRightArrow = ({ size }: ComponentProps): ReactNode => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size+'vw'} height={size+'vw'} color="#ffffff" fill="none">
				<path d="M17 7L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    		<path d="M11 6.13151C11 6.13151 16.6335 5.65662 17.4885 6.51153C18.3434 7.36645 17.8684 13 17.8684 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

export default IconDiagonalRightArrow;