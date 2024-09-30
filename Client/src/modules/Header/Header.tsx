import React, { useEffect, useState } from 'react';

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

interface ComponentProps {}

const Header = ({ }: ComponentProps): JSX.Element => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	const { webApp, token, contextData, updateContextData } = useAuth()
	const { localization, updateLocalization } = useLocalization()
	const { showNotification } = useNotification()

	const translateApp = () => {
		API_USER_LOCALE(token, webApp, contextData.appData).then(responseData => {
			updateContextData({ metaData: responseData.metaData, appData: responseData.appData })
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
				{ contextData.metaData.username} | {contextData.appData.uid }
			</span>
			<Button
				before={ <IconTranslate size={6}/> }
				mode="plain" 
				size="medium" 
				style={ { padding: '0 2vw' } }
				onClick={ translateApp }
				haptic={ ["notification", "success"] }
			/>
		</div>
	)
}

export default Header;