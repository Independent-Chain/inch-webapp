import { ReactNode } from 'react';

// Custom hooks;
import { useData } from '@providers/DataProvider.tsx';
import { useLocalization } from '@providers/LocalizationProvider.tsx';

// Icons;
import IconStar from '@icons/IconPremium.tsx';
import IconTon from '@icons/IconTon.tsx';

// Included styles;
import './Header.scss';

interface ComponentProps {}

const Header = ({ }: ComponentProps): ReactNode => {
	const { contextData } = useData();
	const { localization } = useLocalization();

	return (
		<div className="header">
			<IconStar premium={ contextData.appData.premium } size={6} />
			<span className="logo">
				{ contextData.metaData.username}.inch
			</span>
			<div className="ton-connect">
				<IconTon size={3} />
				<span className="ton-connect__text">{ localization.header.soon }</span>
			</div>
		</div>
	)
}

export default Header;