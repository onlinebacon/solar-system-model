import Vec3 from '../src/js/geometry/vec3.js';
import { runTests, assert } from './test.js';

const tests = [{
	name: 'Test rotations',
	run: () => {
		const v = new Vec3([ 0, 0, 1 ]).rotX(10).rotY(20).rotZ(30);
		assert.approximates([ -0.204874, 0.318796, 0.925417 ], v, 1e-6);
	},
}];

runTests('vec3.js', tests);
