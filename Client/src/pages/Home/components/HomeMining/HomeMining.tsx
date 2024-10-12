import { ReactNode, useEffect, useState } from 'react';
import { AnimatedCounter } from 'react-animated-counter';

// Custom hooks;
import { useData } from '@providers/DataProvider';

// Custom helpers;
import calculateLoot from '@p-home/helpers/calculateLoot.ts';
import calculateLootTimer from '@p-home/helpers/calculateLootTimer.ts';
import HorizontalLayout from '@ui/Layout/HorizontalLayout/HorizontalLayout';

// Included styles;
import './HomeMining.scss';


interface ComponentProps { }

const Mining = ({ }: ComponentProps): ReactNode => {
   const [loot, setLoot] = useState<number>(0);
   const [time, setTime] = useState<string>('loading');

   const { contextData } = useData();

   useEffect(() => {
      updateMining();
      const miningIntervalId = setInterval(updateMining, 1000); 
      return () => clearInterval(miningIntervalId);
   }, [contextData.appData]);

   const updateMining = () => {
      const newLoot = calculateLoot(contextData.appData.last_claim_time, contextData.appData.reactor, contextData.appData.storage);
      const newTimer = calculateLootTimer(contextData.appData.last_claim_time, contextData.appData.storage);

      if (newLoot !== loot) setLoot(newLoot);
      if (newTimer !== time) setTime(newTimer);
   }

   return (
      <div className="mining">
         <HorizontalLayout justify="center" align="center" >
            <AnimatedCounter 
               value={ loot } 
               includeCommas
               decimalPrecision={3}
               color="white" 
               fontSize="45px"
               incrementColor="#ffffff"
               decrementColor="#ffffff"
               containerStyles={{
                  fontFamily: 'var(--font)',
               }}

            />
         </HorizontalLayout>
         <HorizontalLayout justify="center" align="center">
            <span className="mining__timer">{ time }</span>
         </HorizontalLayout>
      </div>
   );
}

export default Mining;