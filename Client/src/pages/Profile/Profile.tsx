import React, { ReactNode, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { initUtils } from '@telegram-apps/sdk';

//  Custom hooks;
import { useAuth } from '../../providers/AuthProvider.tsx';
import { useData } from '../../providers/DataProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom components;
import AboutUser from './modules/AboutUser/AboutUser.tsx';
import Button from '../../ui/Button/Button.tsx';
import FriendsCounter from './modules/FriendsCounter/FriendsCounter.tsx';
import FriendsDescription from './modules/FriendsDescription/FriendsDescription.tsx';
import VerticalLayout from '../../ui/Layout/VerticalLayout/VerticalLayout.tsx';

// Included styles;
import './Profile.scss';
import '../page.scss';
import { API_RATING_HOLDERS } from '../../api/api.rating.holders.js';

interface ComponentProps {}

const Profile = ({}: ComponentProps): ReactNode => {
	const { webApp, token } = useAuth();
	const { contextData } = useData();
	const { localization } = useLocalization();
	const utils = initUtils();

	const invite = {
		text: localization.profile.invite,
		url: `https://t.me/inch_ton_bot/app?startapp=${contextData.appData.user_id}`, 
	}

	const getRating = async () => {
		const response = await API_RATING_HOLDERS(token, webApp)
		console.log(response)
	}
	useEffect(() => {
		getRating()
	})

	return (
		<div className="page" id="profile">
			<AboutUser />
			<Button 
				mode="white" 
				size="medium" 
				haptic={["notification", "success"]} 
				style={{margin: '6px 18vw'}} 
				onClick={() => utils.shareURL(invite.url, invite.text)}
			>
				{ localization.profile.invite_button }
			</Button>
			{/* <VerticalLayout justify="center" align="center" gap={10} grow={1}>
				<FriendsCounter friends={contextData.appData.friends} />
				<FriendsDescription />
				<Button mode="white" size="medium" haptic={["notification", "success"]} style={{marginTop: '16px'}} onClick={() => utils.shareURL(invite.url, invite.text)}
				>{localization.profile.invite_button}</Button>
			</VerticalLayout>
			<NavLink to={'/honor-roll'} className="honor-roll__link">{localization.profile.honor_roll_description}</NavLink> */}
		</div>
	)
}

export default Profile;