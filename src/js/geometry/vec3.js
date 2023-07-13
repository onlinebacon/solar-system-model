import * as Trig from '../math/trig.js';

const X = 0;
const Y = 1;
const Z = 2;

const tempArr = [ 0, 0, 0 ];

const copy = (src, dst) => {
	for (let i=0; i<3; ++i) {
		dst[i] = src[i];
	}
};

const mulVec3Mat3 = (vec, mat, dst) => {
	for (let i=0; i<3; ++i) {
		let sum = 0;
		for (let j=0; j<3; ++j) {
			sum += vec[i] * mat[j*4 + i];
		}
		tempArr[i] = sum;
	}
	copy(tempArr, dst);
};

const rotVec = (vec, angle, aAxis, bAxis, dst) => {
	const sin = Trig.sin(angle);
	const cos = Trig.cos(angle);
	for (let i=0; i<3; ++i) {
		switch (i) {
		case aAxis:
			tempArr[i] = vec[aAxis]*cos - vec[bAxis]*sin;
			break;
		case bAxis:
			tempArr[i] = vec[bAxis]*cos + vec[aAxis]*sin;
			break;
		default:
			tempArr[i] = vec[i];
		}
	}
	copy(tempArr, dst);
};

export default class Vec3 extends Array {
	constructor(args) {
		super(3);
		if (args !== undefined) {
			for (let i=0; i<3; ++i) {
				this[i] = args[i];
			}
		} else {
			for (let i=0; i<3; ++i) {
				this[i] = 0;
			}
		}
	}
	rotX(angle, dst = new Vec3()) {
		rotVec(this, angle, Z, Y, dst);
		return dst;
	}
	rotY(angle, dst = new Vec3()) {
		rotVec(this, angle, X, Z, dst);
		return dst;
	}
	rotZ(angle, dst = new Vec3()) {
		rotVec(this, angle, Y, X, dst);
		return dst;
	}
	mulMat3(mat, dst = new Vec3()) {
		mulVec3Mat3(this, mat, dst);
		return dst;
	}
	len() {
		const [ x, y, z ] = this;
		return Math.sqrt(x*x + y*y + z*z);
	}
	sub([ x, y, z ], dst = new Vec3()) {
		dst[0] = this[0] - x;
		dst[1] = this[1] - y;
		dst[2] = this[2] - z;
		return dst;
	}
	neg(dst = new Vec3()) {
		dst[0] = - this[0];
		dst[1] = - this[1];
		dst[2] = - this[2];
		return dst;
	}
	scale(val, dst = new Vec3()) {
		dst[0] = this[0]*val;
		dst[1] = this[1]*val;
		dst[2] = this[2]*val;
		return dst;
	}
}
