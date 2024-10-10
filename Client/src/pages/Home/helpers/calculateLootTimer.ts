import { DateTime } from 'luxon';

const calculateLootTimer = (lastClaimTime: string, storage: number): string => {
	const currentTime = DateTime.utc();
	const lastTime = DateTime.fromISO(lastClaimTime, { zone: 'utc' });
	const endTime = lastTime.plus({ hours: storage });
	const remainingTime = endTime.diff(currentTime, ['hours', 'minutes', 'seconds']);
	
	if (remainingTime.as('seconds') <= 0) {
		return 'Storage is full';
	}

	const hours = Math.floor(remainingTime.hours);
  const minutes = Math.floor(remainingTime.minutes % 60);
  const seconds = Math.floor(remainingTime.seconds % 60);

	const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedTime;
}

export default calculateLootTimer;