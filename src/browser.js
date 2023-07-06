import Mat4 from './mat4.js';
import Vec4 from './vec4.js';
import Vec3 from './Vec3.js';
import systemInit from './system-init.js';
import observations from './observations.js';
import * as Simulation from './simulation.js';

const bodies = Simulation.init(systemInit);

const getObservations = (time, lat, lon) => {
	Simulation.runUntil(time);
	const offset = Simulation.getTimeOffset(time);
	const res = {};
	for (const name in bodies) {
		const body = bodies[name];
		if (name === 'earth') {
			continue;
		}
		const rot = systemInit.bodies.earth.rotation;
		let mat = new Mat4();
		mat = mat.translate(bodies.earth.position.neg());
		mat = mat.rotY(rot.axis.direction);
		mat = mat.rotX(- rot.axis.tilt);
		mat = mat.rotY(lon + rot.offset + offset*rot.period);
		mat = mat.rotX(-lat);
		mat = mat.translate([ 0, 0, -systemInit.bodies.earth.radius ]);
		let vec = new Vec4([ ...body.position, 1 ]);
		vec = vec.mulMat(mat);
		const [ azm, alt ] = new Vec3(vec).calcAzmAlt();
		res[name] = { azm, alt };
	}
	console.log(res);
	return res;
};
