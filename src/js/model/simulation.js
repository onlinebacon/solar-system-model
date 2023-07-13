import Body from './body.js';

export default class Simulation {
	constructor({ dt = 1, t0 = 0, gc = 6.6743e-11 }) {
		this.dt = dt;
		this.t0 = t0;
		this.gc = gc;
		this.it = 0;
		this.bodies = true ? [] : [ new Body() ];
	}
	runUntilSync(time, maxIt = Infinity) {
		const { dt, t0, gc, bodies } = this;
		const { length: n } = bodies;
		let { it } = this;
		let finished = true;
		for (;t0 + it*dt < time; ++it) {
			if (maxIt > 0) {
				maxIt --;
			} else {
				finished = false;
				break;
			}
			for (let i=1; i<n; ++i) {
				const a = bodies[i];
				for (let j=0; j<i; ++j) {
					const b = bodies[j];
					a.interact(b, gc, dt);
				}
			}
			for (let i=0; i<n; ++i) {
				bodies[i].update(dt);
			}
		}
		this.it = it;
		return finished;
	}
	async runUntil (time, maxIt = Infinity) {
		let finished = false;
		for (;;) {
			const nIt = Math.min(maxIt, 1e+4);
			finished = this.runUntilSync(time, nIt);
			if (finished) {
				break;
			}
			maxIt -= nIt;
			if (maxIt <= 0) {
				break;
			}
			await new Promise(done => setTimeout(done, 0));
		}
		return finished;
	}
}
