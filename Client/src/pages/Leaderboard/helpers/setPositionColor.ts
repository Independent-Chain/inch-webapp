export const setPositionColor = (rating: number) => {
	let marker;
	switch(rating) {
		case 1: marker = 'gold'; break;
		case 2: marker = 'silver'; break;
		case 3: marker = 'bronze'; break;
		default: marker = 'default'; break;
	}
	return marker;
}