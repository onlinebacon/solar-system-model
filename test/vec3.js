import Vec3 from '../src/vec3.js';
import { runTests, assert } from './test.js';

const DEG = Math.PI/180;

const tests = [{
	name: 'Test calcAzmAlt',
	run: () => {
		const v = new Vec3([ 2*0.557993, 2*-0.225444, 2*0.798636 ]);
		const [ azm, alt ] = v.calcAzmAlt();
		assert.approximates(112*DEG, azm, 1e-6);
		assert.approximates(53*DEG, alt, 1e-6);
	},
}, {
	name: 'Test rotations',
	run: () => {
		const v = new Vec3([ 0, 0, 1 ]).rotX(10*DEG).rotY(20*DEG).rotZ(30*DEG);
		assert.approximates([ -0.204874, 0.318796, 0.925417 ], v, 1e-6);
	},
}];

runTests(tests);
