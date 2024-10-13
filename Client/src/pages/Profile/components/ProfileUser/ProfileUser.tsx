// Custom hooks;
import { useData } from '@providers/DataProvider';
import { useLocalization } from '@providers/LocalizationProvider';

// Included styles;
import './ProfileUser.scss';


interface ComponentProps { }

const ProfileUser = ({ }: ComponentProps): JSX.Element => {
   const { data } = useData();
   const { localization } = useLocalization();

   return (
      <div className="about-user">
         <div className="au__avatar">
            { data.metaData.username != null ? data.metaData.username.charAt(0).toUpperCase() : '' }
         </div>
         <p className="username">{ data.metaData.username }</p>
         <div className="information">
            <div className="information__cell ">
               <span className="value">{ data.appData.friends }</span>
               <span className="title">{ localization.profile.friends }</span>
            </div>
            <div className="i__divider"></div>
            <div className="information__cell">
               <span className="value">{ data.appData.uid }</span>
               <span className="title">UID</span>
            </div>
            <div className="i__divider"></div>
            <div className="information__cell">
               <span className="value">#{ data.appData.rating }</span>
               <span className="title">{ localization.profile.rating }</span>
            </div>
         </div>
      </div>
   )
}

export default ProfileUser;