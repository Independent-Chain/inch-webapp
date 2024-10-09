import { ReactNode } from 'react';

// Custom components;
import HorizontalLayout from '@ui/Layout/HorizontalLayout/HorizontalLayout.tsx';

// Included styles;
import './LootTimer.scss';

interface ComponentProps {
	timer: string;
}

const LootTimer = ({ timer }: ComponentProps): ReactNode => {
	return (
		<HorizontalLayout justify="center" align="center">
			<span className="loot-timer">{ timer }</span>
		</HorizontalLayout>
	)
}

export default LootTimer;