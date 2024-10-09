// Custom types;
import { Haptic } from '@ui/Button/Button.tsx';

// Type of haptic event. Values:
//     impact, when there's a collision involving UI components.
//     notification, when some action execution has been completed.
//     selection_change, when the user changes their selection. 

// impactStyle Required when type is impact. Values:
//     light, indicates a collision between small or lightweight UI objects
//     medium, indicates a collision between medium-sized or medium-weight UI objects
//     heavy, indicates a collision between large or heavyweight UI objects
//     rigid, indicates a collision between hard or inflexible UI objects
//     soft, indicates a collision between soft or flexible UI objects 

// notificationStyle Required when type is notification. Values:
//     error, indicates that a task or action has failed
//     success, indicates that a task or action has completed successfully
//     warning, indicates that a task or action produced a warning 

export const createHapticFeedback = (haptic: Haptic, impactOccurred: Function, notificationOccurred: Function, selectionChanged: Function) => {
	const hapticType = haptic[0]
	const hapticStyle = haptic[1] || null

	if (hapticType === 'impact') {
		switch (hapticStyle) {
			case 'light':
				return impactOccurred('light')
			case 'medium':
				return impactOccurred('medium')
			case 'heavy':
				return impactOccurred('heavy')
			case 'rigid':
				return impactOccurred('rigid')
			case 'soft':
				return impactOccurred('soft')
		}
	}

	if (hapticType === 'notification') {
		switch (hapticStyle) {
			case 'error':
				return notificationOccurred('error')
			case 'success':
				return notificationOccurred('success')
			case 'warning':
				return notificationOccurred('warning')
		}
	}

	if (hapticType === 'selection') {
		return selectionChanged();
	}
}