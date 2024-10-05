import React from 'react';

// Included styles;
import './UserRatingPosition.scss';

interface ComponentProps {
	userData: {
		username: string;
		marker: string;
		position: number;
		balance: number;
	}
}

const UserRatingPosition = ({ userData }: ComponentProps): JSX.Element => {
	return (
		<div className="user-rating-position">
			<p className="urp__username">
				<span className={`urp__position ${userData.marker}`}>#{ userData.position + 1 } </span>
				| { userData.username }
			</p>
			<p className="urp__balance">Balance: { userData.balance.toLocaleString('en-Us') } tINCH</p>
		</div>
	)
}

export default UserRatingPosition;