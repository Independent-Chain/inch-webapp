import { DateTime } from 'luxon';

export const calculateLoot = (time: string, reactor: number, storage: number) => {
	const currentTime = DateTime.utc();
	const lastTime = DateTime.fromISO(time);
	const timeDifference = currentTime.diff(lastTime, 'seconds').seconds

	if (timeDifference > storage * 3600) {
		return reactor * 0.001 * storage * 3600
	} else {
		return reactor * 0.001 * timeDifference
	}
}