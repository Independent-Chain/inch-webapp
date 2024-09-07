import React from 'react';

// Custom hooks;
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import CellDevice from './components/CellDevice/CellDevice.tsx';

// Included styles;
import '../page.scss';

interface ComponentProps {}

const Upgrades = ({}: ComponentProps): JSX.Element => {
	const { contextData } = useAuth()
	const { localization } = useLocalization()

	const reactorPrice = 150 * 2.2 ** (contextData.appData.reactor - 1)
	const storagePrice = 75 * 2.2 ** (contextData.appData.storage - 1)

	return (
		<div className="page" id="upgrades">
			<CellDevice 
				deviceId="reactor"
				headline={ localization.upgrades.reactor.headline }
				description={ localization.upgrades.reactor.description }
				level={ contextData.appData.reactor }
				attribute={ `${(contextData.appData.reactor * 0.001 * 3600).toFixed(2)}/${localization.upgrades.reactor.attribute}` }
				price={ reactorPrice }
			/>
			<CellDevice 
				deviceId="storage"
				headline={ localization.upgrades.storage.headline } 
				description={ localization.upgrades.storage.description }
				level={ contextData.appData.storage }
				attribute={ `${contextData.appData.storage} ${localization.upgrades.storage.attribute}` }
				price={ storagePrice }
			/>
		</div>
	)
}

export default Upgrades;