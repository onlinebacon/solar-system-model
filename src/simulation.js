let G = 6.6743e-11;
let dt = 1;
let it = 0;

let bodyMap = {};
const bodies = true ? [] : [ new Body() ];

class Body {
	constructor() {
		this.mass = 1;
		this.radius = 1;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
	}
	setPos([ x, y, z ]) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	setVel([ vx, vy, vz ]) {
		this.vx = vx;
		this.vy = vy;
		this.vz = vz;
		return this;
	}
	interact(other = new Body()) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		const dz = other.z - this.z;
		const dSqr = dx*dx + dy*dy + dz*dz;
		const d = Math.sqrt(dSqr);
		const fg = G*this.mass*other.mass/dSqr;
		const nx = dx/d;
		const ny = dy/d;
		const nz = dz/d;
		const temp = fg*dt;
		const mag1 = temp/this.mass;
		const mag2 = temp/other.mass;
		this.vx += nx*mag1;
		this.vy += ny*mag1;
		this.vz += nz*mag1;
		other.vx -= nx*mag2;
		other.vy -= ny*mag2;
		other.vz -= nz*mag2;
	}
	update() {
		this.x += this.vx*dt;
		this.y += this.vy*dt;
		this.z += this.vz*dt;
	}
}

export const reset = () => {
	it = 0;
	bodies.length = 0;
};

export const runUntil = (timeOffset) => {
	const n = bodies.length;
	while (it*dt < timeOffset) {
		for (let i=1; i<n; ++i) {
			const a = bodies[i];
			for (let j=0; j<i; ++j) {
				const b = bodies[j];
				a.interact(b);
			}
		}
		for (let i=0; i<n; ++i) {
			bodies[i].update();
		}
		++ it;
	}
};

export const addBody = ({ name, mass, radius, position, velocity }) => {
	const body = new Body();
	body.mass = mass;
	body.radius = radius;
	body.setPos(position);
	body.setVel(velocity);
	bodies.push(body);
	bodyMap[name] = body;
};
