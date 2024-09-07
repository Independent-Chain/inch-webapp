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
			<Title plain level={3} weight={2} color="white" center>{ localization.tasks.title }</Title>
			<Caption color="gray">
				<p style={ {textAlign: 'center'} }>
					{ localization.tasks.cooperation } 
					<a href="https://t.me/inch_support" style={ {color: 'var(--accent-1000'} }>@inch_support</a>
				</p>
			</Caption>
		</div>
	)
}

export default Tasks;