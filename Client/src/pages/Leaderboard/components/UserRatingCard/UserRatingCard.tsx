import React from 'react';

// Custom helpers;
import { setMarker } from '../../helpers/setMarker';

// Included styles;
import './UserRatingCard.scss';

interface ComponentProps {
	userData: {
		username: string;
		marker?: string;
		position: number;
		balance: number;
	}
}

const UserRatingCard = ({ userData }: ComponentProps): JSX.Element => {
	userData.marker = setMarker(userData.position);

	return (
		<div className="user-rating-card">
			<div className="urc__avatar" style={{backgroundColor: `var(--${userData.marker}-marker)`}}>
				<span>{ userData.username != null ? userData.username[0] : '' }{ userData.username[1] }</span>
			</div>
			<div className="urc__body">
				<p className="urc__username">{ userData.username }</p>
				<p className="urc__balance">{ userData.balance.toLocaleString('en-Us') } tINCH</p>
			</div>
			<p className={`urc__position ${userData.marker}`}>#{ userData.position + 1 } </p>
		</div>
	)
}

export default UserRatingCard;