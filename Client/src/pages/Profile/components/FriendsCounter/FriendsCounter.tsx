import React from 'react';
import { useLocalization } from '../../../../context/LocaleContext/LocalizationProvider';

import './FriendsCounter.scss';

interface ComponentProps {
	friends: number;
}

const FriendsCounter = ({ friends }: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="friends-counter">
			<p><span>{friends}</span> {localization.profile.friends}</p>
		</div>
	)
}

export default FriendsCounter;