import React from 'react';

// Custom hooks;
import { useLocalization } from '../../../../providers/LocalizationProvider';

// Included styles;
import './ProfileCells.scss';
import ProfileActionCell from '../../components/ProfileActionCell/ProfileActionCell';

interface ComponentProps {}

const ProfileCells = ({}: ComponentProps): JSX.Element => {
	const { localization } = useLocalization();

	return (
		<div className="profile-cells">
			<ProfileActionCell 
				pagePath={'/leaderboard'} 
				title={ localization.profile.leaderboard.title }
				description={ localization.profile.leaderboard.description }
			/>
			<ProfileActionCell 
				pagePath={'/honor-roll'} 
				title={ localization.profile.honorboard.title }
				description={ localization.profile.honorboard.description }
			/>
		</div>
	)
}

export default ProfileCells;