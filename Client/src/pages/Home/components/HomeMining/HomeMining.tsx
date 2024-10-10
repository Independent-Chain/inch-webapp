import { ReactNode, useEffect, useState } from 'react';
import { easeOut } from 'framer-motion';

// Custom hooks;
import { useData } from '@providers/DataProvider';

// Custom helpers;
import MotionNumber from 'motion-number';
import calculateLoot from '@p-home/helpers/calculateLoot.ts';
import calculateLootTimer from '@p-home/helpers/calculateLootTimer.ts';
import HorizontalLayout from '@ui/Layout/HorizontalLayout/HorizontalLayout';

// Included styles;
import './HomeMining.scss';


interface ComponentProps { }

const Mining = ({ }: ComponentProps): ReactNode => {
	const [loot, setLoot] = useState<number>(0);
	const [timer, setTimer] = useState<string>('loading');

	const { contextData } = useData();

	const updateMining = () => {
		setLoot(calculateLoot(contextData.appData.last_claim_time, contextData.appData.reactor, contextData.appData.storage));
		setTimer(calculateLootTimer(contextData.appData.last_claim_time, contextData.appData.storage));
	}

	useEffect(() => {
		updateMining();

		const miningIntervalId = setInterval(() => {
			updateMining();
		}, 1000) 
		
		return () => clearInterval(miningIntervalId);
	}, [contextData.appData])

	return (
		<div className="mining">
			<HorizontalLayout justify="center" align="center">
				<MotionNumber
					style={{ lineHeight: 0.8 }}
					value={ loot }
					format={{ notation: "standard" }}
					locales="en-US"
					transition={{
						layout: { type: 'spring', duration: 0.7, bounce: 0 },
						y: { type: 'spring', duration: 0.7, bounce: 0.25 },
						opacity: { duration: 0.7, ease: easeOut, times: [0, 0.3] }
					}}
				/>
			</HorizontalLayout>
			<HorizontalLayout justify="center" align="center">
				<span className="loot-timer">{ timer }</span>
			</HorizontalLayout>
		</div>
	)
}

export default Mining;