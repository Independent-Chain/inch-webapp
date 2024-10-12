import { ReactNode } from 'react';

// Custom hooks;
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Custom components;
import NavigationElement from './NavigationElement/NavigationElement';

// Included styles;
import './NavigationPanel.scss';


interface ComponentProps { }

const NavigationPanel = ({ }: ComponentProps): ReactNode => {
   const { localization } = useLocalization();

   return (
      <nav className="navigation-panel">
         <NavigationElement path="/" icon="home" text={ localization.home.headline } />
         <NavigationElement path="/upgrades" icon="upgrades" text={ localization.upgrades.headline } />
         <NavigationElement path="/tasks" icon="tasks" text={ localization.tasks.headline } />
         <NavigationElement path="/profile" icon="profile" text={ localization.profile.headline } />
      </nav>
   )
}

export default NavigationPanel;