import { ReactNode, useEffect } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom components;
import CellDevice from '@p-upgrades/components/UpgradesCell/UpgradesCell.tsx';
import HorizontalLayout from '@ui/Layout/HorizontalLayout/HorizontalLayout.tsx';

// Included styles;
import '@pages/page.scss';


interface ComponentProps { }

const Upgrades = ({ }: ComponentProps): ReactNode => {
   const { data } = useData();
   const { localization } = useLocalization();

   const reactorPrice = 150 * 2.2 ** (data.appData.reactor - 1);
   const storagePrice = 75 * 2.2 ** (data.appData.storage - 1);

   useEffect(() => {}, [localization])

   return (
      <div className="page" id="upgrades">
         <HorizontalLayout justify="center" align="center" gap={6}>
            <CellDevice 
               deviceId="reactor"
               title={ localization.upgrades.reactor.headline }
               description={ localization.upgrades.reactor.description }
               level={ data.appData.reactor }
               parameter={ `${(data.appData.reactor * 0.001 * 3600).toFixed(1)} (${localization.upgrades.reactor.attribute})` }
               price={ reactorPrice }
            />
            <CellDevice 
               deviceId="storage"
               title={ localization.upgrades.storage.headline } 
               description={ localization.upgrades.storage.description }
               level={ data.appData.storage }
               parameter={ `${data.appData.storage} ${localization.upgrades.storage.attribute}` }
               price={ storagePrice }
            />
         </HorizontalLayout>
      </div>
   )
}

export default Upgrades;