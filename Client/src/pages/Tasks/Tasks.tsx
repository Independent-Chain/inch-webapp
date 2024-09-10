import React from 'react';

// Custom hooks;
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import Title from '../../ui/Typography/Title/Title.tsx';
import Caption from '../../ui/Typography/Caption/Caption.tsx';

// Included styles;
import '../Page.scss';
import './Tasks.scss';

interface ComponentProps {}

const Tasks = ({}: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="page" id="tasks">
			<p className="tasks-title">{ localization.tasks.title }</p>
			<p className="tasks-description" style={ {textAlign: 'center'} }>
				{ localization.tasks.cooperation } 
				<a href="https://t.me/inch_support" style={ {color: 'var(--accent-1000'} }>@inch_support</a>
			</p>
		</div>
	)
}

export default Tasks;