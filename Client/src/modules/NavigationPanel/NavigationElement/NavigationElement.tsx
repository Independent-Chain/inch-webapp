import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Included styles;
import './NavigationElement.scss';

interface ComponentProps {
	path: string;
	icon: ReactNode;
	text: string;
}

const NavigationElement = ({ path, icon, text }: ComponentProps): ReactNode => {
	const [impactOccurred] = useHapticFeedback();

	return (
		<div className="navigation-element">
			<NavLink
				to={ path } 
				className={ ({ isActive }) => isActive ? 'active' : 'inactive' } 
				onClick={() => impactOccurred('light')}
			>
				{icon}
				<span className="navigation-element__text">{ text }</span>
			</NavLink>
		</div>
	)
}

export default NavigationElement;