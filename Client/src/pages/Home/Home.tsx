import { ReactNode } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';

// Custom modules;
import MiningCounter from '@p-home/modules/MiningCounter/MiningCounter.tsx';
import ActionButtons from '@p-home/modules/ActionButtons/ActionButtons.tsx';
import HomeCells from '@p-home/modules/HomeCells/HomeCells.tsx';

// Included styles;
import '@pages/page.scss';

const Home = ({}): ReactNode => {
	const { contextData } = useData()
;
	return (
		<div className="page" id="home">
			<MiningCounter appData={ contextData.appData } />
			<ActionButtons />
			<HomeCells appData={ contextData.appData } />
		</div>
	)
}

export default Home;