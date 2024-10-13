import { ReactNode } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom components;
import Icon from '@ui/Icon/Icon.tsx';

// Included styles;
import './Header.scss';

interface ComponentProps {}

const Header = ({ }: ComponentProps): ReactNode => {
   const { data } = useData();
   const { localization } = useLocalization();

   return (
      <div className="header">
         <Icon 
            name={ data.appData.premium ? 'premium-true' : 'premium-false' }
            size={3.3} 
            unit="vh" 
         />
         <span className="logo">
            { data.metaData.username}.inch
         </span>
         <div className="ton-connect">
            <Icon name="ton" size={2} unit="vh" />
            <span className="ton-connect__text">{ localization.header.soon }</span>
         </div>
      </div>
   )
}

export default Header;