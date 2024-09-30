import React, { useEffect, useState } from 'react';

// Included styles;
import './MobileSplashScreen.scss';

interface ComponentProps {

}

const SplashScreen = ({  }: ComponentProps): JSX.Element => {
	const [title1, setTitle1] = useState('')
	const [title2, setTitle2] = useState('')

	const generateText = (length: number) => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters[randomIndex];
		}
		return result;
	}

	useEffect(() => {
    // @ts-ignore
    const timeouts: NodeJS.Timeout[] = []
    
    for (let i = 0; i < 40; i++) {
      const timeoutId = setTimeout(() => {
        setTitle1(generateText(11))
        setTitle2(generateText(5))
      }, (i + 1) * 50);

      timeouts.push(timeoutId)
    }

    const finalTimeout = setTimeout(() => {
      setTitle1('Independent')
      setTitle2('Chain')
    }, 2001); 

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      clearTimeout(finalTimeout)
    };
  }, []);

	return (
		<div className="splash-screen">
			<p className="splash-screen__title first">{title1}</p>
			<p className="splash-screen__title second">{title2}</p>
		</div>
	)
}

export default SplashScreen;