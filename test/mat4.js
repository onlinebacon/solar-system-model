import Mat4 from '../src/js/geometry/mat4.js';
import { runTests, assert } from './test.js';

const tests = [{
	name: 'Test constructor',
	run: () => {
		const expected = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]
		const actual = new Mat4();
		assert.equals(expected, actual);
	},
}, {
	name: 'Test rotations',
	run: () => {
		const m = new Mat4();
		const [ x, y, z ] = [ 10, 15, 20 ];
		const expected = [
			 0.9076734, -0.3303661,  0.2588190, 0,
			 0.3790571,  0.9100450, -0.1677313, 0,
			-0.1801243,  0.2503524,  0.9512513, 0,
			         0,          0,          0, 1,
		];
		const actual = m.rotX(x).rotY(y).rotZ(z);
		assert.approximates(expected, actual, 1e-6);
	},
}, {
	name: 'Test translation',
	run: () => {
		const m = new Mat4();
		const expected = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			3, 7, 9, 1,
		];
		const actual = m.translate([ 3, 7, 9 ]);
		assert.equals(expected, actual);
	},
}];

runTests('mat4.js', tests);
