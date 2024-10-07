import React, { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../providers/AuthProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';
import { useNotification } from '../../providers/NotificationProvider.tsx';

// Custom helpers;
import { API_USER_LOCALE } from '../../api/api.user.locale.js';

// Custom components;
import Button from '../../ui/Button/Button.tsx';

// Icons;
import IconStar from '../../icons/IconPremium.tsx';
import IconTranslate from '../../icons/IconTranslate.tsx';

// Included styles;
import './Header.scss';
import { useData } from '../../providers/DataProvider.tsx';
import IconTon from '../../icons/IconTon.tsx';

interface ComponentProps {}

const Header = ({ }: ComponentProps): ReactNode => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	const { webApp, token } = useAuth();
	const { contextData, updateDataContext } = useData();
	const { localization, updateLocalization } = useLocalization();
	const { showNotification } = useNotification();

	const translateApp = () => {
		API_USER_LOCALE(token, webApp, contextData.appData).then(responseData => {
			updateDataContext({ metaData: responseData.metaData, appData: responseData.appData })
			updateLocalization(responseData.appData.locale)
		}).catch(error => {
			alert(error)
		})
	}

	useEffect(() => {
		if (!isFirstRender) {
			showNotification('success', localization.notifications.success, localization.notifications.translated)
		} else {
			setIsFirstRender(false)
		}
	}, [localization])

	return (
		<div className="header">
			<IconStar premium={ contextData.appData.premium } size={6} />
			<span className="logo">
				{ contextData.metaData.username}.inch
			</span>
			<div className="ton-connect">
				<IconTon size={3} />
				<span className="ton-connect__text">Soon</span>
			</div>
			
			{/* <Button
				before={ <IconTranslate size={6}/> }
				mode="plain" 
				size="medium" 
				style={ { padding: '0 2vw' } }
				onClick={ translateApp }
				haptic={ ["notification", "success"] }
			/> */}
		</div>
	)
}

export default Header;