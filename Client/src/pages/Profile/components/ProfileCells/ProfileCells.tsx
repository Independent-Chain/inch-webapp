// Custom hooks;
import { useLocalization } from '@providers/LocalizationProvider';

// Custom components;
import Cell from '@ui/Cell/Cell';

// Included styles;
import './ProfileCells.scss';


interface ComponentProps { }

const ProfileCells = ({ }: ComponentProps): JSX.Element => {
	const { localization } = useLocalization();

	return (
		<div className="profile-cells">
			<Cell
				path='/leaderboard'
				title={ localization.profile.leaderboard.title }
				description={ localization.profile.leaderboard.description }
			/>
			<Cell
				path='/honor-roll'
				title={ localization.profile.honorboard.title }
				description={ localization.profile.honorboard.description }
			/>
		</div>
	)
}

export default ProfileCells;