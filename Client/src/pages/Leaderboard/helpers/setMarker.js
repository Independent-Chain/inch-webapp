export const setMarker = (rating) => {
	let marker;
	switch(rating) {
		case 0: marker = 'gold'; break;
		case 1: marker = 'silver'; break;
		case 2: marker = 'bronze'; break;
		default: marker = 'default'; break;
	}
	return marker;
}