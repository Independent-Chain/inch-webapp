import { ReactNode } from 'react';

// Included styles;
import './Divider.scss';

interface ComponentProps {

}

const Divider = ({  }: ComponentProps): ReactNode => {
	return (
		<div className="divider"></div>
	)
}

export default Divider;