import Vec3 from '../geometry/vec3.js';

export default class Body {
	constructor({ mass = 1, pos, vel } = {}) {
		this.mass = mass;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		if (pos != null) {
			this.setPosition(pos);
		}
		if (vel != null) {
			this.setVelocity(vel);
		}
	}
	setPosition([ x, y, z ]) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	getPosition() {
		const { x, y, z } = this;
		return new Vec3([ x, y, z ]);
	}
	setVelocity([ vx, vy, vz ]) {
		this.vx = vx;
		this.vy = vy;
		this.vz = vz;
		return this;
	}
	getVelocity() {
		const { vx, vy, vz } = this;
		return new Vec3([ vx, vy, vz ]);
	}
	interact(other, gc, dt) {
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		const dz = other.z - this.z;
		const dSqr = dx*dx + dy*dy + dz*dz;
		const d = Math.sqrt(dSqr);
		const nx = dx/d;
		const ny = dy/d;
		const nz = dz/d;
		const f = gc*this.mass*other.mass/dSqr;
		const m = f*dt;
		const m1 = m/this.mass;
		const m2 = m/other.mass;
		this.vx += m1*nx;
		this.vy += m1*ny;
		this.vz += m1*nz;
		other.vx -= m2*nx;
		other.vy -= m2*ny;
		other.vz -= m2*nz;
	}
	update(dt) {
		this.x += this.vx*dt;
		this.y += this.vy*dt;
		this.z += this.vz*dt;
	}
}
