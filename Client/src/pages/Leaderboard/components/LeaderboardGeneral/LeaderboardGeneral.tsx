// Custom hooks;
import { useData } from '@providers/DataProvider';

// Custom components;
import LeaderboardUser from '@p-leaderboard/components/LeaderboardUser/LeaderboardUser.tsx';

// Included styles;
import './LeaderboardGeneral.scss';


type UserData = { 
	username: string;
	marker?: string;
	position: number;
	balance: number;
}

interface ComponentProps { }

const LeaderboardGeneral = ({ }: ComponentProps): JSX.Element => {
   const { data } = useData();

   return (
      <div className="all-users-rating">
         {
            data.allRating.map((user: UserData, index: number) =>  {
               if (user.username === null) {
                  user.username = 'incognito';
               }
               user.position = index + 1;
               return (
                  <LeaderboardUser
                     key={ index }
                     username={ user.username } 
                     balance={ user.balance }
                     position={ user.position }	
                  />
               )
            })
         }
      </div>
   )
}

export default LeaderboardGeneral;