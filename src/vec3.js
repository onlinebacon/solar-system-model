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
	const sin = Math.sin(angle);
	const cos = Math.cos(angle);
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
	rotX(angle, dst = this) {
		rotVec(this, angle, Z, Y, dst);
		return dst;
	}
	rotY(angle, dst = this) {
		rotVec(this, angle, X, Z, dst);
		return dst;
	}
	rotZ(angle, dst = this) {
		rotVec(this, angle, Y, X, dst);
		return dst;
	}
	mulMat3(mat, dst = this) {
		mulVec3Mat3(this, mat, dst);
		return dst;
	}
	len() {
		const [ x, y, z ] = this;
		return Math.sqrt(x*x + y*y + z*z);
	}
	calcAzmAlt() {
		const [ x, y, z ] = this;
		const temp = x*x + y*y;
		const nz = z/Math.sqrt(temp + z*z);
		const ny = y/Math.sqrt(temp);
		const alt = Math.asin(nz);
		const azm = x >= 0 ? Math.acos(ny) : Math.PI*2 - Math.acos(ny);
		return [ alt, azm ];
	}
}
