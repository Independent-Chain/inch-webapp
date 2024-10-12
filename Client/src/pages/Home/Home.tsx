import { ReactNode, useEffect, useState } from 'react';

// Custom modules;
import HomeMining from '@pages/Home/components/HomeMining/HomeMining';
import HomeButtons from '@p-home/components/HomeButtons/HomeButtons.tsx';
import HomeCells from '@p-home/components/HomeCells/HomeCells.tsx';

// Included styles;
import '@pages/page.scss';
import { API_USER_GET } from '@API/api.user.get';
import { useAuth } from '@providers/AuthProvider';
import { useData } from '@providers/DataProvider';
import Loading from '@ui/Loading/Loading';


interface ComponentProps { }

const Home = ({ }: ComponentProps): ReactNode => {
   const [loading, setLoading] = useState(true);

   const { webApp, token } = useAuth();
   const { updateDataContext } = useData();

   useEffect(() => {
      getUser();
   }, [])

   const getUser = async () => {
      try {
         const response = await API_USER_GET(token, webApp);
    	updateDataContext(response);
         setLoading(false);
      } catch (error) {
         console.log('[Home] Get user error: ', error);
      }
   }

   if (loading) return <Loading />

   return (
      <div className="page" id="home">
         <HomeMining />
         <HomeButtons />
         <HomeCells />
      </div>
   )
}

export default Home;