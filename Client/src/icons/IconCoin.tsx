import React, { ReactNode } from 'react';
import './Icon.scss';

interface ComponentProps {
	size: number;
}

const IconCoin = ({ size }: ComponentProps): ReactNode => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={4*size} height={4*size} color="#727272" fill="none">
				<path d="M14 18C18.4183 18 22 14.4183 22 10C22 5.58172 18.4183 2 14 2C9.58172 2 6 5.58172 6 10C6 14.4183 9.58172 18 14 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    		<path d="M13.1669 20.9689C12.063 21.6239 10.7742 22 9.3975 22C5.31197 22 2 18.688 2 14.6025C2 13.2258 2.37607 11.937 3.03107 10.8331" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		</div>
	)
}

export default IconCoin;