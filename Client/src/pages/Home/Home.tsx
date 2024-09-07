import React from 'react';

// Custom hooks;
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';

// Custom modules;
import Mining from './modules/Mining/Mining.tsx';
import ActionButtons from './modules/ActionButtons/ActionButtons.tsx';
import HomeCells from './modules/HomeCells/HomeCells.tsx';

// Included styles;
import '../Page.scss';

const Home = ({}): JSX.Element => {
	const { contextData } = useAuth()

	return (
		<div className="page" id="home">
			<Mining appData={contextData.appData} />
			<ActionButtons />
			<HomeCells appData={contextData.appData} />
		</div>
	)
}

export default Home;