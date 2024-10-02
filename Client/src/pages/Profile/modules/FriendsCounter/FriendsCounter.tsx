import React, { ReactNode } from 'react';

// Custom hooks;
import { useLocalization } from '../../../../providers/LocalizationProvider';

// Included styles;
import './FriendsCounter.scss';

interface ComponentProps {
	friends: number;
}

const FriendsCounter = ({ friends }: ComponentProps): ReactNode => {
	const { localization } = useLocalization()

	return (
		<div className="friends-counter">
			<p><span>{friends}</span> {localization.profile.friends}</p>
		</div>
	)
}

export default FriendsCounter;