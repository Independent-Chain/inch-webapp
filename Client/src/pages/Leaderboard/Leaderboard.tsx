import React from 'react';

// Included styles;
import './Leaderboard.scss';
import AllUsersRating from './modules/AllUsersRating/AllUsersRating';

interface ComponentProps {}

const Leaderboard = ({}: ComponentProps): JSX.Element => {
	return (
		<div className="page" id="leaderboard">
			<AllUsersRating />
			<div className="self-rating"></div>
		</div>
	)
}

export default Leaderboard;