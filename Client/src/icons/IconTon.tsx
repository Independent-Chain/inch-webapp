import React from 'react';
import './Icon.scss';

interface ComponentProps {
	size: number;
}

const IconTon = ({ size }: ComponentProps): JSX.Element => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 62" width={size} height={size} color="#000000" fill="none">
				<path d="M50.2591 0H9.73864C2.28837 0 -2.43379 8.30428 1.31444 15.0176L26.3221 59.8066C27.954 62.7311 32.0437 62.7311 33.6756 59.8066L58.6883 15.0176C62.4315 8.31501 57.7093 0 50.2641 0H50.2591ZM26.3018 46.375L20.8555 35.4834L7.71428 11.1973C6.84736 9.64283 7.91813 7.65089 9.73355 7.65089H26.2967V46.3803L26.3018 46.375ZM52.2733 11.192L39.1371 35.4887L33.6908 46.375V7.64564H50.254C52.0694 7.64564 53.1402 9.63757 52.2733 11.192Z" fill="white"/>
			</svg>
		</div>
	)
}

export default IconTon;