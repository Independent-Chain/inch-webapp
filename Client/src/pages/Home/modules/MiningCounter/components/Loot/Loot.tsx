import React from 'react';
import MotionNumber from 'motion-number';
import { easeOut } from 'framer-motion';

// Custom components;
import HorizontalLayout from '../../../../../../ui/Layout/HorizontalLayout/HorizontalLayout.tsx';

// Included styles;
import './Loot.scss';

interface ComponentProps {
	loot: number;
}

const Loot = ({ loot }: ComponentProps): JSX.Element => {
	return (
		<HorizontalLayout justify="center" align="center">
			<MotionNumber
				style={{ lineHeight: 0.8 }}
				value={loot}
				format={{ notation: "standard" }}
				locales="en-US"
				transition={{
					layout: { type: 'spring', duration: 0.7, bounce: 0 },
					y: { type: 'spring', duration: 0.7, bounce: 0.25 },
					opacity: { duration: 0.7, ease: easeOut, times: [0, 0.3] }
				}}
			/>
		</HorizontalLayout>
	)
}

export default Loot;