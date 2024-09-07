import React from 'react';
import { useLocalization } from '../../../../context/LocaleContext/LocalizationProvider';

import './FriendsDescription.scss';

interface ComponentProps {

}

const FriendsDescription = ({  }: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="friends-description">
			<p>{localization.profile.description}</p>
		</div>
	)
}

export default FriendsDescription;