// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { initUtils } from '@telegram-apps/sdk';
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

import Button from '../../ui/Button/Button.tsx';
import FriendsCounter from './components/FriendsCounter/FriendsCounter.tsx';
import FriendsDescription from './components/FriendsDescription/FriendsDescription.tsx';
import VerticalLayout from '../../ui/Layout/VerticalLayout/VerticalLayout.tsx';

import './Profile.scss';
import '../page.scss';

interface ComponentProps {
 //
}

const Profile = ({  }: ComponentProps): JSX.Element => {
	const { contextData } = useAuth()
	const { localization } = useLocalization()
	const utils = initUtils()

	const invite = {
		text: 'Become a part of the Independent Chain history with me ⚡️\n\n🇬🇧 Channel: @inch_ton\n🇷🇺 CIS Channel: @inch_ton_cis\n💬 Chat: @inch_ton_chat',
		url: `https://t.me/pc_controller_f15_bot/inchapptesttest?startapp=${contextData.appData.user_id}`, 
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