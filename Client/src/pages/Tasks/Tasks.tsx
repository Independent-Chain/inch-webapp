// @ts-nocheck
import React, { useEffect, useState } from 'react';

// Custom hooks;
import { useAuth } from '../../context/AuthContext/AuthProvider.tsx';

// Custom components;
import Loading from '../../components/Loading/Loading.tsx';
import TasksList from './modules/TasksList/TasksList.tsx';

// Custom API;
import { getTasks } from '../../api/api.get-tasks.js';

// Included styles;
import '../Page.scss';
import './Tasks.scss';

interface ComponentProps {}

const Tasks = ({}: ComponentProps): JSX.Element => {
	const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

	const { webApp, token, contextData } = useAuth();

	const loadTasks = async () => {
		try {
			const response = await getTasks(token, webApp);
			contextData.tasks = response;
			setLoadingStatus(false)
		} catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
    loadTasks();
  }, [token]);

	if (loadingStatus) {
		return <Loading text="Loading tasks" />
	}

	return (
		<div className="page" id="tasks">
			<TasksList />
			<p className="tasks__information">
				На данный момент мы открыты для предложений. Для сотрудничества с Independent Chain свяжитесь с поддержкой проекта: <a href="https://t.me/inch_support" style={{color: 'var(--accent-1000'}}>@inch_support</a>
			</p>
		</div>
	)
}

export default Tasks;