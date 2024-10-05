import React from 'react';

// Custom components;
import AllUsersRating from './modules/AllUsersRating/AllUsersRating';
import SelfRating from './components/SelfRating/SelfRating';

// Included styles;
import './Leaderboard.scss';

interface ComponentProps {}

const Leaderboard = ({}: ComponentProps): JSX.Element => {
	return (
		<div className="page" id="leaderboard">
			<AllUsersRating />
			<SelfRating />
		</div>
	)
}

export default Leaderboard;