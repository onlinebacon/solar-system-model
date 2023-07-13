import * as trig from './trig.js';

export const haversine = (aLat, aLon, bLat, bLon) => trig.acos(
	trig.sin(aLat)*trig.sin(bLat) +
	trig.cos(aLat)*trig.cos(bLat)*trig.cos(aLon - bLon)
);
