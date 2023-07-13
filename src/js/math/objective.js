import { haversine } from './math.js';

const objective = (args) => {
	const [ lat, lon ] = args;
	const circles = [{
		lat: 61 + 39/60,
		lon: -(16 + 14/60),
		rad: 34 + 44.5/60,
	}, {
		lat: 19 + 5.2/60,
		lon: 32 + 7.2/60,
		rad: 62 + 55.2/60,
	}, {
		lat: 11 + 52.5/60,
		lon: -(29 + 6.2/60),
		rad: 19 + 13.9/60,
	}];
	let sum = 0;
	for (let c of circles) {
		sum += (c.rad - haversine(lat, lon, c.lat, c.lon))**2;
	}
	return sum;
};

export default objective;
