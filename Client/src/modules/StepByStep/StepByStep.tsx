import React, { useEffect, useState } from 'react';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Custom components;
import Step from './Step/Step.tsx';

// Included styles;
import './StepByStep.scss';

interface ComponentProps {
	loading: any;
}

const StepByStep = ({ loading }: ComponentProps): JSX.Element => {
	const [step, setStep] = useState(0)
	const [buttonText, setButtonText] = useState('Next step')

	const [impactOccurred] = useHapticFeedback();

	const titles: Array<string> = [
		'Claim when there is enough loot in your storage',
		'Get $tINCH for participating in the mining program',
		'Upgrade devices for your accumulated $tINCH',
		'Improve mining by upgrading reactor and storage',
		'Share this app with friends for get reward'
	]

	const colorIndicators = () => {
		const indicators = document.getElementsByClassName('indicator')
		for(let i = 0; i <= Math.min(indicators.length, step); i++) {
			indicators[i].classList.add('active-indicator')
		}
	}

	const hideSteps = () => {
		const steps = document.getElementsByClassName('step-by-step')
		steps[0]?.classList.add('hide-steps')
		setTimeout(() => {
			loading(false)
		}, 1000)
	}

	const nextStep = () => {
		impactOccurred('light')
		if (step < 4) {
			setStep(step + 1)
		} else if (step == 4) {
			hideSteps()
		}
	}

	useEffect(() => {
		colorIndicators()
		if (step == 4) {
			setButtonText('Become a part of inch community')
		}
	}, [step])

	return (
		<div className='step-by-step'>
			<Step title={ titles[step] } imageNumber={ step } />
			<div className="steps-indicators">
				<div className="indicator"></div>
				<div className="indicator"></div>
				<div className="indicator"></div>
				<div className="indicator"></div>
				<div className="indicator"></div>
			</div>
			<button className='next-step' onClick={ nextStep }>{ buttonText }</button>
		</div>
	)
}

export default StepByStep;