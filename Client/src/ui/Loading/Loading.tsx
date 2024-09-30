import React from 'react';
import './Loading.scss';

interface ComponentProps {
	text?: string;
}

const Loading = ({ text }: ComponentProps): JSX.Element => {
	return (
		<div className="loading">
			<p className="loading-text">{ text }</p>
			<span className="loader"></span>
		</div>
	)
}

export default Loading;