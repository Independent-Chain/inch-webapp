import React, { ReactNode } from 'react';

// Custom hooks;
import { useData } from '../../providers/DataProvider.tsx';
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom components;
import CellDevice from './components/CellDevice/CellDevice.tsx';

// Included styles;
import '../page.scss';
import HorizontalLayout from '../../ui/Layout/HorizontalLayout/HorizontalLayout.tsx';

interface ComponentProps {}

const Upgrades = ({}: ComponentProps): ReactNode => {
	const { contextData } = useData();
	const { localization } = useLocalization();

	const reactorPrice = 150 * 2.2 ** (contextData.appData.reactor - 1);
	const storagePrice = 75 * 2.2 ** (contextData.appData.storage - 1);

	return (
		<div className="page" id="upgrades">
			<HorizontalLayout justify="center" align="center" gap={6}>
				<CellDevice 
					deviceId="reactor"
					title={ localization.upgrades.reactor.headline }
					description={ localization.upgrades.reactor.description }
					level={ contextData.appData.reactor }
					parameter={ `${(contextData.appData.reactor * 0.001 * 3600).toFixed(1)} (${localization.upgrades.reactor.attribute})` }
					price={ reactorPrice }
				/>
				<CellDevice 
					deviceId="storage"
					title={ localization.upgrades.storage.headline } 
					description={ localization.upgrades.storage.description }
					level={ contextData.appData.storage }
					parameter={ `${contextData.appData.storage} ${localization.upgrades.storage.attribute}` }
					price={ storagePrice }
				/>
			</HorizontalLayout>
		</div>
	)
}

export default Upgrades;