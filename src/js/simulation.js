import Vec3 from './geometry/vec3.js';

export class Body {
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
		const m1 = this.mass;
		const m2 = other.mass;
		const dx = other.x - this.x;
		const dy = other.y - this.y;
		const dz = other.z - this.z;
		const dSqr = dx*dx + dy*dy + dz*dz;
		const d = Math.sqrt(dSqr);
		const nx = dx/d;
		const ny = dy/d;
		const nz = dz/d;
		const m = gc*m1*m2/dSqr*dt;
		const c1 = m/m1;
		const c2 = m/m2;
		this.vx += c1*nx;
		this.vy += c1*ny;
		this.vz += c1*nz;
		other.vx -= c2*nx;
		other.vy -= c2*ny;
		other.vz -= c2*nz;
	}
	update(dt) {
		this.x += this.vx*dt;
		this.y += this.vy*dt;
		this.z += this.vz*dt;
	}
}

export class Simulation {
	constructor({ dt = 1, t0 = 0, gc = 6.6743e-11 }) {
		this.dt = dt;
		this.t0 = t0;
		this.gc = gc;
		this.it = 0;
		this.bodies = true ? [] : [ new Body() ];
	}
	runUntil(time) {
		const { dt, t0, gc, bodies } = this;
		let { it } = this;
		for (;t0 + it*dt < time; it++) {
			for (let i=1; i<bodies.length; ++i) {
				const a = bodies[i];
				for (let j=0; j<i; ++j) {
					const b = bodies[j];
					a.interact(b, gc, dt);
				}
			}
			for (let i=0; i<bodies.length; ++i) {
				bodies[i].update(dt);
			}
		}
		return this;
	}
}
