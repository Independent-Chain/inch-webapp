import React, { ReactNode } from 'react';

// Custom hooks;
import { useLocalization } from '../../providers/LocalizationProvider';

// Included styles;
import '../Page.scss';
import './HonorBoard.scss';

// Honor board;
import honorBoard from './data/honor_board.json';

interface ComponentProps {}

const HonorRoll = ({}: ComponentProps): ReactNode => {
	const { localization } = useLocalization();

	const generateMembersList = (users: Array<string>) => {
		return users.map((user, index) => (
			<a href={`https://t.me/${user}`} className="member">@{ user }</a>
		))
	}

	return (
		<div className="page" id="honor-board">
			<p className="honor-board__title">{ localization.honor_roll.description }</p>
			<div className="honor-board__section">
				<p className="honor-board__section-title">{ localization.honor_roll.developers }</p>
				<div className="honor-board__members-list">
					{ generateMembersList(honorBoard['developers']) }
				</div>
			</div>
			<div className="honor-board__section">
				<p className="honor-board__section-title">{ localization.honor_roll.testers }</p>
				<div className="honor-board__members-list">
					{ generateMembersList(honorBoard['testers']) }
				</div>
			</div>
			<div className="honor-board__section">
				<p className="honor-board__section-title">{ localization.honor_roll.contributors }</p>
				<div className="honor-board__members-list">
					{ generateMembersList(honorBoard['contributors']) }
				</div>
			</div>
		</div>
	)
}

export default HonorRoll;