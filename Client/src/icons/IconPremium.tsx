import React, { ReactNode } from 'react';

// Included styles;
import './Icon.scss';

interface ComponentProps {
	premium: boolean;
	size: number;
}

const IconStar = ({ premium, size }: ComponentProps): ReactNode => {
	return (
		<div className="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width={size+'vw'} height={size+'vw'} fill="none">
				<path d="M733.331 400C733.331 584.093 584.091 733.333 399.997 733.333C215.902 733.333 66.6641 584.093 66.6641 400C66.6641 215.905 215.902 66.6667 399.997 66.6667C584.091 66.6667 733.331 215.905 733.331 400Z" fill={premium ? "#b7cfae" : "#4a4a4a"}/>
				<path d="M347.093 283.271L352.556 273.473C373.666 235.602 384.223 216.667 400.003 216.667C415.783 216.667 426.339 235.602 447.449 273.473L452.913 283.271C458.909 294.032 461.909 299.413 466.586 302.963C471.263 306.514 477.089 307.832 488.739 310.467L499.343 312.867C540.339 322.143 560.836 326.78 565.713 342.463C570.589 358.143 556.616 374.483 528.669 407.167L521.436 415.62C513.496 424.907 509.526 429.55 507.739 435.297C505.953 441.04 506.553 447.237 507.753 459.627L508.846 470.907C513.073 514.51 515.183 536.313 502.416 546.003C489.649 555.697 470.459 546.86 432.076 529.187L422.146 524.613C411.236 519.593 405.783 517.08 400.003 517.08C394.223 517.08 388.769 519.593 377.859 524.613L367.929 529.187C329.547 546.86 310.356 555.697 297.588 546.003C284.821 536.313 286.934 514.51 291.159 470.907L292.252 459.627C293.453 447.237 294.053 441.04 292.267 435.297C290.481 429.55 286.51 424.907 278.568 415.62L271.338 407.167C243.39 374.483 229.416 358.143 234.293 342.463C239.17 326.78 259.667 322.142 300.662 312.867L311.267 310.467C322.917 307.832 328.742 306.514 333.419 302.963C338.096 299.413 341.096 294.032 347.093 283.271Z" fill={premium ? "#1b1b1b" : "#868686"}/>
			</svg>
		</div>
	)
}

export default IconStar;