import Vec4 from '../src/js/geometry/vec4.js';
import { runTests, assert } from './test.js';

const tests = [{
	name: 'Test matrix multiplication',
	run: () => {
		const v = new Vec4([ 7, 3, 5, 9 ]);
		const m = [
			4, 2, 3, 7,
			8, 1, 9, 5,
			3, 5, 8, 4,
			6, 6, 7, 9,
		];
		const expected = [ 121, 96, 151, 165 ];
		const actual = v.mulMat(m);
		assert.equals(expected, actual);
	},
}];

runTests('vec4.js', tests);
