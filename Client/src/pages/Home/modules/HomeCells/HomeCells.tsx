import React from 'react';

// Custom hooks;
import { useLocalization } from '../../../../context/LocaleContext/LocalizationProvider';

// Custom components;
import Cell from '../../../../ui/Cell/Cell';

// Included styles;
import './HomeCells.scss';

interface appData {
	[key: string]: any
}
interface ComponentProps {
	appData: appData;
}

const HomeCells = ({ appData }: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="home-cells">
			<Cell 
				subhead={ localization.home.balance.subhead } 
				title={ `$${appData.balance.toLocaleString('en-US')}` } 
				description={ localization.home.balance.description }/>
			<Cell 
				subhead={ localization.home.booster.subhead }  
				title={ localization.home.booster.title } 
				description={ localization.home.booster.description }/>
			<Cell 
				title={ localization.home.collection.title } 
				description={ localization.home.collection.description } 
				url="https://getgems.io"/>
		</div>
	)
}

export default HomeCells;