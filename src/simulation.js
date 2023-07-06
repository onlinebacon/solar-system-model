import Vec3 from './Vec3.js';

let G = 6.6743e-11;
let dt = 1;
let it = 0;
let t0 = 0;

const bodies = true ? [] : [ new Body() ];

class Body {
	constructor() {
		this.mass = 1;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
	}
	get position() {
		const { x, y, z } = this;
		return new Vec3([ x, y, z ]);
	}
	get velocity() {
		const { vx, vy, vz } = this;
		return new Vec3([ vx, vy, vz ]);
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

class BodyConfig {
	constructor() {
		this.mass = 1;
		this.position = [ 0, 0, 0 ];
		this.velocity = [ 0, 0, 0 ];
	}
}

class InitConfig {
	constructor() {
		this.time = 1;
		this.dt = 1;
		this.G = 6.6743e-11;
		this.bodies = [ new BodyConfig() ];
	}
}

const addBody = ({
	mass = 1,
	position = [ 0, 0, 0 ],
	velocity = [ 0, 0, 0 ],
}) => {
	const body = new Body();
	body.mass = mass;
	body.setPos(position);
	body.setVel(velocity);
	bodies.push(body);
	return body;
};

export const init = (config = new InitConfig()) => {
	dt = config.dt ?? dt;
	t0 = config.time ?? t0;
	G = config.G ?? G;
	it = 0;
	bodies.length = 0;
	const res = {};
	Object.entries(config.bodies).forEach(([ name, config ]) => {
		res[name] = addBody(config);
	});
	return res;
};

export const getTimeOffset = (time) => {
	return time - t0;
};

export const runUntil = (time) => {
	const n = bodies.length;
	const offset = getTimeOffset(time);
	while (it*dt < offset) {
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
