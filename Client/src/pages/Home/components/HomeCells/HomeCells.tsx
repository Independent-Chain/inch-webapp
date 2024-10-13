import { ReactNode } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom components;
import Cell from '@ui/Cell/Cell.tsx';

// Included styles;
import './HomeCells.scss';


interface ComponentProps { }

const HomeCells = ({ }: ComponentProps): ReactNode => {
   const { contextData } = useData();
   const { localization } = useLocalization();

   return (
      <div className="home-cells">
         <Cell 
            subhead={ localization.home.balance.subhead } 
            title={ `${contextData.appData.balance.toLocaleString('en-US')}` } 
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