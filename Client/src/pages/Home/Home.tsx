import React, { ReactNode } from 'react';

// Custom hooks;
import { useData } from '../../providers/DataProvider.tsx';

// Custom modules;
import MiningCounter from './modules/MiningCounter/MiningCounter.tsx';
import ActionButtons from './modules/ActionButtons/ActionButtons.tsx';
import HomeCells from './modules/HomeCells/HomeCells.tsx';

// Included styles;
import '../Page.scss';

const Home = ({}): ReactNode => {
	const { contextData } = useData()

	return (
		<div className="page" id="home">
			<MiningCounter appData={ contextData.appData } />
			<ActionButtons />
			<HomeCells appData={ contextData.appData } />
		</div>
	)
}

export default Home;