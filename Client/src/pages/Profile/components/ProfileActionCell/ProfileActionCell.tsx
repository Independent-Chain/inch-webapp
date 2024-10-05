import React from 'react';

// Icons;
import IconDiagonalRightArrow from '../../../../icons/IconDiagonalRightArrow.tsx'
// Included styles;
import './ProfileActionCell.scss';
import { NavLink } from 'react-router-dom';

interface ComponentProps {
	pagePath: string;
	data?: { [key: string]: any }
	title: string;
	description: string;
}

const ProfileActionCell = ({ pagePath, title, description }: ComponentProps): JSX.Element => {
	return (
		<NavLink to={ pagePath } style={{ textDecoration: 'none' }}>
			<div className="profile-action-cell">
				<div className="pac__body">
					<p className="pac__information__title">{ title }</p>
					<p className="pac__information__description">{ description }</p>
				</div>
				<div className="pac__icon">
					<IconDiagonalRightArrow size={5} />
				</div>
			</div>
		</NavLink>
	)
}

export default ProfileActionCell;