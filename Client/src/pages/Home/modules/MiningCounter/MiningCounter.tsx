import { ReactNode, useEffect, useState } from 'react';

// Custom components;
import Loot from './components/Loot/Loot.tsx';
import LootTimer from './components/LootTimer/LootTimer.tsx';

// Custom helpers;
import calculateLoot from './helpers/calculateLoot.ts';
import calculateLootTimer from './helpers/calculateLootTimer.ts';

// Included styles;
import './MiningCounter.scss';

interface appData {
	[key: string]: any;
}
interface ComponentProps {
	appData: appData;
}

const Mining = ({ appData }: ComponentProps): ReactNode => {
	const [loot, setLoot] = useState<number>(0);
	const [timer, setTimer] = useState<string>('loading');

	const updateMining = () => {
		setLoot(calculateLoot(appData.last_claim_time, appData.reactor, appData.storage));
		setTimer(calculateLootTimer(appData.last_claim_time, appData.storage));
	}

	useEffect(() => {
		updateMining();

		const miningIntervalId = setInterval(() => {
			updateMining();
		}, 1000) 
		
		return () => clearInterval(miningIntervalId);
	}, [appData])

	return (
		<div className="mining">
			<Loot loot={ loot } />
			<LootTimer timer={ timer } />
		</div>
	)
}

export default Mining;