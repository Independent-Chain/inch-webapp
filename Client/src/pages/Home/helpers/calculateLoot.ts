import { DateTime } from 'luxon';

const calculateLoot = (lastClaimTime: string, reactor: number, storage: number) => {
   const currentTime = DateTime.utc();
   const lastTime = DateTime.fromISO(lastClaimTime, { zone: 'utc' });
   const timeDifference = currentTime.diff(lastTime, 'seconds').seconds;

   if (timeDifference > storage * 3600) {
      return Math.abs(reactor * 0.001 * storage * 3600);
   } else {
      return Math.abs(reactor * 0.001 * timeDifference);
   }
}

export default calculateLoot;