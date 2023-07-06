import * as Trig from './trig.js';

const X = 0;
const Y = 1;
const Z = 2;
const W = 3;
const I = 0x0;
const J = 0x4;
const K = 0x8;
const L = 0xC;

const tempArr = new Array(16).fill(0);

const copy = (src, dst, n) => {
	for (let i=0; i<n; ++i) {
		dst[i] = src[i];
	}
};

const rotMat4 = (mat, angle, aAxis, bAxis, dst) => {
	const sin = Trig.sin(angle);
	const cos = Trig.cos(angle);
	for (let i=0; i<4; ++i) {
		const base = i*4;
		for (let j=0; j<4; ++j) {
			const index = base + j;
			switch (j) {
			case bAxis:
				tempArr[index] = mat[index]*cos + mat[base + aAxis]*sin;
				break;
			case aAxis:
				tempArr[index] = mat[index]*cos - mat[base + bAxis]*sin;
				break;
			default:
				tempArr[index] = mat[index];
			}
		}
	}
	copy(tempArr, dst, 16);
};

export default class Mat4 extends Array {
	constructor(args) {
		super(16);
		if (args !== undefined) {
			for (let i=0; i<16; ++i) {
				this[i] = args[i];
			}
		} else {
			for (let i=0; i<16; ++i) {
				this[i] = (i % 5 === 0)|0;
			}
		}
	}
	rotX(angle, dst = new Mat4()) {
		rotMat4(this, angle, Z, Y, dst);
		return dst;
	}
	rotY(angle, dst = new Mat4()) {
		rotMat4(this, angle, X, Z, dst);
		return dst;
	}
	rotZ(angle, dst = new Mat4()) {
		rotMat4(this, angle, Y, X, dst);
		return dst;
	}
	translate([ x, y, z ], dst = new Mat4()) {
		if (dst !== this) {
			copy(this, dst, 16);
		}
		dst[L + X] += x;
		dst[L + Y] += y;
		dst[L + Z] += z;
		return dst;
	}
}
