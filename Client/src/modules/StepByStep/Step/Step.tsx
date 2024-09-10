import React, { useEffect } from 'react';
import './Step.scss';

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

export default Step;