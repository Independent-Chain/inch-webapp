import React from 'react';

// Custom components;
import HorizontalLayout from '../../../../../../ui/Layout/HorizontalLayout/HorizontalLayout.tsx';

// Included styles;
import './LootTimer.scss';

interface ComponentProps {
	timer: string;
}

const LootTimer = ({ timer }: ComponentProps): JSX.Element => {
	return (
		<HorizontalLayout justify="center" align="center">
			<span className="loot-timer">{ timer }</span>
		</HorizontalLayout>
	)
}

export default LootTimer;