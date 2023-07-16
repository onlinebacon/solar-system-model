import * as Trig from './trig.js';

const { sqrt } = Math;

const calcAzmAlt = (north, east, up) => {
	const len = sqrt(north**2 + east**2 + up**2);
	const alt = Trig.asin(up/len);
	const hLen = sqrt(north**2 + east**2);
	const azm = Trig.acos(north/hLen);
	if (east >= 0) {
		return [ azm, alt ];
	}
	return [ Trig.D360 - azm, alt ];
};

const calcTargetAzmAlt = (
	earthPos,
	earthRad,
	targetPos,
	lat,
	rot,
) => {
	let v = targetPos;
	v = v.sub(earthPos);
	v = v.rotZ(rot);
	v = v.rotX(Trig.D90 - lat);
	v.z -= earthRad;
	const [ x, y, z ] = v;
	return calcAzmAlt(y, x, z);
};

export default calcTargetAzmAlt;
