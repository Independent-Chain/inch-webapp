import React, { ReactNode, useState } from 'react';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Custom helpers;
import { createHapticFeedback } from './hapticFeedback.js';
import { buttonAnimation } from './buttonAnimation.js';

// Included styles;
import './Button.scss';

type Modes = 'bezeled' | 'filled' | 'gray' | 'outline' | 'plain' | 'white';
type Sizes = 'small' | 'medium' | 'large';

type HapticTypes = 'impact' | 'notification' | 'selection';
type ImpactStyles = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type NotificationStyles = 'error' | 'success' | 'warning';
export type Haptic = [HapticTypes, ImpactStyles | NotificationStyles]

interface ComponentProps {
	disabled?: boolean;
	mode: Modes;
	size: Sizes;
	before?: ReactNode;
	after?: ReactNode;
	onClick: () => void;
	haptic?: Haptic;
	children?: string;
	style?: Object;
}

const Button = ({ disabled, mode, before, size, children, after, haptic, onClick, style }: ComponentProps): ReactNode => {
   const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();
   const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      buttonAnimation(e, setPosition);
      haptic && createHapticFeedback(haptic, impactOccurred, notificationOccurred, selectionChanged);
      onClick();
   }

   return (
      <button disabled={disabled} className={`${mode} ${size}`} onClick={handleClick} style={style}>
         {
            position && (
               <span
                  className="ripple"
                  style={{
                     left: position.x,
                     top: position.y,
                  }}
               />
      	)
         }
         { before }
         { children }
         { after }
      </button>
   )
}

export default Button;