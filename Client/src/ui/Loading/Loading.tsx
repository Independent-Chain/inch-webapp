import React, { ReactNode } from 'react';
import './Loading.scss';

interface ComponentProps {
	text?: string;
}

const Loading = ({ text }: ComponentProps): ReactNode => {
	return (
		<div className="loading">
			<p className="loading-text">{ text }</p>
			<span className="loader"></span>
		</div>
	)
}

export default Loading;