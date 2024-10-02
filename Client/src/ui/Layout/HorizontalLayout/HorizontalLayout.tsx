import React, { ReactNode } from 'react';

import './HorizontalLayout.scss';

type justifyContent = 'start' | 'center' | 'end';
type alignItems = 'start' | 'center' | 'end';

interface ComponentProps {
	justify: justifyContent;
	align: alignItems;
	gap?: number;
	grow?: number;
	children: any;
}

const HorizontalLayout = ({ justify, align, gap, grow, children }: ComponentProps): ReactNode => {
	return (
		<div className="horizontal-layout"
			style={{
				justifyContent: justify === 'center' ? justify : 'flex-' + justify,
				alignItems: align === 'center' ? align : 'flex-' + align,
				gap: `${gap}px`,
				flexGrow: grow,
			}}
		>
			{children}
		</div>
	)
}

export default HorizontalLayout;