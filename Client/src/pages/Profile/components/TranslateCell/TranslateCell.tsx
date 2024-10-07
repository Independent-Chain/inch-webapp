import React, { useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../../../providers/AuthProvider';
import { useData } from '../../../../providers/DataProvider';
import { useLocalization } from '../../../../providers/LocalizationProvider';
import { useNotification } from '../../../../providers/NotificationProvider';

// Custom API;
import { API_USER_LOCALE } from '../../../../api/api.user.locale';

// Custom components;
import Cell from '../../../../ui/Cell/Cell';

// Included styles;
import './TranslateCell.scss';

interface ComponentProps {}

const TranslateCell = ({}: ComponentProps): JSX.Element => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	const { webApp, token } = useAuth();
	const { contextData, updateDataContext } = useData();
	const { language, localization, updateLocalization } = useLocalization();
	const { showNotification } = useNotification();

	useEffect(() => {
		if (!isFirstRender) {
			showNotification('success', localization.notifications.success, localization.notifications.translated)
		} else {
			setIsFirstRender(false)
		}
	}, [localization])

	const translateApp = () => {
		API_USER_LOCALE(token, webApp, contextData.appData).then(responseData => {
			updateDataContext({ metaData: responseData.metaData, appData: responseData.appData })
			updateLocalization(responseData.appData.locale)
		}).catch(error => {
			alert(error)
		})
	}

	return (
		<div className="translate-cell" onClick={translateApp}>
			<Cell 
				before={
					<img className="tc__icon" src={`/${language}.svg`} alt="" />
				}
				title="Translate app"
				after={
					<img className="tc__icon" id="arrow" src="/ui-icons/arrow-right-rounded.svg" alt="" />
				}
			/>
		</div>
		// <div className="translate-cell">
		// 	<img className="tc__flag" src={`/${language}.svg`} alt="" />
		// </div>
	)
}

export default TranslateCell;