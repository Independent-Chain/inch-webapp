import { ReactNode } from 'react';

import IconDiagonalRightArrow from '../../icons/IconDiagonalRightArrow.tsx';

// Included styles;
import './Cell.scss';

interface ComponentProps {
	before?: ReactNode;
	after?: ReactNode;
	subhead?: string;
	title: string;
	titleIcon?: ReactNode;
	subtitle?: string;
	description?: string;
	url?: string;
}

const Cell = ({ before, after, subhead, title, titleIcon, subtitle, description, url }: ComponentProps): ReactNode => {
	return (
		<div className="cell">
			{before}
			<div className="cell__body">
				<span className="cell__subhead">{subhead}</span>
				<span className="cell__title">{titleIcon}{title}</span>
				<span className="cell__subtitle">{subtitle}</span>
				<span className="cell__description">{description}</span>
			</div>
			{after}
			{url && (
					<a className="cell__link" onClick={() => window.open(url)}>
						<IconDiagonalRightArrow size={5} />
					</a>
			)}
		</div>
	)
}

export default Cell;