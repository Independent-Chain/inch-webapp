import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

// Custom components;
import Icon from '@ui/Icon/Icon.tsx';

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
	path?: string;
	url?: string;
}

const Cell = ({ before, after, subhead, title, titleIcon, subtitle, description, path, url }: ComponentProps): ReactNode => {
  const renderContent = () => (
		<>
			<div className="cell__body">
				{
					subhead ? (
						<span className="cell__subhead">{ subhead }</span>
					) : null
				}
				{
					title ? (
						<span className="cell__title">{ titleIcon }{title}</span>
					) : null
				}
				{
					subtitle ? (
						<span className="cell__subtitle">{ subtitle }</span>
					) : null
				}
				{
					description ? (
						<span className="cell__description">{ description }</span>
					) : null
				}
			</div>
			{
				url || path ? (
					<Icon name="arrow-up-right-stroke-rounded" size={3.25} unit="vh" color="white" />
				) : null
			}
		</>
  );

  return (
    <div className="cell">
      { before }
      { url ? (
        <a className="cell__link" onClick={() => window.open(url)}>
          { renderContent() }
        </a>
      ) : path ? (
        <NavLink className="cell__link" to={ path } style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
          { renderContent() }
        </NavLink>
      ) : (
				renderContent()
			)}
      { after }
    </div>
  );
}

export default Cell;