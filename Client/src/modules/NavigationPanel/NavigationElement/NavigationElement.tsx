import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Custom helpers;
import { renderSvgIcon } from '@modules/NavigationPanel/helpers/renderIcon.tsx';

// Included styles;
import './NavigationElement.scss';

interface ComponentProps {
	path: string;
	icon: string;
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="3.5vh" height="3.5vh" color="#000000" fill="none">
               { renderSvgIcon(icon) }
            </svg>
            <span className="navigation-element__text">{ text }</span>
         </NavLink>
      </div>
   )
}

export default NavigationElement;