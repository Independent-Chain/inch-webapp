import React from 'react';

// Custom hooks;
import { useData } from '../../../../providers/DataProvider';

// Custom helpers;
import { setMarker } from '../../helpers/setMarker';

// Custom components;
import UserRatingCard from '../../components/UserRatingCard/UserRatingCard.tsx';

// Included styles;
import './AllUsersRating.scss';

type UserData = { 
	username: string, 
	marker?: string;
	position: number,
	balance: number 
}

interface ComponentProps {}

const AllUsersRating = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();

	return (
		<div className="all-users-rating">
			{
				contextData.allRating.map((user: UserData, index: number) =>  {
					user.position = index;
					user.marker = setMarker(index);
					return <UserRatingCard key={ index } userData={ user } />
				})
			}
		</div>
	)
}

export default AllUsersRating;