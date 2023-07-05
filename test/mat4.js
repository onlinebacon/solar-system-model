import Mat4 from '../src/mat4.js';

const equals = (a, b) => {
	if (a.length !== b.length) {
		return false;
	}
	for (let i=0; i<a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
};

const approximates = (arr1, arr2, error) => {
	if (arr1.length !== arr2.length) return false;
	for (let i=0; i<arr1.length; ++i) {
		const a = arr1[i];
		const b = arr2[i];
		const e = Math.abs(a - b);
		if (e > error) return false;
	}
	return true;
};

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
		return equals(expected, actual);
	},
}, {
	name: 'Test rotations',
	run: () => {
		const m = new Mat4();
		const [ x, y, z ] = [ 10, 15, 20 ].map(val => val/180*Math.PI);
		const expected = [
			 0.9076734, -0.3303661,  0.2588190, 0,
			 0.3790571,  0.9100450, -0.1677313, 0,
			-0.1801243,  0.2503524,  0.9512513, 0,
			         0,          0,          0, 1,
		];
		const actual = m.rotX(x).rotY(y).rotZ(z);
		return approximates(expected, actual, 1e-6);
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
		const actual = m.move([ 3, 7, 9 ]);
		return equals(expected, actual);
	},
}];

let someFailed = false;
for (const { name, run } of tests) {
	if (run()) {
		console.log(`${name}: Ok`);
	} else {
		someFailed = true;
		console.error(`${name}: Fail`);
	}
}
if (someFailed) {
	console.error('Fail');
	process.exit(1);
} else {
	console.log('Pass');
}
