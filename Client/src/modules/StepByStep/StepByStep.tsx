import React, { useEffect, useState } from 'react';
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

// Included styles;
import './StepByStep.scss';

interface StepProps {
	title: string;
	imageNumber: number;
}

const Step = ({ title, imageNumber }: StepProps): JSX.Element => {
	useEffect(() => {}, [title, imageNumber])

  return (
    <div className="step">
      <p className="step-title">{ title }</p>
      <img src={`./steps/step${imageNumber}.png`} alt="" className="step-image" />
    </div>
  );
};

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

	const nextStep = () => {
		impactOccurred('light')

		if (step < 4) {
			setStep(step + 1)
		} else if (step == 4) {
			const steps = document.getElementsByClassName('step-by-step')
			steps[0]?.classList.add('hide-steps')
			setTimeout(() => {
				loading(false)
			}, 1000)
		}
	}

	useEffect(() => {
		const indicators = document.getElementsByClassName('indicator')

		for(let i = 0; i <= Math.min(indicators.length, step); i++) {
			indicators[i].classList.add('active-indicator')
		}

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