const tempArr = new Array(4).fill(0);

const copy = (src, dst) => {
	for (let i=0; i<4; ++i) {
		dst[i] = src[i];
	}
};

const rotVec4 = (vec, angle, aAxis, bAxis, dst) => {
	const sin = Math.sin(angle);
	const cos = Math.cos(angle);
	for (let i=0; i<4; ++i) {
		switch (i) {
		case bAxis:
			tempArr[i] = vec[bAxis]*cos + vec[aAxis]*sin;
			break;
		case aAxis:
			tempArr[i] = vec[aAxis]*cos - vec[bAxis]*sin;
			break;
		default:
			tempArr[i] = vec[i];
		}
	}
	copy(tempArr, dst);
};

export default class Vec4 extends Array {
	constructor(args) {
		super(4);
		if (args === undefined) {
			for (let i=0; i<4; ++i) {
				this[i] = (i === 3)|0;
			}
		} else {
			for (let i=0; i<4; ++i) {
				this[i] = args[i];
			}
		}
	}
	rotX(angle, dst = this) {
		rotVec4(this, angle, Z, Y, dst);
		return dst;
	}
	rotY(angle, dst = this) {
		rotVec4(this, angle, X, Z, dst);
		return dst;
	}
	rotZ(angle, dst = this) {
		rotVec4(this, angle, Y, X, dst);
		return dst;
	}
}
