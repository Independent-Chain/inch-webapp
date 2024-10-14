import { ReactNode, useEffect, useState } from 'react';

// Custom modules;
import Loading from '@ui/Loading/Loading';
import HomeMining from '@pages/Home/components/HomeMining/HomeMining';
import HomeButtons from '@p-home/components/HomeButtons/HomeButtons.tsx';
import HomeCells from '@p-home/components/HomeCells/HomeCells.tsx';

// Included styles;
import '@pages/page.scss';
import { API_USER_GET } from '@API/api.user.get';
import { useAuth } from '@providers/AuthProvider';
import { useData } from '@providers/DataProvider';
import { useLocalization } from '@providers/LocalizationProvider';


interface ComponentProps { }

const Home = ({ }: ComponentProps): ReactNode => {
   const [loading, setLoading] = useState(true);

   const { webApp, token } = useAuth();
   const { overwriteData } = useData();
   const { localization } = useLocalization();

   useEffect(() => {
      getUser();
   }, [localization])

   const getUser = async () => {
      try {
         const response = await API_USER_GET(token, webApp);
         overwriteData(response);
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