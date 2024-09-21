import React, { useEffect } from 'react';

// Custom hooks;
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';
import { useLocalization } from '../../context/LocaleContext/LocalizationProvider.tsx';

// Custom components;
import Title from '../../ui/Typography/Title/Title.tsx';
import Caption from '../../ui/Typography/Caption/Caption.tsx';

// Custom API;
import { getTasks } from '../../api/api.get-tasks.js';

// Included styles;
import '../Page.scss';
import './Tasks.scss';

interface ComponentProps {}

const Tasks = ({}: ComponentProps): JSX.Element => {
	const { token, webApp, contextData, updateContextData } = useAuth();
	const { localization } = useLocalization();

	useEffect(() => {
		const loadTasks = async () => {
			try {
				const response = await getTasks(token);
				contextData.tasksData = response;
			} catch(error) {
				console.log(error)
			}
		}

		loadTasks()
	}, [token])

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