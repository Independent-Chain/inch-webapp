import React from 'react';

// Included styles;
import './ProfileCells.scss';
import ProfileActionCell from '../../components/ProfileActionCell/ProfileActionCell';

interface ComponentProps {}

const ProfileCells = ({}: ComponentProps): JSX.Element => {
	return (
		<div className="profile-cells">
			<ProfileActionCell 
				pagePath={'/leaderboard'} 
				title={'Points leaderboard'}
				description={'Rating of all tINCH points holders'}
			/>
			<ProfileActionCell 
				pagePath={'/honor-roll'} 
				title={'Honor board'}
				description={'List of honorary users of the project'}
			/>
		</div>
	)
}

export default ProfileCells;