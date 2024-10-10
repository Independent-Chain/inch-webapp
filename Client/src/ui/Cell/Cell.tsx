import { ReactNode } from 'react';

import IconDiagonalRightArrow from '../../icons/IconDiagonalRightArrow.tsx';

// Included styles;
import './Cell.scss';
import { NavLink } from 'react-router-dom';

interface ComponentProps {
	before?: ReactNode;
	after?: ReactNode;
	subhead?: string;
	title: string;
	titleIcon?: ReactNode;
	subtitle?: string;
	description?: string;
	path?: string;
	url?: string;
}

const Cell = ({ before, after, subhead, title, titleIcon, subtitle, description, path, url }: ComponentProps): ReactNode => {
  const renderContent = () => (
		<div className="cell__body">
			<span className="cell__subhead">{ subhead }</span>
			<span className="cell__title">{ titleIcon }{title}</span>
			<span className="cell__subtitle">{ subtitle }</span>
			<span className="cell__description">{ description }</span>
		</div>
  );

  return (
    <div className="cell">
      { before }
      { url ? (
        <a className="cell__link" onClick={() => window.open(url)}>
          { renderContent() }
					<div className="cell__icon">
						<IconDiagonalRightArrow size={5} />
					</div>
        </a>
      ) : path ? (
        <NavLink className="cell__link" to={ path } style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
          { renderContent() }
					<div className="cell__icon">
						<IconDiagonalRightArrow size={5} />
					</div>
        </NavLink>
      ) : (
				renderContent()
			)}
      { after }
    </div>
  );
}

export default Cell;