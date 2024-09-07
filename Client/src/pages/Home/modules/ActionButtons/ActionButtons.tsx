import React, { useState } from 'react';

// Custom hooks;
import { useAuth } from '../../../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../../../context/LocaleContext/LocalizationProvider.tsx';
import { useNotification } from '../../../../context/NotificationContext/NotificationProvider.tsx';

// Custom components;
import Button from '../../../../ui/Button/Button.tsx';

// Custom API;
import { getClaim } from '../../../../api/api.claim.js';

// Included styles;
import './ActionButtons.scss';

interface ComponentProps {}

const ActionButtons = ({}: ComponentProps): JSX.Element => {
	const [claimButtonDisableStatus, setClaimButtonDisableStatus] = useState(false)

	const { token, webApp, updateContextData } = useAuth()
	const { localization } = useLocalization()
	const showNotification = useNotification()

	const claim = () => {
		setClaimButtonDisableStatus(true)
		setTimeout(() => setClaimButtonDisableStatus(false), 5000) // Claim timeout;
		getClaim(token, webApp).then(responseData => {
			showNotification('success', localization.notifications.success, `+ ${responseData.loot.toLocaleString('en-US')} $tINCH`)
			updateContextData({ metaData: responseData.metaData, appData: responseData.appData })
		}).catch(error => {
			alert(error) // Debug alert;
		})
	}

	return (
		<div className="home-action-buttons">
			<Button 
				disabled 
				mode="white" 
				size="medium" 
				style={ {flex: 1} } 
				onClick={ () => console.log('swap') }
			>
				{ localization.home.action_buttons.swap }
			</Button>
			<Button
				disabled={ claimButtonDisableStatus }
				mode="white"
				size="medium"
				haptic={ ["notification", "success"] }
				style={ {flex:1 } }
				onClick={ () => claim() }
			>
				{ localization.home.action_buttons.claim }
			</Button>
			<Button 
				disabled
				mode="white"
				size="medium"
				style={ {flex: 1} }
				onClick={() => console.log('burn')}
			>
				{ localization.home.action_buttons.burn }
			</Button>
		</div>
	)
}

export default ActionButtons;