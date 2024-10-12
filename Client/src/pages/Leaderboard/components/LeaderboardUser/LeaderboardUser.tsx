// Custom helpers;
import { setPositionColor } from '@p-leaderboard/helpers/setPositionColor.ts';

// Included styles;
import './LeaderboardUser.scss';


interface ComponentProps {
	username: string;
	position: number;
	balance: number;
}

const LeaderboardUser = ({ username, balance, position }: ComponentProps): JSX.Element => {
   const marker = setPositionColor(position);

   return (
      <div className="user-rating-card">
         <div className="urc__avatar" style={{backgroundColor: `var(--${marker}-marker)`}}>
            <span>
               { 
                  username === 'incognito' ? 
                     '?' :
                     username[0] + username[1] 
               }
            </span>
         </div>
         <div className="urc__body">
            <p className="urc__username">{ username }</p>
            <p className="urc__balance">{ balance.toLocaleString('en-Us') } tINCH</p>
         </div>
         <p className={`urc__position ${marker}`}>#{ position } </p>
      </div>
   )
}

export default LeaderboardUser;