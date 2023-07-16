import Vec3 from '../geometry/vec3.js';
import { D360, asin } from './trig.js';

export const coordToVec3 = ([ a, b ]) => {
	const v = new Vec3([ 0, -1, 0 ]);
	v.rotX(asin(a*2 - 1), v);
	v.rotZ((b - 0.5)*D360, v);
	return v;
};
