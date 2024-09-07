import React from 'react';
import './Loading.scss';

interface ComponentProps {
	text?: string;
}

const Loading = ({ text }: ComponentProps): JSX.Element => {
	return (
		<div className="loading">
			<p className="loading-text">{ text || 'Loading' }</p>
		</div>
	)
}

export default Loading;