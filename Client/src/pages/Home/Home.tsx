import { ReactNode } from 'react';

// Custom modules;
import HomeMining from '@pages/Home/components/HomeMining/HomeMining';
import HomeButtons from '@p-home/components/HomeButtons/HomeButtons.tsx';
import HomeCells from '@p-home/components/HomeCells/HomeCells.tsx';

// Included styles;
import '@pages/page.scss';


interface ComponentProps { }

const Home = ({ }: ComponentProps): ReactNode => {
	return (
		<div className="page" id="home">
			<HomeMining />
			<HomeButtons />
			<HomeCells />
		</div>
	)
}

export default Home;