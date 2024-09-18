import React from 'react';

// Custom hooks;
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import Title from '../../ui/Typography/Title/Title.tsx';
import Caption from '../../ui/Typography/Caption/Caption.tsx';

// Included styles;
import '../Page.scss';
import './Tasks.scss';
import Task from './components/Task/Task.tsx';

interface ComponentProps {}

const Tasks = ({}: ComponentProps): JSX.Element => {
	const { localization } = useLocalization()

	return (
		<div className="page" id="tasks">
			<Task status={true} taskId={1} icon="telegram" title="CIS Channel" description="lalalalallalalalal" link="https;//t.me/inch_ton_cis" award={200} />
		</div>
	)
}

export default Tasks;