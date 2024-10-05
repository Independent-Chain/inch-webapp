import React from 'react';

// Custom hooks;
import { useData } from '../../../../providers/DataProvider';

// Custom components;
import UserRatingPosition from '../../components/UserRatingPosition/UserRatingPosition';

// Included styles;
import './AllUsersRating.scss';

type User = { 
	username: string, 
	marker: string;
	position: number,
	balance: number 
}

interface ComponentProps {}

const AllUsersRating = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();

	return (
		<div className="all-users-rating">
			{contextData.allRating.map((user: User, index: number) =>  {
				user.position = index;
				switch (index) {
					case 0: user.marker = 'gold'; break;
					case 1: user.marker = 'silver'; break;
					case 2: user.marker = 'bronze'; break;
					default: user.marker = 'default'; break;
				}
				return (
					<UserRatingPosition key={ index } userData={ user } />
				)
			})}
		</div>
	)
}

export default AllUsersRating;