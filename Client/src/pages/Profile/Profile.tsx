import React from 'react';
import { NavLink } from 'react-router-dom';
import { initUtils } from '@telegram-apps/sdk';

//  Custom hooks;
import { useData } from '../../providers/DataProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom components;
import Button from '../../ui/Button/Button.tsx';
import FriendsCounter from './modules/FriendsCounter/FriendsCounter.tsx';
import FriendsDescription from './modules/FriendsDescription/FriendsDescription.tsx';
import VerticalLayout from '../../ui/Layout/VerticalLayout/VerticalLayout.tsx';

// Included styles;
import './Profile.scss';
import '../page.scss';

interface ComponentProps {}

const Profile = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useData();
	const { localization } = useLocalization();
	const utils = initUtils();

	const invite = {
		text: localization.profile.invite,
		url: `https://t.me/inch_ton_bot/app?startapp=${contextData.appData.user_id}`, 
	}

	return (
		<div className="page" id="profile">
			<VerticalLayout justify="center" align="center" gap={10} grow={1}>
				<FriendsCounter friends={contextData.appData.friends} />
				<FriendsDescription />
				<Button mode="white" size="medium" haptic={["notification", "success"]} style={{marginTop: '16px'}} onClick={() => utils.shareURL(invite.url, invite.text)}
				>{localization.profile.invite_button}</Button>
			</VerticalLayout>
			<NavLink to={'/honor-roll'} className="honor-roll__link">{localization.profile.honor_roll_description}</NavLink>
		</div>
	)
}

export default Profile;