import React from 'react';
import './Icon.scss';

interface ComponentProps {
	size: number;
}

const IconFlash = ({ size }: ComponentProps): JSX.Element => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size+'vw'} height={size+'vw'} color="#727272" fill="none">
				<path d="M6.19351 11.3965L12.192 3.31186C12.6611 2.67957 13.5405 3.07311 13.5405 3.91536V10.1729C13.5405 10.6775 13.8853 11.0865 14.3107 11.0865H17.2283C17.891 11.0865 18.2443 12.0134 17.8065 12.6035L11.808 20.6881C11.3389 21.3204 10.4595 20.9269 10.4595 20.0846V13.8271C10.4595 13.3225 10.1147 12.9135 9.68931 12.9135H6.77173C6.10895 12.9135 5.75566 11.9866 6.19351 11.3965Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

export default IconFlash;