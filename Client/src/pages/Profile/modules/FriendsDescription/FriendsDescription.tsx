import React from 'react';

// Custom hooks;
import { useLocalization } from '../../../../providers/LocalizationProvider';

// Included styles;
import './FriendsDescription.scss';

interface ComponentProps {}

const FriendsDescription = ({}: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="friends-description">
			<p>{localization.profile.description}</p>
		</div>
	)
}

export default FriendsDescription;