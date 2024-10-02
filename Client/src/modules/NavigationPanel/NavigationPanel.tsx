import React, { ReactNode } from 'react';

// Custom hooks;
import { useLocalization } from '../../providers/LocalizationProvider.tsx';

// Custom components;
import NavigationElement from './NavigationElement/NavigationElement';

// Icons;
import IconHome from '../../icons/IconHome.tsx';
import IconUpgrades from '../../icons/IconUpgrades.tsx';
import IconTasks from '../../icons/IconTasks.tsx';
import IconProfile from '../../icons/IconProfile.tsx';

// Included styles;
import './NavigationPanel.scss';

interface ComponentProps {}

const NavigationPanel = ({}: ComponentProps): ReactNode => {
	const { localization } = useLocalization()
	const navigationElementIconSize = 6.5;

	return (
		<nav className="navigation-panel">
			<NavigationElement path="/" icon={ <IconHome size={ navigationElementIconSize } /> } text={ localization.home.headline } />
			<NavigationElement path="/upgrades" icon={ <IconUpgrades size={ navigationElementIconSize } /> }text={ localization.upgrades.headline } />
			<NavigationElement path="/tasks" icon={ <IconTasks size={ navigationElementIconSize } /> } text={ localization.tasks.headline } />
			<NavigationElement path="/profile" icon={ <IconProfile size={ navigationElementIconSize } />} text={ localization.profile.headline } />
		</nav>
	)
}

export default NavigationPanel;