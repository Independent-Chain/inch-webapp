import { ReactNode } from 'react';

// Custom hooks;
import { useLocalization } from '@providers/LocalizationProvider';

// Custom components;
import Cell from '@ui/Cell/Cell';

// Included styles;
import './HomeCells.scss';

interface appData {
	[key: string]: any;
}

interface ComponentProps {
	appData: appData;
}

const HomeCells = ({ appData }: ComponentProps): ReactNode => {
	const { localization } = useLocalization();

	return (
		<div className="home-cells">
			<Cell 
				subhead={ localization.home.balance.subhead } 
				title={ `${appData.balance.toLocaleString('en-US')}` } 
				titleIcon={<img src="/coin.png" alt="" style={{width: '2vh', marginRight: '4px'}} />}
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