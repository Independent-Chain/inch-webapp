import React from 'react';
import './Loading.scss';

interface ComponentProps {

}

const Loading = ({  }: ComponentProps): JSX.Element => {
	return (
		<div className="loading">
			<p className="loading-text">Loading</p>
		</div>
	)
}

export default Loading;