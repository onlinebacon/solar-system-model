import Simulation from '../src/js/model/simulation.js';
import Body from '../src/js/model/body.js';
import { assert, runTests } from './test.js';

const tests = [{
	name: 'Test runUntilSync',
	run: () => {
		const sim = new Simulation({ dt: 0.1, t0: 1000, gc: 6.6743e-11 });
		const b1 = new Body({ mass: 1e+3 });
		const b2 = new Body({
			mass: 1,
			pos: [ 1, 0, 0 ],
			vel: [ 0, 2e-4, 0 ],
		});
		sim.bodies.push(b1);
		sim.bodies.push(b2);
		sim.runUntilSync(7000, 1e5);
		const expected = [ -0.1695455, 0.5028658, 0 ];
		const actual = b2.getPosition().sub(b1.getPosition());
		assert.approximates(expected, actual, 1e-4);
	},
}, {
	name: 'Test runUntil',
	run: async () => {
		const sim = new Simulation({ dt: 0.05, t0: 1000, gc: 6.6743e-11 });
		const b1 = new Body({ mass: 1e+3 });
		const b2 = new Body({
			mass: 1,
			pos: [ 1, 0, 0 ],
			vel: [ 0, 2e-4, 0 ],
		});
		sim.bodies.push(b1);
		sim.bodies.push(b2);
		await sim.runUntil(7000, 1e6);
		const expected = [ -0.1695455, 0.5028658, 0 ];
		const actual = b2.getPosition().sub(b1.getPosition());
		assert.approximates(expected, actual, 1e-4);
	},
}];

runTests('simulation.js', tests);
