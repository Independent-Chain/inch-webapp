import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { initUtils } from '@telegram-apps/sdk';

//  Custom hooks;
import { useAuth } from '../../providers/AuthProvider.tsx';
import { useData } from '../../providers/DataProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom API;
import { API_RATING_USER } from '../../api/api.rating.user.js';

// Custom components;
import Loading from '../../ui/Loading/Loading.tsx';
import AboutUser from './modules/AboutUser/AboutUser.tsx';
import Button from '../../ui/Button/Button.tsx';

// Included styles;
import './Profile.scss';
import '../page.scss';

interface ComponentProps {}

const Profile = ({}: ComponentProps): ReactNode => {
	const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);
	const [userRating, setUserRating] = useState<number | null>(null);

	const { webApp, token } = useAuth();
	const { contextData } = useData();
	const { localization } = useLocalization();
	const utils = initUtils();

	const invite = {
		text: localization.profile.invite,
		url: `https://t.me/inch_ton_bot/app?startapp=${contextData.appData.user_id}`, 
	}

	const getUserRating = async () => {
		try {
			const rating = await API_RATING_USER(token, webApp);
			setUserRating(rating);
			setTimeout(() => {
				setLoadingStatus(false)
			}, 500)
		} catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		// getRating()
		getUserRating()
	}, [])

	if (loadingStatus) {
		return <Loading />
	}

	return (
		<div className="page" id="profile">
			<AboutUser rating={ userRating }/>
			<Button 
				mode="white" 
				size="medium" 
				haptic={["notification", "success"]} 
				style={{margin: '6px 18vw'}} 
				onClick={() => utils.shareURL(invite.url, invite.text)}
			>
				{ localization.profile.invite_button }
			</Button>
			{/*
				<NavLink to={'/honor-roll'} className="honor-roll__link">{localization.profile.honor_roll_description}</NavLink> 
			*/}
		</div>
	)
}

export default Profile;