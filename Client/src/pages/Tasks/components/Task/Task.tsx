import React, { useState } from 'react';
import './Task.scss';

interface ComponentProps {
	status: boolean;
	taskId: number;
	icon: string;
	title: string;
	description: string;
	link: string;
	award: number;
}

const Task = ({ status, taskId, icon, title, description, link, award }: ComponentProps): JSX.Element => {
	

	return (
		<div className="task" id={`${taskId}`}>
			<div className="">
				<img src={`/icons/tasks/${icon}.svg`} alt="" className="task-icon" />
			</div>
			<div style={{ flexGrow: 1 }}>
				<p className="task-title">{ title }</p>
				<p className="task-description">{ description }</p>
			</div>
			<div>
				<button className="task-button">Start</button>
			</div>
		</div>
	)
}

export default Task;