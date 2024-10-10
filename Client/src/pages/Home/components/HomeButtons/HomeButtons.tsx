import { ReactNode, useState } from 'react';

// Custom hooks;
import { useAuth } from '@providers/AuthProvider.tsx';
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';
import { useNotification } from '@providers/NotificationProvider.tsx';

// Custom components;
import Button from '@ui/Button/Button.tsx';

// Custom API;
import { API_MINING_CLAIM } from '@API/api.mining.claim.ts';

// Included styles;
import './HomeButtons.scss';


interface ComponentProps { }

const HomeButtons = ({ }: ComponentProps): ReactNode => {
	const [claimButtonDisableStatus, setClaimButtonDisableStatus] = useState(false)

	const { token, webApp } = useAuth();
	const { updateDataContext } = useData();
	const { localization } = useLocalization();
	const { showNotification } = useNotification();

	const claim = () => {
		setClaimButtonDisableStatus(true);
		setTimeout(() => setClaimButtonDisableStatus(false), 5000);
		API_MINING_CLAIM(token, webApp).then(responseData => {
			showNotification('success', localization.notifications.success, `+ ${responseData.loot.toLocaleString('en-US')} $tINCH`);
			updateDataContext({ metaData: responseData.metaData, appData: responseData.appData });
		}).catch(error => {
			console.log(error);
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

export default HomeButtons;