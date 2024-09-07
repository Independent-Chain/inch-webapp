import React from 'react';

// Custom hooks;
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

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

const NavigationPanel = ({}: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()
	const navigationElementIconSize = 6.5;

	return (
		<nav className="navigation-panel">
			<NavigationElement path="/" icon={ <IconHome size={ navigationElementIconSize } /> } text={ localization.navigation.home } />
			<NavigationElement path="/upgrades" icon={ <IconUpgrades size={ navigationElementIconSize } /> }text={ localization.navigation.upgrades } />
			<NavigationElement path="/tasks" icon={ <IconTasks size={ navigationElementIconSize } /> } text={ localization.navigation.tasks } />
			<NavigationElement path="/profile" icon={ <IconProfile size={ navigationElementIconSize } />} text={ localization.navigation.profile } />
		</nav>
	)
}

export default NavigationPanel;