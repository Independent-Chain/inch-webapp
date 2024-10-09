// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom components;
import Title from '@ui/Typography/Title/Title.tsx';
import SubHeadline from '@ui/Typography/SubHeadline/SubHeadline.tsx';
import UserRatingCard from './components/UserRatingCard/UserRatingCard.tsx';
import AllUsersRating from './modules/AllUsersRating/AllUsersRating';

// Included styles;
import './Leaderboard.scss';

interface ComponentProps {
	
}

const Leaderboard = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();
	const { localization } = useLocalization();
	
	const selfUserData = {
		username: contextData.metaData.username,
		balance: contextData.appData.balance,
		position: contextData.appData.rating - 1,
	}

	return (
		<div className="page" id="leaderboard">
			<Title level={3} weight={2} color="white">{ localization.leaderboard.your_score }</Title>
			<UserRatingCard userData={ selfUserData } />
			<div className="title-wrapper">
				<Title level={3} weight={2} color="white">{ localization.leaderboard.general.title }</Title>
				<SubHeadline color="gray">{ localization.leaderboard.general.description }</SubHeadline>
			</div>
			<AllUsersRating />
		</div>
	)
}

export default Leaderboard;