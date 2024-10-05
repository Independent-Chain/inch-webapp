import React, { useEffect } from 'react';

// Custom hooks;
import { useData } from '../../../../providers/DataProvider';

// Included styles;
import './SelfRating.scss';

interface ComponentProps {}

const SelfRating = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();
	
	const getMarker = () => {
		let marker: string;
		switch (contextData.appData.rating) {
			case 1: marker = 'gold'; break;
			case 2: marker = 'silver'; break;
			case 3: marker = 'bronze'; break;
			default: marker = 'default'; break;
		}
		return marker;
	}
	
	useEffect(() => {
	}, [])

	return (
		<div className="self-rating">
			<div className="sr__body">
				<p className="sr__headline">Your position</p>
				<p className="sr__username">
					{ contextData.metaData.username }
				</p>
				<p className="sr__balance">Balance: { contextData.appData.balance.toLocaleString('en-Us') } tINCH</p>
			</div>
			<p className={`sr__position ${getMarker()}`}>#{ contextData.appData.rating } </p>
		</div>
	)
}

export default SelfRating;