import React, { ReactNode } from 'react';

interface ComponentProps {
	size: number;
}

const IconUpgrades = ({ size }: ComponentProps): ReactNode => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size+'vw'} height={size+'vw'} color="#000000" fill="none">
				<path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.2" />
    		<path d="M16 10.8333L13.8856 8.7891C12.9967 7.9297 12.5523 7.5 12 7.5C11.4477 7.5 11.0033 7.9297 10.1144 8.7891L8 10.8333M16 16.5L13.8856 14.4558C12.9967 13.5964 12.5523 13.1667 12 13.1667C11.4477 13.1667 11.0033 13.5964 10.1144 14.4558L8 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

export default IconUpgrades;