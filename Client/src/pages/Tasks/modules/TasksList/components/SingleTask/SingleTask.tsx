import React, { ReactNode, useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../../../../../providers/AuthProvider.tsx';
import { useData } from '../../../../../../providers/DataProvider.tsx';
import { useLocalization } from '../../../../../../providers/LocalizationProvider.tsx';
import { useNotification } from '../../../../../../providers/NotificationProvider.tsx';

// Custom API;
import { API_TASKS_COMPLETE } from '../../../../../../api/api.tasks.complete.js';
import { API_USER_GET } from '../../../../../../api/api.user.get.js';

// Custom components;
import Button from '../../../../../../ui/Button/Button.tsx';

// Included styles;
import './SingleTask.scss';

type Icons = 'telegram';

interface ComponentProps {
	taskData: {
		task_id: number;
		status: boolean;
		icon: Icons;
		name: string;
		description: string;
		link: string;
		award: number;
	},
	completed: boolean;
}

const SingleTask = ({ taskData, completed }: ComponentProps): ReactNode => {
	const { localization } = useLocalization();

	const [completeStatus, setCompleteStatus] = useState(completed);
	const [buttonText, setButtonText] = useState<string>(localization.tasks.buttons.start);

	const { webApp, token } = useAuth();
	const { updateDataContext } = useData();
	const { showNotification } = useNotification();

	const buttonAction = async () => {
		if (buttonText === localization.tasks.buttons.start) {
			webApp.openLink(taskData.link);
			setButtonText(localization.tasks.buttons.claim);
		}
		if (buttonText === localization.tasks.buttons.claim) {
			const lcl = localization.notifications;
			try {
				claimAward();
				showNotification("success", lcl.success, `${lcl.tasks.c} ${taskData.award} tINCH`);
				setCompleteStatus(!completeStatus);
			} catch (error) {
				console.log(error);
				showNotification("error", lcl.error, lcl.tasks.nc);
			}
		}
	}

	const claimAward = async () => {
		try {
			// Get boolean response from server;
			const result = await API_TASKS_COMPLETE(token, webApp, taskData.task_id);
			if (result) {
				try {
					// Update user data in contextData;
					const newContextData = await API_USER_GET(token, webApp);
					updateDataContext(newContextData);
				} catch(error) {
					console.log(error)
				}
			}
		} catch(error) {
			console.log(error);
			throw error;
		}
	}

	// Rerender task after change localization;
	useEffect(() => {
		setButtonText(localization.tasks.buttons.start)
	}, [localization, completeStatus])

	return (
		<div className="task">
			<img className="task__icon" src={`/tasks-icons/${taskData.icon}.svg`} alt="task-icon" />
			<div className="task__body">
				<p className="task__name">{ taskData.name }{ 
					completed ? 
						<span className="completed">{ localization.tasks.labels.c }</span> : 
						<span className="not-completed">{ localization.tasks.labels.nc }</span>
				}</p>
				<p className="task__award">+{ taskData.award } tINCH</p>
			</div>
			<Button
				disabled={ completeStatus }
				mode={ buttonText === localization.tasks.buttons.start ? "white" : "bezeled" }
				size="medium"
				haptic={ ["impact", "soft"] }
				style={ {margin: '0.3vh 0', padding: '0 6vw', fontSize: '2vh'} }
				onClick={ () => !completed && buttonAction() }
			>
				{ buttonText }
			</Button>
		</div>
	)
}

export default SingleTask;