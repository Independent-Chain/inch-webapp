import React from 'react';

// Custom hooks;
import { useData } from '../../../../providers/DataProvider';
import { useLocalization } from '../../../../providers/LocalizationProvider';

// Included styles;
import './AboutUser.scss';

interface ComponentProps {}

const AboutUser = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();
	const { localization } = useLocalization();

	return (
		<div className="about-user">
			<div className="au__avatar">
				{ contextData.metaData.username.charAt(0).toUpperCase() }
			</div>
			<p className="username">{ contextData.metaData.username }</p>
			<div className="information">
				<div className="information__cell ">
					<span className="value">{ contextData.appData.friends }</span>
					<span className="title">{ localization.profile.friends }</span>
				</div>
				<div className="i__divider"></div>
				<div className="information__cell">
					<span className="value">{ contextData.appData.uid }</span>
					<span className="title">UID</span>
				</div>
				<div className="i__divider"></div>
				<div className="information__cell">
					<span className="value">#{ contextData.appData.rating }</span>
					<span className="title">{ localization.profile.rating }</span>
				</div>
			</div>
		</div>
	)
}

export default AboutUser;