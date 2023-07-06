import Vec3 from '../src/vec3.js';
import { runTests, assert } from './test.js';

const tests = [{
	name: 'Test calcAzmAlt',
	run: () => {
		const v = new Vec3([ 2*0.557993, 2*-0.225444, 2*0.798636 ]);
		const [ azm, alt ] = v.calcAzmAlt();
		assert.approximates(112, azm, 1e-4);
		assert.approximates(53, alt, 1e-4);
	},
}, {
	name: 'Test rotations',
	run: () => {
		const v = new Vec3([ 0, 0, 1 ]).rotX(10).rotY(20).rotZ(30);
		assert.approximates([ -0.204874, 0.318796, 0.925417 ], v, 1e-6);
	},
}];

runTests('vec3.js', tests);
