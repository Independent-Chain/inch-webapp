import React from 'react';

// Custom hooks;
import { useAuth } from '../../../../providers/AuthProvider';
import { useLocalization } from '../../../../providers/LocalizationProvider';

// Included styles;
import './ProfileFooter.scss';

interface ComponentProps {}

const ProfileFooter = ({}: ComponentProps): JSX.Element => {
	const { webApp } = useAuth();
	const { localization } = useLocalization();

	return (
		<div className="profile-footer">
			<span className="support" onClick={() => webApp.openTelegramLink('https://t.me/inch_support')}>
				{ localization.profile.support }
			</span>
			<span>|</span>
			<span className="version" onClick={() => webApp.openLink('https://github.com/Independent-Chain/inch-webapp/tree/main')}>
				{ localization.profile.version }
			</span>
		</div>
	)
}

export default ProfileFooter;