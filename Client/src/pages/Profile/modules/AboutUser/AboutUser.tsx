import React from 'react';

// Custom hooks;
import { useData } from '../../../../providers/DataProvider';

// Included styles;
import './AboutUser.scss';

interface ComponentProps {

}

const AboutUser = ({  }: ComponentProps): JSX.Element => {
	const { contextData } = useData();

	return (
		<div className="about-user">
			<p className="username">{ contextData.metaData.username }</p>
			<div className="information">
				<div className="information__cell rb">
					<span className="value">{ contextData.appData.friends }</span>
					<span className="title">Friends</span>
				</div>
				<div className="information__cell">
					<span className="value">{ contextData.appData.uid }</span>
					<span className="title">UID</span>
				</div>
				<div className="information__cell lb">
					<span className="value">#1</span>
					<span className="title">Rating</span>
				</div>
			</div>
		</div>
	)
}

export default AboutUser;