import React, { ReactNode, useEffect, useState } from 'react';
import { initUtils } from '@telegram-apps/sdk';

//  Custom hooks;
import { useAuth } from '../../providers/AuthProvider.tsx';
import { useData } from '../../providers/DataProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom API;
import { API_RATING_USER } from '../../api/api.rating.user.js';
import { API_RATING_HOLDERS } from '../../api/api.rating.holders.js';

// Custom components;
import Loading from '../../ui/Loading/Loading.tsx';
import AboutUser from './modules/AboutUser/AboutUser.tsx';
import TranslateCell from './components/TranslateCell/TranslateCell.tsx';
import ProfileCells from './modules/ProfileCells/ProfileCells.tsx';
import Button from '../../ui/Button/Button.tsx';

// Included styles;
import './Profile.scss';
import '../page.scss';
import ProfileFooter from './modules/ProfileFooter/ProfileFooter.tsx';

interface ComponentProps {}

const Profile = ({}: ComponentProps): ReactNode => {
	const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

	const { webApp, token } = useAuth();
	const { contextData, updateDataContext } = useData();
	const { localization } = useLocalization();
	const utils = initUtils();

	const invite = {
		text: localization.profile.invite,
		url: `https://t.me/inch_ton_bot/app?startapp=${contextData.appData.user_id}`, 
	}

	const fetchData = async () => {
		await getUserRating();
		await getAllRating();
		updateDataContext(contextData);
		setLoadingStatus(false);
	}

	const getUserRating = async () => {
		try {
			const response = await API_RATING_USER(token, webApp);
			contextData.appData.rating = response;
		} catch(error) {
			console.log(error)
		}
	}

	const getAllRating = async () => {
		try {
			const response = await API_RATING_HOLDERS(token, webApp);
			contextData.allRating = response;
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	if (loadingStatus) {
		return <Loading />
	}

	return (
		<div className="page" id="profile">
			<AboutUser />
			<Button 
				mode="white" 
				size="medium" 
				haptic={["notification", "success"]} 
				style={{margin: '6px 0'}} 
				onClick={() => utils.shareURL(invite.url, invite.text)}
			>
				{ localization.profile.invite_button }
			</Button>
			<TranslateCell />
			<ProfileCells />
			<ProfileFooter />
		</div>
	)
}

export default Profile;